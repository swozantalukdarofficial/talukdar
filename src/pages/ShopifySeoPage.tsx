import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ShopifySeoPage() {
	const [activeFaq, setActiveFaq] = useState<number | null>(0);

	// FAQs Data
	const faqs = [
		{
			question: "What does Shopify SEO service include?",
			answer:
				"Our Shopify SEO service includes comprehensive keyword research, on-page optimization (titles, meta descriptions, alt tags), technical SEO audits (improving site speed, mobile responsiveness), backlink building, and content strategy tailored specifically for e-commerce growth.",
		},
		{
			question: "How long does Shopify SEO service take to show results?",
			answer:
				"While some technical fixes can yield immediate improvements, profound organic growth typically takes 3 to 6 months. SEO is a long-term strategy that builds compound, sustainable traffic over time.",
		},
		{
			question:
				"Why should I hire a Shopify SEO agency for my eCommerce business?",
			answer:
				"Shopify has unique technical quirks and URL structures that require specialized knowledge. An expert agency knows how to navigate these challenges, implement advanced schema markup for products, and execute strategies that actually drive revenue, not just empty traffic.",
		},
		{
			question: "How much does SEO for Shopify service cost?",
			answer:
				"Costs vary depending on the size of your store, your current baseline, and the competitiveness of your niche. We offer custom scalable packages designed to guarantee a positive ROI. Contact us for a free detailed audit and quote.",
		},
	];

	// Steps for Success Data
	const steps = [
		{
			title: "In-Depth Site Audit",
			desc: "We analyze your store's architecture, pinpointing technical roadblocks and indexing issues.",
		},
		{
			title: "Keyword & Competitor Research",
			desc: "Identifying high-intent, low-competition product keywords that your competitors are missing.",
		},
		{
			title: "On-Page Optimization",
			desc: "Restructuring your product descriptions, category pages, and metadata for maximum relevance.",
		},
		{
			title: "Technical SEO Fixes",
			desc: "Enhancing site speed, mobile responsiveness, and implementing crucial e-commerce schema markup.",
		},
		{
			title: "Content & Link Building",
			desc: "Publishing blog content and securing authoritative backlinks to boost your domain authority.",
		},
		{
			title: "Tracking & Iteration",
			desc: "Continuous monitoring of rankings, traffic, and conversions to refine and scale the strategy.",
		},
	];

	// Masonry Grid Data
	const masonryItems = [
		{
			title: "Custom Strategies",
			desc: "We build custom SEO plans that align with your unique business goals, eschewing one-size-fits-all approaches.",
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
			className: "md:col-span-2 md:row-span-2",
		},
		{
			title: "Sustainable Success",
			desc: "We aim for steady, reliable business growth and loyal customers.",
			image:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
			className: "md:col-span-1 md:row-span-1",
		},
		{
			title: "A/B Testing",
			desc: "Rigorous testing to refine campaigns and ensure peak performance.",
			image:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
			className: "md:col-span-1 md:row-span-1",
		},
		{
			title: "Performance Tracking",
			desc: "Detailed analytics providing crystal-clear transparency on your ROI.",
			image:
				"https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop",
			className: "md:col-span-2 md:row-span-1",
		},
	];

	return (
		<main className="min-h-screen bg-black text-white pt-24 overflow-x-hidden">
			{/* 1. Hero Section */}
			<section className="relative pt-12 lg:pt-20 pb-20 px-6 z-10">
				{/* Background Glow */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
					<div className="absolute top-20 left-10 w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full"></div>
					<div className="absolute top-40 right-10 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full"></div>
				</div>

				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
							Shopify SEO <br />
							<span className="text-neon-green">Services</span>
						</h1>

						<p className="text-lg text-neutral-300 leading-relaxed font-medium">
							Get your Shopify store in front of the right audience and grow
							faster with Webestone's Shopify SEO services. Our SEO services
							help your Shopify-powered online store rank higher, attract the
							right customers, and boost conversions.
						</p>

						<ul className="space-y-3 pt-2">
							{[
								"More Organic Traffic, Conversions & Revenue",
								"Outrank Your Competitors & Build Brand Position",
								"Greater Productivity and Efficiency",
							].map((item, idx) => (
								<li
									key={idx}
									className="flex items-center gap-3 text-neutral-200 font-medium"
								>
									<CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0" />
									{item}
								</li>
							))}
						</ul>

						<div className="pt-6">
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
							src="/shopify_seo_hero.png"
							alt="Shopify SEO E-commerce Illustration"
							className="w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-[0_0_50px_rgba(135,230,92,0.25)] hover:-translate-y-4 transition-transform duration-700"
						/>
					</motion.div>
				</div>
			</section>

			{/* 2. Grow Your eCommerce Business Section */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950/50 border-y border-white/5">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="order-2 lg:order-1 relative rounded-3xl p-8 flex items-center justify-center"
					>
						<div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 to-transparent blur-2xl rounded-full"></div>
						<img
							src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
							alt="Shopify E-commerce Growth Dashboard"
							className="w-full max-w-md lg:max-w-lg relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
						/>
					</motion.div>

					{/* Right Text */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="order-1 lg:order-2 space-y-6"
					>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight relative inline-block">
							Grow Your eCommerce Business <br />
							<span className="text-neon-green">through Shopify SEO</span>
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
						</h2>
						<p className="text-lg text-neutral-300 leading-relaxed font-medium">
							We help Shopify brands grow through customized marketing
							strategies, from technical foundations to deep analytics. Our team
							studies your store's performance, builds high-converting landing
							pages, and drives high-intent shoppers directly to your
							storefront.
						</p>
						<p className="text-lg text-neutral-300 leading-relaxed font-medium">
							We focus on increasing repeat purchases, optimizing your sales
							funnel, and continuously tracking ROI. With ongoing store
							optimization, we ensure your Shopify store is always ready for
							explosive growth.
						</p>
					</motion.div>
				</div>
			</section>

			{/* 3. Steps for Shopify SEO Success */}
			<section className="py-24 px-6 relative z-10">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="text-center space-y-4">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green leading-tight relative inline-block"
						>
							Steps for Shopify SEO Success
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

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{steps.map((step, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className="bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:bg-neutral-800/80 hover:border-neon-green/30 transition-all duration-300 group flex flex-col justify-between min-h-[300px]"
							>
								<div className="space-y-4">
									<h3 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors">
										{step.title}
									</h3>
									<p className="text-neutral-400 font-medium leading-relaxed">
										{step.desc}
									</p>
								</div>

								<div className="mt-8">
									<Link
										to="/contact"
										className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors font-sm w-max"
									>
										Get started
									</Link>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* 4. Why Choose Us (Masonry Grid) */}
			<section className="py-24 px-6 relative z-10 bg-neutral-950/30 border-t border-white/5">
				<div className="max-w-7xl mx-auto space-y-16">
					<div className="text-center space-y-4">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-3xl md:text-4xl xl:text-5xl font-bold text-neon-green leading-tight relative inline-block"
						>
							Why Choose Us
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

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
						{masonryItems.map((item, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.1 }}
								className={`relative overflow-hidden rounded-3xl group ${item.className}`}
							>
								{/* Image Background */}
								<img
									src={item.image}
									alt={item.title}
									className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 brightness-50 mix-blend-luminosity hover:mix-blend-normal hover:opacity-80"
								/>

								{/* Dark Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
								<div className="absolute inset-0 bg-neon-green/5 mix-blend-overlay"></div>

								{/* Content */}
								<div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
									<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
										<h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
											{item.title}
										</h3>
										<p className="text-neutral-300 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
											{item.desc}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* 5. FAQs Section */}
			<section className="py-24 px-6 relative z-10 border-t border-white/5">
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
