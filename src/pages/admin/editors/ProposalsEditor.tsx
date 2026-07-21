import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, FileText, TrendingUp, Info } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

export default function ProposalsEditor() {
	const { site, updateDocument } = useContent();
	const [siteForm, setSiteForm] = useState(site);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setSiteForm(site);
	}, [site]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "site", { ...siteForm });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
			alert("Save failed. Please check the console.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-8 max-w-3xl">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Manage Proposals</h1>
					<p className="text-neutral-500 text-sm">Upload and edit the document files for proposal types</p>
				</div>
				<button
					onClick={handleSave}
					disabled={saving}
					className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50"
				>
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
					<span>{saved ? "Saved!" : "Save Changes"}</span>
				</button>
			</div>

			{/* Info Box */}
			<div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-3.5 text-blue-400 text-xs md:text-sm leading-relaxed">
				<Info className="w-5 h-5 shrink-0 mt-0.5" />
				<div>
					<strong className="font-bold text-white block mb-0.5">How it works:</strong>
					These proposals are available to visitors when they click the <span className="text-neon-green font-bold">"Get a Proposal"</span> button in the header. You can upload a new PDF/Word file directly to Cloudinary or paste a custom URL (e.g., Google Drive link, external website).
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{/* Full Stack Digital Marketing Proposal */}
				<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 md:p-8 space-y-5 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 rounded-full blur-2xl pointer-events-none" />
					
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
							<TrendingUp className="w-5 h-5" />
						</div>
						<div>
							<h3 className="text-white font-bold text-base leading-tight">Full Stack Digital Marketing Proposal</h3>
							<p className="text-neutral-500 text-xs mt-0.5">Comprehensive strategy roadmap document</p>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-neutral-400">Proposal File URL / Link</label>
						<input
							type="text"
							value={siteForm.fullStackProposalUrl || ""}
							onChange={(e) => setSiteForm({ ...siteForm, fullStackProposalUrl: e.target.value })}
							placeholder="https://res.cloudinary.com/... or Google Drive link"
							className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50 placeholder-neutral-600 transition-colors"
						/>
						<div className="flex items-center justify-between pt-1">
							<span className="text-[10px] text-neutral-500">Upload a fresh PDF file to Cloudinary:</span>
							<CloudinaryUploadButton
								onUploadSuccess={(url) => setSiteForm({ ...siteForm, fullStackProposalUrl: url })}
								resourceType="image"
								accept=".pdf"
								label="Upload PDF Document"
							/>
						</div>
					</div>
				</div>

				{/* General Proposal */}
				<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 md:p-8 space-y-5 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
							<FileText className="w-5 h-5" />
						</div>
						<div>
							<h3 className="text-white font-bold text-base leading-tight">General Proposal</h3>
							<p className="text-neutral-500 text-xs mt-0.5">Standard agency services overview document</p>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-neutral-400">Proposal File URL / Link</label>
						<input
							type="text"
							value={siteForm.generalProposalUrl || ""}
							onChange={(e) => setSiteForm({ ...siteForm, generalProposalUrl: e.target.value })}
							placeholder="https://res.cloudinary.com/... or Google Drive link"
							className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50 placeholder-neutral-600 transition-colors"
						/>
						<div className="flex items-center justify-between pt-1">
							<span className="text-[10px] text-neutral-500">Upload a fresh PDF file to Cloudinary:</span>
							<CloudinaryUploadButton
								onUploadSuccess={(url) => setSiteForm({ ...siteForm, generalProposalUrl: url })}
								resourceType="image"
								accept=".pdf"
								label="Upload PDF Document"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
