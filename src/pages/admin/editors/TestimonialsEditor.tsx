import { useState, useEffect } from "react";
import { useContent, type TestimonialItem } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, Pencil, X, Star } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

export default function TestimonialsEditor() {
	const { testimonials, addDocument, removeDocument } = useContent();
	const [items, setItems] = useState<TestimonialItem[]>(testimonials);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setItems(testimonials);
	}, [testimonials]);

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			for (const item of items) {
				const { id, ...data } = item;
				await addDocument("testimonials", id, data);
			}
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this testimonial?")) return;
		try {
			await removeDocument("testimonials", id);
			setItems(items.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	const handleAdd = () => {
		const newId = Date.now().toString();
		setItems([...items, {
			id: newId,
			name: "Client Name",
			role: "CEO",
			company: "Company",
			text: "Testimonial text here...",
			avatar: "",
			rating: 5,
		}]);
		setEditingId(newId);
	};

	const updateItem = (id: string, field: keyof TestimonialItem, value: string | number) => {
		setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
	};

	return (
		<div className="space-y-8 max-w-4xl">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Testimonials</h1>
					<p className="text-neutral-500 text-sm">Manage client testimonials</p>
				</div>
				<div className="flex items-center gap-3">
					<button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
						<Plus className="w-4 h-4" /><span>Add Testimonial</span>
					</button>
					<button onClick={handleSaveAll} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50">
						{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
						<span>{saved ? "Saved!" : "Save All"}</span>
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{items.map((item) => (
					<div key={item.id} className="bg-neutral-900/50 border border-white/5 rounded-2xl p-5 space-y-3">
						{/* Header */}
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green font-bold text-sm">
									{item.name?.[0] || "C"}
								</div>
								<div>
									<p className="text-white font-bold text-sm">{item.name}</p>
									<p className="text-neutral-500 text-xs">{item.role}, {item.company}</p>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-all">
									{editingId === item.id ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
								</button>
								<button onClick={() => handleDelete(item.id)} className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg transition-all">
									<Trash2 className="w-3.5 h-3.5" />
								</button>
							</div>
						</div>

						{/* Rating */}
						<div className="flex items-center gap-0.5">
							{Array.from({ length: 5 }, (_, i) => (
								<Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-600"}`} />
							))}
						</div>

						{/* Text */}
						<p className="text-neutral-400 text-sm line-clamp-3">"{item.text}"</p>

						{/* Edit Form */}
						{editingId === item.id && (
							<div className="border-t border-white/5 pt-4 space-y-3">
								<div className="grid grid-cols-2 gap-3">
									<Field label="Name" value={item.name} onChange={(v) => updateItem(item.id, "name", v)} />
									<Field label="Role" value={item.role} onChange={(v) => updateItem(item.id, "role", v)} />
									<Field label="Company" value={item.company} onChange={(v) => updateItem(item.id, "company", v)} />
									<Field label="Rating (1-5)" value={String(item.rating)} onChange={(v) => updateItem(item.id, "rating", Math.min(5, Math.max(1, parseInt(v) || 1)))} />
								</div>
								<div>
									<Field label="Avatar URL" value={item.avatar} onChange={(v) => updateItem(item.id, "avatar", v)} />
									<CloudinaryUploadButton onUploadSuccess={(url) => updateItem(item.id, "avatar", url)} resourceType="image" label="Upload Avatar to Cloudinary" />
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Testimonial Text</label>
									<textarea value={item.text} onChange={(e) => updateItem(item.id, "text", e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50 resize-none" />
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			{items.length === 0 && (
				<div className="text-center py-12 text-neutral-500">
					<p className="text-sm">No testimonials yet. Click "Add Testimonial" to create one.</p>
				</div>
			)}
		</div>
	);
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
	return (
		<div className="space-y-1.5">
			<label className="text-xs font-bold text-neutral-500">{label}</label>
			<input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50" />
		</div>
	);
}
