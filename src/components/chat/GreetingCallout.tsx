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
		<div className="mb-3 bg-white border border-slate-200 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl w-[270px] sm:w-[290px] animate-in fade-in slide-in-from-bottom-4 duration-300 relative text-slate-900">
			{/* Header Row */}
			<div className="flex items-center justify-between gap-2 mb-2">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-slate-100 border border-emerald-500/40 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
						<img src="/favicon.webp" alt="WeBestOne" className="w-full h-full object-cover rounded-full" loading="lazy" width="24" height="24" />
					</div>
					<span className="font-extrabold text-xs text-slate-900 tracking-wide">WeBestOne</span>
				</div>

				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onDismiss();
					}}
					className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
					aria-label="Dismiss greeting"
				>
					<X className="w-3.5 h-3.5" />
				</button>
			</div>

			{/* Interactive Message Content */}
			<div
				onClick={onOpenChat}
				className="cursor-pointer group text-xs text-slate-600 hover:text-slate-900 transition-colors leading-relaxed font-medium"
			>
				👋 Hi there! Need help? We're online and ready to assist you.
			</div>
		</div>
	);
};
