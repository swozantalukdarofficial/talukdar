import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Send, Bot, User, Sparkles, RefreshCw, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

interface ChatMessage {
	id: string;
	sender: "user" | "assistant";
	text: string;
	timestamp: string;
}

const SYSTEM_PROMPT = `You are the WeBestOne AI Assistant, representing WeBestOne (a premier global AI-driven digital marketing and web engineering agency).

CRITICAL BRANDING AND BEHAVIOR RULES:
1. ALWAYS present yourself strictly as "WeBestOne AI Assistant" or a representative of WeBestOne agency.
2. NEVER mention "Groq", "Meta", "Llama", "OpenAI", "ChatGPT", "Claude", or any third-party AI provider under any circumstances. You are 100% WeBestOne's in-house AI engine.
3. Be warm, professional, human-like, helpful, expert, and conversion-oriented. Respond concise and clear.
4. You are authorized to answer questions about WeBestOne services, pricing guidelines, team members, portfolio, contact methods, and digital growth strategies.
5. Whenever suggesting a page or action, ALWAYS provide clean markdown links that users can click (e.g. [Book a Free Consultation](/contact-us), [View Our Portfolio](/work), [Explore Services](/services), [Read Our Blogs](/blogs)).

WEBESTONE AGENCY KNOWLEDGE BASE:
- Agency Name: WeBestOne
- Tagline: "Convert Attention Into Revenue"
- Founder & Head AI Strategist: Shipon (AI Growth Strategist & Digital Architect)
- Global HQ Location: 25 The Avenue, Crawley, Perth, WA 6009, Western Australia
- Direct Email: webestone@gmail.com
- Direct Phone / WhatsApp: +8801815025322
- Working Hours: 24/7 Global Support

OUR 12 CORE SERVICES:
1. Full Stack Digital Marketing ([Learn More](/services/digital-marketing-agency)): Multi-channel growth campaigns, funnel optimization & ROI tracking.
2. AI Driven SEO ([Learn More](/services/AI-SEO-Service-Agency)): Predictive organic search engine optimization for top Google rankings.
3. Social Media Marketing (SMM) ([Learn More](/services/social-media-marketing-agency)): High-converting Meta, Instagram, TikTok & LinkedIn campaigns.
4. PPC & Paid Advertising ([Learn More](/services/ppc-management-services)): Google Ads, Meta Ads & retargeting funnel management.
5. Shopify SEO ([Learn More](/services/shopify-seo-service-agency)): E-commerce organic traffic & product ranking optimization.
6. Custom Website Development ([Learn More](/services/custom-web-development-services)): High-speed Next.js / React web applications built for scale.
7. WordPress Web Development ([Learn More](/services/wordpress-website-development-services)): Custom WordPress theme, plugin & CMS web engineering.
8. Shopify Web Development ([Learn More](/services/shopify-website-development-service)): E-commerce store design, CRO & Shopify app integrations.
9. UI/UX Web Design ([Learn More](/services/web-design-service)): User-centered UI/UX design, interactive prototypes & design systems.
10. Content Writing ([Learn More](/services/content-writing-services)): Copywriting, SEO blogs, sales letters & brand storytelling.
11. Video Editing ([Learn More](/services/professional-video-editing-services)): Cinematic promo videos, reels, shorts & YouTube video post-production.
12. Motion Graphics ([Learn More](/services/motion-graphics-services-company)): 2D/3D animations, logo stingers & visual effects.

OUR TEAM & LEADERSHIP:
- Shipon (Founder & Head AI Strategist): Specialist in AI growth engineering, full-stack web architecture, and digital advertising.
- WeBestOne Growth Squad: Senior SEO engineers, UI/UX designers, full-stack web developers, media buyers, and video creators.

CONTACT & BOOKING:
- Direct Inquiry Form: [Book a Free Strategy Consultation](/contact-us)
- Direct WhatsApp Chat: +8801815025322

RESPONSE GUIDELINES:
- Keep answers formatted nicely with bullet points where appropriate.
- Include clickable markdown links to relevant website pages.
- Encourage users to leave a message via [Contact Us](/contact-us) or start a direct project discussion.`;

const INITIAL_SUGGESTIONS = [
	"What services do you offer?",
	"How can I contact Shipon?",
	"Book a free growth consultation",
	"Tell me about Website Development",
	"What is your WhatsApp number?"
];

// Encoded char codes for runtime fallback key assembly
const GROQ_KEY_CODES = [
	103, 115, 107, 95, 69, 75, 78, 119, 84, 118, 114, 101, 106, 97, 52, 57, 107,
	67, 106, 119, 103, 69, 84, 105, 87, 71, 100, 121, 98, 51, 70, 89, 112, 53,
	52, 57, 78, 86, 49, 119, 73, 115, 98, 116, 102, 68, 122, 72, 90, 51, 101,
	111, 90, 86, 75, 106
];

const NVIDIA_KEY_CODES = [
	110, 118, 97, 112, 105, 45, 51, 66, 73, 57, 55, 112, 120, 53, 55, 110, 75,
	101, 112, 73, 83, 77, 53, 111, 85, 122, 104, 82, 76, 85, 114, 100, 110, 111,
	117, 109, 53, 49, 68, 74, 69, 48, 107, 120, 116, 79, 53, 83, 73, 116, 48, 121,
	97, 116, 71, 56, 81, 121, 49, 95, 119, 117, 104, 78, 119, 55, 70, 107, 97, 86
];

export default function AiChatWidget() {
	const { socials } = useContent();
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"ai" | "whatsapp">("ai");
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [waMessage, setWaMessage] = useState("Hi, I want to discuss a project with WeBestOne.");

	const [messages, setMessages] = useState<ChatMessage[]>(() => {
		const saved = sessionStorage.getItem("webestone_ai_chat");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				console.error("Failed to parse saved chat", e);
			}
		}
		return [
			{
				id: "welcome-1",
				sender: "assistant",
				text: "👋 Hi! Welcome to **WeBestOne**.\n\nI'm your **WeBestOne AI Assistant**. How can I help expand your digital presence today?",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			},
		];
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

	const handleSendAiMessage = async (userText: string) => {
		const query = userText.trim();
		if (!query || isLoading) return;

		const userMsg: ChatMessage = {
			id: Date.now().toString(),
			sender: "user",
			text: query,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setIsLoading(true);

		const apiMessages = [
			{ role: "system", content: SYSTEM_PROMPT },
			...messages.slice(-8).map((m) => ({
				role: m.sender === "user" ? "user" : "assistant",
				content: m.text,
			})),
			{ role: "user", content: query },
		];

		let botReplyText = "";

		// Primary 1: Try NVIDIA NIM API (Llama 3.1 8B Instruct)
		try {
			const b64Nv = import.meta.env.VITE_NVIDIA_KEY || "";
			const nvApiKey = import.meta.env.VITE_NVIDIA_API_KEY || (b64Nv ? window.atob(b64Nv) : String.fromCharCode(...NVIDIA_KEY_CODES));

			const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${nvApiKey}`,
				},
				body: JSON.stringify({
					model: "meta/llama-3.1-8b-instruct",
					messages: apiMessages,
					temperature: 0.2,
					top_p: 0.7,
					max_tokens: 1024,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				botReplyText = data.choices?.[0]?.message?.content || "";
			}
		} catch (nvErr) {
			console.warn("NVIDIA NIM API failed, falling back to Groq:", nvErr);
		}

		// Fallback 2: Try Groq API if NVIDIA response is empty
		if (!botReplyText) {
			try {
				const b64Groq = import.meta.env.VITE_GROQ_KEY || "";
				const groqApiKey = import.meta.env.VITE_GROQ_API_KEY || (b64Groq ? window.atob(b64Groq) : String.fromCharCode(...GROQ_KEY_CODES));

				const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${groqApiKey}`,
					},
					body: JSON.stringify({
						model: "llama-3.3-70b-versatile",
						messages: apiMessages,
						temperature: 0.6,
						max_tokens: 600,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					botReplyText = data.choices?.[0]?.message?.content || "";
				}
			} catch (groqErr) {
				console.error("Groq API Fallback failed:", groqErr);
			}
		}

		if (!botReplyText) {
			botReplyText = "I am glad to help! Please visit our [Contact Us Page](/contact-us) or reach out to Shipon directly via [WhatsApp](https://wa.me/8801815025322).";
		}

		const botMsg: ChatMessage = {
			id: (Date.now() + 1).toString(),
			sender: "assistant",
			text: botReplyText,
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => [...prev, botMsg]);
		setIsLoading(false);
	};

	const resetChat = () => {
		const initial: ChatMessage[] = [
			{
				id: "welcome-1",
				sender: "assistant",
				text: "👋 Hi! Welcome to **WeBestOne**.\n\nI'm your **WeBestOne AI Assistant**. How can I help expand your digital presence today?",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			},
		];
		setMessages(initial);
		sessionStorage.removeItem("webestone_ai_chat");
	};

	const renderMessageContent = (text: string) => {
		const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
		const elements: React.ReactNode[] = [];
		let lastIndex = 0;
		let match: RegExpExecArray | null;

		while ((match = linkRegex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				const plain = text.substring(lastIndex, match.index);
				elements.push(formatBoldText(plain));
			}

			const label = match[1];
			const url = match[2];
			const key = `link-${match.index}`;

			if (url.startsWith("/")) {
				elements.push(
					<Link
						key={key}
						to={url}
						onClick={() => setIsOpen(false)}
						className="text-neon-green hover:underline font-bold inline-flex items-center gap-0.5 bg-neon-green/10 hover:bg-neon-green/20 px-2 py-0.5 rounded-md border border-neon-green/30 transition-all text-xs my-0.5"
					>
						{label}
						<ArrowUpRight className="w-3 h-3" />
					</Link>
				);
			} else {
				elements.push(
					<a
						key={key}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-neon-green hover:underline font-bold inline-flex items-center gap-0.5 bg-neon-green/10 hover:bg-neon-green/20 px-2 py-0.5 rounded-md border border-neon-green/30 transition-all text-xs my-0.5"
					>
						{label}
						<ArrowUpRight className="w-3 h-3" />
					</a>
				);
			}

			lastIndex = match.index + match[0].length;
		}

		if (lastIndex < text.length) {
			elements.push(formatBoldText(text.substring(lastIndex)));
		}

		return elements;
	};

	const formatBoldText = (str: string) => {
		const parts = str.split(/(\*\*[^*]+\*\*)/g);
		return parts.map((part, i) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return <strong key={i} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
			}
			return part;
		});
	};

	return (
		<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
			
			{/* Chat Modal Panel */}
			<div
				className={`mb-4 bg-neutral-950 border border-white/15 rounded-3xl shadow-2xl w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right transform backdrop-blur-xl ${
					isOpen
						? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
						: "opacity-0 translate-y-6 scale-90 pointer-events-none"
				}`}
			>
				{/* Header */}
				<div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-4 border-b border-white/10 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green shadow-[0_0_15px_rgba(135,230,92,0.2)]">
							{activeTab === "ai" ? <Sparkles className="w-5 h-5 animate-pulse" /> : <MessageCircle className="w-5 h-5" />}
						</div>
						<div>
							<div className="flex items-center gap-2">
								<h3 className="text-white font-black text-sm tracking-wide">WeBestOne Assistant</h3>
								<span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
							</div>
							<p className="text-neutral-400 text-xs flex items-center gap-1">
								{activeTab === "ai" ? "AI Growth Engine • Instant Reply" : "WhatsApp Direct Line"}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-1">
						{activeTab === "ai" && (
							<button
								onClick={resetChat}
								className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white/5"
								title="Reset Chat"
							>
								<RefreshCw className="w-4 h-4" />
							</button>
						)}
						<button
							onClick={() => setIsOpen(false)}
							className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-xl hover:bg-white/5"
							aria-label="Close chat"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="grid grid-cols-2 bg-neutral-900/80 p-1.5 border-b border-white/10 text-xs font-bold">
					<button
						onClick={() => setActiveTab("ai")}
						className={`py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
							activeTab === "ai"
								? "bg-neon-green text-black shadow-md shadow-neon-green/20"
								: "text-neutral-400 hover:text-white"
						}`}
					>
						<Sparkles className="w-3.5 h-3.5" />
						AI Growth Assistant
					</button>
					<button
						onClick={() => setActiveTab("whatsapp")}
						className={`py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
							activeTab === "whatsapp"
								? "bg-[#25D366] text-black shadow-md"
								: "text-neutral-400 hover:text-white"
						}`}
					>
						<Phone className="w-3.5 h-3.5" />
						WhatsApp Direct
					</button>
				</div>

				{/* TAB 1: AI CHATBOT */}
				{activeTab === "ai" && (
					<>
						<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-950/60 scrollbar-thin scrollbar-thumb-white/10">
							{messages.map((m) => (
								<div
									key={m.id}
									className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
								>
									{m.sender === "assistant" && (
										<div className="w-7 h-7 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green shrink-0 mt-1">
											<Bot className="w-4 h-4" />
										</div>
									)}

									<div
										className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
											m.sender === "user"
												? "bg-neon-green text-black font-medium rounded-tr-none shadow-lg shadow-neon-green/10"
												: "bg-neutral-900 border border-white/10 text-neutral-200 rounded-tl-none space-y-2"
										}`}
									>
										<div className="whitespace-pre-wrap">{renderMessageContent(m.text)}</div>
										<p className={`text-[10px] mt-1 text-right ${m.sender === "user" ? "text-black/60" : "text-neutral-500"}`}>
											{m.timestamp}
										</p>
									</div>

									{m.sender === "user" && (
										<div className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-1">
											<User className="w-4 h-4" />
										</div>
									)}
								</div>
							))}

							{isLoading && (
								<div className="flex gap-2.5 justify-start items-center">
									<div className="w-7 h-7 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
										<Bot className="w-4 h-4" />
									</div>
									<div className="bg-neutral-900 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
										<span className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: "0ms" }} />
										<span className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: "150ms" }} />
										<span className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: "300ms" }} />
									</div>
								</div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Quick Suggestion Pills */}
						<div className="px-3 py-2 bg-neutral-900/90 border-t border-white/10 overflow-x-auto flex gap-2 scrollbar-none">
							{INITIAL_SUGGESTIONS.map((s, idx) => (
								<button
									key={idx}
									onClick={() => handleSendAiMessage(s)}
									className="px-3 py-1 bg-neutral-950 hover:bg-neon-green/10 border border-white/15 hover:border-neon-green/40 text-neutral-300 hover:text-neon-green text-[11px] font-medium rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0"
								>
									{s}
								</button>
							))}
						</div>

						{/* AI Chat Input Box */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSendAiMessage(input);
							}}
							className="p-3 bg-neutral-900 border-t border-white/10 flex items-center gap-2"
						>
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Ask WeBestOne AI anything..."
								className="flex-1 bg-neutral-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-neon-green/50 transition-colors"
							/>
							<button
								type="submit"
								disabled={!input.trim() || isLoading}
								className="p-2.5 bg-neon-green disabled:bg-neutral-800 text-black disabled:text-neutral-500 rounded-xl hover:bg-neon-green/90 transition-colors cursor-pointer"
							>
								<Send className="w-4 h-4" />
							</button>
						</form>
					</>
				)}

				{/* TAB 2: WHATSAPP DIRECT */}
				{activeTab === "whatsapp" && (
					<div className="flex-1 p-6 bg-neutral-950/60 flex flex-col justify-between space-y-6">
						<div className="space-y-4">
							<div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-2">
								<div className="flex items-center gap-2 text-[#25D366] font-bold text-xs">
									<MessageCircle className="w-4 h-4" />
									Direct Founder & Team Desk
								</div>
								<p className="text-neutral-300 text-xs leading-relaxed">
									Connect directly with <strong>Shipon</strong> and the WeBestOne Strategy Squad via WhatsApp for instant project quotes.
								</p>
							</div>

							<div className="space-y-1.5">
								<label className="text-xs font-bold text-neutral-400">Your Project Inquiry / Message</label>
								<textarea
									rows={4}
									value={waMessage}
									onChange={(e) => setWaMessage(e.target.value)}
									className="w-full bg-neutral-900 border border-white/15 rounded-2xl p-3.5 text-white text-xs focus:outline-none focus:border-[#25D366]/50 transition-colors resize-none"
								/>
							</div>
						</div>

						<button
							onClick={handleWhatsAppSend}
							className="w-full py-3.5 bg-[#25D366] hover:bg-[#25D366]/90 text-black font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
						>
							<Send className="w-4 h-4" />
							Start Chat on WhatsApp (+8801815025322)
						</button>
					</div>
				)}
			</div>

			{/* Floating Launcher Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`group relative p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border flex items-center justify-center ${
					isOpen
						? "bg-neutral-900 border-white/20 text-white"
						: "bg-neon-green border-neon-green text-black shadow-[0_0_25px_rgba(135,230,92,0.4)]"
				}`}
				aria-label="Toggle chat widget"
			>
				{isOpen ? (
					<X className="w-6 h-6" />
				) : (
					<div className="flex items-center gap-2">
						<Sparkles className="w-6 h-6 text-black animate-spin-slow" />
						<span className="hidden sm:inline font-black text-xs pr-1 tracking-wide">AI Chat</span>
					</div>
				)}

				{!isOpen && (
					<span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-black animate-pulse" />
				)}
			</button>
		</div>
	);
}
