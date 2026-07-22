import {
	motion,
	AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const videoEditingSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "BreadcrumbList",
			"@id": "https://webestone.com/services/video-editing#breadcrumb",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://webestone.com" },
				{ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://webestone.com/services" },
				{ "@type": "ListItem", "position": 3, "name": "Video Editing Services", "item": "https://webestone.com/services/video-editing" }
			]
		},
		{
			"@type": "Service",
			"@id": "https://webestone.com/services/video-editing#service",
			"serviceType": "Video Editing & Video Production",
			"name": "Professional Video Editing Services",
			"description": "Professional video editing services including YouTube videos, social media reels, corporate films, motion graphics, and brand storytelling content.",
			"url": "https://webestone.com/services/video-editing",
			"provider": {
				"@type": "LocalBusiness",
				"name": "WeBestOne",
				"url": "https://webestone.com",
				"logo": "https://webestone.com/favicon.png",
				"telephone": "+8801815025322",
				"email": "webestone@gmail.com",
				"address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressRegion": "Dhaka Division", "addressCountry": "BD" }
			},
			"areaServed": ["BD", "US", "GB", "AU", "CA"],
			"hasOfferCatalog": {
				"@type": "OfferCatalog",
				"name": "Video Editing Service Packages",
				"itemListElement": [
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "YouTube Video Editing" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Reels & Shorts" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Video Production" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Motion Graphics & Animation" } },
					{ "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Story Videos" } }
				]
			}
		},
		{
			"@type": "FAQPage",
			"mainEntity": [
				{
					"@type": "Question",
					"name": "What video editing formats do you support?",
					"acceptedAnswer": { "@type": "Answer", "text": "We support all major formats including MP4, MOV, AVI, and MKV. Our editors work with footage from DSLR cameras, smartphones, drones, and screen recordings." }
				},
				{
					"@type": "Question",
					"name": "How long does video editing take?",
					"acceptedAnswer": { "@type": "Answer", "text": "Turnaround time depends on video length and complexity. A standard 3-5 minute promotional video typically takes 2-4 business days. Rush delivery is available upon request." }
				},
				{
					"@type": "Question",
					"name": "Can you add motion graphics and subtitles?",
					"acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer motion graphics, animated titles, lower thirds, custom subtitles, color grading, sound design, and voiceover integration as part of our video editing service." }
				},
				{
					"@type": "Question",
					"name": "What software do you use for video editing?",
					"acceptedAnswer": { "@type": "Answer", "text": "Our editors use Adobe Premiere Pro, After Effects, DaVinci Resolve, and CapCut for various types of video projects depending on complexity and output requirements." }
				}
			]
		}
	]
};

export default function VideoEditingPage() {
	const { serviceImages } = useContent();
	// FAQs Data
	const faqs = [
		{
			question: "What does a professional video editing service include?",
			answer: "It includes full video editing, post production, color grading, audio synchronization, sound design, and video enhancement to deliver a complete final video."
		},
		{
			question: "How long do professional video editing services take?",
			answer: "Most projects are completed within a few weeks depending on complexity, animation video editing services, and editing requirements."
		},
		{
			question: "Do you operate as a video production agency for social media and youtube?",
			answer: "Yes. As a video production agency, we manage and deliver optimized editing for social media videos and youtube videos built for modern viewing behavior."
		},
		{
			question: "What makes a video effective?",
			answer: "Clear storytelling, strong pacing, proper color grading, structured editing, and motion design determine how well a video performs."
		},
		{
			question: "Do you offer custom video editing packages?",
			answer: "Yes. We provide custom video editing packages based on your goals, content type, and distribution platform."
		},
		{
			question: "Do you provide animation video editing services?",
			answer: "Yes. We deliver animation video editing services including motion graphics, transitions, and visual effects for enhanced storytelling."
		},
		{
			question: "What platforms do you optimize videos for?",
			answer: "We optimize videos for youtube, social media platforms, and commercial distribution channels to improve visibility and engagement."
		}
	];

	// Slider Services
	const sliderServices = [
		{ image: serviceImages?.["professional-video-editing-services_slider_1"] || "/video_post.webp", title: "Post Production" },
		{ image: serviceImages?.["professional-video-editing-services_slider_2"] || "/video_corporate.webp", title: "Corporate Videos" },
		{ image: serviceImages?.["professional-video-editing-services_slider_3"] || "/video_reels.webp", title: "Social Media Videos" },
		{ image: serviceImages?.["professional-video-editing-services_slider_4"] || "/video_commercial.webp", title: "Commercial Videos" },
		{ image: serviceImages?.["professional-video-editing-services_slider_5"] || "/video_brand.png", title: "Brand Story Videos" },
		{ image: serviceImages?.["professional-video-editing-services_slider_6"] || "/video_promo.png", title: "Promotional Videos" }
	];

	// Detailed services list
	const servicesList = [
		{
			title: "Post production editing",
			lead: "Raw footage does not hold attention. Structure does.",
			desc: "We turn clips into complete stories using timeline editing, color correction, audio mixing, and sound design. This is where post production becomes the difference between being watched and being ignored. Attention is built through clear structure, strong pacing, controlled transitions, and storytelling that people can follow without effort."
		},
		{
			title: "Corporate videos",
			lead: "People decide fast.",
			desc: "We create corporate videos that feel clear, controlled, and worth trusting. Strong pacing, clean edits, and intentional messaging drive how your brand is perceived."
		},
		{
			title: "Social media videos",
			lead: "You have seconds.",
			desc: "As a video production agency, we deliver short-form and social media videos built for speed, clarity, and engagement. Every transition, cut, and frame is designed to hold attention."
		},
		{
			title: "Commercial videos",
			lead: "Looking good is not enough.",
			desc: "As a video editing service agency, we create commercial videos that focus on message clarity, not just visuals. That is what drives response."
		},
		{
			title: "Brand story videos",
			lead: "If your story is unclear, it is forgettable.",
			desc: "We use storyboarding, motion graphics, and structured editing to make your message easy to follow and remember."
		},
		{
			title: "Promotional videos",
			lead: "Even strong offers get ignored without structure.",
			desc: "As an expert promotional video editing agency, we build promotional videos that guide viewers from interest to action without confusion."
		}
	];

	// Process Steps
	const steps = [
		{
			num: "01",
			title: "Discovery and strategy",
			desc: "We define what needs to be said and how it should be delivered before any editing begins. Every professional video editing services project starts with clear direction.",
		},
		{
			num: "02",
			title: "Scripting and concept",
			desc: "We shape your idea into a focused concept so the message flows naturally.",
		},
		{
			num: "03",
			title: "Pre production",
			desc: "We prepare structure, sequence, and expectations so execution stays clean.",
		},
		{
			num: "04",
			title: "Storyboard",
			desc: "We map scenes, transitions, and flow so nothing feels random.",
		},
		{
			num: "05",
			title: "Production",
			desc: "We capture visuals that work across youtube videos and social platforms with clarity and consistency.",
		},
		{
			num: "06",
			title: "Post production",
			desc: "This is where everything comes together. We use color grading, audio synchronization, motion graphics, visual effects, and tools like adobe premiere pro and final cut pro to deliver a complete result.",
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
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			<AdminServiceImageEditor serviceId="professional-video-editing-services" />
			<SEO
				pageKey="professional-video-editing-services"
				title="Professional video editing services | Production Experts"
				description="Professional video editing services help to build your brand with a video production agency that uses AI-driven strategies to deliver high-performing video content."
				schemaMarkup={videoEditingSchema}
			/>
			{/* 1. Hero Section */}
			<section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-32 md:pt-36 lg:pt-40 pb-16 px-6 z-10">
				{/* Background Glow */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
					<div className="absolute top-20 left-10 w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full"></div>
					<div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>
				</div>

				<div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.22fr_0.78fr] gap-12 lg:gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-4 md:space-y-5 order-2 lg:order-1"
					>
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-[#87E65C] text-[10px] font-black uppercase tracking-[0.15em]">
							<span className="w-1.5 h-1.5 rounded-full bg-[#87E65C] animate-pulse" />
							Video Editing
						</div>

						{/* Main Heading */}
						<div className="space-y-2">
							<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[60px] font-black leading-[1.1] tracking-tight">
								Professional Video Editing Services <br className="hidden md:inline" />
								<span className="text-neon-green">That Make People Stop, Watch and Act</span>
							</h1>
						</div>

						{/* Description */}
						<div className="space-y-2.5 text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed font-medium">
							<p className="text-neutral-300 font-bold border-l-2 border-[#87E65C]/40 pl-3 py-0.5">
								Every day, your audience watches something else. <br />
								Not because it is better. <span className="text-white font-semibold">Because it holds attention longer.</span>
							</p>
							<p className="text-sm">
								WeBestOne delivers professional video editing services as a video production agency focused on capturing attention, holding it, and turning it into action.
							</p>
						</div>

						{/* CTA Button */}
						<div className="pt-1">
							<Link
								to="/contact-us"
								className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-neon-green text-black font-black text-sm uppercase tracking-wider rounded-full shadow-[0_10px_30px_rgba(135,230,92,0.2)] hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(135,230,92,0.35)] transition-all duration-300 group"
							>
								Get a quote
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</motion.div>

					{/* Image Column */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative z-10 flex justify-center lg:justify-end order-1 lg:order-2 w-full mt-10 lg:mt-0"
					>
						<img
							src={serviceImages["professional-video-editing-services"] || "/video_editing_hero.webp"}
							alt="Professional video editing services"
							className="w-full max-w-md md:max-w-lg lg:max-w-2xl drop-shadow-[0_0_40px_rgba(135,230,92,0.2)] hover:scale-[1.02] transition-transform duration-700"
						/>
					</motion.div>
				</div>
			</section>

			{/* 2. Services We Offer (Continuous Slider) */}
			<section className="py-12 md:py-16 relative z-10 bg-neutral-950/50 border-y border-white/5 overflow-hidden">
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

				{/* Detailed Services Grid - UX/Copy Integration */}
				<div className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
					{servicesList.map((service, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 25 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.05 }}
							className="relative group p-8 rounded-[2.5rem] bg-neutral-900/30 border border-white/5 backdrop-blur-xl hover:border-neon-green/30 hover:bg-neutral-900/50 transition-all duration-300 flex flex-col justify-between"
						>
							<div className="space-y-4">
								<span className="text-xs font-black font-mono text-neon-green/60 uppercase tracking-widest block">Service 0{idx + 1}</span>
								<h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">{service.title}</h3>
								<p className="text-[#87E65C] text-sm font-bold leading-relaxed border-l-2 border-[#87E65C]/40 pl-3.5">
									{service.lead}
								</p>
								<p className="text-neutral-400 text-sm leading-relaxed font-medium">
									{service.desc}
								</p>
							</div>
						</motion.div>
					))}
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
						className="mt-20 p-12 md:p-16 rounded-[3rem] bg-gradient-to-r from-purple-900/20 to-neon-green/10 border border-white/5 text-center space-y-6"
					>
						<h3 className="text-3xl md:text-4xl font-extrabold text-white">We move fast. your content keeps up</h3>
						<div className="text-neutral-400 max-w-xl mx-auto space-y-3 font-medium text-base">
							<p className="text-neutral-200 font-bold text-lg">
								Delays cost attention. And attention is everything.
							</p>
							<p>
								Start with professional video editing services built to keep people watching and move them to act.
							</p>
						</div>
						<div className="pt-4">
							<Link to="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)] group">
								Get a quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

			{/* 5. Final CTA Section */}
			<section className="py-24 px-6 relative z-10 bg-black">
				<div className="max-w-6xl mx-auto">
					<div className="relative p-12 md:p-20 rounded-[3rem] bg-neutral-900/40 border border-white/5 overflow-hidden group">
						<div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-neon-green/5 blur-[120px] pointer-events-none" />

						<div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
							<h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
								People are already <span className="text-neon-green">watching.</span>
							</h2>
							<div className="text-neutral-400 text-base md:text-lg leading-relaxed space-y-4 max-w-xl mx-auto font-medium">
								<p className="text-neutral-200 font-bold text-lg md:text-xl">
									The only question is why they are not watching you.
								</p>
								<p>
									WeBestOne delivers professional video editing services that turn attention into action.
								</p>
							</div>
							<div className="pt-4">
								<Link to="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)] group">
									Get a Quote
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
