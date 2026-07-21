import { useState, useEffect } from "react";
import { useContent } from "../../../context/ContentContext";
import { Save, Check, Phone, Mail, MapPin, List } from "lucide-react";

export default function ContactEditor() {
	const { contact, updateDocument } = useContent();
	const [form, setForm] = useState(contact);
	const [formOptionsText, setFormOptionsText] = useState(contact.formOptions.join("\n"));
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setForm(contact);
		setFormOptionsText(contact.formOptions.join("\n"));
	}, [contact]);

	const handleSave = async () => {
		setSaving(true);
		try {
			const options = formOptionsText
				.split("\n")
				.map((o) => o.trim())
				.filter(Boolean);
			await updateDocument("content", "contact", { ...form, formOptions: options });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
			alert("Failed to save. Check console.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-8 max-w-3xl">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Contact Information</h1>
					<p className="text-neutral-500 text-sm">Edit phone, email, address & form options</p>
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

			<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
				{/* Phone */}
				<div className="space-y-2">
					<label className="text-sm font-bold text-neutral-300 flex items-center gap-2">
						<Phone className="w-3.5 h-3.5 text-neon-green" />
						Phone Number
					</label>
					<input
						type="text"
						value={form.phone}
						onChange={(e) => setForm({ ...form, phone: e.target.value })}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
						placeholder="+880 1815-025322"
					/>
				</div>

				{/* Email */}
				<div className="space-y-2">
					<label className="text-sm font-bold text-neutral-300 flex items-center gap-2">
						<Mail className="w-3.5 h-3.5 text-neon-green" />
						Email Address
					</label>
					<input
						type="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
						placeholder="webestone@gmail.com"
					/>
				</div>

				{/* Address */}
				<div className="space-y-2">
					<label className="text-sm font-bold text-neutral-300 flex items-center gap-2">
						<MapPin className="w-3.5 h-3.5 text-neon-green" />
						Office Address
					</label>
					<input
						type="text"
						value={form.address}
						onChange={(e) => setForm({ ...form, address: e.target.value })}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
						placeholder="25 The Avenue, Crawley, Perth, WA"
					/>
				</div>

				{/* Map URL */}
				<div className="space-y-2">
					<label className="text-sm font-bold text-neutral-300 flex items-center gap-2">
						<MapPin className="w-3.5 h-3.5 text-neon-green" />
						Google Maps Embed URL
					</label>
					<input
						type="text"
						value={form.mapUrl}
						onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
						placeholder="https://maps.google.com/maps?q=..."
					/>
				</div>

				{/* Form dropdown options */}
				<div className="space-y-2">
					<label className="text-sm font-bold text-neutral-300 flex items-center gap-2">
						<List className="w-3.5 h-3.5 text-neon-green" />
						Contact Form Service Options (one per line)
					</label>
					<textarea
						value={formOptionsText}
						onChange={(e) => setFormOptionsText(e.target.value)}
						rows={6}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm resize-none font-mono"
						placeholder={"SEO\nSocial Media Marketing\nWeb Development\nBranding"}
					/>
				</div>
			</div>

			{/* Social Links */}
			<SocialsEditor />
		</div>
	);
}

function SocialsEditor() {
	const { socials, updateDocument } = useContent();
	const [form, setForm] = useState(socials);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setForm(socials);
	}, [socials]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateDocument("content", "socials", { ...form });
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
		} finally {
			setSaving(false);
		}
	};

	const fields = [
		{ key: "facebook" as const, label: "Facebook URL", placeholder: "https://facebook.com/..." },
		{ key: "instagram" as const, label: "Instagram URL", placeholder: "https://instagram.com/..." },
		{ key: "whatsapp" as const, label: "WhatsApp Number", placeholder: "+8801815025322" },
		{ key: "linkedin" as const, label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
		{ key: "youtube" as const, label: "YouTube URL", placeholder: "https://youtube.com/@..." },
		{ key: "email" as const, label: "Contact Email", placeholder: "webestone@gmail.com" },
	];

	return (
		<div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-white">Social Media Links</h2>
				<button
					onClick={handleSave}
					disabled={saving}
					className="flex items-center gap-2 px-5 py-2 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50"
				>
					{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
					<span>{saved ? "Saved!" : "Save"}</span>
				</button>
			</div>

			{fields.map((field) => (
				<div key={field.key} className="space-y-2">
					<label className="text-sm font-bold text-neutral-400">{field.label}</label>
					<input
						type="text"
						value={form[field.key]}
						onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
						className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neon-green/50 transition-colors text-sm"
						placeholder={field.placeholder}
					/>
				</div>
			))}
		</div>
	);
}
