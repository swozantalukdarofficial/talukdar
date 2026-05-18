import { useState } from "react";
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

const contactInfo = {
	address: "Dhaka, Bangladesh",
	phone: "+880 1333 600 272",
	email: "webestone@gmail.com",
	workingHours: "Mon - Fri: 9AM - 6PM (BST)",
};

export default function ContactPage() {
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		company: "",
		service: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

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

		// Simulate submission then open mailto
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const mailtoBody = `Name: ${formState.name}%0ACompany: ${formState.company}%0AService: ${formState.service}%0A%0AMessage:%0A${formState.message}`;
		window.open(
			`mailto:${contactInfo.email}?subject=Project Inquiry from ${formState.name}&body=${mailtoBody}`,
			"_blank",
		);

		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	const contactItems = [
		{ icon: MapPin, title: "Our Location", detail: contactInfo.address },
		{
			icon: Phone,
			title: "Phone",
			detail: contactInfo.phone,
			href: `tel:${contactInfo.phone}`,
		},
		{
			icon: Mail,
			title: "Email",
			detail: contactInfo.email,
			href: `mailto:${contactInfo.email}`,
		},
		{ icon: Clock, title: "Working Hours", detail: contactInfo.workingHours },
	];

	return (
		<main className="relative min-h-screen text-white pt-20 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />
				<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
			</div>

			<section className="relative py-24 px-6 z-10">
				<div className="max-w-7xl mx-auto">
					{/* Heading */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-20 space-y-4"
					>
						<span className="inline-block px-4 py-2 bg-neon-green/10 text-neon-green rounded-full text-sm font-bold border border-neon-green/30 uppercase tracking-wide">
							Get In Touch
						</span>
						<h1 className="text-5xl md:text-7xl font-bold">
							Let's Build{" "}
							<span className="bg-gradient-to-r from-neon-green to-blue-400 bg-clip-text text-transparent">
								Together
							</span>
						</h1>
						<p className="text-xl text-neutral-400 max-w-2xl mx-auto">
							Ready to transform your digital presence? Tell us about your
							project and we'll get back to you within 24 hours.
						</p>
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

							{/* WhatsApp CTA */}
							<div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#25D366]/20 to-transparent border border-[#25D366]/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <MessageCircle className="w-24 h-24 text-[#25D366]" />
                                </div>
								<h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
									<MessageCircle className="text-[#25D366] w-6 h-6" />
									Instant Chat
								</h3>
								<p className="text-neutral-400 mb-6 max-w-xs">
									Need a quick answer? Chat with our experts directly on WhatsApp for instant support.
								</p>
								<a
									href={`https://wa.me/8801333600272?text=Hi, I want to discuss a project.`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20BD5A] hover:scale-105 transition-all text-sm shadow-[0_0_30px_rgba(37,211,102,0.3)]"
								>
									Start WhatsApp Chat <ArrowRight className="w-4 h-4" />
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
											Your email client should have opened. We'll get back to
											you soon.
										</p>
										<button
											onClick={() => {
												setIsSubmitted(false);
												setFormState({
													name: "",
													email: "",
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
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<label className="text-sm text-neutral-400">
													Your Name *
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

										<div className="space-y-2">
											<label className="text-sm text-neutral-400">
												Company (Optional)
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
												Service Interested In
											</label>
											<select
												name="service"
												value={formState.service}
												onChange={handleChange}
												className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
											>
												<option value="" disabled>Select a service</option>
												<option value="Full Stack Digital Marketing">
													Full Stack Digital Marketing
												</option>
												<option value="Web Development">Web Development</option>
												<option value="UI/UX Design">UI/UX Design</option>
												<option value="Social Media">
													Social Media Marketing
												</option>
												<option value="AI Solutions">AI Solutions</option>
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
													<Send className="w-5 h-5" />
													Send Message
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

            {/* NEW SECTION: STRATEGY CALL */}
            <section className="py-24 px-6 relative z-10 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-neutral-900 to-black rounded-[3rem] p-10 md:p-20 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/10 rounded-full blur-[100px] -z-10" />
                        <div className="max-w-2xl space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black leading-tight">Book a Free <br /><span className="text-neon-green">Strategy Session</span></h2>
                            <p className="text-neutral-400 text-lg">
                                Prefer to speak with an expert directly? Book a 30-minute discovery call where we'll audit your current strategy and provide actionable insights.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Free 30-minute consultation",
                                    "Custom growth roadmap",
                                    "Technical site audit (Live)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white font-bold text-sm">
                                        <CheckCircle className="w-5 h-5 text-neon-green" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col items-center gap-6">
                             <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center space-y-4 backdrop-blur-xl">
                                <div className="text-neon-green font-bold text-sm uppercase tracking-[0.2em]">Next Available Slot</div>
                                <div className="text-4xl font-black">Tomorrow</div>
                                <div className="text-neutral-400 text-sm">9:30 AM - 11:00 AM</div>
                                <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all">
                                    Schedule Meeting
                                </button>
                             </div>
                             <p className="text-neutral-500 text-xs italic font-medium">Powered by Calendly</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: OUR PROCESS */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">What Happens <span className="text-neon-green">Next?</span></h2>
                        <p className="text-neutral-400">Our seamless process from inquiry to execution.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Review & Audit", desc: "Our team analyzes your inquiry and current digital presence within 24 hours." },
                            { step: "02", title: "Discovery Call", desc: "We jump on a quick call to align on your business goals and specific needs." },
                            { step: "03", title: "Growth Proposal", desc: "You receive a custom tailored proposal with fixed timelines and ROI projections." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="p-10 rounded-[2.5rem] bg-neutral-900/40 border border-white/5 relative group hover:bg-neutral-900 hover:border-neon-green/30 transition-all"
                            >
                                <div className="text-6xl font-black text-white/5 absolute top-8 right-8 group-hover:text-neon-green/10 transition-colors">{item.step}</div>
                                <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green font-bold mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW SECTION: FAQ (COMPACT) */}
            <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Common <span className="text-neutral-500">Concerns</span></h2>
                </div>
                <div className="space-y-4">
                    {[
                        { q: "How fast will I get a response?", a: "We typically respond to all inquiries within 12 to 24 hours during business days." },
                        { q: "Is the first consultation really free?", a: "Yes! Our strategy sessions are 100% free with no obligation to sign. We believe in providing value first." },
                        { q: "Do you work with startups?", a: "Absolutely. We work with everything from bootstrapped startups to global enterprises, tailoring our packages to fit your stage." }
                    ].map((faq, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
                            <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>
		</main>
	);
}
