import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, FileText, TrendingUp } from "lucide-react";
import { useContent } from "../context/ContentContext";

interface ProposalModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
	const { site } = useContent();

	// Prevent scrolling on page background when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			if (!isOpen) {
				document.body.style.overflow = "";
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const handleOptionClick = (url: string | undefined) => {
		onClose();
		if (url) {
			window.open(url, "_blank", "noopener,noreferrer");
		} else {
			alert("Proposal file not uploaded yet. Please upload it from the Admin Panel.");
		}
	};

	return createPortal(
		<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
			{/* Backdrop click to close */}
			<div className="absolute inset-0 cursor-pointer z-0" onClick={(e) => { e.stopPropagation(); onClose(); }} />

			{/* Modal Box */}
			<div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 z-10">
				
				{/* Decorative glow lights */}
				<div className="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute -bottom-24 -left-24 w-52 h-52 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

				{/* Close Button */}
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onClose();
					}}
					className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Header */}
				<div className="mb-8 relative z-10 pr-12">
					<h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
						Select a <span className="text-emerald-600">Proposal</span>
					</h3>
					<p className="text-slate-600 text-sm mt-2 leading-relaxed">
						Choose the proposal type that best fits your business goals. You can view or download it instantly.
					</p>
				</div>

				{/* Options Grid */}
				<div className="space-y-4 relative z-10">
					{/* Option 1: Full Stack Proposal */}
					<button
						onClick={() => handleOptionClick(site.fullStackProposalUrl)}
						className="w-full group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-500/40 hover:bg-white transition-all duration-300 text-left relative overflow-hidden shadow-sm"
					>
						{/* Icon wrapper */}
						<div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
							<TrendingUp className="w-5 h-5" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 pr-4">
							<h4 className="text-slate-900 font-extrabold text-base mb-1 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
								Full Stack Digital Marketing
							</h4>
							<p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
								Comprehensive multi-channel strategy including AI SEO, Ads, Content & Conversion optimization.
							</p>
						</div>

						<ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center" />
					</button>

					{/* Option 2: AI SEO Proposal */}
					<button
						onClick={() => handleOptionClick(site.generalProposalUrl)}
						className="w-full group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-500/40 hover:bg-white transition-all duration-300 text-left relative overflow-hidden shadow-sm"
					>
						{/* Icon wrapper */}
						<div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105 transition-all duration-300">
							<FileText className="w-5 h-5" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 pr-4">
							<ArrowRight className="w-5 h-5" />
						</div>
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
