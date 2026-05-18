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

const coreServices = [
	{
		title: "Web Design",
		desc: "Websites designed to communicate value clearly and guide users toward action with strong User Interface (UI) and User Experience (UX).",
		icon: Monitor,
	},
	{
		title: "Search Engine Optimization (SEO)",
		desc: "Search focused strategies that attract the right audience, improve organic traffic, and support long term growth across the Search Engine Results Page (SERP). Ranking is not the goal. Being chosen is.",
		icon: Search,
	},
	{
		title: "Pay Per Click (PPC)",
		desc: "Paid campaigns built across Google Ads and Meta Ads to reach high intent users and deliver faster returns.",
		icon: DollarSign,
	},
	{
		title: "Content Writing",
		desc: "Strategic content designed to communicate value clearly, support content marketing, and strengthen brand growth.",
		icon: Edit3,
	},
	{
		title: "Social Media",
		desc: "Purpose driven engagement across Facebook, Instagram, LinkedIn, YouTube, and TikTok that builds trust, visibility, and customer engagement.",
		icon: Megaphone,
	},
];

const advancedServices = [
	{
		title: "Technical SEO",
		desc: "Website infrastructure improvements that help search engines crawl, index, and rank your website more effectively using tools like Google Search Console.",
		icon: Monitor,
	},
	{
		title: "Local SEO",
		desc: "Location focused optimization strategies that increase visibility and attract nearby customers actively searching for services.",
		icon: Map,
	},
	{
		title: "Link Building",
		desc: "Authority focused backlink strategies that strengthen domain credibility and support sustainable search engine rankings.",
		icon: Share2,
	},
	{
		title: "Conversion Rate Optimization",
		desc: "Performance improvements designed to turn more website visitors into qualified leads and paying customers through Conversion Rate Optimization (CRO).",
		icon: BarChart3,
	},
	{
		title: "Landing Page Optimization",
		desc: "Campaign focused landing pages designed to capture attention, communicate value clearly, and improve conversions.",
		icon: PenTool,
	},
	{
		title: "Marketing Analytics",
		desc: "Data driven performance tracking using Google Analytics that reveals insights and guides smarter marketing decisions.",
		icon: BarChart3,
	},
	{
		title: "Video Production",
		desc: "Professional video content designed to support video marketing, social media engagement, and brand storytelling.",
		icon: Video,
	},
	{
		title: "Online Reputation Management",
		desc: "Monitoring and improvement strategies that protect and strengthen your brand reputation across digital platforms.",
		icon: Star,
	},
	{
		title: "Marketing Automation",
		desc: "Automated workflows that nurture leads, improve customer communication, and streamline marketing processes.",
		icon: Globe,
	},
];

const digitalServices = [
	{
		title: "Creative and Brand Development",
		items: [
			"Branding and brand identity design",
			"Graphic design and visual assets",
			"Strategic copywriting",
			"Video and visual storytelling",
			"Creative content development",
		],
		gradient: "from-pink-500 to-rose-600",
	},
	{
		title: "Websites and Digital Platforms",
		items: [
			"Website design and development",
			"E-commerce solutions across Shopify, WordPress, and WooCommerce",
			"Custom web functionality",
			"Landing page design",
			"Responsive design and ongoing optimization",
		],
		gradient: "from-orange-500 to-amber-500",
	},
	{
		title: "Digital Marketing and Growth",
		items: [
			"Search Engine Optimization (SEO)",
			"Pay Per Click (PPC)",
			"Social Media Marketing",
			"Marketing automation systems",
			"Campaign performance analytics",
		],
		gradient: "from-blue-600 to-indigo-600",
	},
];

const reasons = [
	{ title: "Data led decisions", active: true },
	{ title: "Goal focused campaigns", active: false },
	{ title: "Hands on experts", active: false },
	{ title: "Clear results tracking", active: false },
	{ title: "Continuous improvement", active: false },
];

const faqs = [
	{
		q: "What does digital marketing include?",
		a: "Digital marketing covers SEO, PPC, social media, content writing, web design, and analytics. At WebestOne, these services work together as an integrated growth system.",
	},
	{
		q: "How long does it take to see results?",
		a: "Paid campaigns typically show measurable results in 4 to 6 weeks. SEO and content marketing build compounding returns over 3 to 6 months.",
	},
	{
		q: "Do you offer custom digital marketing plans?",
		a: "Yes. Every plan is built around your specific industry, audience, budget, and goals. No templates. No copy-paste strategies.",
	},
];

const processSteps = [
	{
		title: "Discovery and Research",
		desc: "We begin by understanding your business, audience, industry landscape, and growth objectives.",
	},
	{
		title: "Strategy Development",
		desc: "Our team builds a focused digital strategy designed to reach the right audience and support measurable outcomes. A weak strategy breaks everything that follows. We fix that early.",
	},
	{
		title: "Execution and Optimization",
		desc: "Campaigns, content, and digital assets are developed and continuously refined for performance.",
	},
	{
		title: "Measurement and Insights",
		desc: "Performance data is analyzed to understand results, identify opportunities, and guide future improvements using data analytics.",
	},
	{
		title: "Continuous Growth",
		desc: "Strategies evolve over time to maintain momentum and support long term business growth.",
	},
];

export default function DigitalMarketingPage() {
	const [activeReason, setActiveReason] = useState(0);
	const [openFaq, setOpenFaq] = useState<number | null>(null);

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
							className="text-4xl md:text-5xl lg:text-5xl xl:text-[3.2rem] font-black leading-[1.15] tracking-tight"
						>
							Full Stack Digital <br className="hidden lg:block" /> Marketing Agency <br className="hidden sm:block lg:hidden" />
							Where <span className="text-neon-green">Strategy, Technology,</span> <br />
							<span className="text-neon-green">& Growth</span> Come Together
						</motion.h1>
						<motion.p
							variants={heroItem}
							className="text-neutral-400 text-lg leading-relaxed max-w-lg"
						>
							Digital marketing is no longer about doing more. It is about doing what works. At WebestOne, we help businesses grow with clarity, speed, and purpose. Our team blends experience with AI marketing solutions and AI driven services to help brands compete, adapt, and scale across digital channels worldwide.
						</motion.p>
						<motion.p
							variants={heroItem}
							className="text-white font-semibold text-lg leading-relaxed max-w-lg"
						>
							Most agencies focus on activity. We focus on outcomes you can measure.
						</motion.p>
						<motion.div variants={heroItem}>
							<Link to="/contact">
								<MagneticButton className="px-8 py-3 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-[0_0_30px_rgba(135,230,92,0.5)] transition-shadow hover:bg-[#87E65C]">
									Get In Touch
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
							<div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
								<motion.div
									whileHover={{ scale: 1.1 }}
									className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-transform"
								>
									<Play className="w-6 h-6 text-white fill-current ml-1" />
								</motion.div>
							</div>
							<div className="absolute inset-0 -z-10 bg-gradient-to-tr from-neutral-800 to-neutral-700"></div>
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
								Benefits
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white relative inline-block">
								Why should you use{" "}
								<span className="text-neon-green">
									digital marketing services?
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
								Most businesses do more marketing. Very few do better marketing. Modern growth demands smarter decisions built on clarity and discipline. Data, automation, and structured execution reduce waste, sharpen targeting, and improve performance. WebestOne focuses on outcomes that drive real business growth, not surface level metrics expected from a traditional digital marketing agency.
							</p>
							<div className="inline-block px-6 py-2 bg-neon-green/10 text-neon-green rounded-full font-bold border border-neon-green/30">
								Building tomorrow's trends today
							</div>
						</div>

						<div className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl group">
							<div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
								<div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
									<Play className="w-6 h-6 text-white fill-current ml-1" />
								</div>
							</div>
							<div className="absolute inset-0 -z-10 bg-gradient-to-bl from-blue-900/40 to-black"></div>
						</div>
					</div>
				</div>
			</section>

			{/* --- Advanced Digital Marketing Capabilities --- */}
			<section className="py-24 px-6 relative z-10 bg-black border-t border-white/5">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="space-y-4 text-center max-w-4xl mx-auto">
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							Advanced Capabilities
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block text-white">
							Advanced Digital Marketing Capabilities
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
							Execution gets you started. Depth is what scales results. While our core services focus on execution, WebestOne also delivers specialized capabilities as an AI based digital marketing agency and expert digital marketing service provider that strengthen visibility, improve performance, and support long term digital growth using Artificial Intelligence (AI), machine learning, and smarter AI driven services.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{advancedServices.map((service, index) => (
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
										<service.icon className="w-6 h-6" />
									</div>
									<h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors underline decoration-transparent group-hover:decoration-purple-400 underline-offset-4">
										{service.title}
									</h3>
								</div>
								<p className="text-sm text-neutral-400 leading-relaxed">
									{service.desc}
								</p>
							</motion.div>
						))}
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
							Performance
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white relative inline-block">
							Results-driven Marketing
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
						{[
							{
								icon: Monitor,
								title: "Web Design",
								desc: "Create a brand and communicate your value.",
							},
							{
								icon: Search,
								title: "SEO",
								desc: "Find new clients organically and grow a foundation.",
							},
							{
								icon: DollarSign,
								title: "PPC",
								desc: "Put your business in front of the right people today.",
							},
							{
								icon: Mail,
								title: "Email & SMS",
								desc: "Get more out of your current website visitors.",
							},
						].map((item, i) => (
							<motion.div
								key={i}
								whileHover={{ y: -10 }}
								className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-4 hover:border-neon-green/50 transition-colors"
							>
								<div className="p-4 rounded-full bg-white/5 border border-white/10 text-neon-green">
									<item.icon className="w-8 h-8" />
								</div>
								<h3 className="text-xl font-bold">{item.title}</h3>
								<p className="text-sm text-neutral-400">{item.desc}</p>
							</motion.div>
						))}
					</div>

					<div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-8 max-w-sm mx-auto mt-8 backdrop-blur-sm relative overflow-hidden group">
						<div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-[40px] pointer-events-none"></div>
						<div className="relative z-10 space-y-4">
							<div className="w-12 h-12 bg-yellow-500 text-black rounded-lg flex items-center justify-center mx-auto mb-4">
								<Share2 className="w-6 h-6" />
							</div>
							<h3 className="text-2xl font-bold text-yellow-400">
								Social Media
							</h3>
							<p className="text-neutral-300 text-sm">
								Increase awareness by engaging with your audience.
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
								Our Services
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block">
								Our AI Driven{" "}
								<span className="text-neon-green">Digital Marketing Services</span>
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
							Growth focused digital execution. If your marketing feels busy but not productive, this is where it breaks.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{coreServices.map((service, index) => (
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
										<service.icon className="w-6 h-6" />
									</div>
									<h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors underline decoration-transparent group-hover:decoration-blue-400 underline-offset-4">
										{service.title}
									</h3>
								</div>
								<p className="text-sm text-neutral-400 leading-relaxed">
									{service.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* --- Our Process Section --- */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950 border-t border-white/5">
				<div className="max-w-4xl mx-auto space-y-16">
					<div className="space-y-4">
						<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
							Our Process
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block text-white">
							Our Process
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
							At WebestOne, every project follows a structured approach designed to turn strategy into measurable growth used by every high-performing digital marketing agency.
						</p>
					</div>

					<div className="relative border-l border-white/10 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
						{processSteps.map((step, index) => (
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
							Integrated Solutions
						</span>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold relative inline-block">
							Integrated Digital Solutions
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
						{digitalServices.map((cat, i) => (
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
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{
							title: "SEO Strategy",
							desc: "Organic search strategies designed to improve visibility, attract qualified visitors, and support long term digital growth.",
							icon: Search,
							color: "text-orange-400",
						},
						{
							title: "Paid Advertising",
							desc: "Targeted advertising campaigns that connect brands with high intent audiences and generate measurable results.",
							icon: Monitor,
							color: "text-blue-400",
						},
						{
							title: "Paid Social Campaigns",
							desc: "Strategic social media advertising designed to increase reach, strengthen brand awareness, and drive audience engagement.",
							icon: Megaphone,
							color: "text-pink-400",
						},
						{
							title: "Data and Analytics",
							desc: "Performance tracking and marketing insights that help businesses understand behavior, measure results, and refine strategy.",
							icon: BarChart3,
							color: "text-green-400",
						},
					].map((pkg, i) => (
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
									<pkg.icon className={`w-6 h-6 ${pkg.color}`} />
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
					))}
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
								Why Choose Us
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 relative inline-block">
								Why choose WebestOne for{" "}
								<span className="text-neon-green">
									digital marketing services?
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
							Here's why it is vital to choose Webestone for a reliable digital
							marketing agency
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="space-y-4">
							{reasons.map((reason, i) => (
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
								FAQ
							</span>
							<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green relative inline-block">
								Frequently Asked Questions (FAQs)
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
							{faqs.map((faq, i) => (
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
					<span className="text-purple-500">SEO strategy forward</span>
				</h2>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Link to="/contact">
						<MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:bg-[#87E65C]">
							Book a discovery call
						</MagneticButton>
					</Link>
					<Link to="/contact">
						<MagneticButton className="px-8 py-4 bg-transparent border border-neon-green text-neon-green font-bold rounded-full transition-colors">
							Contact us
						</MagneticButton>
					</Link>
				</div>
			</section>
		</main>
	);
}
