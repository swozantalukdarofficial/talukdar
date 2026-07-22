import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Navigation, FileText, Plus, Trash2 } from "lucide-react";

export default function HeaderFooterEditor() {
	const { header, footer, updateDocument } = useContent();
	const [hForm, setHForm] = useState(header);
	const [fForm, setFForm] = useState(footer);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => { setHForm(header); setFForm(footer); }, [header, footer]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "header", { ...hForm });
			await updateDocument("content", "footer", { ...fForm });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch { alert("Save failed"); } finally { setSaving(false); }
	};

	const updateNavLink = (i: number, f: "name"|"href", v: string) => {
		const u = [...hForm.navLinks]; u[i] = { ...u[i], [f]: v }; setHForm({ ...hForm, navLinks: u });
	};
	const updateFooterLink = (i: number, f: "name"|"href", v: string) => {
		const u = [...fForm.serviceLinks]; u[i] = { ...u[i], [f]: v }; setFForm({ ...fForm, serviceLinks: u });
	};

	return (
		<div className="space-y-8 max-w-3xl min-w-0">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Header &amp; Footer</h1>
					<p className="text-neutral-500 text-sm">Manage navigation and footer links</p>
				</div>
				<button onClick={handleSave} disabled={saving} className="self-start sm:self-auto flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm disabled:opacity-50 shrink-0">
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}{saved ? "Saved!" : "Save"}
				</button>
			</div>

			{/* Nav Links Card */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-4 sm:p-6 space-y-6 min-w-0 overflow-hidden">
				<h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
					<Navigation className="w-4 h-4 text-neon-green shrink-0" /> Nav Links
				</h2>
				
				<div className="space-y-3 min-w-0">
					{hForm.navLinks.map((l, i) => (
						<div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 min-w-0">
							<div className="flex-1 min-w-0">
								<input
									type="text"
									value={l.name}
									onChange={e => updateNavLink(i, "name", e.target.value)}
									placeholder="Link Label"
									className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-neon-green/50"
								/>
							</div>
							<div className="flex-1 min-w-0 flex items-center gap-2">
								<input
									type="text"
									value={l.href}
									onChange={e => updateNavLink(i, "href", e.target.value)}
									placeholder="URL Path"
									className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-neon-green/50"
								/>
								<button
									onClick={() => setHForm({...hForm, navLinks: hForm.navLinks.filter((_,j)=>j!==i)})}
									className="p-2 text-neutral-400 hover:text-red-400 shrink-0"
									title="Remove Link"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>

				<button onClick={() => setHForm({...hForm, navLinks:[...hForm.navLinks,{name:"New",href:"/"}]})} className="flex items-center gap-2 text-sm text-neon-green font-bold"><Plus className="w-4 h-4" /> Add Link</button>

				<div className="border-t border-white/5 pt-4 space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="text-xs font-bold text-neutral-500">CTA Text</label>
							<input type="text" value={hForm.ctaText} onChange={e => setHForm({...hForm,ctaText:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50" />
						</div>
						<div>
							<label className="text-xs font-bold text-neutral-500">CTA URL</label>
							<input type="text" value={hForm.ctaUrl} onChange={e => setHForm({...hForm,ctaUrl:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50 font-mono" />
						</div>
					</div>
					<div className="text-xs text-neutral-400 p-3.5 rounded-xl border border-white/5 bg-neutral-950/40 leading-relaxed">
						💡 <strong>Proposals Manage করতে চান?</strong> "Get a Proposal" বাটনে ক্লিক করলে যে Full Stack এবং General Proposal ফাইলগুলো ডাউনলোড হয়, সেগুলো পরিবর্তন করতে বাম পাশের মেনু থেকে <Link to="/admin/proposals" className="text-neon-green hover:underline font-bold">Proposals</Link> অপশনে যান।
					</div>
				</div>
			</div>

			{/* Footer Links Card */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-4 sm:p-6 space-y-6 min-w-0 overflow-hidden">
				<h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
					<FileText className="w-4 h-4 text-neon-green shrink-0" /> Footer Links
				</h2>

				<div className="space-y-3 min-w-0">
					{fForm.serviceLinks.map((l, i) => (
						<div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 min-w-0">
							<div className="flex-1 min-w-0">
								<input
									type="text"
									value={l.name}
									onChange={e => updateFooterLink(i, "name", e.target.value)}
									placeholder="Link Label"
									className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-neon-green/50"
								/>
							</div>
							<div className="flex-1 min-w-0 flex items-center gap-2">
								<input
									type="text"
									value={l.href}
									onChange={e => updateFooterLink(i, "href", e.target.value)}
									placeholder="URL Path"
									className="w-full min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-neon-green/50"
								/>
								<button
									onClick={() => setFForm({...fForm, serviceLinks: fForm.serviceLinks.filter((_,j)=>j!==i)})}
									className="p-2 text-neutral-400 hover:text-red-400 shrink-0"
									title="Remove Link"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>

				<button onClick={() => setFForm({...fForm, serviceLinks:[...fForm.serviceLinks,{name:"New",href:"/"}]})} className="flex items-center gap-2 text-sm text-neon-green font-bold"><Plus className="w-4 h-4" /> Add Link</button>
				
				<div className="border-t border-white/5 pt-4">
					<label className="text-xs font-bold text-neutral-500">Copyright</label>
					<input type="text" value={fForm.copyright} onChange={e => setFForm({...fForm,copyright:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50" />
				</div>
			</div>
		</div>
	);
}
