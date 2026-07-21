import { useEffect } from "react";
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
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
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

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
			{/* Backdrop click to close */}
			<div className="absolute inset-0 cursor-default" onClick={onClose} />

			{/* Modal Box */}
			<div className="relative w-full max-w-2xl bg-neutral-950/90 border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
				
				{/* Decorative glow lights */}
				<div className="absolute -top-24 -right-24 w-52 h-52 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute -bottom-24 -left-24 w-52 h-52 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all z-10"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Header */}
				<div className="mb-8 relative z-10 pr-8">
					<h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
						Select a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-400">Proposal</span>
					</h3>
					<p className="text-neutral-400 text-sm mt-2 leading-relaxed">
						Choose the proposal type that best fits your business goals. You can view or download it instantly.
					</p>
				</div>

				{/* Options Grid */}
				<div className="space-y-4 relative z-10">
					{/* Option 1: Full Stack Proposal */}
					<button
						onClick={() => handleOptionClick(site.fullStackProposalUrl)}
						className="w-full group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl border border-white/5 bg-neutral-900/40 hover:border-neon-green/30 hover:bg-neutral-900/80 transition-all duration-300 text-left relative overflow-hidden"
					>
						{/* Subtle hover background glow */}
						<div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						
						{/* Icon wrapper */}
						<div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-[#87E65C] group-hover:text-black group-hover:scale-105 transition-all duration-300">
							<TrendingUp className="w-5 h-5" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 pr-4">
							<h4 className="text-white font-extrabold text-base mb-1 group-hover:text-[#87E65C] transition-colors flex items-center gap-2">
								Full Stack Digital Marketing
							</h4>
							<p className="text-neutral-500 text-xs leading-relaxed group-hover:text-neutral-400 transition-colors">
								Download our comprehensive 2026 digital marketing strategy roadmap, conversion funnels, and execution plan.
							</p>
						</div>

						{/* Arrow */}
						<div className="self-end sm:self-center text-neutral-600 group-hover:text-[#87E65C] group-hover:translate-x-1.5 transition-all duration-300">
							<ArrowRight className="w-5 h-5" />
						</div>
					</button>

					{/* Option 2: General Proposal */}
					<button
						onClick={() => handleOptionClick(site.generalProposalUrl)}
						className="w-full group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl border border-white/5 bg-neutral-900/40 hover:border-neon-green/30 hover:bg-neutral-900/80 transition-all duration-300 text-left relative overflow-hidden"
					>
						{/* Subtle hover background glow */}
						<div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

						{/* Icon wrapper */}
						<div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-[#87E65C] group-hover:text-black group-hover:scale-105 transition-all duration-300">
							<FileText className="w-5 h-5" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0 pr-4">
							<h4 className="text-white font-extrabold text-base mb-1 group-hover:text-[#87E65C] transition-colors flex items-center gap-2">
								General Proposal
							</h4>
							<p className="text-neutral-500 text-xs leading-relaxed group-hover:text-neutral-400 transition-colors">
								View our standard agency services overview, engagement methodologies, general scope, and pricing tiers.
							</p>
						</div>

						{/* Arrow */}
						<div className="self-end sm:self-center text-neutral-600 group-hover:text-[#87E65C] group-hover:translate-x-1.5 transition-all duration-300">
							<ArrowRight className="w-5 h-5" />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
