import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import aiRobotImg from "../assets/ai-robot.png";

export default function AiSeoPage() {
	const [activeFaq, setActiveFaq] = useState<number | null>(0);

	const stats = [
		{ label: "$ Revenue", sublabel: "Generated via SEO" },
		{ label: "Qualified Leads", sublabel: "Generated" },
	];

	const faqs = [
		{
			question: "Why choose an AI SEO service agency like WebestOne?",
			answer:
				"Because visibility without results is wasted. We operate as a proven AI SEO company focused on real growth and strong AI search visibility.",
		},
		{
			question: "Do you offer AI-based SEO services for Google SGE?",
			answer:
				"Yes. Our AI-based SEO services are designed for Google SGE, AI Overviews, and modern AI search systems.",
		},
		{
			question: "What makes your AI SEO solutions different?",
			answer:
				"We focus on clarity, intent, and LLM optimization, not just rankings.",
		},
		{
			question: "Can AI SEO improve visibility on Perplexity AI and Gemini?",
			answer:
				"Yes. We improve LLM visibility across both platforms.",
		},
		{
			question: "How long does it take to see results?",
			answer:
				"You will see early changes in months, with stronger results over time.",
		},
		{
			question: "Do you guarantee rankings?",
			answer:
				"No. We guarantee clear execution, transparency, and continuous improvement.",
		},
	];

	const workflowSteps = [
		{
			num: "1",
			title: "Research Your Niche",
			desc: "We study your market, competitors, and gaps to build a clear picture of where you stand and where opportunity exists.",
		},
		{
			num: "2",
			title: "Set Up Your Team",
			desc: "Experts are assigned based on what is needed for your specific industry, goals, and search environment.",
		},
		{
			num: "3",
			title: "Create a Game Plan",
			desc: "We build a plan with clear goals, defined timelines, and measurable targets tied to real business outcomes.",
		},
		{
			num: "4",
			title: "Review and Scale",
			desc: "We track results, identify what works, and continuously improve to ensure compounding, long-term growth.",
		},
	];

	const SectionHeading = ({
		topTitle,
		mainTitle,
		greenText,
	}: {
		topTitle: string;
		mainTitle: string;
		greenText?: string;
	}) => (
		<div className="inline-block mb-12 relative z-10 w-full text-center lg:text-left">
			<span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">
				{topTitle}
			</span>
			<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-white relative inline-block">
				{mainTitle}{" "}
				{greenText && (
					<span className="text-neon-green relative inline-block">
						{greenText}
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
					</span>
				)}
			</h2>
		</div>
	);

	return (
		<main className="min-h-screen bg-black text-white pt-24 overflow-hidden">
			{/* 1. Hero Section - Exact match to screenshot */}
			<section className="relative z-10 px-6 lg:px-20 py-12 md:py-16 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-10"
					>
						{/* Stats Row */}
						<div className="flex flex-wrap gap-8 md:gap-12">
							<div className="space-y-1">
								<h4 className="text-xl md:text-2xl font-bold text-white">$ Revenue</h4>
								<p className="text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold">Generated via SEO</p>
							</div>
							<div className="space-y-1">
								<h4 className="text-xl md:text-2xl font-bold text-white">Qualified Leads</h4>
								<p className="text-[10px] text-neutral-500 uppercase tracking-[0.1em] font-bold">Generated</p>
							</div>
						</div>

						{/* Main Heading */}
						<div className="space-y-2">
							<h1 className="text-3xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight uppercase">
								AI SEO Service Agency <br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
									That Turns Visibility <br />Into Predictable Growth
								</span>
							</h1>
						</div>

						{/* Description */}
						<p className="text-base md:text-lg text-neutral-300 max-w-lg leading-relaxed font-medium">
							WebestOne is not a typical AI SEO service agency. We build search systems that place your brand inside decisions before your competitors are even considered.
						</p>

						{/* Subtext */}
						<p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold max-w-lg leading-relaxed">
							RECOGNIZED AND TRUSTED BY BRANDS THAT EXPECT SEARCH TO DRIVE RESULTS
						</p>
					</motion.div>

					{/* Image Side */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, delay: 0.2 }}
						className="relative"
					>
						<div className="relative rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
							<img 
								src={aiRobotImg} 
								alt="AI SEO Robot" 
								className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
						</div>
						
						{/* Subtle Glows */}
						<div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
						<div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full"></div>
					</motion.div>
				</div>
			</section>

			{/* Divider / Transition */}
			<div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-12"></div>


			{/* 2. Workflow Timeline Track */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950 text-white border-b border-white/5">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="text-center relative">
						<SectionHeading
							topTitle="OUR DATA-DRIVEN PROCESS"
							mainTitle="Clear Steps,"
							greenText="Clear Results"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative pt-8">
						<div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-px border-t border-dashed border-white/20 z-0"></div>

						{workflowSteps.map((step, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
							>
								<div className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-indigo-500/50 flex items-center justify-center text-xl font-bold text-indigo-400 mb-2">
									{step.num}
								</div>
								<h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 w-full lg:w-3/4">
									{step.title}
								</h3>
								<p className="text-sm font-medium text-neutral-400 leading-relaxed">
									{step.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* 4. FAQs Section */}
			<section className="py-24 px-6 relative z-10 bg-black border-t border-white/5">
				<div className="max-w-4xl mx-auto space-y-16">
					<div className="text-center space-y-4 flex flex-col items-center">
						<SectionHeading
							topTitle="QUESTIONS & ANSWERS"
							mainTitle="FAQs About Our"
							greenText="SEO Company"
						/>
					</div>

					<div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-10 divide-y divide-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
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
									className="w-full flex items-center justify-between gap-6 text-left group"
								>
									<div className="flex items-center gap-4">
										<div
											className={`w-8 h-8 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
												activeFaq === i ?
													"bg-neon-green border-neon-green text-black rotate-180"
												:	"border-white/20 text-white group-hover:border-neon-green group-hover:text-neon-green"
											}`}
										>
											<Plus
												className={`w-4 h-4 transition-transform duration-300 ${
													activeFaq === i ? "rotate-45" : ""
												}`}
											/>
										</div>
										<h3
											className={`text-lg md:text-xl font-bold transition-colors ${
												activeFaq === i ? "text-white" : (
													"text-neutral-300 group-hover:text-white"
												)
											}`}
										>
											{faq.question}
										</h3>
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
											<p className="pt-6 pl-12 text-neutral-400 leading-relaxed font-medium">
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
