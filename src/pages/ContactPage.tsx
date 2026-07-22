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
} from "lucide-react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";



export default function ContactPage() {
	const { contact, socials, seo } = useContent();
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		service: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
				message: "",
			});
		} catch (err: any) {
			console.error("Contact form error:", err);
			setError(err.message || "Something went wrong. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactItems = [
		{ icon: MapPin, title: "Our Location", detail: contact.address },
		{
			icon: Phone,
			title: "Phone",
			detail: contact.phone,
			href: `tel:${contact.phone}`,
		},
		{
			icon: Mail,
			title: "Email",
			detail: contact.email,
			href: `mailto:${contact.email}`,
		},
		{ icon: Clock, title: "Working Hours", detail: "Mon - Fri: 9AM - 6PM" },
	];

	return (
		<main className="relative min-h-screen text-white overflow-x-hidden">
			<SEO 
				pageKey="contact"
				title="Contact Us | WeBestOne" 
				description="Get in touch with WeBestOne for AI-powered digital marketing, web development, and growth solutions." 
				schemaMarkup={contactSchema}
			/>
			{/* Background Effects */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />
				<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
			</div>

			<section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-32 md:pt-36 lg:pt-40 pb-16 px-6 z-10">
				<div className="max-w-7xl mx-auto w-full">
					{/* Heading */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-12 space-y-6"
					>
						<span className="inline-block px-4 py-2 bg-neon-green/10 text-neon-green rounded-full text-sm font-bold border border-neon-green/30 uppercase tracking-wide">
							📞 Contact Us | WeBestOne
						</span>
						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mx-auto leading-tight">
							<span className="text-neon-green font-semibold text-sm md:text-base block mb-2 tracking-[0.15em] uppercase">
								AI-powered digital marketing Agency
							</span>
							Let Us Build Something <br className="hidden md:block"/>
							<span className="bg-gradient-to-r from-neon-green to-blue-400 bg-clip-text text-transparent">
								Great Together
							</span>
						</h1>
						<div className="text-lg text-neutral-400 max-w-3xl mx-auto space-y-4">
							<p>
								Whether you are ready to start a project, request a personalized quote, or simply explore new possibilities for your brand, the team at WeBestOne is here to listen, guide, and create.
							</p>
							<p>
								We value every conversation because every brand story begins with one meaningful connection. Reach out today, and let us start building the next chapter of your digital success.
							</p>
						</div>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
						{/* Left: Contact Info */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="space-y-10"
						>
							<div className="space-y-6">
                                <h2 className="text-3xl font-bold mb-8">Reach Us Directly</h2>
                                <p className="text-neutral-400 mb-6">Our customer support team is available from Monday to Friday, 9:00 AM to 6:00 PM to answer any inquiries regarding services, projects, or collaborations.</p>
								{contactItems.map((item, i) => (
									<div key={i} className="flex items-start gap-5 group">
										<div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-neon-green/10 group-hover:border-neon-green/30 transition-all">
											<item.icon className="w-5 h-5 text-neon-green" />
										</div>
										<div>
											<p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
												{item.title}
											</p>
											{item.href ?
												<a
													href={item.href}
													className="text-white font-medium hover:text-neon-green transition-colors"
												>
													{item.detail}
												</a>
											:	<p className="text-white font-medium">{item.detail}</p>}
										</div>
									</div>
								))}
							</div>

							{/* Social and Instant Communication */}
							<div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#25D366]/10 to-blue-500/10 border border-white/10 relative overflow-hidden group">
								<h3 className="text-2xl font-bold mb-4">
									Prefer to connect faster?
								</h3>
								<p className="text-neutral-400 mb-6 text-sm">
									You can reach us through any of our social platforms or send us a direct message on WhatsApp for instant assistance.
								</p>
								<div className="flex flex-col gap-4 mb-8">
                                    <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-neon-green transition-colors font-medium">🌐 Facebook: WeBestOne</a>
                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-neon-green transition-colors font-medium">📸 Instagram: @webest_one</a>
                                    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-neon-green transition-colors font-medium">💼 LinkedIn: WeBestOne</a>
                                    <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-neon-green transition-colors font-medium">▶️ YouTube: @webestone</a>
                                </div>
								<a
									href={`https://wa.me/${socials.whatsapp.replace(/[^0-9+]/g, "")}?text=Hi,%20I%20want%20to%20discuss%20a%20project.`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all text-sm shadow-[0_0_30px_rgba(37,211,102,0.3)]"
								>
									💬 WhatsApp Chat <ArrowRight className="w-4 h-4" />
								</a>
							</div>
						</motion.div>

						{/* Right: Form */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							<AnimatePresence mode="wait">
								{isSubmitted ?
									<motion.div
										key="success"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										className="h-full flex flex-col items-center justify-center p-12 rounded-3xl bg-neon-green/10 border border-neon-green/30 text-center space-y-6"
									>
										<CheckCircle className="w-20 h-20 text-neon-green" />
										<h3 className="text-3xl font-bold text-white">
											Message Sent!
										</h3>
										<p className="text-neutral-400">
											Thank you for reaching out! Your message has been sent successfully. We will get back to you shortly.
										</p>
										<button
											onClick={() => {
												setIsSubmitted(false);
												setFormState({
													name: "",
													email: "",
													phone: "",
													company: "",
													service: "",
													message: "",
												});
											}}
											className="px-6 py-3 bg-neon-green text-black font-bold rounded-full hover:bg-neon-green/90 transition-colors"
										>
											Send Another Message
										</button>
									</motion.div>
								:	<motion.form
										key="form"
										onSubmit={handleSubmit}
										className="space-y-6 p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl"
									>
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold mb-2">Tell Us About Your Project</h2>
                                            <p className="text-neutral-400 text-sm">Please fill out the form below so that we can understand your goals and respond with the best strategy for your business.</p>
                                        </div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<label className="text-sm text-neutral-400">
													Full Name *
												</label>
												<input
													type="text"
													name="name"
													value={formState.name}
													onChange={handleChange}
													required
													placeholder="John Doe"
													className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
											<div className="space-y-2">
												<label className="text-sm text-neutral-400">
													Email Address *
												</label>
												<input
													type="email"
													name="email"
													value={formState.email}
													onChange={handleChange}
													required
													placeholder="john@company.com"
													className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<label className="text-sm text-neutral-400">
													Company Name
												</label>
												<input
													type="text"
													name="company"
													value={formState.company}
													onChange={handleChange}
													placeholder="Your Company"
													className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>

                                            <div className="space-y-2">
												<label className="text-sm text-neutral-400">
													Phone Number *
												</label>
												<input
													type="tel"
													name="phone"
													value={formState.phone}
													onChange={handleChange}
                                                    required
													placeholder="+880 1815..."
													className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors"
												/>
											</div>
										</div>

										<div className="space-y-2">
											<label className="text-sm text-neutral-400">
												Service of Interest
											</label>
											<select
												name="service"
												value={formState.service}
												onChange={handleChange}
												className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
											>
												<option value="" disabled>Select a service</option>
												{contact.formOptions.map((opt) => (
													<option key={opt} value={opt}>{opt}</option>
												))}
												<option value="Other">Other</option>
											</select>
										</div>

										<div className="space-y-2">
											<label className="text-sm text-neutral-400">
												Your Message *
											</label>
											<textarea
												name="message"
												value={formState.message}
												onChange={handleChange}
												required
												rows={5}
												placeholder="Tell us about your project..."
												className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors resize-none"
											/>
										</div>

										{error && (
											<div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
												⚠️ {error}
											</div>
										)}

										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full py-4 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-[0_0_30px_rgba(135,230,92,0.5)]"
										>
											{isSubmitting ?
												<>
													<div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
													Sending...
												</>
											:	<>
													👉 Send Message
												</>
											}
										</button>
									</motion.form>
								}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</section>

            {/* NEW SECTION: MAP & CLOSING TEXT */}
            <section className="py-24 px-6 relative z-10 bg-white/[0.02] border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold">Visit Our Office</h2>
                            <p className="text-neutral-400 text-lg">
                                If you would like to visit us in person, please use the interactive map below to find directions to our office. We welcome our clients and partners to visit and discuss creative strategies face to face.
                            </p>
                            <div className="h-64 md:h-80 w-full rounded-3xl overflow-hidden border border-white/10 relative">
                                <iframe 
                                    src="https://maps.google.com/maps?q=25%20The%20Avenue,%20Crawley,%20Perth,%20WA,%20Australia&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(80%)" }} 
                                    allowFullScreen={false} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-neon-green/10 to-transparent p-10 md:p-16 rounded-[3rem] border border-neon-green/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/20 rounded-full blur-[100px] -z-10" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">Every great collaboration begins with a single message.</h2>
                            <p className="text-neon-green font-medium text-xl mb-6">Let us start yours today.</p>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                At WeBestOne, we do not just create campaigns. We create results that build brands, inspire engagement, and drive measurable growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
		</main>
	);
}
