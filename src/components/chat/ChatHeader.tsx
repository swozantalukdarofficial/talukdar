import React from "react";
import { MessageSquare, FileText, Search, Minus, X, Phone, Sparkles, RotateCcw } from "lucide-react";
import { ChatTab } from "./types";

interface ChatHeaderProps {
	activeTab: ChatTab;
	setActiveTab: (tab: ChatTab) => void;
	onClose: () => void;
	onMinimize?: () => void;
	onReset?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
	activeTab,
	setActiveTab,
	onClose,
	onMinimize,
	onReset,
}) => {
	return (
		<div className="bg-neutral-900/90 text-white flex-shrink-0 border-b border-white/10">
			{/* Top Navigation Tabs */}
			<div className="grid grid-cols-4 border-b border-white/10 bg-neutral-950/60 text-xs font-semibold">
				<button
					onClick={() => setActiveTab("messages")}
					className={`py-2 px-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border-b-2 ${
						activeTab === "messages"
							? "bg-neutral-800/80 text-neon-green border-neon-green font-bold"
							: "text-neutral-400 hover:text-white hover:bg-neutral-800/30 border-transparent"
					}`}
				>
					<MessageSquare className="w-3.5 h-3.5" />
					<span>Messages</span>
				</button>

				<button
					onClick={() => setActiveTab("articles")}
					className={`py-2 px-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border-b-2 ${
						activeTab === "articles"
							? "bg-neutral-800/80 text-neon-green border-neon-green font-bold"
							: "text-neutral-400 hover:text-white hover:bg-neutral-800/30 border-transparent"
					}`}
				>
					<FileText className="w-3.5 h-3.5" />
					<span>Articles</span>
				</button>

				<button
					onClick={() => setActiveTab("search")}
					className={`py-2 px-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border-b-2 ${
						activeTab === "search"
							? "bg-neutral-800/80 text-neon-green border-neon-green font-bold"
							: "text-neutral-400 hover:text-white hover:bg-neutral-800/30 border-transparent"
					}`}
				>
					<Search className="w-3.5 h-3.5" />
					<span>Search</span>
				</button>

				<button
					onClick={() => setActiveTab("whatsapp")}
					className={`py-2 px-1 flex items-center justify-center gap-1.5 transition-all cursor-pointer border-b-2 ${
						activeTab === "whatsapp"
							? "bg-[#25D366]/20 text-[#25D366] border-[#25D366] font-bold"
							: "text-neutral-400 hover:text-white hover:bg-neutral-800/30 border-transparent"
					}`}
				>
					<Phone className="w-3.5 h-3.5" />
					<span>WhatsApp</span>
				</button>
			</div>

			{/* Main Branding Header Bar */}
			<div className="p-3.5 flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* Logo Avatar */}
					<div className="w-9 h-9 rounded-full bg-neutral-950 border border-neon-green/40 flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
						<img src="/favicon.png" alt="WeBestOne Logo" className="w-full h-full object-cover rounded-full" />
					</div>

					<div>
						<div className="flex items-center gap-2">
							<h3 className="font-extrabold text-sm leading-tight text-white tracking-wide">
								WeBestOne AI
							</h3>
							<span className="flex items-center gap-1 text-[10px] font-semibold text-neon-green bg-neon-green/10 px-2 py-0.5 rounded-full border border-neon-green/20">
								<span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" />
								Online
							</span>
						</div>
						<p className="text-neutral-400 text-[10px] font-medium mt-0.5">
							Official Digital Growth Consultant
						</p>
					</div>
				</div>

				{/* Header Actions */}
				<div className="flex items-center gap-1">
					{onReset && (
						<button
							onClick={onReset}
							className="p-1.5 text-neutral-400 hover:text-neon-green hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
							title="Reset Chat & Restart"
							aria-label="Reset Chat"
						>
							<RotateCcw className="w-3.5 h-3.5" />
						</button>
					)}
					<button
						onClick={onMinimize || onClose}
						className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
						title="Minimize"
						aria-label="Minimize"
					>
						<Minus className="w-4 h-4" />
					</button>
					<button
						onClick={onClose}
						className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
						title="Close"
						aria-label="Close"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};
