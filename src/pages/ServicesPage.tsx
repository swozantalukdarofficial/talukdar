import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import servicesData from "../data/services.json";

const DynamicIcon = ({
	name,
	className,
}: {
	name: string;
	className?: string;
}) => {
	// @ts-ignore
	const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
	return <Icon className={className} />;
};

export default function ServicesPage() {
	const services = servicesData.filter((s) => s.description);

	return (
		<main className="min-h-screen text-white pt-20">
			{/* Background */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[150px]" />
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
			</div>

			{/* Header */}
			<section className="relative py-24 px-6 text-center z-10">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					className="max-w-4xl mx-auto space-y-6"
				>
					<span className="inline-block px-4 py-2 bg-neon-green/10 text-neon-green rounded-full text-sm font-bold border border-neon-green/30 uppercase tracking-wide">
						Our Services
					</span>
					<h1 className="text-5xl md:text-7xl font-bold">
						What We{" "}
						<span className="bg-gradient-to-r from-neon-green to-blue-400 bg-clip-text text-transparent">
							Offer
						</span>
					</h1>
					<p className="text-xl text-neutral-400 max-w-2xl mx-auto">
						From traditional web solutions to cutting-edge AI optimization
						strategies, we cover all aspects of your digital growth.
					</p>
				</motion.div>
			</section>

			{/* Services Grid */}
			<section className="px-6 pb-24 max-w-7xl mx-auto relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<Link to={service.href} key={service.id} className="block h-full">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								whileHover={{ y: -8, scale: 1.02 }}
								transition={{ duration: 0.3, delay: index * 0.04 }}
								className="group relative p-8 h-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-neon-green/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col items-start gap-4 shadow-lg"
							>
								<div
									className={`p-3 rounded-xl bg-white/5 border border-white/5 ${service.color} group-hover:scale-110 transition-transform duration-300`}
								>
									<DynamicIcon name={service.iconName} className="w-8 h-8" />
								</div>
								<div>
									<h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-green transition-colors">
										{service.title}
									</h3>
									<p className="text-neutral-400 text-sm leading-relaxed">
										{service.description}
									</p>
								</div>
								<div className="mt-auto pt-4 text-neon-green text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									Learn More →
								</div>
								<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
							</motion.div>
						</Link>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 px-6 text-center border-t border-white/5 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="max-w-2xl mx-auto space-y-6"
				>
					<h2 className="text-4xl font-bold text-white">
						Ready to grow your business?
					</h2>
					<p className="text-neutral-400">
						Let's discuss which services will have the biggest impact on your
						goals.
					</p>
					<Link
						to="/contact"
						className="inline-block px-8 py-4 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(135,230,92,0.3)] hover:shadow-[0_0_30px_rgba(135,230,92,0.5)] transition-all"
					>
						Get In Touch
					</Link>
				</motion.div>
			</section>
		</main>
	);
}
