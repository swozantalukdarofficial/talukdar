import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Send,
	CheckCircle,
	MessageCircle,
	ArrowRight,
	Sparkles,
	Zap,
	ShieldCheck,
	Globe,
	MessageSquare,
	Copy,
	Check
} from "lucide-react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";

const BUDGET_RANGES = [
	"< $5k",
	"$5k - $15k",
	"$15k - $30k",
	"$30k+"
];

export default function ContactPage() {
	const { contact, socials, seo } = useContent();
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		service: "",
		budget: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copiedField, setCopiedField] = useState<string | null>(null);

	const contactSchema = useMemo(() => ({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "ContactPage",
				"@id": "https://webestone.com/contact#webpage",
				"url": "https://webestone.com/contact",
				"name": seo.contact?.title || "Contact WeBestOne - Discuss Your Growth Project"
			},
			{
				"@type": "LocalBusiness",
				"name": "WeBestOne",
				"url": "https://webestone.com",
				"logo": "https://webestone.com/favicon.png",
				"image": "https://webestone.com/uploads/1770469463115-Webestone-icon.png",
				"description": seo.contact?.description || "WeBestOne is a premium AI-powered digital marketing and web development agency specializing in SEO, PPC, and Custom Web Applications.",
				"telephone": contact.phone,
				"email": contact.email,
				"priceRange": "$$",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": contact.address.split(",")[0] || "25 The Avenue",
					"addressLocality": contact.address.split(",")[1]?.trim() || "Crawley",
					"addressRegion": "Western Australia",
					"postalCode": "6009",
					"addressCountry": "AU"
				},
				"geo": {
					"@type": "GeoCoordinates",
					"latitude": "-31.9774",
					"longitude": "115.8208"
				},
				"openingHoursSpecification": {
					"@type": "OpeningHoursSpecification",
					"dayOfWeek": [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
						"Sunday"
					],
					"opens": "00:00",
					"closes": "23:59"
				},
				"sameAs": [
					socials.facebook,
					socials.instagram,
					socials.linkedin,
					socials.youtube
				]
			}
		]
	}), [contact, socials, seo]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectService = (serviceName: string) => {
		setFormState((prev) => ({
			...prev,
			service: prev.service === serviceName ? "" : serviceName
		}));
	};

	const handleSelectBudget = (budgetRange: string) => {
		setFormState((prev) => ({
			...prev,
			budget: prev.budget === budgetRange ? "" : budgetRange
		}));
	};

	const handleCopy = (text: string, fieldName: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(fieldName);
		setTimeout(() => setCopiedField(null), 2000);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formState),
			});

			let data: any = {};
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				data = await response.json();
			}

			if (!response.ok) {
				if (response.status === 404 || (contentType && contentType.includes("text/html"))) {
					throw new Error("Unable to connect to WeBestOne servers. Please try again later.");
				}
				throw new Error(data.error || "Failed to send message. Please try again.");
			}

			setIsSubmitted(true);
			setFormState({
				name: "",
				email: "",
				phone: "",
				company: "",
				service: "",
				budget: "",
				message: "",
			});
		} catch (err: any) {
			console.error("Contact form error:", err);
			setError(err.message || "Something went wrong. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactCards = [
		{
			icon: MapPin,
			title: "Our Location",
			detail: contact.address,
			sub: "Crawley, Western Australia",
			badge: "Global HQ"
		},
		{
			icon: Phone,
			title: "Direct Call",
			detail: contact.phone,
			href: `tel:${contact.phone}`,
			sub: "Mon - Fri, 9am - 6pm (AWST)",
			badge: "24/7 Priority"
		},
		{
			icon: Mail,
			title: "Email Inquiry",
			detail: contact.email,
			href: `mailto:${contact.email}`,
			sub: "Average reply: < 2 hours",
			badge: "Fast Reply"
		},
		{
			icon: Clock,
			title: "Working Hours",
			detail: "Mon - Fri: 9:00 AM - 6:00 PM",
			sub: "Weekend Support Available",
			badge: "Live Team"
		},
	];

	return (
		<main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-neon-green/30">
			<SEO 
				pageKey="contact"
				title="Contact Us | WeBestOne - AI-Powered Digital Agency" 
				description="Get in touch with WeBestOne for high-impact AI digital marketing, custom website development, SEO, and growth solutions." 
				schemaMarkup={contactSchema}
			/>

			{/* Dynamic Ambient Backdrops */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-neon-green/10 via-cyan-500/5 to-purple-600/10 rounded-full blur-[160px]" />
				<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
				<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
			</div>

			{/* ══════════════════════════════════════════
			    HERO HEADER & STATS BAR
			══════════════════════════════════════════ */}
			<section className="relative z-10 pt-32 md:pt-36 lg:pt-40 pb-16 px-6">
				<div className="max-w-7xl mx-auto space-y-12">
					
					{/* Top Header Title Box */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center space-y-6 max-w-4xl mx-auto"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold uppercase tracking-widest shadow-lg shadow-neon-green/10">
							<Sparkles className="w-3.5 h-3.5 animate-spin" />
							<span>Start Your Digital Transformation</span>
						</div>

						<h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
							Let’s Build Something <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-teal-300 to-blue-500">
								Extraordinary Together
							</span>
						</h1>

						<p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
							Have a new project in mind or want to audit your current digital performance? Talk to our AI digital marketing and web specialists today.
						</p>

						{/* Quick Assurance Badges */}
						<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs font-bold text-neutral-300">
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
								<Zap className="w-4 h-4 text-neon-green" />
								<span>Reply under 2 hours</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
								<ShieldCheck className="w-4 h-4 text-cyan-400" />
								<span>No obligation audit</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
								<Globe className="w-4 h-4 text-blue-400" />
								<span>Global client support</span>
							</div>
						</div>
					</motion.div>

					{/* Contact Info Quick Cards Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						{contactCards.map((card, idx) => (
							<motion.div
								key={card.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="group relative p-6 rounded-3xl bg-neutral-900/40 border border-white/10 hover:border-neon-green/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-xl"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="w-12 h-12 rounded-2xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green group-hover:scale-110 group-hover:bg-neon-green group-hover:text-black transition-all">
										<card.icon className="w-5 h-5" />
									</div>
									<span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
										{card.badge}
									</span>
								</div>

								<div className="space-y-1">
									<h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{card.title}</h3>
									{card.href ? (
										<a
											href={card.href}
											className="text-base md:text-lg font-bold text-white hover:text-neon-green transition-colors block truncate"
										>
											{card.detail}
										</a>
									) : (
										<p className="text-base md:text-lg font-bold text-white truncate">{card.detail}</p>
									)}
									<p className="text-xs text-neutral-500">{card.sub}</p>
								</div>

								{/* Copy Button for quick convenience */}
								{card.href && (
									<button
										onClick={() => handleCopy(card.detail, card.title)}
										className="absolute bottom-4 right-4 p-2 text-neutral-500 hover:text-neon-green transition-colors cursor-pointer"
										title="Copy details"
									>
										{copiedField === card.title ? (
											<Check className="w-4 h-4 text-neon-green" />
										) : (
											<Copy className="w-3.5 h-3.5" />
										)}
									</button>
								)}
							</motion.div>
						))}
					</div>

					{/* ══════════════════════════════════════════
					    MAIN FORM & DIRECT INSTANT CHAT GRID
					══════════════════════════════════════════ */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
						
						{/* LEFT COLUMN: Contact Form (7 Cols) */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="lg:col-span-7 bg-neutral-900/50 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8"
						>
							<div>
								<h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Send Us A Message</h2>
								<p className="text-xs sm:text-sm text-neutral-400">Fill out the form below. We'll analyze your requirements and get back with an actionable growth proposal.</p>
							</div>

							<AnimatePresence mode="wait">
								{isSubmitted ? (
									<motion.div
										key="success"
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										className="p-10 rounded-3xl bg-neon-green/10 border border-neon-green/30 text-center space-y-6"
									>
										<div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center mx-auto text-black shadow-[0_0_40px_rgba(135,230,92,0.5)]">
											<CheckCircle className="w-10 h-10" />
										</div>
										<div className="space-y-2">
											<h3 className="text-2xl font-black text-white">Message Received!</h3>
											<p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
												Thank you for reaching out to <strong>WeBestOne</strong>! Our strategist team has received your message and will reply within 2 business hours.
											</p>
										</div>
										<button
											onClick={() => setIsSubmitted(false)}
											className="px-6 py-3 bg-neon-green text-black font-bold text-xs rounded-xl hover:bg-neon-green/90 transition-all cursor-pointer shadow-lg shadow-neon-green/20"
										>
											Send Another Inquiry
										</button>
									</motion.div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										
										{/* Dropdowns Grid for Service and Budget */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">1. Service of Interest *</label>
												<select
													name="service"
													value={formState.service}
													onChange={handleChange}
													required
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors cursor-pointer"
												>
													<option value="" className="bg-neutral-900 text-neutral-400">-- Select a service --</option>
													{contact.formOptions.map((opt) => (
														<option key={opt} value={opt} className="bg-neutral-900 text-white">{opt}</option>
													))}
													<option value="Other" className="bg-neutral-900 text-white">Other</option>
												</select>
											</div>

											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">2. Estimated Budget (USD)</label>
												<select
													name="budget"
													value={formState.budget}
													onChange={handleChange}
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors cursor-pointer"
												>
													<option value="" className="bg-neutral-900 text-neutral-400">-- Select budget range --</option>
													{BUDGET_RANGES.map((b) => (
														<option key={b} value={b} className="bg-neutral-900 text-white">{b}</option>
													))}
												</select>
											</div>
										</div>

										{/* Inputs Grid */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">Full Name *</label>
												<input
													type="text"
													name="name"
													value={formState.name}
													onChange={handleChange}
													required
													placeholder="John Doe"
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">Email Address *</label>
												<input
													type="email"
													name="email"
													value={formState.email}
													onChange={handleChange}
													required
													placeholder="john@company.com"
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">Phone / WhatsApp *</label>
												<input
													type="tel"
													name="phone"
													value={formState.phone}
													onChange={handleChange}
													required
													placeholder="+1 (555) 000-0000"
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
											<div className="space-y-1.5">
												<label className="text-xs font-bold text-neutral-400">Company / Website URL</label>
												<input
													type="text"
													name="company"
													value={formState.company}
													onChange={handleChange}
													placeholder="mybusiness.com"
													className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
										</div>

										<div className="space-y-1.5">
											<label className="text-xs font-bold text-neutral-400">Project Details / Message *</label>
											<textarea
												name="message"
												value={formState.message}
												onChange={handleChange}
												required
												rows={4}
												placeholder="Describe your project goals, timelines, or specific requirements..."
												className="w-full bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors resize-none"
											/>
										</div>

										{error && (
											<div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
												⚠️ {error}
											</div>
										)}

										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full py-4 bg-neon-green hover:bg-neon-green/90 text-black font-extrabold text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-neon-green/20 hover:shadow-neon-green/40"
										>
											{isSubmitting ? (
												<>
													<div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
													<span>Transmitting Proposal Request...</span>
												</>
											) : (
												<>
													<Send className="w-4 h-4" />
													<span>Submit Proposal Request</span>
												</>
											)}
										</button>
									</form>
								)}
							</AnimatePresence>
						</motion.div>

						{/* RIGHT COLUMN: Instant Channels & Map (5 Cols) */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							className="lg:col-span-5 space-y-6"
						>
							{/* Instant Communication Card */}
							<div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
								<div className="absolute top-0 right-0 w-40 h-40 bg-neon-green/10 rounded-full blur-3xl pointer-events-none" />
								
								<div className="space-y-2">
									<span className="text-[10px] font-black uppercase tracking-widest text-neon-green px-2.5 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 inline-block">
										Instant Connect
									</span>
									<h3 className="text-xl sm:text-2xl font-bold text-white">Need a Faster Response?</h3>
									<p className="text-xs text-neutral-400 leading-relaxed">
										Connect with our project strategy manager directly via WhatsApp or official social channels for live chat support.
									</p>
								</div>

								{/* WhatsApp Direct Action Button */}
								<a
									href={`https://wa.me/${socials.whatsapp.replace(/[^0-9+]/g, "")}?text=Hi%20WeBestOne%20Team,%20I%20want%20to%20discuss%20a%20new%20project.`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group"
								>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-xl bg-[#25D366] text-black flex items-center justify-center font-bold shrink-0 shadow-lg shadow-[#25D366]/20">
											<MessageCircle className="w-5 h-5 fill-current" />
										</div>
										<div>
											<p className="text-xs font-bold text-white group-hover:text-[#25D366] transition-colors">WhatsApp Live Chat</p>
											<p className="text-[10px] text-neutral-400">Direct response: 5-15 mins</p>
										</div>
									</div>
									<ArrowRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-1 transition-transform" />
								</a>

								{/* Official Social Links Pills */}
								<div className="pt-2 border-t border-white/5 space-y-3">
									<p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Official Digital Channels</p>
									<div className="grid grid-cols-2 gap-2">
										<a
											href={socials.facebook}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-white/10 text-xs text-neutral-300 hover:text-white font-medium transition-all flex items-center gap-2 truncate"
										>
											<span>🌐</span> Facebook
										</a>
										<a
											href={socials.instagram}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-white/10 text-xs text-neutral-300 hover:text-white font-medium transition-all flex items-center gap-2 truncate"
										>
											<span>📸</span> Instagram
										</a>
										<a
											href={socials.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-white/10 text-xs text-neutral-300 hover:text-white font-medium transition-all flex items-center gap-2 truncate"
										>
											<span>💼</span> LinkedIn
										</a>
										<a
											href={socials.youtube}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-white/10 text-xs text-neutral-300 hover:text-white font-medium transition-all flex items-center gap-2 truncate"
										>
											<span>▶️</span> YouTube
										</a>
									</div>
								</div>
							</div>

							{/* Dark Map Box */}
							<div className="bg-neutral-900/40 border border-white/10 rounded-3xl p-4 space-y-3 shadow-2xl">
								<div className="flex items-center justify-between px-2 pt-1">
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4 text-neon-green" />
										<span className="text-xs font-bold text-white">WeBestOne HQ Location</span>
									</div>
									<span className="text-[10px] text-neutral-500 font-mono">Crawley, WA Australia</span>
								</div>
								<div className="h-56 w-full rounded-2xl overflow-hidden border border-white/10 relative">
									<iframe 
										src="https://maps.google.com/maps?q=25%20The%20Avenue,%20Crawley,%20Perth,%20WA,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed" 
										width="100%" 
										height="100%" 
										style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }} 
										allowFullScreen={false} 
										loading="lazy" 
										referrerPolicy="no-referrer-when-downgrade"
										title="WeBestOne Location Map"
									/>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
