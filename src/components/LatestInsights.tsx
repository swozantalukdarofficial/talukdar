import { motion } from "framer-motion";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const staticArticles = [
	{
		id: "1",
		date: "April 16, 2024",
		title: "Unlocking the Potential of AI in Business Success",
		image: "from-purple-900/50 to-blue-900/50",
		category: "AI & Tech",
	},
	{
		id: "2",
		date: "April 18, 2024",
		title: "Strategies for Building a Successful Distributed Team",
		image: "from-emerald-900/50 to-teal-900/50",
		category: "Management",
	},
	{
		id: "3",
		date: "April 20, 2024",
		title: "Empowering Citizen Developers and Accelerating Innovation",
		image: "from-orange-900/50 to-red-900/50",
		category: "Development",
	},
];

export default function LatestInsights({
	initialPosts,
}: {
	initialPosts?: any[];
}) {
	const displayPosts =
		initialPosts && initialPosts.length > 0 ?
			initialPosts.slice(0, 3)
		:	staticArticles;

	return (
		<section className="py-24 px-6 relative z-10 bg-slate-50">
			<div className="max-w-7xl mx-auto space-y-12">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-8 border-b border-slate-200">
					<div className="space-y-4">
						<span className="text-emerald-600 font-mono text-xs uppercase tracking-wider mb-2 block font-bold">
							Latest Blog &amp; Articles
						</span>
						<h2 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-2xl leading-tight">
							The latest insights <br /> you need to know
						</h2>
					</div>

					<Link
						to="/blogs"
						className="group flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-600/25"
					>
						<span>View All Articles</span>
						<MoveUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{displayPosts.map((article, index) => (
						<motion.article
							key={article.id || index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ y: -6 }}
							transition={{ duration: 0.4, delay: index * 0.08 }}
							viewport={{ once: true }}
							className="group cursor-pointer space-y-4"
						>
							<Link to={`/blogs/${article.id}`} className="block space-y-4">
								{/* Image Container */}
								<div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative shadow-md">
									<div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
										{article.image?.includes("from-") ?
											<div
												className={`w-full h-full bg-gradient-to-br ${article.image}`}
											></div>
										:	<img
												src={article.image}
												alt=""
												className="w-full h-full object-cover"
											/>
										}
									</div>

									<div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 border border-slate-200 shadow-sm">
										{article.category}
									</div>
								</div>

								{/* Content */}
								<div className="space-y-2">
									<div className="text-xs text-slate-500 font-medium">
										{article.date}
									</div>
									<h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
										{article.title}
									</h3>
									<div className="pt-2 flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
										<span>Read More</span>
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</div>
								</div>
							</Link>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
