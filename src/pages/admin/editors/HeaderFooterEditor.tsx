import { useState, useEffect } from "react";
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
		<div className="space-y-8 max-w-3xl">
			<div className="flex items-center justify-between">
				<div><h1 className="text-2xl font-black text-white mb-1">Header & Footer</h1><p className="text-neutral-500 text-sm">Manage navigation and footer</p></div>
				<button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm disabled:opacity-50">
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}{saved ? "Saved!" : "Save"}
				</button>
			</div>

			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2"><Navigation className="w-4 h-4 text-neon-green" /> Nav Links</h2>
				{hForm.navLinks.map((l, i) => (
					<div key={i} className="flex items-center gap-3">
						<input type="text" value={l.name} onChange={e => updateNavLink(i, "name", e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
						<input type="text" value={l.href} onChange={e => updateNavLink(i, "href", e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
						<button onClick={() => setHForm({...hForm, navLinks: hForm.navLinks.filter((_,j)=>j!==i)})} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
					</div>
				))}
				<button onClick={() => setHForm({...hForm, navLinks:[...hForm.navLinks,{name:"New",href:"/"}]})} className="flex items-center gap-2 text-sm text-neon-green"><Plus className="w-4 h-4" /> Add Link</button>
				<div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-4">
					<div><label className="text-xs font-bold text-neutral-500">CTA Text</label><input type="text" value={hForm.ctaText} onChange={e => setHForm({...hForm,ctaText:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50" /></div>
					<div><label className="text-xs font-bold text-neutral-500">CTA URL</label><input type="text" value={hForm.ctaUrl} onChange={e => setHForm({...hForm,ctaUrl:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50" /></div>
				</div>
			</div>

			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2"><FileText className="w-4 h-4 text-neon-green" /> Footer Links</h2>
				{fForm.serviceLinks.map((l, i) => (
					<div key={i} className="flex items-center gap-3">
						<input type="text" value={l.name} onChange={e => updateFooterLink(i, "name", e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
						<input type="text" value={l.href} onChange={e => updateFooterLink(i, "href", e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
						<button onClick={() => setFForm({...fForm, serviceLinks: fForm.serviceLinks.filter((_,j)=>j!==i)})} className="p-2 text-neutral-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
					</div>
				))}
				<button onClick={() => setFForm({...fForm, serviceLinks:[...fForm.serviceLinks,{name:"New",href:"/"}]})} className="flex items-center gap-2 text-sm text-neon-green"><Plus className="w-4 h-4" /> Add Link</button>
				<div className="border-t border-white/5 pt-4"><label className="text-xs font-bold text-neutral-500">Copyright</label><input type="text" value={fForm.copyright} onChange={e => setFForm({...fForm,copyright:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm mt-1 focus:outline-none focus:border-neon-green/50" /></div>
			</div>
		</div>
	);
}
