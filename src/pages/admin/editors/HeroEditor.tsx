import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Type, Link2, Video, BarChart3 } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

import { useModal } from "../../../context/ModalContext";

export default function HeroEditor() {
	const { hero, updateDocument } = useContent();
	const { showAlert } = useModal();
	const [form, setForm] = useState(hero);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setForm(hero);
	}, [hero]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "hero", { ...form });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
			showAlert({ title: "Error", message: "Failed to save hero section.", type: "warning" });
		} finally {
			setSaving(false);
		}
	};

	const update = (key: string, value: string) => setForm({ ...form, [key]: value });

	return (
		<div className="space-y-8 max-w-3xl">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Hero Section</h1>
					<p className="text-neutral-500 text-sm">Edit the main landing page hero content</p>
				</div>
				<button
					onClick={handleSave}
					disabled={saving}
					className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50"
				>
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
					<span>{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}</span>
				</button>
			</div>

			{/* Text Content */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2">
					<Type className="w-4 h-4 text-neon-green" /> Text Content
				</h2>

				<Field label="Badge Text" value={form.badge} onChange={(v) => update("badge", v)} />
				<Field label="Main Heading" value={form.heading} onChange={(v) => update("heading", v)} />
				<Field label="Heading Highlight (gradient)" value={form.headingHighlight} onChange={(v) => update("headingHighlight", v)} />
				<Field
					label="Description"
					value={form.description}
					onChange={(v) => update("description", v)}
					multiline
				/>
			</div>

			{/* CTAs */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2">
					<Link2 className="w-4 h-4 text-neon-green" /> Call to Actions
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Field label="Primary CTA Text" value={form.ctaPrimary} onChange={(v) => update("ctaPrimary", v)} />
					<Field label="Primary CTA URL" value={form.ctaPrimaryUrl} onChange={(v) => update("ctaPrimaryUrl", v)} />
					<Field label="Secondary CTA Text" value={form.ctaSecondary} onChange={(v) => update("ctaSecondary", v)} />
					<Field label="Secondary CTA URL" value={form.ctaSecondaryUrl} onChange={(v) => update("ctaSecondaryUrl", v)} />
				</div>
			</div>

			{/* Video */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2">
					<Video className="w-4 h-4 text-neon-green" /> Video
				</h2>
				<Field label="YouTube Embed URL" value={form.videoUrl} onChange={(v) => update("videoUrl", v)} />
				<div>
					<Field label="Thumbnail Image URL" value={form.thumbnailUrl} onChange={(v) => update("thumbnailUrl", v)} />
					<CloudinaryUploadButton onUploadSuccess={(url) => update("thumbnailUrl", url)} resourceType="image" label="Upload Thumbnail Image" />
				</div>
			</div>

			{/* Floating Stats Cards */}
			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				<h2 className="text-lg font-bold text-white flex items-center gap-2">
					<BarChart3 className="w-4 h-4 text-neon-green" /> Floating Stat Cards
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Field label="Card 1 Label" value={form.floatingCard1Label} onChange={(v) => update("floatingCard1Label", v)} />
					<Field label="Card 1 Value" value={form.floatingCard1Value} onChange={(v) => update("floatingCard1Value", v)} />
					<Field label="Card 2 Label" value={form.floatingCard2Label} onChange={(v) => update("floatingCard2Label", v)} />
					<Field label="Card 2 Value" value={form.floatingCard2Value} onChange={(v) => update("floatingCard2Value", v)} />
					<Field label="Card 3 Label" value={form.floatingCard3Label} onChange={(v) => update("floatingCard3Label", v)} />
					<Field label="Card 3 Value" value={form.floatingCard3Value} onChange={(v) => update("floatingCard3Value", v)} />
				</div>
			</div>
		</div>
	);
}

function Field({
	label,
	value,
	onChange,
	multiline = false,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	multiline?: boolean;
}) {
	if (multiline) {
		return (
			<div className="space-y-2">
				<label className="text-sm font-bold text-neutral-400">{label}</label>
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={4}
					className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm resize-none"
				/>
			</div>
		);
	}
	return (
		<div className="space-y-2">
			<label className="text-sm font-bold text-neutral-400">{label}</label>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
			/>
		</div>
	);
}
