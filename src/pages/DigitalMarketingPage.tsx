import { motion, AnimatePresence } from "framer-motion";
import {
	Play,
	Search,
	BarChart3,
	Mail,
	Monitor,
	DollarSign,
	PenTool,
	Globe,
	Share2,
	Megaphone,
	Video,
	CheckCircle2,
	Star, 
	Map,
	Edit3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MagneticButton } from "../components/ui/MagneticButton";

import pageData from "../data/digital-marketing-page.json";

const iconMap: Record<string, React.ComponentType<any>> = {
	Play,
	Search,
	BarChart3,
	Mail,
	Monitor,
	DollarSign,
	PenTool,
	Globe,
	Share2,
	Megaphone,
	Video,
	CheckCircle2,
	Star,
	Map,
	Edit3
};

const heroContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const heroItem = {
	hidden: { y: 20, opacity: 0 },
	show: {
		y: 0,
		opacity: 1,
		transition: { type: "spring" as const, stiffness: 50, damping: 20 },
	},
};

export default function DigitalMarketingPage() {
	const [activeReason, setActiveReason] = useState(0);
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [isPlayingHero, setIsPlayingHero] = useState(false);
	const [isPlayingWhy, setIsPlayingWhy] = useState(false);

	const toggleFaq = (index: number) => {
		setOpenFaq(openFaq === index ? null : index);
	};

	return (
		<main className="relative min-h-screen text-white pt-20 overflow-hidden bg-black">
			{/* Background Effects */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
				<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
			</div>

			{/* --- Hero Section --- */}
			<section className="relative pt-8 pb-20 md:pt-12 md:pb-24 px-6 z-10">
				<motion.div
					variants={heroContainer}
					initial="hidden"
					animate="show"
					className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
				>
					<div className="space-y-6">

						<motion.h1
							variants={heroItem}
							className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.15] tracking-tight"
						>
							{pageData.hero.titleNormal1} <br className="hidden sm:block" />
							Where <span className="text-neon-green">{pageData.hero.titleHighlight1}</span> <br />
							<span className="text-neon-green">{pageData.hero.titleHighlight2}</span> {pageData.hero.titleNormal2}
						</motion.h1>
						<motion.p
							variants={heroItem}
							className="text-neutral-400 text-lg leading-relaxed max-w-lg"
						>
							{pageData.hero.description}
						</motion.p>
						<motion.p
							variants={heroItem}
							className="text-white font-semibold text-lg leading-relaxed max-w-lg"
						>
							{pageData.hero.outcomeText}
						</motion.p>
						<motion.div variants={heroItem}>
							<Link to={pageData.hero.ctaLink}>
								<MagneticButton className="px-8 py-3 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-[0_0_30px_rgba(135,230,92,0.5)] transition-shadow hover:bg-[#87E65C]">
									{pageData.hero.ctaText}
								</MagneticButton>
							</Link>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
						className="relative group"
					>
						{/* Video Placeholder */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
							className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl"
						>
							<AnimatePresence mode="wait">
								{!isPlayingHero ? (
									<motion.div
										key="thumb"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="absolute inset-0 cursor-pointer group/thumb"
										onClick={() => setIsPlayingHero(true)}
									>
										<img 
											src="https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg" 
											alt="Digital Marketing Hero Thumbnail" 
											className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" 
										/>
										<div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors duration-300" />
										<div className="absolute inset-0 flex items-center justify-center">
											<motion.div
												whileHover={{ scale: 1.1 }}
												className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-transform relative z-10"
											>
												<Play className="w-6 h-6 text-white fill-current ml-1" />
											</motion.div>
										</div>
									</motion.div>
								) : (
									<iframe
										className="absolute inset-0 w-full h-full"
										src="https://www.youtube.com/embed/MnLd2G198U8?autoplay=1&controls=1&modestbranding=1&rel=0"
										title="Digital Marketing Hero Video"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									></iframe>
								)}
							</AnimatePresence>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.8 }}
							className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-neon-green/20 rounded-3xl pointer-events-none"
						></motion.div>
					</motion.div>
				</motion.div>
			</section>

			{/* --- Why Use Digital Marketing --- */}
			<section className="py-20 px-6 relative z-10 bg-neutral-900/30">
				<div className="max-w-7xl mx-auto space-y-12">
					<div className="text-center md:text-left">
						<div
							className="inline-block"
						>
							<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
								{pageData.benefits.subLabel}
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white relative inline-block">
								Why should you use{" "}
								<span className="text-neon-green">
									{pageData.benefits.titleHighlight}
								</span>
								<svg
									className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
							</h2>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6 text-neutral-300 leading-relaxed">
							<p>
								{pageData.benefits.description}
							</p>
							<div className="inline-block px-6 py-2 bg-neon-green/10 text-neon-green rounded-full font-bold border border-neon-green/30">
								{pageData.benefits.badge}
							</div>
						</div>

						<div className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl group">
							<AnimatePresence mode="wait">
								{!isPlayingWhy ? (
									<motion.div
										key="thumb-why"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer"
										onClick={() => setIsPlayingWhy(true)}
									>
										<img 
											src="https://img.youtube.com/vi/MnLd2G198U8/maxresdefault.jpg" 
											alt="Why Digital Marketing Thumbnail" 
											className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
										/>
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
										<div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform relative z-10">
											<Play className="w-6 h-6 text-white fill-current ml-1" />
										</div>
									</motion.div>
								) : (
									<iframe
										className="absolute inset-0 w-full h-full"
										src="https://www.youtube.com/embed/MnLd2G198U8?autoplay=1&controls=1&modestbranding=1&rel=0"
										title="Why Digital Marketing Video"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									></iframe>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</section>

			{/* --- Advanced Digital Marketing Capabilities --- */}
			<section className="py-24 px-6 relative z-10 bg-black border-t border-white/5">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="space-y-4 text-center max-w-4xl mx-auto">
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							{pageData.advancedCapabilities.subLabel}
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block text-white">
							{pageData.advancedCapabilities.title}
							<svg
								className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
						</h2>
						<p className="text-neutral-400 mt-6 text-lg">
							{pageData.advancedCapabilities.description}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{pageData.advancedCapabilities.services.map((service, index) => {
							const IconComponent = iconMap[service.icon] || Monitor;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05 }}
									whileHover={{ y: -5 }}
									className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left hover:bg-white/10 transition-colors group"
								>
									<div className="flex items-center gap-4 mb-4">
										<div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
											<IconComponent className="w-6 h-6" />
										</div>
										<h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors underline decoration-transparent group-hover:decoration-purple-400 underline-offset-4">
											{service.title}
										</h3>
									</div>
									<p className="text-sm text-neutral-400 leading-relaxed">
										{service.desc}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* --- Results Driven Marketing (Visual Section) --- */}
			<section className="py-24 px-6 relative overflow-hidden">
				<div className="absolute inset-0 bg-blue-900/10 z-0"></div>
				<div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
					<div
						className="inline-block"
					>
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							{pageData.performance.subLabel}
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white relative inline-block">
							{pageData.performance.title}
							<svg
								className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
						</h2>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{pageData.performance.items.map((item, i) => {
							const IconComponent = iconMap[item.icon] || Monitor;
							return (
								<motion.div
									key={i}
									whileHover={{ y: -10 }}
									className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-4 hover:border-neon-green/50 transition-colors"
								>
									<div className="p-4 rounded-full bg-white/5 border border-white/10 text-neon-green">
										<IconComponent className="w-8 h-8" />
									</div>
									<h3 className="text-xl font-bold">{item.title}</h3>
									<p className="text-sm text-neutral-400">{item.desc}</p>
								</motion.div>
							);
						})}
					</div>

					<div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-8 max-w-sm mx-auto mt-8 backdrop-blur-sm relative overflow-hidden group">
						<div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-[40px] pointer-events-none"></div>
						<div className="relative z-10 space-y-4">
							<div className="w-12 h-12 bg-yellow-500 text-black rounded-lg flex items-center justify-center mx-auto mb-4">
								{(() => {
									const SocialIcon = iconMap[pageData.performance.socialMediaBox.icon] || Share2;
									return <SocialIcon className="w-6 h-6" />;
								})()}
							</div>
							<h3 className="text-2xl font-bold text-yellow-400">
								{pageData.performance.socialMediaBox.title}
							</h3>
							<p className="text-neutral-300 text-sm">
								{pageData.performance.socialMediaBox.desc}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* --- Detailed Services Grid --- */}
			<section className="py-24 px-6 bg-neutral-900/50 relative z-10">
				<div className="max-w-7xl mx-auto text-center space-y-16">
					<div className="space-y-4">
						<div
							className="inline-block"
						>
							<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
								{pageData.ourServices.subLabel}
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block">
								Our AI Driven{" "}
								<span className="text-neon-green">{pageData.ourServices.titleHighlight}</span>
								<svg
									className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
							</h2>
						</div>
						<p className="text-neutral-400 mt-6">
							{pageData.ourServices.description}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{pageData.ourServices.services.map((service, index) => {
							const IconComponent = iconMap[service.icon] || Monitor;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05 }}
									whileHover={{ y: -5 }}
									className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left hover:bg-white/10 transition-colors group"
								>
									<div className="flex items-center gap-4 mb-4">
										<div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
											<IconComponent className="w-6 h-6" />
										</div>
										<h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors underline decoration-transparent group-hover:decoration-blue-400 underline-offset-4">
											{service.title}
										</h3>
									</div>
									<p className="text-sm text-neutral-400 leading-relaxed">
										{service.desc}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* --- Our Process Section --- */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950 border-t border-white/5">
				<div className="max-w-4xl mx-auto space-y-16">
					<div className="space-y-4">
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							{pageData.ourProcess.subLabel}
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block text-white">
							{pageData.ourProcess.title}
							<svg
								className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
						</h2>
						<p className="text-neutral-400 mt-6 text-lg max-w-2xl">
							{pageData.ourProcess.description}
						</p>
					</div>

					<div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
						{pageData.ourProcess.steps.map((step, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ delay: index * 0.1 }}
								className="relative"
							>
								{/* Timeline Dot */}
								<div className="absolute -left-[41px] md:-left-[57px] top-1 w-6 h-6 rounded-full bg-neutral-900 border-2 border-neon-green flex items-center justify-center z-10">
									<div className="w-2 h-2 rounded-full bg-neon-green"></div>
								</div>

								<div className="space-y-3">
									<span className="text-neon-green font-mono text-xs uppercase tracking-wider font-bold">Step 0{index + 1}</span>
									<h3 className="text-2xl md:text-3xl font-bold text-white">{step.title}</h3>
									<p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
										{step.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* --- Digital Services Categories --- */}
			<section className="py-24 px-6 relative z-10">
				<div className="max-w-6xl mx-auto space-y-12 text-center">
					<div
						className="inline-block"
					>
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							{pageData.integratedSolutions.subLabel}
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block">
							{pageData.integratedSolutions.title}
							<svg
								className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{pageData.integratedSolutions.categories.map((cat, i) => (
							<div
								key={i}
								className={`rounded-3xl overflow-hidden bg-gradient-to-br ${cat.gradient} p-1`}
							>
								<div className="bg-neutral-900 h-full w-full rounded-[20px] p-8 flex flex-col items-start min-h-[400px] relative overflow-hidden group">
									<div
										className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${cat.gradient}`}
									></div>
									<div
										className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-[60px] group-hover:opacity-20 transition-opacity pointer-events-none`}
									></div>

									<h3
										className={`text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${cat.gradient}`}
									>
										{cat.title}
									</h3>

									<ul className="space-y-4 w-full text-left">
										{cat.items.map((item, idx) => (
											<li
												key={idx}
												className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
											>
												<CheckCircle2 className="w-5 h-5 text-neon-green shrink-0" />
												<span className="text-sm font-medium">{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- Packages Section (Coffee Bag Style) --- */}
			<section className="py-24 px-6 bg-neutral-900 relative z-10">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="space-y-4 text-center max-w-4xl mx-auto">
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							{pageData.growthChannels.subLabel}
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block text-white">
							{pageData.growthChannels.title}
							<svg
								className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
						</h2>
						<p className="text-neutral-400 mt-6 text-lg">
							<span className="text-white font-semibold block mb-2">{pageData.growthChannels.descriptionTitle}</span>
							{pageData.growthChannels.description}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{pageData.growthChannels.channels.map((pkg, i) => {
						const IconComponent = iconMap[pkg.icon] || Monitor;
						return (
							<div
								key={i}
								className="bg-neutral-950/50 border border-white/10 rounded-2xl p-8 text-center hover:border-neon-green/30 transition-colors group relative"
							>
								<div className="w-24 h-32 mx-auto bg-[#eaddcf] rounded-t-lg relative mb-6 flex flex-col items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
									{/* Coffee Bag Styling */}
									<div className="absolute top-0 w-full h-4 bg-[#d6c4b0] skew-y-1"></div>
									<div
										className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2`}
									>
										<IconComponent className={`w-6 h-6 ${pkg.color}`} />
									</div>
									<span className="text-xs font-bold text-neutral-800 uppercase tracking-tighter">
										{pkg.title}
									</span>
								</div>

								<h3 className="text-lg font-bold text-white mb-3">{pkg.title}</h3>
								<p className="text-xs text-neutral-400 leading-relaxed mb-6">
									{pkg.desc}
								</p>

								<Link to="/contact">
									<button className="px-6 py-2 bg-neon-green text-black text-xs font-bold rounded-full transition-colors cursor-pointer hover:bg-[#87E65C]">
										Learn More
									</button>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</section>

			{/* --- Why Choose Webestone --- */}
			<section className="py-24 px-6 bg-white/5 relative z-10">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12">
						<div
							className="inline-block"
						>
							<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
								{pageData.whyChooseUs.subLabel}
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 relative inline-block">
								Why choose WebestOne for{" "}
								<span className="text-neon-green">
									{pageData.whyChooseUs.titleHighlight}
								</span>
								<svg
									className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
							</h2>
						</div>
						<p className="text-neutral-400 mt-6">
							{pageData.whyChooseUs.description}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="space-y-4">
							{pageData.whyChooseUs.reasons.map((reason, i) => (
								<motion.div
									key={i}
									onClick={() => setActiveReason(i)}
									animate={{
										backgroundColor:
											activeReason === i ?
												"rgba(34, 197, 94, 0.8)"
											:	"rgba(34, 197, 94, 0.2)",
										scale: activeReason === i ? 1.02 : 1,
									}}
									className="p-4 rounded-full cursor-pointer flex items-center justify-between group transition-all"
								>
									<span
										className={`font-bold ${
											activeReason === i ? "text-black" : "text-green-400"
										} pl-4`}
									>
										{reason.title}
									</span>
									{activeReason === i && (
										<CheckCircle2 className="w-6 h-6 text-black mr-4" />
									)}
								</motion.div>
							))}
						</div>

						{/* Illustration Placeholder */}
						<div className="relative h-[400px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
							<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
							<div className="relative z-10 text-center space-y-4">
								<div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
									<Play className="w-8 h-8 text-neon-green fill-current" />
								</div>
								<p className="text-neutral-500 font-mono text-sm">
									Interactive Demo Preview
								</p>
							</div>

							{/* Floating Elements */}
							<motion.div
								animate={{ y: [0, -20, 0] }}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute top-10 right-10 p-3 bg-blue-500 rounded-xl shadow-lg"
							>
								<BarChart3 className="w-6 h-6 text-white" />
							</motion.div>
							<motion.div
								animate={{ y: [0, 20, 0] }}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute bottom-20 left-10 p-3 bg-purple-500 rounded-xl shadow-lg"
							>
								<Megaphone className="w-6 h-6 text-white" />
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* --- FAQ Section --- */}
			<section className="py-24 px-6 relative z-10">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div>
						<div
							className="inline-block mb-8"
						>
							<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
								{pageData.faq.subLabel}
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green relative inline-block">
								{pageData.faq.title}
								<svg
									className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0"
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
							</h2>
						</div>
						<div className="space-y-4">
							{pageData.faq.faqs.map((faq, i) => (
								<div key={i} className="border-b border-white/10 pb-4">
									<button
										onClick={() => toggleFaq(i)}
										className="w-full flex items-center justify-between text-left py-2 hover:text-neon-green transition-colors cursor-pointer"
									>
										<span className="font-bold flex items-center gap-3">
											<span className="w-6 h-6 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">
												{openFaq === i ? "-" : "+"}
											</span>
											{faq.q}
										</span>
									</button>
									<AnimatePresence>
										{openFaq === i && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												className="overflow-hidden"
											>
												<p className="text-neutral-400 text-sm pl-9 pt-2 leading-relaxed">
													{faq.a}
												</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							))}
						</div>
					</div>

					{/* Visual Right Column (Phone Illustration) */}
					<div className="relative flex justify-center items-center h-full min-h-[400px]">
						<motion.div
							animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
							className="relative w-64 h-[500px] bg-green-600 rounded-[3rem] border-8 border-green-700 shadow-2xl transform rotate-12 flex flex-col items-center justify-end overflow-hidden"
						>
							<div className="absolute top-0 w-full h-full bg-gradient-to-b from-green-500 to-green-700 pointer-events-none"></div>
							{/* Keypad simulation */}
							<div className="relative z-10 w-full px-6 pb-12 grid grid-cols-3 gap-3">
								{[...Array(9)].map((_, i) => (
									<div
										key={i}
										className="w-full aspect-square bg-white/20 rounded-md"
									></div>
								))}
								<div className="col-start-2 w-full aspect-square bg-white/20 rounded-md"></div>
							</div>
							{/* Antenna */}
							<div className="absolute -top-16 -left-4 w-4 h-24 bg-green-700 rotate-[-15deg] rounded-full pointer-events-none"></div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* --- Bottom CTA --- */}
			<section className="py-20 px-6 bg-white/5 text-center relative z-10">
				<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8">
					Let's move your{" "}
					<span className="text-purple-500">{pageData.bottomCta.titleHighlight}</span>
				</h2>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Link to={pageData.bottomCta.button1Link}>
						<MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:bg-[#87E65C]">
							{pageData.bottomCta.button1Text}
						</MagneticButton>
					</Link>
					<Link to={pageData.bottomCta.button2Link}>
						<MagneticButton className="px-8 py-4 bg-transparent border border-neon-green text-neon-green font-bold rounded-full transition-colors">
							{pageData.bottomCta.button2Text}
						</MagneticButton>
					</Link>
				</div>
			</section>
		</main>
	);
}
