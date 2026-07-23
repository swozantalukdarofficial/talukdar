import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";

type Service = {
	id: string;
	title: string;
	description: string;
	iconName: string;
	color: string;
	href: string;
};

// Dynamic Icon Component
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

export default function ServiceGrid({
	initialServices,
}: {
	initialServices: Service[];
}) {
	const services = initialServices;

	return (
		<section className="py-24 px-4 bg-slate-50 relative z-10 overflow-hidden">
			<div className="max-w-7xl mx-auto container">
				<div className="text-center mb-16 space-y-4">
					<motion.h2
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-bold text-slate-900"
					>
						Our Expertise
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-slate-600 max-w-2xl mx-auto"
					>
						From traditional web solutions to cutting-edge AI optimization
						strategies, we cover all aspects of your digital growth.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<Link to={service.href} key={index} className="block h-full">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								whileHover={{ y: -6, scale: 1.01 }}
								transition={{ duration: 0.3, delay: index * 0.04 }}
								viewport={{ once: true }}
								className="group relative p-8 h-full rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/40 transition-all duration-300 flex flex-col items-start gap-4 shadow-lg shadow-slate-200/50"
							>
								{/* Icon Container */}
								<div
									className={`p-3 rounded-xl bg-slate-50 border border-slate-200 ${service.color} group-hover:scale-110 transition-transform duration-300`}
								>
									<DynamicIcon name={service.iconName} className="w-8 h-8" />
								</div>

								{/* Text Content */}
								<div>
									<h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">
										{service.title}
									</h3>
									<p className="text-slate-600 text-sm leading-relaxed">
										{service.description}
									</p>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
