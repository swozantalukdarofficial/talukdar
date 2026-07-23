import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Target, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export default function WhyChooseUs() {
	return (
		<section className="py-24 px-6 bg-slate-50 relative">
			{/* Subtle Background Glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16 sm:mb-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
							<span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
							<span className="text-emerald-700 font-mono text-xs font-semibold tracking-wider uppercase">
								Why WeBestOne
							</span>
						</div>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
							We Build Resilient <br className="hidden md:block" />
							<span className="text-emerald-600">
								AI Growth Engines.
							</span>
						</h2>
						<p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
							Stop settling for average results. We integrate design, technology, and AI marketing to create seamless customer experiences that drive real business impact.
						</p>
					</motion.div>
				</div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1: Large - Data Driven */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 hover:border-emerald-500/40 transition-all shadow-lg shadow-slate-200/50"
					>
						<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
							<TrendingUp className="w-32 h-32 text-emerald-600" />
						</div>
						<div className="relative z-10">
							<div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-8">
								<BarChart3 className="w-7 h-7 text-emerald-600" />
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Data-Driven ROI</h3>
							<p className="text-slate-600 text-lg leading-relaxed max-w-md">
								We don't guess. Every campaign, content piece, and ad is backed by Google Analytics, Search Console data, and AI insights to ensure maximum return on your investment.
							</p>
						</div>
					</motion.div>

					{/* Card 2: Transparency */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 hover:border-blue-500/40 transition-all shadow-lg shadow-slate-200/50"
					>
						<div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-8">
							<ShieldCheck className="w-7 h-7 text-blue-600" />
						</div>
						<h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Full Transparency</h3>
						<p className="text-slate-600 leading-relaxed">
							Clear reporting, open communication, and absolute clarity on where every dollar goes. No black boxes. No hidden fees.
						</p>
					</motion.div>

					{/* Card 3: Fast Execution */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="md:col-span-1 group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 hover:border-amber-500/40 transition-all shadow-lg shadow-slate-200/50"
					>
						<div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-8">
							<Zap className="w-7 h-7 text-amber-600" />
						</div>
						<h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Agile Execution</h3>
						<p className="text-slate-600 leading-relaxed">
							We move fast. Rapid testing, AI-powered iteration, and continuous scaling keep you ahead of competitors stuck in quarterly review cycles.
						</p>
					</motion.div>

					{/* Card 4: Large - Precision Targeting */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 hover:border-purple-500/40 transition-all shadow-lg shadow-slate-200/50 flex flex-col justify-center"
					>
						<div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
							<Target className="w-40 h-40 text-purple-600" />
						</div>
						<div className="relative z-10">
							<div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-8">
								<Target className="w-7 h-7 text-purple-600" />
							</div>
							<h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Precision Targeting</h3>
							<p className="text-slate-600 text-lg leading-relaxed max-w-md">
								We don't chase traffic. We attract high-intent prospects ready to convert into loyal customers using advanced audience segmentation and machine learning.
							</p>
						</div>
					</motion.div>
				</div>

				<div className="mt-16 flex justify-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<MagneticButton className="px-8 py-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-full font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 group">
							<span>Start Growing Today</span>
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</MagneticButton>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
