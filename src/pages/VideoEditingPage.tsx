import {
	motion,
	AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function VideoEditingPage() {
	// FAQs Data
	const faqs = [
		{
			question: "What does a video production service include?",
			answer:
				"Video production encompasses every activity that will be carried out to produce a video. Whether it's a full-length film, a marketing video, TVC, or a social video or even a music video, the process will be the same. You can expect some tweaks with the specifics.",
		},
		{
			question: "What are some fine examples of video production?",
			answer:
				"Examples include corporate promotional videos, product demonstrations, customer testimonials, event highlights, animated explainer videos, and social media reels.",
		},
		{
			question: "What can be some key aspects of video production service?",
			answer:
				"Key aspects include pre-production (scripting, storyboarding, planning), production (filming, lighting, directing), and post-production (editing, color grading, sound design, VFX).",
		},
		{
			question: "What can you expect from a video production service?",
			answer:
				"You can expect a professional, end-to-end collaborative process. We take your core message and transform it into a visually compelling story that resonates with your target audience and drives engagement.",
		},
	];

	// Slider Services
	const sliderServices = [
		{ image: "/video_commercial.png", title: "Commercial Videos" },
		{ image: "/video_post.png", title: "Post Production Editing" },
		{ image: "/video_corporate.png", title: "Corporate Films" },
		{ image: "/video_reels.png", title: "Social Media Reels" },
	];

	// Process Steps
	const steps = [
		{
			num: "01",
			title: "Discovery & Narrative",
			desc: "We align on your story's core message and audience goals before a single frame is cut.",
		},
		{
			num: "02",
			title: "Footage Ingestion",
			desc: "High-speed cloud organization and proxy creation for a smooth, high-fidelity editing experience.",
		},
		{
			num: "03",
			title: "Narrative Assembly",
			desc: "The 'Rough Cut' where we craft the flow of the story and establish the perfect pacing.",
		},
		{
			num: "04",
			title: "Visual Enhancement",
			desc: "Layering B-roll, high-end motion graphics, and visual effects to make every second count.",
		},
		{
			num: "05",
			title: "Audio Precision",
			desc: "Cinematic sound design, noise reduction, and mixing to ensure professional audio clarity.",
		},
		{
			num: "06",
			title: "Color & Final Export",
			desc: "Advanced color grading and multi-format export optimized for YouTube, Reels, and 4K Cinema.",
		},
	];

	const [activeFaq, setActiveFaq] = useState<number | null>(0);
	const [activeStep, setActiveStep] = useState<number>(0);

	// Refs for scroll step spy
	const processContainerRef = useRef<HTMLDivElement>(null);

	// Create duplicated array for seamless infinite slider
	const extendedSlider = [
		...sliderServices,
		...sliderServices,
		...sliderServices,
	];

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* 1. Hero Section */}
			<section className="relative pt-12 lg:pt-20 pb-20 px-6 z-10">
				{/* Background Glow */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
					<div className="absolute top-20 left-10 w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full"></div>
					<div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
				</div>

				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<h1 className="text-4xl md:text-5xl font-bold leading-tight">
							Video Production and <br />
							<span className="text-neon-green">Editing Services</span>
						</h1>

						<p className="text-xl text-neutral-300 leading-relaxed max-w-lg font-medium">
							Make them say WOW! with us. Break Webestone brings you
							extraordinarily eye-catching videos to help you dominate your
							competitors in any dimension.
						</p>

						<div className="pt-4">
							<Link
								to="/contact"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neon-green text-black font-bold text-lg rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(135,230,92,0.3)] transition-all duration-300 hover:bg-[#87E65C]"
							>
								Get a quote
								<ArrowRight className="w-5 h-5" />
							</Link>
						</div>
					</motion.div>

					{/* Image Column */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative z-10 flex justify-center lg:justify-end"
					>
						<img
							src="/video_editing_hero.png"
							alt="Video Production Editor Illustration"
							className="w-full max-w-md md:max-w-lg lg:max-w-2xl drop-shadow-[0_0_40px_rgba(135,230,92,0.2)] hover:scale-[1.02] transition-transform duration-700"
						/>
					</motion.div>
				</div>
			</section>

			{/* 2. Services We Offer (Continuous Slider) */}
			<section className="py-24 relative z-10 bg-neutral-950/50 border-y border-white/5 overflow-hidden">
				<div className="max-w-7xl mx-auto px-6 text-center space-y-4 mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green leading-tight relative inline-block"
					>
						Services We Offer
						<svg
							className="absolute w-full h-3 -bottom-3 text-neon-green/50 left-0"
							viewBox="0 0 200 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.00025 6.99996C18.4475 2.66663 80.9167 -2.49997 197.99 1.99996"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
							></path>
						</svg>
					</motion.h2>
				</div>

				<div className="relative w-full flex overflow-hidden">
					{/* Left/Right Fade Masks */}
					<div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-950/50 to-transparent z-10"></div>
					<div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-950/50 to-transparent z-10"></div>

					<motion.div
						animate={{
							x: ["0%", "-33.3333%"],
						}}
						transition={{
							ease: "linear",
							duration: 15,
							repeat: Infinity,
						}}
						className="flex gap-6 px-6"
					>
						{extendedSlider.map((service, i) => (
							<div
								key={i}
								className="relative w-[80vw] md:w-[45vw] lg:w-[30vw] xl:w-[25vw] aspect-[3/4] rounded-[2rem] overflow-hidden group shrink-0"
							>
								{/* Image */}
								<img
									src={service.image}
									alt={service.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>

								{/* Overlay Gradient */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

								{/* Text Content */}
								<div className="absolute inset-0 p-8 flex flex-col justify-end">
									<h3 className="text-white text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
										{service.title}
									</h3>
									<div className="h-1 w-12 bg-neon-green mt-4 rounded-full opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</section>

			{/* 3. How do we get started? (Scroll Reveal Steps) */}
			<section className="py-24 px-6 relative z-10">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="text-center space-y-4">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green leading-tight relative inline-block"
						>
							How do we get started?
							<svg
								className="absolute w-full h-3 -bottom-3 text-neon-green/50 left-0"
								viewBox="0 0 200 9"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.00025 6.99996C18.4475 2.66663 80.9167 -2.49997 197.99 1.99996"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
								></path>
							</svg>
						</motion.h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
						{/* Background Decorative Lines (Desktop Only) */}
						<div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 pointer-events-none" />
						
						{steps.map((step, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="relative group"
							>
								{/* Step Card */}
								<div className="h-full p-10 rounded-[3rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl hover:bg-neutral-800/60 hover:border-neon-green/30 transition-all duration-500 group-hover:-translate-y-2">
									{/* Top Header */}
									<div className="flex items-center justify-between mb-8">
										<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-neon-green/20 border border-white/10 flex items-center justify-center text-2xl font-black text-white group-hover:text-neon-green group-hover:scale-110 transition-all duration-500">
											{step.num}
										</div>
										<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
											<div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
										</div>
									</div>

									{/* Content */}
									<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
										{step.title}
									</h3>
									<p className="text-neutral-400 leading-relaxed font-medium group-hover:text-neutral-300 transition-colors">
										{step.desc}
									</p>

									{/* Decorative Corner */}
									<div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/5 group-hover:border-neon-green/30 rounded-br-2xl transition-colors" />
								</div>
								
								{/* Connector for desktop (Horizontal) */}
								{idx % 3 !== 2 && (
									<div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-white/5 group-hover:bg-neon-green/30 z-[-1]" />
								)}
							</motion.div>
						))}
					</div>

					{/* Final CTA within Process for better conversion */}
					<motion.div 
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="mt-20 p-12 rounded-[3rem] bg-gradient-to-r from-purple-900/20 to-neon-green/10 border border-white/5 text-center space-y-6"
					>
						<h3 className="text-3xl font-bold text-white">Ready to bring your vision to life?</h3>
						<p className="text-neutral-400 max-w-xl mx-auto">
							From strategy to final delivery, we ensure every frame tells your story perfectly. Let's start your project today.
						</p>
						<div className="pt-4">
							<Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)]">
								Book Your Session <ArrowRight className="w-5 h-5" />
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* 4. FAQs Section */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950/30 border-t border-white/5">
				<div className="max-w-4xl mx-auto space-y-16">
					<div className="text-center space-y-4">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green leading-tight relative inline-block"
						>
							Frequently Asked Questions (FAQs)
							<svg
								className="absolute w-full h-3 -bottom-3 text-neon-green/50 left-0"
								viewBox="0 0 200 9"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.00025 6.99996C18.4475 2.66663 80.9167 -2.49997 197.99 1.99996"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
								></path>
							</svg>
						</motion.h2>
					</div>

					<div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-10 divide-y divide-white/10">
						{faqs.map((faq, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="py-6"
							>
								<button
									onClick={() => setActiveFaq(activeFaq === i ? null : i)}
									className="w-full flex items-center justify-between gap-6 text-left"
								>
									<h3
										className={`text-lg md:text-xl font-bold transition-colors ${activeFaq === i ? "text-neon-green" : "text-white hover:text-neon-green/80"}`}
									>
										{faq.question}
									</h3>
									<div
										className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${activeFaq === i ? "bg-neon-green border-neon-green text-black rotate-180" : "border-white/20 text-white"}`}
									>
										<ChevronDown className="w-5 h-5" />
									</div>
								</button>

								<AnimatePresence>
									{activeFaq === i && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className="overflow-hidden"
										>
											<p className="pt-6 text-neutral-300 leading-relaxed font-medium">
												{faq.answer}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
