import React, { useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export interface ToastNotice {
	id: string;
	title?: string;
	message: string;
	type?: "info" | "success" | "warning";
}

interface ToastPopupProps {
	notice: ToastNotice | null;
	onClose: () => void;
}

export const ToastPopup: React.FC<ToastPopupProps> = ({ notice, onClose }) => {
	useEffect(() => {
		if (!notice) return;
		const timer = setTimeout(() => {
			onClose();
		}, 4000);
		return () => clearTimeout(timer);
	}, [notice, onClose]);

	if (!notice) return null;

	const getIcon = () => {
		switch (notice.type) {
			case "success":
				return <CheckCircle2 className="w-5 h-5 text-neon-green shrink-0" />;
			case "warning":
				return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
			default:
				return <Sparkles className="w-5 h-5 text-neon-green shrink-0" />;
		}
	};

	return (
		<div className="absolute top-16 left-3 right-3 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
			<div className="bg-neutral-900/95 backdrop-blur-xl border border-neon-green/30 rounded-2xl p-3.5 shadow-xl shadow-black/80 flex items-start gap-3 relative overflow-hidden text-white">
				{/* Left indicator bar */}
				<div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-green" />

				<div className="pt-0.5">{getIcon()}</div>

				<div className="flex-1 min-w-0 pr-4">
					<h5 className="font-bold text-xs text-white leading-tight">
						{notice.title || "Notice"}
					</h5>
					<p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
						{notice.message}
					</p>
				</div>

				<button
					onClick={onClose}
					className="p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
					aria-label="Dismiss notice"
				>
					<X className="w-3.5 h-3.5" />
				</button>
			</div>
		</div>
	);
};
