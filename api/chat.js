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

  // IP Rate Limiting Guard (Max 15 AI chats per min per IP)
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
  if (isRateLimited(clientIp, 15, 60000)) {
    return res.status(429).json({ error: 'Too many requests from your IP. Please try again in 1 minute.' });
  }

  const { messages, systemPrompt } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const groqKey = process.env.GROQ_KEY || process.env.VITE_GROQ_KEY;
  const nvidiaKey = process.env.NVIDIA_KEY || process.env.VITE_NVIDIA_KEY;

  try {
    // 1. Try Groq AI (Llama-3.3-70b)
    if (groqKey) {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
          temperature: 0.7,
          max_tokens: 450,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return res.status(200).json({ reply });
        }
      }
    }

    // 2. Fallback to NVIDIA NIM AI (Llama-3.1-405b)
    if (nvidiaKey) {
      const nvidRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${nvidiaKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-405b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
          temperature: 0.7,
          max_tokens: 450,
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

    return res.status(500).json({ error: "No server AI key configured" });
  } catch (err) {
    console.error("Serverless AI Chat Error:", err);
    return res.status(500).json({ error: "Failed generating AI response" });
  }
}
