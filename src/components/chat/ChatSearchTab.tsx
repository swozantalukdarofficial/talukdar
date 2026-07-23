import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";

interface SearchItem {
	title: string;
	desc: string;
	link: string;
	tag: string;
}

const SEARCH_DATABASE: SearchItem[] = [
	{ title: "Full Stack Digital Marketing", desc: "SEO, PPC, Social Media, Growth Strategy", link: "/services/digital-marketing-agency", tag: "Service" },
	{ title: "AI SEO & Content Strategy", desc: "Automated keyword ranking & high-intent organic traffic", link: "/services/AI-SEO-Service-Agency", tag: "Service" },
	{ title: "Shopify Store & SEO Services", desc: "High converting e-commerce web stores", link: "/services/shopify-website-development-service", tag: "Service" },
	{ title: "Custom Web Development", desc: "React, Next.js, Tailwind, Node.js applications", link: "/services/custom-web-development-services", tag: "Service" },
	{ title: "WordPress Website Development", desc: "Speed optimization, custom themes & plugins", link: "/services/wordpress-website-development-services", tag: "Service" },
	{ title: "Video Editing & Motion Graphics", desc: "Professional video production & 2D/3D animation", link: "/services/professional-video-editing-services", tag: "Service" },
	{ title: "Our Portfolio / Selected Work", desc: "Case studies & live client projects showcase", link: "/work", tag: "Work" },
	{ title: "About WeBestOne & Leadership", desc: "Founder Rozi Osman & Lead Dev Shipon Talukdar", link: "/about-us", tag: "About" },
	{ title: "Contact Us & Free Quote", desc: "Get in touch or book a growth call", link: "/contact-us", tag: "Contact" },
];

interface ChatSearchTabProps {
	onClose: () => void;
	onSelectQuery?: (q: string) => void;
}

export const ChatSearchTab: React.FC<ChatSearchTabProps> = ({ onClose }) => {
	const [query, setQuery] = useState("");

	const filtered = SEARCH_DATABASE.filter(
		(item) =>
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.desc.toLowerCase().includes(query.toLowerCase()) ||
			item.tag.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar bg-neutral-950/80 text-white flex flex-col">
			{/* Search Input Bar */}
			<div className="relative">
				<Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search services, portfolio, contact info..."
					className="w-full bg-neutral-900 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-neon-green/50 transition-colors placeholder:text-neutral-500"
					autoFocus
				/>
			</div>

			<div className="flex-1 space-y-2">
				<p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
					{query ? `Results (${filtered.length})` : "Popular Quick Links"}
				</p>

				{filtered.length === 0 ? (
					<div className="p-6 text-center text-neutral-400 text-xs">
						No results found for "{query}". Try asking our AI assistant directly!
					</div>
				) : (
					filtered.map((item, idx) => (
						<Link
							key={idx}
							to={item.link}
							onClick={onClose}
							className="block p-3 bg-neutral-900 border border-white/10 hover:border-neon-green/50 rounded-2xl transition-all shadow-sm group cursor-pointer"
						>
							<div className="flex items-center justify-between gap-2">
								<h5 className="font-bold text-xs text-white group-hover:text-neon-green transition-colors flex items-center gap-1.5">
									<span>{item.title}</span>
									<ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neon-green transition-colors" />
								</h5>
								<span className="text-[9px] font-bold text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded border border-neon-green/20">
									{item.tag}
								</span>
							</div>
							<p className="text-[11px] text-neutral-400 mt-0.5">
								{item.desc}
							</p>
						</Link>
					))
				)}
			</div>
		</div>
	);
};
