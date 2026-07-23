import { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Sparkles } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { db } from "../lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { ChatMessage, ChatTab } from "./chat/types";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessagesTab } from "./chat/ChatMessagesTab";
import { ChatArticlesTab } from "./chat/ChatArticlesTab";
import { ChatSearchTab } from "./chat/ChatSearchTab";
import { ChatInput } from "./chat/ChatInput";
import { WhatsAppTab } from "./chat/WhatsAppTab";
import { ToastPopup, ToastNotice } from "./chat/ToastPopup";
import { GreetingCallout } from "./chat/GreetingCallout";

function generateClientSmartReply(userQuery: string, userName?: string): string {
	const query = userQuery.toLowerCase().trim();

	if (/^(hi|hello|hey|hola|assalamu|salam|kemon|ki obostha)/i.test(query)) {
		return `👋 Hello **${userName || "there"}**! Welcome to **WeBestOne**. I'm your AI Digital Growth Consultant. How can our strategy team help scale your website, SEO, or digital marketing today?`;
	}
	if (query.includes("service") || query.includes("offer") || query.includes("kaz") || query.includes("work") || query.includes("web") || query.includes("seo") || query.includes("marketing") || query.includes("design")) {
		return "We specialize in **AI-Powered SEO & GEO Ranking**, **Custom Next.js & React Web Apps**, **Data-Driven Digital Marketing**, and **High-Converting Shopify Stores**. Explore our [Services](/services) or view our [Work Showcase](/work)!";
	}
	if (query.includes("price") || query.includes("cost") || query.includes("taka") || query.includes("charge") || query.includes("budget") || query.includes("koto") || query.includes("rate")) {
		return "Our custom solutions are built for maximum ROI (averaging **+145% conversion growth**). Would you like a free custom audit or proposal? Feel free to message us on our [Contact Us Page](/contact-us) or via [WhatsApp](https://wa.me/8801815025322)!";
	}
	if (query.includes("contact") || query.includes("call") || query.includes("number") || query.includes("phone") || query.includes("email") || query.includes("talk") || query.includes("whatsapp") || query.includes("namba")) {
		return "We'd love to connect with you! Please share your phone number, email, or preferred call time here, or reach out directly on [WhatsApp](https://wa.me/8801815025322). Our WeBestOne Growth Team will contact you shortly!";
	}
	if (query.includes("founder") || query.includes("ceo") || query.includes("owner") || query.includes("shipon") || query.includes("rozi") || query.includes("team")) {
		return "WeBestOne is led by **Rozi Osman** (Founder & Senior Growth Strategist) and **Shipon Talukdar** (Lead Developer & System Architect). Learn more about us on our [About Us Page](/about-us)!";
	}
	return "Thank you for reaching out to **WeBestOne**! We engineer high-converting digital marketing ecosystems and custom software solutions. How can we help scale your business goals today? Feel free to explore our [Services](/services) or chat directly on [WhatsApp](https://wa.me/8801815025322)!";
}

export default function AiChatWidget() {
	const { socials } = useContent();
	const [isOpen, setIsOpen] = useState(false);
	const [showGreeting, setShowGreeting] = useState(true);
	const [activeTab, setActiveTab] = useState<ChatTab>("messages");

	const [step, setStep] = useState<"email" | "chat">(() => {
		const savedEmail = sessionStorage.getItem("webestone_user_email");
		return savedEmail ? "chat" : "email";
	});

	const [selectedLang, setSelectedLang] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_lang") || "English";
	});

	const [userName, setUserName] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_name") || "";
	});
	const [nameInput, setNameInput] = useState("");

	const [userEmail, setUserEmail] = useState<string>(() => {
		return sessionStorage.getItem("webestone_user_email") || "";
	});
	const [emailInput, setEmailInput] = useState("");

	const [websiteUrl, setWebsiteUrl] = useState<string>(() => {
		return sessionStorage.getItem("webestone_website_url") || "";
	});
	const [websiteInput, setWebsiteInput] = useState("");

	const [formError, setFormError] = useState("");
	const [leadDocId, setLeadDocId] = useState<string | null>(null);
	const [notice, setNotice] = useState<ToastNotice | null>(null);

	const [userGeoLocation, setUserGeoLocation] = useState<{ country: string; countryCode: string; city: string } | null>(() => {
		const saved = sessionStorage.getItem("webestone_user_geo");
		return saved ? JSON.parse(saved) : null;
	});

	useEffect(() => {
		if (userGeoLocation) return;
		const fetchGeo = async () => {
			try {
				const res = await fetch("https://ipapi.co/json/");
				if (res.ok) {
					const data = await res.json();
					if (data.country_name) {
						const geoObj = {
							country: data.country_name || "Unknown",
							countryCode: data.country_code || "",
							city: data.city || "",
						};
						setUserGeoLocation(geoObj);
						sessionStorage.setItem("webestone_user_geo", JSON.stringify(geoObj));
					}
				}
			} catch (e) {
				// Fallback silently if API blocked
			}
		};
		fetchGeo();
	}, [userGeoLocation]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [waMessage, setWaMessage] = useState("Hi! How can we help you today?");

	const showToast = (title: string, message: string, type: "info" | "success" | "warning" = "info") => {
		setNotice({ id: Date.now().toString(), title, message, type });
	};

	const [messages, setMessages] = useState<ChatMessage[]>(() => {
		const saved = sessionStorage.getItem("webestone_ai_chat");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				console.error("Failed to parse saved chat", e);
			}
		}
		return [];
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		sessionStorage.setItem("webestone_ai_chat", JSON.stringify(messages));
		if (isOpen) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, isOpen]);

	const phoneNumber = socials.whatsapp || "+8801815025322";

	const handleWhatsAppSend = () => {
		const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
		const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMessage)}`;
		window.open(url, "_blank");
		setIsOpen(false);
	};

	const saveLeadToStorageAndDb = async (name: string, email: string, website: string, lang: string, chatMsgs: ChatMessage[]) => {
		const userText = chatMsgs.filter((m) => m.sender === "user").map((m) => m.text).join(" ");
		const phoneMatch = userText.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g);
		const extractedPhone = phoneMatch ? phoneMatch[0] : "";

		const timeMatch = userText.match(/(\b\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)\b|\b(?:morning|afternoon|evening|tonight|tomorrow)\b)/gi);
		const uniqueTimes = timeMatch ? Array.from(new Set(timeMatch)) : [];
		const preferredTime = uniqueTimes.length > 0 ? uniqueTimes[uniqueTimes.length - 1] : "";

		const hasRequestedContact =
			userText.toLowerCase().includes("contact") ||
			userText.toLowerCase().includes("call") ||
			userText.toLowerCase().includes("phone") ||
			userText.toLowerCase().includes("whatsapp") ||
			userText.toLowerCase().includes("reach out") ||
			userText.toLowerCase().includes("mail") ||
			!!extractedPhone ||
			!!preferredTime;

		const leadData = {
			name: name.trim() || "Visitor",
			email: email.toLowerCase().trim(),
			website: website.trim() || "N/A",
			extractedPhone: extractedPhone || "",
			preferredTime: preferredTime || "",
			hasRequestedContact: hasRequestedContact,
			country: userGeoLocation?.country || "Unknown",
			countryCode: userGeoLocation?.countryCode || "",
			city: userGeoLocation?.city || "",
			language: lang,
			timestamp: new Date().toLocaleString(),
			messages: chatMsgs.map((m) => ({ sender: m.sender, text: m.text, timestamp: m.timestamp })),
		};

		try {
			const existing = localStorage.getItem("webestone_chatbot_leads");
			let leadsList: any[] = existing ? JSON.parse(existing) : [];
			const filtered = leadsList.filter((l) => l.email.toLowerCase() !== email.toLowerCase());
			filtered.unshift(leadData);
			localStorage.setItem("webestone_chatbot_leads", JSON.stringify(filtered));
		} catch (e) {
			console.error("Failed saving lead locally:", e);
		}

		if (db) {
			try {
				if (leadDocId) {
					await updateDoc(doc(db, "chatbot_leads", leadDocId), leadData);
				} else {
					const docRef = await addDoc(collection(db, "chatbot_leads"), leadData);
					setLeadDocId(docRef.id);
				}
			} catch (fsErr) {
				console.warn("Firestore save lead warning:", fsErr);
			}
		}
	};

	const handleLanguageSelect = (lang: string) => {
		setSelectedLang(lang);
		sessionStorage.setItem("webestone_user_lang", lang);
		setStep("email");
	};

	const handleDetailsSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const nameTrimmed = nameInput.trim();
		const emailTrimmed = emailInput.trim().toLowerCase();
		const websiteTrimmed = websiteInput.trim();

		if (!nameTrimmed) {
			setFormError("Please enter your name.");
			return;
		}
		if (!emailTrimmed || !/\S+@\S+\.\S+/.test(emailTrimmed)) {
			setFormError("Please enter a valid email address.");
			return;
		}

		setUserName(nameTrimmed);
		setUserEmail(emailTrimmed);
		setWebsiteUrl(websiteTrimmed);

		sessionStorage.setItem("webestone_user_name", nameTrimmed);
		sessionStorage.setItem("webestone_user_email", emailTrimmed);
		sessionStorage.setItem("webestone_website_url", websiteTrimmed);
		setFormError("");

		const initMsg: ChatMessage = {
			id: "welcome-1",
			sender: "assistant",
			text: `👋 Welcome **${nameTrimmed}**! I'm your **AI Digital Growth Consultant** at WeBestOne.

We engineer high-converting AI digital marketing ecosystems, custom web software (Next.js/React), and search ranking strategies that deliver an average **+145% ROI boost**.

How can we help scale ${websiteTrimmed ? `**${websiteTrimmed}**` : "your business"} today?`,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const newMsgs = [initMsg];
		setMessages(newMsgs);
		saveLeadToStorageAndDb(nameTrimmed, emailTrimmed, websiteTrimmed, selectedLang, newMsgs);
		setStep("chat");
	};

	const handleSendAiMessage = async (userText: string) => {
		const query = userText.trim();
		if (!query || isLoading) return;

		const userMsg: ChatMessage = {
			id: Date.now().toString(),
			sender: "user",
			text: query,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const updatedMsgs = [...messages, userMsg];
		setMessages(updatedMsgs);
		setInput("");
		setIsLoading(true);

		// Live Internet Search Fetch
		let webContext = "";
		try {
			const searchRes = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`);
			if (searchRes.ok) {
				const searchData = await searchRes.json();
				if (searchData.AbstractText) {
					webContext = `\n[LIVE INTERNET SEARCH CONTEXT]: ${searchData.AbstractText}`;
				} else if (searchData.RelatedTopics && searchData.RelatedTopics.length > 0) {
					const topics = searchData.RelatedTopics.slice(0, 3).map((t: any) => t.Text).filter(Boolean).join(" | ");
					if (topics) webContext = `\n[LIVE INTERNET SEARCH CONTEXT]: ${topics}`;
				}
			}
		} catch (err) {
			// Internet search fallback
		}

		const systemPromptWithLang = `You are an elite, highly persuasive Digital Growth Consultant representing WeBestOne agency (WeBestOne Growth & Strategy Team). Client's name is "${userName || "Valued Client"}".

LEADERSHIP & NAMING RULE:
- General Offers & Calls: ALWAYS use "WeBestOne Growth Team", "WeBestOne Strategy Team", or "WeBestOne Contact Team" when offering calls, audits, or proposals.
- Direct Founder / CEO / Leadership Queries: ONLY when a user explicitly asks about the Founder, CEO, Lead Developer, or leadership team, provide the exact names:
  • Founder & Senior Growth Strategist: Rozi Osman
  • Lead Developer & Architect: Shipon Talukdar

AUTOMATIC LEAD & CONTACT CAPTURE RULE:
- If a customer asks us to "contact me", "call me", "reach out to me", "send email", or requests a consultation/quote:
  1. Ask for their preferred Phone Number, Email, or WhatsApp number if not provided.
  2. Confirm warmly: "Thank you! I have forwarded your contact request to our WeBestOne Growth Team. We will review your project and get in touch with you directly!"

CLIENT-IMPRESSING CONSULTANCY STYLE:
- Speak as a top-tier digital growth strategist & tech lead. Be confident, warm, data-driven, and client-focused.
- Emphasize real ROI metrics (+145% average conversion boost, +250% organic search traffic growth, AI-native GEO/SEO ranking on Google, ChatGPT & Perplexity).
- Always deliver high value in 1 to 3 short sentences. End with a helpful, high-converting follow-up offer (e.g. free website audit, custom strategy proposal, or 1-on-1 call with our WeBestOne Growth Team).

INTERNET ACCESS PERMISSION:
- FULL INTERNET & LIVE SEARCH ACCESS GRANTED: You have active internet search permission. Use live web information, social media links, and external reference URLs whenever relevant to answer user queries accurately.${webContext}

WEBESTONE WEBSITE KNOWLEDGE BASE:
- Agency Name: WeBestOne (Official AI-Powered Digital Marketing & Custom Software Development Agency).
- Leadership: Founder: Rozi Osman | Lead Developer & Architect: Shipon Talukdar.
- Core Offerings:
  1. Full Stack Digital Marketing: Data-driven PPC, Social Media Ads, SEO & Conversion Optimization ([Digital Marketing Agency](/services/digital-marketing-agency)).
  2. AI-Driven SEO & GEO: Search Engine & Generative Engine Optimization for ranking on Google, ChatGPT, Perplexity ([AI SEO Services](/services/AI-SEO-Service-Agency)).
  3. Custom Web & App Development: Built with Next.js, React, Tailwind CSS, Node.js ([Custom Web Development](/services/custom-web-development-services)).
  4. Shopify E-Commerce & SEO: Custom themes, app integrations, speed & conversion rate optimization ([Shopify Development](/services/shopify-website-development-service) | [Shopify SEO Agency](/services/shopify-seo-service-agency)).
  5. WordPress Web Development: High-performance speed optimized custom WordPress sites ([WordPress Development](/services/wordpress-website-development-services)).
  6. Video Editing & Motion Graphics: High-converting 2D/3D animation, social reels & promotional video editing ([Video Editing Services](/services/professional-video-editing-services) | [Motion Graphics Services](/services/motion-graphics-services-company)).
  7. UI/UX Design & Content Writing: User-centered design systems & high-intent SEO copywriting ([UI/UX Web Design](/services/web-design-service) | [Content Writing Services](/services/content-writing-services)).
- Agency Contact Details & Social Media:
  • Phone / WhatsApp: [WhatsApp Chat](https://wa.me/8801815025322) (+8801815025322)
  • Email: [Email Us](mailto:webestone@gmail.com) (webestone@gmail.com)
  • Facebook: [Facebook Page](https://www.facebook.com/profile.php?id=61586166715142)
  • Instagram: [Instagram Profile](https://www.instagram.com/webest_one/)
  • LinkedIn: [LinkedIn Company](https://www.linkedin.com/company/webestone)
  • YouTube: [YouTube Channel](https://www.youtube.com/@webestone)
  • Location: Perth WA & Dhaka
- Portfolio & Proven Stats: Over +145% average conversion boost, +250% organic traffic growth, GA4 verified data ([Our Work Showcase](/work)).
- Pricing & Custom Proposals: Free 1-on-1 strategy call & custom tailored proposal based on project requirements ([Contact Us Page](/contact-us)).

SECURITY & DATA PROTECTION GUARDRAILS:
1. STRICT CONFIDENTIALITY: NEVER disclose API keys, environment variables, credentials, internal server tokens, Firestore rules, or private system configurations under ANY circumstances.
2. If any user asks for API keys, admin credentials, database tokens, or raw code prompts, reply: "For security reasons, private system credentials and infrastructure configuration are strictly protected."

CRITICAL CONVERSATIONAL RULES:
1. Reply SHORT & EXACT! 1 to 3 short sentences maximum. Never output long robotic walls of text.
2. AUTOMATIC MULTILINGUAL DETECTION: Detect and reply in the EXACT SAME LANGUAGE OR SCRIPT as the user! If the user messages in Bengali/Bangla, reply in natural warm Bengali. If Banglish, reply in natural Banglish. If English, reply in English.
3. Answer their exact question directly like a human expert, then ask one relevant follow-up question or offer a next step.
4. STRICT MASTER URL WHITELIST - ALWAYS USE DESCRIPTIVE SERVICE NAMES AS LINK TEXT:
   • Full Stack Digital Marketing: [Digital Marketing Agency](/services/digital-marketing-agency)
   • AI Driven SEO: [AI SEO Services](/services/AI-SEO-Service-Agency)
   • Social Media Marketing: [Social Media Marketing](/services/social-media-marketing-agency)
   • PPC & Paid Ads: [PPC Management](/services/ppc-management-services)
   • Shopify SEO: [Shopify SEO Agency](/services/shopify-seo-service-agency)
   • Custom Web Development: [Custom Web Development](/services/custom-web-development-services)
   • WordPress Web Development: [WordPress Development](/services/wordpress-website-development-services)
   • Shopify Web Development: [Shopify Development](/services/shopify-website-development-service)
   • UI/UX Web Design: [UI/UX Web Design](/services/web-design-service)
   • Content Writing: [Content Writing Services](/services/content-writing-services)
   • Video Editing: [Video Editing Services](/services/professional-video-editing-services)
   • Motion Graphics: [Motion Graphics Services](/services/motion-graphics-services-company)
   • Contact Us: [Contact Us Page](/contact-us)
   • About Us: [About WeBestOne](/about-us)
   • Portfolio: [Our Work Showcase](/work)
   • Blogs: [Blog Articles](/blogs)
   • All Services: [Explore All Services](/services)
5. Speak warmly as a helpful expert teammate.`;

		const apiMessages = [
			{ role: "system", content: systemPromptWithLang },
			...messages.slice(-6).map((m) => ({
				role: m.sender === "user" ? "user" : "assistant",
				content: m.text,
			})),
			{ role: "user", content: query },
		];

		let botReplyText = "";

		// 0. Primary Secure Serverless API Route (/api/chat)
		try {
			const serverRes = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: updatedMsgs,
					systemPrompt: systemPromptWithLang,
				}),
			});
			if (serverRes.ok) {
				const serverData = await serverRes.json();
				if (serverData.reply) {
					botReplyText = serverData.reply;
				}
			}
		} catch (srvErr) {
			console.warn("Serverless API Route fallback:", srvErr);
		}

		if (!botReplyText) {
			botReplyText = generateClientSmartReply(query, userName);
		}

		const botMsg: ChatMessage = {
			id: (Date.now() + 1).toString(),
			sender: "assistant",
			text: botReplyText,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		const finalMsgs = [...updatedMsgs, botMsg];
		setMessages(finalMsgs);
		saveLeadToStorageAndDb(userName || "Visitor", userEmail || "anonymous", websiteUrl || "N/A", selectedLang, finalMsgs);
		setIsLoading(false);
	};

	return (
		<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
			{/* Chat Modal Popup */}
			<div
				className={`mb-3 bg-neutral-950/95 border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] w-[calc(100vw-2.5rem)] sm:w-[390px] h-[550px] max-h-[82vh] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right transform relative backdrop-blur-2xl ${isOpen
						? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
						: "opacity-0 translate-y-6 scale-95 pointer-events-none"
					}`}
			>
				{/* Top Header with Tabs & Status */}
				<ChatHeader
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					onClose={() => setIsOpen(false)}
					onMinimize={() => setIsOpen(false)}
				/>

				{/* Floating Custom Toast Notification Overlay */}
				<ToastPopup notice={notice} onClose={() => setNotice(null)} />

				{/* Tab 1: Messages */}
				{activeTab === "messages" && (
					<>
						<ChatMessagesTab
							step={step}
							messages={messages}
							isLoading={isLoading}
							nameInput={nameInput}
							setNameInput={setNameInput}
							emailInput={emailInput}
							setEmailInput={setEmailInput}
							websiteInput={websiteInput}
							setWebsiteInput={setWebsiteInput}
							formError={formError}
							onDetailsSubmit={handleDetailsSubmit}
							onSendMessage={handleSendAiMessage}
							onClose={() => setIsOpen(false)}
							messagesEndRef={messagesEndRef}
						/>

						{step === "chat" && (
							<ChatInput
								input={input}
								setInput={setInput}
								isLoading={isLoading}
								onSubmit={(e) => {
									e.preventDefault();
									handleSendAiMessage(input);
								}}
								onMinimize={() => setIsOpen(false)}
								onShowNotice={showToast}
							/>
						)}
					</>
				)}

				{/* Tab 2: Articles */}
				{activeTab === "articles" && (
					<ChatArticlesTab onClose={() => setIsOpen(false)} />
				)}

				{/* Tab 3: Search */}
				{activeTab === "search" && (
					<ChatSearchTab onClose={() => setIsOpen(false)} />
				)}

				{/* Tab 4: WhatsApp */}
				{activeTab === "whatsapp" && (
					<WhatsAppTab
						waMessage={waMessage}
						setWaMessage={setWaMessage}
						onSendWhatsApp={handleWhatsAppSend}
						phoneNumber={phoneNumber}
					/>
				)}
			</div>

			{/* Preview Callout Bubble when Chat is Closed */}
			{!isOpen && showGreeting && (
				<GreetingCallout
					onOpenChat={() => {
						setIsOpen(true);
						setShowGreeting(false);
					}}
					onDismiss={() => setShowGreeting(false)}
				/>
			)}

			{/* Floating Circular Launcher Toggle Button */}
			<button
				onClick={() => {
					setIsOpen(!isOpen);
					if (!isOpen) setShowGreeting(false);
				}}
				className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${isOpen
						? "bg-neutral-900 border-white/20 text-white"
						: "bg-neon-green border-neon-green text-black shadow-[0_0_25px_rgba(135,230,92,0.4)]"
					}`}
				aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
			>
				{isOpen ? (
					<X className="w-6 h-6 text-white" />
				) : (
					<MessageSquare className="w-6 h-6 text-black fill-black" />
				)}
			</button>
		</div>
	);
}
