import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import { useContent } from "../context/ContentContext";
import AdminServiceImageEditor from "../components/admin/AdminServiceImageEditor";

const shopifySeoSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "BreadcrumbList",
			"@id": "https://webestone.com/services/shopify-seo-service-agency#breadcrumb",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://webestone.com"
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Services",
					"item": "https://webestone.com/services"
				},
				{
					"@type": "ListItem",
					"position": 3,
					"name": "Shopify SEO Services",
					"item": "https://webestone.com/services/shopify-seo-service-agency"
				}
			]
		},
		{
			"@type": "Service",
			"serviceType": "Shopify SEO Services",
			"provider": {
				"@type": "LocalBusiness",
				"name": "WeBestOne",
				"url": "https://webestone.com",
				"logo": "https://webestone.com/favicon.png"
			},
			"areaServed": "BD",
			"description": "Professional Shopify SEO services to optimize product & collection pages, fix technical SEO issues, and drive targeted organic traffic."
		},
		{
			"@type": "FAQPage",
			"mainEntity": [
				{
					"@type": "Question",
					"name": "What does a Shopify SEO service include?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Our Shopify SEO services include keyword research, product and collection page optimization, technical SEO fixes, content strategy, and ongoing performance tracking."
					}
				},
				{
					"@type": "Question",
					"name": "How long does Shopify SEO take to show results?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Initial improvements can appear within weeks, but consistent growth in organic traffic requires continuous optimization and authority building."
					}
				},
				{
					"@type": "Question",
					"name": "Why hire a Shopify SEO service agency?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "A Shopify SEO service agency ensures your store is optimized for search visibility, user experience, and conversion rate optimization, which most stores fail to achieve on their own."
					}
				},
				{
					"@type": "Question",
					"name": "What tools do you use for Shopify SEO?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "We use Google Analytics, Google Search Console, Ahrefs, and SEMrush to analyze data, track performance, and improve SEO results."
					}
				},
				{
					"@type": "Question",
					"name": "How does Shopify SEO improve conversions?",
					"acceptedAnswer": {
						"@type": "Answer",
						"text": "Shopify SEO improves conversions by aligning content with search intent, improving user experience, optimizing product pages, and increasing targeted organic traffic."
					}
				}
			]
		}
	]
};

export default function ShopifySeoPage() {
	const { serviceImages } = useContent();
	const [activeFaq, setActiveFaq] = useState<number | null>(0);

	const growthImg = serviceImages?.["shopify-seo-service-agency_growth"] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop";
	const masonry1 = serviceImages?.["shopify-seo-service-agency_masonry_1"] || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop";
	const masonry2 = serviceImages?.["shopify-seo-service-agency_masonry_2"] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop";
	const masonry3 = serviceImages?.["shopify-seo-service-agency_masonry_3"] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop";
	const masonry4 = serviceImages?.["shopify-seo-service-agency_masonry_4"] || "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=600&auto=format&fit=crop";

	// FAQs Data
	const faqs = [
		{ question: "What does a Shopify SEO service include", answer: "Our Shopify SEO services include keyword research, product and collection page optimization, technical SEO fixes, content strategy, and ongoing performance tracking." },
		{ question: "How long does Shopify SEO take to show results", answer: "Initial improvements can appear within weeks, but consistent growth in organic traffic requires continuous optimization and authority building." },
		{ question: "Why hire a Shopify SEO service agency", answer: "A Shopify SEO service agency ensures your store is optimized for search visibility, user experience, and conversion rate optimization, which most stores fail to achieve on their own." },
		{ question: "What tools do you use for Shopify SEO", answer: "We use Google Analytics, Google Search Console, Ahrefs, and SEMrush to analyze data, track performance, and improve SEO results." },
		{ question: "How does Shopify SEO improve conversions", answer: "Shopify SEO improves conversions by aligning content with search intent, improving user experience, optimizing product pages, and increasing targeted organic traffic." },
	];

	// Steps for Success Data
	const steps = [
		{ title: "In-depth Shopify SEO audit", desc: "We analyze crawlability, indexing, and Core Web Vitals using Google Search Console, Ahrefs, and SEMrush to identify technical gaps." },
		{ title: "Keyword and search intent strategy", desc: "We identify high-value keywords based on search intent, impressions, and competitive opportunities within Google." },
		{ title: "Product, collection, and category page optimization", desc: "We improve Shopify store optimization services across product pages, collections, and category structures to increase click-through rate and rankings." },
		{ title: "Technical Shopify website optimization", desc: "We resolve mobile-first indexing issues, improve site structure, and enhance performance through Shopify UX optimization for better visibility, usability, and crawlability." },
		{ title: "Content, E-E-A-T, and authority building", desc: "We strengthen E-E-A-T signals, build topical authority, and improve organic traffic through structured content and relevance." },
		{ title: "Tracking and continuous optimization", desc: "We use Google Analytics to track bounce rate, conversion rate optimization, and performance, then refine strategies based on real data." },
	];

	// Masonry Grid Data
	const masonryItems = [
		{ title: "Performance-focused Shopify SEO approach", desc: "As a Shopify SEO service agency, we focus on performance, not generic execution.", image: masonry1, className: "md:col-span-2 md:row-span-2" },
		{ title: "Revenue-focused strategy", desc: "Our Shopify website optimization service is built to improve conversion rate, not just increase traffic.", image: masonry2, className: "md:col-span-1 md:row-span-1" },
		{ title: "Data-driven optimization", desc: "We use data from Google, analytics tools, and search behavior to guide every decision.", image: masonry3, className: "md:col-span-1 md:row-span-1" },
		{ title: "Continuous Shopify store optimization services", desc: "Our Shopify store optimization services improve user experience, rankings, and long-term scalability.", image: masonry4, className: "md:col-span-2 md:row-span-1" },
	];

	return (
		<main className="min-h-screen bg-black text-white overflow-x-hidden relative">
			<AdminServiceImageEditor serviceId="shopify-seo-service-agency" />
			<SEO 
				pageKey="shopify-seo-service-agency"
				title="Shopify SEO Service Agency | Shopify store Optimization services" 
				description="Shopify SEO Service Agency driving growth through AI-driven Shopify SEO expert team, keyword research and high-performing Shopify store Optimization services." 
				schemaMarkup={shopifySeoSchema}
			/>
			<section className="relative min-h-screen flex items-center pt-28 pb-16 px-6 z-10">
				{/* Background Glow */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
					<div className="absolute top-10 left-10 w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full"></div>
					<div className="absolute top-20 right-10 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full"></div>
				</div>

				<div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-4 md:space-y-5 order-2 lg:order-1"
					>
						<h1 className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black leading-tight">
							Shopify SEO service agency focused on <br className="hidden md:inline" />
							<span className="text-neon-green">rankings, traffic, and revenue growth</span>
						</h1>

						<div className="space-y-2.5 text-sm md:text-base text-neutral-300 leading-relaxed font-medium">
							<p className="text-white font-bold border-l-2 border-[#87E65C]/40 pl-3">
								Getting traffic to your Shopify store is not the problem. <br />
								<span className="text-neon-green">Getting the right traffic that converts is.</span>
							</p>
							<p className="text-sm">
								As a Shopify SEO service agency, WebestOne helps your store rank higher on Google, attract high-intent buyers, and turn organic traffic into consistent revenue.
							</p>
						</div>

						<ul className="space-y-2.5 pt-1">
							{[
								"More organic traffic that converts into revenue",
								"Outrank competitors and strengthen your market position",
								"Smarter Shopify website optimization for scalable growth",
							].map((item, idx) => (
								<li
									key={idx}
									className="flex items-center gap-3 text-neutral-200 text-sm font-medium"
								>
									<CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
									{item}
								</li>
							))}
						</ul>

						<div className="pt-2">
							<Link
								to="/contact-us"
								className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neon-green text-black font-bold text-sm rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(135,230,92,0.3)] transition-all duration-300 hover:bg-[#87E65C]"
							>
								Get a quote
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</motion.div>

					{/* Image Column */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative z-10 flex justify-center lg:justify-end order-1 lg:order-2"
					>
						<img
							src={serviceImages["shopify-seo-service-agency"] || "/shopify_seo_hero.webp"}
							alt="Shopify SEO Service Agency"
							className="w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-[0_0_50px_rgba(135,230,92,0.25)] hover:-translate-y-4 transition-transform duration-700"
						/>
					</motion.div>
				</div>
			</section>

			{/* 2. Grow Your eCommerce Business Section */}
			<section className="py-12 md:py-16 px-6 relative z-10 bg-neutral-950/50 border-y border-white/5">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Image */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="order-1 lg:order-1 relative rounded-3xl p-8 flex items-center justify-center"
					>
						<div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 to-transparent blur-2xl rounded-full"></div>
						<img
							src={growthImg}
							alt="Shopify E-commerce Growth Dashboard"
							className="w-full max-w-md lg:max-w-lg relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
						/>
					</motion.div>

					{/* Right Text */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="order-2 lg:order-2 space-y-6"
					>
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight relative inline-block">
							Grow your ecommerce business <br />
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
							<span className="text-white font-bold">Traffic alone does not grow a Shopify store. Conversions do.</span> <br />
							As a Shopify SEO expert and Shopify SEO service provider, WebestOne delivers Shopify website optimization services focused on search intent, user experience, and performance.
						</p>
						<p className="text-lg text-neutral-300 leading-relaxed font-medium">
							We improve visibility, strengthen product discovery, and turn organic traffic into measurable results.
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
										to="/contact-us"
										className="inline-block px-6 py-2.5 bg-neon-green text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:bg-[#87E65C] transition-all duration-300 font-sm w-max"
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

			{/* 6. Final CTA Section */}
			<section className="py-24 px-6 relative z-10 bg-black">
				<div className="max-w-6xl mx-auto">
					<div className="relative p-12 md:p-20 rounded-[3rem] bg-neutral-900/40 border border-white/5 overflow-hidden group">
						<div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-neon-green/5 blur-[120px] pointer-events-none" />
						
						<div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
							<h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
								Ready to scale your <br className="hidden md:block" />
								<span className="text-neon-green">Shopify store with SEO</span>
							</h2>
							<div className="text-neutral-400 text-base md:text-lg leading-relaxed space-y-4 max-w-xl mx-auto font-medium">
								<p className="text-neutral-200 font-bold text-lg md:text-xl">
									If your store is not ranking, not converting, or not growing, the issue is not traffic. It is your SEO system.
								</p>
								<p>
									WebestOne is a Shopify SEO service agency that improves organic traffic, strengthens conversion rate optimization, and builds scalable ecommerce growth.
								</p>
							</div>
							<div className="pt-4">
								<Link to="/contact-us" className="inline-flex items-center gap-2.5 px-10 py-5 bg-neon-green text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-[0_10px_40px_rgba(135,230,92,0.3)] group">
									Get a quote
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
