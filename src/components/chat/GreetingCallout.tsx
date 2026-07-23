import React from "react";
import { X } from "lucide-react";

interface GreetingCalloutProps {
	onOpenChat: () => void;
	onDismiss: () => void;
}

export const GreetingCallout: React.FC<GreetingCalloutProps> = ({
	onOpenChat,
	onDismiss,
}) => {
	return (
		<div className="mb-3 bg-neutral-900/95 border border-white/15 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl w-[270px] sm:w-[290px] animate-in fade-in slide-in-from-bottom-4 duration-300 relative text-white">
			{/* Header Row */}
			<div className="flex items-center justify-between gap-2 mb-2">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-neutral-950 border border-neon-green/40 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
						<img src="/favicon.webp" alt="WeBestOne" className="w-full h-full object-cover rounded-full" loading="lazy" width="24" height="24" />
					</div>
					<span className="font-extrabold text-xs text-white tracking-wide">WeBestOne</span>
				</div>

				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onDismiss();
					}}
					className="p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
					aria-label="Dismiss greeting"
				>
					<X className="w-3.5 h-3.5" />
				</button>
			</div>

			{/* Interactive Message Content */}
			<div
				onClick={onOpenChat}
				className="cursor-pointer group text-xs text-neutral-300 hover:text-white transition-colors leading-relaxed"
			>
				👋 Hi there! Need help? We're online and ready to assist you.
			</div>
		</div>
	);
};
