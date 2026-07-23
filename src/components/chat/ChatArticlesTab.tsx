import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Clock } from "lucide-react";
import { HELP_ARTICLES } from "./types";

interface ChatArticlesTabProps {
	onClose: () => void;
}

export const ChatArticlesTab: React.FC<ChatArticlesTabProps> = ({ onClose }) => {
	return (
		<div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar bg-neutral-950/80 text-white">
			<div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
				<FileText className="w-4 h-4 text-neon-green" />
				<h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400">
					Helpful Articles & Guides
				</h4>
			</div>

			<div className="space-y-2.5">
				{HELP_ARTICLES.map((article) => (
					<Link
						key={article.id}
						to={article.link}
						onClick={onClose}
						className="block p-3.5 bg-neutral-900 border border-white/10 hover:border-neon-green/50 rounded-2xl transition-all shadow-sm group cursor-pointer"
					>
						<div className="flex items-center justify-between gap-2 mb-1">
							<span className="text-[10px] font-bold text-neon-green bg-neon-green/10 px-2 py-0.5 rounded-md border border-neon-green/20">
								{article.category}
							</span>
							<div className="flex items-center gap-1 text-[10px] text-neutral-400">
								<Clock className="w-3 h-3" />
								<span>{article.readTime}</span>
							</div>
						</div>

						<h5 className="font-bold text-xs text-white group-hover:text-neon-green transition-colors flex items-center justify-between gap-1">
							<span>{article.title}</span>
							<ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-neon-green shrink-0" />
						</h5>

						<p className="text-[11px] text-neutral-400 mt-1 leading-snug">
							{article.excerpt}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};
