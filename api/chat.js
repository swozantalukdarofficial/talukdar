// In-Memory Rate Limiter Map (IP -> { count, expires })
const rateLimitMap = new Map();

function isRateLimited(ip, limit = 15, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.expires) {
    rateLimitMap.set(ip, { count: 1, expires: now + windowMs });
    return false;
  }
  record.count += 1;
  return record.count > limit;
}

function generateSmartFallbackReply(userQuery = "") {
  const query = userQuery.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|hola|assalamu|salam|kemon|ki obostha)/i.test(query)) {
    return "👋 Hello! Welcome to **WeBestOne**! I'm your AI Digital Growth Consultant. How can our strategy team help scale your website, SEO, or digital marketing today?";
  }

  // 2. Services & Offerings
  if (query.includes("service") || query.includes("offer") || query.includes("kaz") || query.includes("work") || query.includes("web") || query.includes("seo") || query.includes("marketing") || query.includes("design") || query.includes("সার্ভিস") || query.includes("কাজ")) {
    return `👋 Here are all 12 specialized services offered by **WeBestOne** (click any service to view details):

1. 📈 [Full Stack Digital Marketing](/services/digital-marketing-agency)
2. 🚀 [AI Driven SEO](/services/AI-SEO-Service-Agency)
3. 📱 [Social Media Marketing (SMM)](/services/social-media-marketing-agency)
4. 🎯 [PPC Ads Management](/services/ppc-management-services)
5. 🛍️ [Shopify SEO Agency](/services/shopify-seo-service-agency)
6. ✍️ [Content Writing Services](/services/content-writing-services)
7. 🎬 [Professional Video Editing](/services/professional-video-editing-services)
8. 🎨 [Motion Graphics Services](/services/motion-graphics-services-company)
9. 💻 [Custom Website Development](/services/custom-web-development-services)
10. 🌐 [WordPress Web Development](/services/wordpress-website-development-services)
11. 🖌️ [UI/UX Web Design](/services/web-design-service)
12. 🛒 [Shopify Website Development](/services/shopify-website-development-service)

🔗 View our complete 12-service catalogue on our [Explore All Services](/services) page!`;
  }

  // 3. Pricing / Cost / Budget
  if (query.includes("price") || query.includes("cost") || query.includes("taka") || query.includes("charge") || query.includes("budget") || query.includes("koto") || query.includes("rate")) {
    return "Our custom solutions are built for maximum ROI (averaging **+145% conversion growth**). Would you like a free custom audit or proposal? Feel free to message us on our [Contact Us Page](/contact-us) or via [WhatsApp](https://wa.me/8801815025322)!";
  }

  // 4. Contact / Call / Reach out
  if (query.includes("contact") || query.includes("call") || query.includes("number") || query.includes("phone") || query.includes("email") || query.includes("talk") || query.includes("whatsapp") || query.includes("namba")) {
    return "We'd love to connect with you! Please share your phone number, email, or preferred time here, or reach out directly on [WhatsApp](https://wa.me/8801815025322). Our WeBestOne Growth Team will contact you shortly!";
  }

  // 5. Founder / Leadership / Team
  if (query.includes("founder") || query.includes("ceo") || query.includes("owner") || query.includes("shipon") || query.includes("rozi") || query.includes("team") || query.includes("ke")) {
    return "WeBestOne is led by **Rozi Osman** (Founder & Senior Growth Strategist) and **Shipon Talukdar** (Lead Developer & System Architect). Learn more about us on our [About Us Page](/about-us)!";
  }

  // 6. Default Dynamic Agency Consultant Response
  return "Thank you for contacting **WeBestOne**! We engineer high-converting digital marketing ecosystems and custom software solutions. How can we help scale your business goals today? Feel free to explore our [Services](/services) or chat directly on [WhatsApp](https://wa.me/8801815025322)!";
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // IP Rate Limiting Guard (Max 60 AI chats per min per IP)
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp, 60, 60000)) {
    return res.status(429).json({ error: 'Too many requests from your IP. Please try again in 1 minute.' });
  }

  const { messages, systemPrompt } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const lastUserMsgObj = [...messages].reverse().find(m => m.sender === 'user' || m.role === 'user');
  const userText = lastUserMsgObj ? (lastUserMsgObj.text || lastUserMsgObj.content || '') : '';

  const groqKey = process.env.GROQ_KEY || process.env.VITE_GROQ_KEY || process.env.VITE_GROQ_API_KEY;
  const nvidiaKey = process.env.NVIDIA_KEY || process.env.VITE_NVIDIA_KEY || process.env.VITE_NVIDIA_API_KEY;

  try {
    // 1. Try Groq AI (Primary: llama-3.3-70b-versatile, Backup: llama-3.1-8b-instant)
    if (groqKey) {
      const groqModels = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
      for (const model of groqModels) {
        try {
          const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${groqKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: model,
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-8).map((m) => ({
                  role: m.sender === "user" ? "user" : "assistant",
                  content: m.text || m.content || "",
                })),
              ],
              temperature: 0.6,
              max_tokens: 350,
            }),
          });

          if (groqRes.ok) {
            const data = await groqRes.json();
            const reply = data.choices?.[0]?.message?.content;
            if (reply) {
              return res.status(200).json({ reply });
            }
          }
        } catch (gErr) {
          console.warn(`Groq model ${model} failed:`, gErr);
        }
      }
    }

    // 2. Fallback to NVIDIA NIM AI
    if (nvidiaKey) {
      const nvidRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${nvidiaKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-70b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-8).map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text || m.content || "",
            })),
          ],
          temperature: 0.6,
          max_tokens: 350,
        }),
      });

      if (nvidRes.ok) {
        const data = await nvidRes.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({ reply });
        }
      }
    }

    // 3. Smart Response Engine Fallback (Guarantees dynamic, contextual responses 100% of the time)
    const smartReply = generateSmartFallbackReply(userText);
    return res.status(200).json({ reply: smartReply });

  } catch (err) {
    console.error("Serverless AI Chat Error:", err);
    const smartReply = generateSmartFallbackReply(userText);
    return res.status(200).json({ reply: smartReply });
  }
}
