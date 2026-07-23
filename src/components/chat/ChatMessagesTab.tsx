import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Bot, User, Globe, Mail, CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ChatMessage } from "./types";

const LANGUAGES = [
	{ code: "English", label: "English", flag: "🇬🇧" },
	{ code: "Bengali", label: "বাংলা (Bengali)", flag: "🇧🇩" },
	{ code: "Spanish", label: "Español", flag: "🇪🇸" },
	{ code: "Arabic", label: "العربية", flag: "🇸🇦" },
];

const INITIAL_SUGGESTIONS = [
	"What services do you offer?",
	"How much do your services cost?",
	"Can I see your portfolio / work?",
	"How to book a free strategy call?",
	"What is your WhatsApp & contact info?"
];

const VALID_URL_MAP: Record<string, string> = {
	"/services": "/services",
	"/contact": "/contact-us",
	"/contact-us": "/contact-us",
	"/about": "/about-us",
	"/about-us": "/about-us",
	"/portfolio": "/work",
	"/work": "/work",
	"/blogs": "/blogs",
	"/services/digital-marketing": "/services/digital-marketing-agency",
	"/services/digital-marketing-agency": "/services/digital-marketing-agency",
	"/services/seo": "/services/AI-SEO-Service-Agency",
	"/services/ai-seo": "/services/AI-SEO-Service-Agency",
	"/services/AI-SEO-Service-Agency": "/services/AI-SEO-Service-Agency",
	"/services/shopify-seo": "/services/shopify-seo-service-agency",
	"/services/shopify-seo-service-agency": "/services/shopify-seo-service-agency",
	"/services/video-editing": "/services/professional-video-editing-services",
	"/services/professional-video-editing-services": "/services/professional-video-editing-services",
	"/services/ppc": "/services/ppc-management-services",
	"/services/ppc-management-services": "/services/ppc-management-services",
	"/services/social-media": "/services/social-media-marketing-agency",
	"/services/social-media-marketing-agency": "/services/social-media-marketing-agency",
	"/services/shopify": "/services/shopify-website-development-service",
	"/services/shopify-website-development-service": "/services/shopify-website-development-service",
	"/services/custom-web-development": "/services/custom-web-development-services",
	"/services/custom-web-development-services": "/services/custom-web-development-services",
	"/services/wordpress": "/services/wordpress-website-development-services",
	"/services/wordpress-website-development-services": "/services/wordpress-website-development-services",
	"/services/content-writing": "/services/content-writing-services",
	"/services/content-writing-services": "/services/content-writing-services",
	"/services/motion-graphics": "/services/motion-graphics-services-company",
	"/services/motion-graphics-services-company": "/services/motion-graphics-services-company",
	"/services/ui-ux": "/services/web-design-service",
	"/services/web-design": "/services/web-design-service",
	"/services/web-design-service": "/services/web-design-service",
};

function normalizeUrl(rawUrl: string): string {
	if (!rawUrl.startsWith("/")) return rawUrl;
	const clean = rawUrl.toLowerCase().trim();
	if (VALID_URL_MAP[clean]) return VALID_URL_MAP[clean];
	if (clean.includes("shopify-seo")) return "/services/shopify-seo-service-agency";
	if (clean.includes("seo")) return "/services/AI-SEO-Service-Agency";
	if (clean.includes("marketing")) return "/services/digital-marketing-agency";
	if (clean.includes("video")) return "/services/professional-video-editing-services";
	if (clean.includes("ppc") || clean.includes("paid")) return "/services/ppc-management-services";
	if (clean.includes("social")) return "/services/social-media-marketing-agency";
	if (clean.includes("shopify")) return "/services/shopify-website-development-service";
	if (clean.includes("wordpress")) return "/services/wordpress-website-development-services";
	if (clean.includes("web") || clean.includes("custom")) return "/services/custom-web-development-services";
	if (clean.includes("content") || clean.includes("writing")) return "/services/content-writing-services";
	if (clean.includes("motion") || clean.includes("animat")) return "/services/motion-graphics-services-company";
	if (clean.includes("design") || clean.includes("ui")) return "/services/web-design-service";
	if (clean.includes("contact")) return "/contact-us";
	if (clean.includes("about")) return "/about-us";
	if (clean.includes("work") || clean.includes("portfolio")) return "/work";
	if (clean.includes("blog")) return "/blogs";
	return "/services";
}

interface ChatMessagesTabProps {
	step: "email" | "chat";
	messages: ChatMessage[];
	isLoading: boolean;
	nameInput: string;
	setNameInput: (val: string) => void;
	emailInput: string;
	setEmailInput: (val: string) => void;
	websiteInput: string;
	setWebsiteInput: (val: string) => void;
	formError: string;
	onDetailsSubmit: (e: React.FormEvent) => void;
	onSendMessage: (text: string) => void;
	onClose: () => void;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatMessagesTab: React.FC<ChatMessagesTabProps> = ({
	step,
	messages,
	isLoading,
	nameInput,
	setNameInput,
	emailInput,
	setEmailInput,
	websiteInput,
	setWebsiteInput,
	formError,
	onDetailsSubmit,
	onSendMessage,
	onClose,
	messagesEndRef,
}) => {
	const suggestionsRef = useRef<HTMLDivElement>(null);

	const scrollSuggestions = (direction: "left" | "right") => {
		if (suggestionsRef.current) {
			const amount = direction === "left" ? -150 : 150;
			suggestionsRef.current.scrollBy({ left: amount, behavior: "smooth" });
		}
	};

	const formatBoldText = (str: string) => {
		const parts = str.split(/(\*\*[^*]+\*\*)/g);
		return parts.map((part, i) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
			}
			return part;
		});
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
			const rawUrl = match[2];
			const url = normalizeUrl(rawUrl);
			const key = `link-${match.index}`;

			const linkClass = "inline-flex items-center gap-0.5 text-neon-green font-bold hover:underline bg-neon-green/10 hover:bg-neon-green/20 px-2 py-0.5 rounded-md transition-colors border border-neon-green/30 text-[11px] align-baseline mx-0.5 cursor-pointer";

			if (url.startsWith("/")) {
				elements.push(
					<Link key={key} to={url} onClick={onClose} className={linkClass}>
						{label}
						<ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
					</Link>
				);
			} else {
				elements.push(
					<a key={key} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
						{label}
						<ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
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

	const todayDateStr = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
	}).toUpperCase();

	return (
		<div className="flex-1 flex flex-col min-h-0 bg-neutral-950/80 text-white">
			{/* Date Header Divider */}
			<div className="py-2 px-4 flex items-center gap-3">
				<div className="flex-1 h-[1px] bg-white/10" />
				<span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">
					{todayDateStr}
				</span>
				<div className="flex-1 h-[1px] bg-white/10" />
			</div>

			{/* STEP 2: Lead Info collection */}
			{step === "email" && (
				<div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar">
					<div className="space-y-3">
						<div className="flex items-center gap-2.5">
							<div className="w-9 h-9 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green shrink-0">
								<Mail className="w-4 h-4" />
							</div>
							<div>
								<h4 className="font-bold text-xs text-white">Let's Get Acquainted!</h4>
								<p className="text-neutral-400 text-[11px]">Please introduce yourself to start AI chat.</p>
							</div>
						</div>

						<form onSubmit={onDetailsSubmit} className="space-y-2.5 pt-1">
							<div>
								<label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Your Name *</label>
								<input
									type="text"
									value={nameInput}
									onChange={(e) => setNameInput(e.target.value)}
									placeholder="e.g. John Doe / আপনার নাম"
									className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50 transition-colors"
								/>
							</div>

							<div>
								<label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Email Address *</label>
								<input
									type="email"
									value={emailInput}
									onChange={(e) => setEmailInput(e.target.value)}
									placeholder="name@company.com"
									className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50 transition-colors"
								/>
							</div>

							<div>
								<label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Website URL (Optional)</label>
								<input
									type="text"
									value={websiteInput}
									onChange={(e) => setWebsiteInput(e.target.value)}
									placeholder="e.g. www.yourcompany.com"
									className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-neon-green/50 transition-colors"
								/>
							</div>

							{formError && <p className="text-red-400 text-[11px] font-medium">{formError}</p>}

							<button
								type="submit"
								className="w-full py-2.5 bg-neon-green hover:bg-neon-green/90 text-black font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-neon-green/20 mt-1"
							>
								<CheckCircle2 className="w-4 h-4" />
								Start Conversation
							</button>
						</form>
					</div>

					<p className="text-neutral-500 text-[10px] text-center pt-2">
						🔒 100% Privacy guaranteed. Zero spam.
					</p>
				</div>
			)}

			{/* STEP 3: Chat Message Flow */}
			{step === "chat" && (
				<>
					<div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
						{messages.map((m) => (
							<div
								key={m.id}
								className={`flex items-start gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
							>
								{/* Assistant Left Icon Avatar */}
								{m.sender === "assistant" && (
									<div className="w-7 h-7 rounded-full bg-neutral-950 border border-neon-green/40 flex items-center justify-center p-0.5 shrink-0 mt-1 shadow-sm overflow-hidden">
										<img src="/favicon.png" alt="WeBestOne AI" className="w-full h-full object-cover rounded-full" />
									</div>
								)}

								<div className="flex flex-col max-w-[85%]">
									{/* Bubble */}
									<div
										className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
											m.sender === "user"
												? "bg-gradient-to-r from-neon-green to-emerald-400 text-black font-semibold rounded-tr-none shadow-md shadow-neon-green/10"
												: "bg-neutral-900/90 border border-white/10 text-neutral-200 rounded-tl-none space-y-2 shadow-sm"
										}`}
									>
										<div className="whitespace-pre-wrap leading-relaxed">{renderMessageContent(m.text)}</div>
									</div>

									{/* Timestamp & User Badge */}
									<div
										className={`flex items-center gap-1.5 mt-1 text-[9px] font-medium ${
											m.sender === "user" ? "justify-end text-neutral-400" : "justify-start text-neutral-500"
										}`}
									>
										<span>{m.timestamp}</span>
										{m.sender === "user" && (
											<span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[8px] font-bold flex items-center justify-center">
												Y
											</span>
										)}
									</div>
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
								<div className="w-7 h-7 rounded-full bg-neutral-950 border border-neon-green/40 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
									<img src="/favicon.png" alt="WeBestOne AI" className="w-full h-full object-cover rounded-full" />
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

					{/* Quick Suggestions Chips Bar */}
					<div className="relative bg-neutral-900/90 border-t border-white/10 flex items-center">
						<button
							type="button"
							onClick={() => scrollSuggestions("left")}
							className="px-1.5 py-2 text-neutral-400 hover:text-neon-green bg-neutral-950/80 hover:bg-neutral-900 z-10 cursor-pointer transition-colors border-r border-white/10"
							aria-label="Scroll left"
						>
							<ChevronLeft className="w-3.5 h-3.5" />
						</button>

						<div
							ref={suggestionsRef}
							className="px-2 py-2 overflow-x-auto flex items-center gap-1.5 no-scrollbar scroll-smooth flex-1 select-none"
						>
							{INITIAL_SUGGESTIONS.map((s, idx) => (
								<button
									key={idx}
									onClick={() => onSendMessage(s)}
									className="px-2.5 py-1 bg-neutral-950 hover:bg-neon-green/15 border border-white/15 hover:border-neon-green/50 text-neutral-300 hover:text-neon-green text-[11px] font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer shrink-0"
								>
									{s}
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={() => scrollSuggestions("right")}
							className="px-1.5 py-2 text-neutral-400 hover:text-neon-green bg-neutral-950/80 hover:bg-neutral-900 z-10 cursor-pointer transition-colors border-l border-white/10"
							aria-label="Scroll right"
						>
							<ChevronRight className="w-3.5 h-3.5" />
						</button>
					</div>
				</>
			)}
		</div>
	);
};
