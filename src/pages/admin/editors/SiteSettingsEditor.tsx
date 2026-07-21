import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Settings, Video } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

export default function SiteSettingsEditor() {
	const { site, video, updateDocument } = useContent();
	const [siteForm, setSiteForm] = useState(site);
	const [videoForm, setVideoForm] = useState(video);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => { setSiteForm(site); setVideoForm(video); }, [site, video]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "site", { ...siteForm });
			await updateDocument("content", "video", { ...videoForm });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch { alert("Save failed"); } finally { setSaving(false); }
	};

	return (
		<div className="space-y-8 max-w-3xl">
			<div className="flex items-center justify-between">
				<div><h1 className="text-2xl font-black text-white mb-1">Site Settings</h1><p className="text-neutral-500 text-sm">General site configuration</p></div>
				<button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 text-sm disabled:opacity-50">
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}{saved ? "Saved!" : "Save"}
				</button>
			</div>

			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-4">
				<h2 className="text-lg font-bold text-white flex items-center gap-2"><Settings className="w-4 h-4 text-neon-green" /> Branding</h2>
				<div className="space-y-2"><label className="text-xs font-bold text-neutral-500">Site Name</label><input type="text" value={siteForm.siteName} onChange={e => setSiteForm({...siteForm,siteName:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" /></div>
				<div className="space-y-2">
					<label className="text-xs font-bold text-neutral-500">Logo URL</label>
					<input type="text" value={siteForm.logoUrl} onChange={e => setSiteForm({...siteForm,logoUrl:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
					<CloudinaryUploadButton onUploadSuccess={(url) => setSiteForm({...siteForm,logoUrl:url})} resourceType="image" label="Upload Logo to Cloudinary" />
				</div>
				<div className="space-y-2"><label className="text-xs font-bold text-neutral-500">Logo Text (fallback)</label><input type="text" value={siteForm.logoText} onChange={e => setSiteForm({...siteForm,logoText:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" /></div>
			</div>

			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-4">
				<h2 className="text-lg font-bold text-white flex items-center gap-2"><Video className="w-4 h-4 text-neon-green" /> Video Section</h2>
				<div className="space-y-2"><label className="text-xs font-bold text-neutral-500">YouTube URL</label><input type="text" value={videoForm.youtubeUrl} onChange={e => setVideoForm({...videoForm,youtubeUrl:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" /></div>
				<div className="space-y-2"><label className="text-xs font-bold text-neutral-500">Headline</label><input type="text" value={videoForm.headline} onChange={e => setVideoForm({...videoForm,headline:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" /></div>
				<div className="space-y-2"><label className="text-xs font-bold text-neutral-500">Subheadline</label><input type="text" value={videoForm.subheadline} onChange={e => setVideoForm({...videoForm,subheadline:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" /></div>
			</div>
		</div>
	);
}

