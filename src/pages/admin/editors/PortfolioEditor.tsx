import { useState, useEffect } from "react";
import { useContent, type PortfolioItem } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, Pencil, X, Image } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

import { useModal } from "../../../context/ModalContext";

export default function PortfolioEditor() {
	const { portfolio, addDocument, removeDocument } = useContent();
	const { showConfirm } = useModal();
	const [items, setItems] = useState<PortfolioItem[]>(portfolio);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setItems(portfolio);
	}, [portfolio]);

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			for (const item of items) {
				const { id, ...data } = item;
				await addDocument("portfolio", id, data);
			}
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = (id: string) => {
		showConfirm({
			title: "Delete Portfolio Item?",
			message: "Are you sure you want to delete this portfolio showcase item?",
			confirmText: "Delete Item",
			type: "danger",
			onConfirm: async () => {
				try {
					await removeDocument("portfolio", id);
					setItems((prev) => prev.filter((i) => i.id !== id));
				} catch (err) {
					console.error("Delete failed:", err);
				}
			},
		});
	};

	const handleAdd = () => {
		const newId = Date.now().toString();
		const newItem: PortfolioItem = {
			id: newId,
			src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
			alt: "New Project",
			order: items.length,
		};
		setItems([...items, newItem]);
		setEditingId(newId);
	};

	const updateItem = (id: string, field: keyof PortfolioItem, value: string | number) => {
		setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
	};

	return (
		<div className="space-y-8 max-w-4xl">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Portfolio</h1>
					<p className="text-neutral-500 text-sm">Manage your work showcase</p>
				</div>
				<div className="flex items-center gap-3">
					<button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
						<Plus className="w-4 h-4" /><span>Add Item</span>
					</button>
					<button onClick={handleSaveAll} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50">
						{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
						<span>{saved ? "Saved!" : "Save All"}</span>
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{items.map((item) => (
					<div key={item.id} className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden group">
						{/* Image Preview */}
						<div className="aspect-video bg-neutral-800 relative overflow-hidden">
							{item.src ? (
								<img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<Image className="w-8 h-8 text-neutral-600" />
								</div>
							)}
							<div className="absolute top-2 right-2 flex gap-1.5 z-10">
								<button
									onClick={() => setEditingId(editingId === item.id ? null : item.id)}
									className="p-2 bg-neutral-950/85 hover:bg-black border border-white/20 backdrop-blur-md rounded-xl text-white hover:text-neon-green transition-all shadow-lg cursor-pointer flex items-center gap-1 text-xs font-semibold"
									title="Edit item"
								>
									{editingId === item.id ? <X className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
									<span className="hidden sm:inline">{editingId === item.id ? "Close" : "Edit"}</span>
								</button>
								<button
									onClick={() => handleDelete(item.id)}
									className="p-2 bg-neutral-950/85 hover:bg-red-950 border border-red-500/30 backdrop-blur-md rounded-xl text-red-400 hover:text-red-300 transition-all shadow-lg cursor-pointer flex items-center gap-1 text-xs font-semibold"
									title="Delete item"
								>
									<Trash2 className="w-3.5 h-3.5" />
									<span className="hidden sm:inline">Delete</span>
								</button>
							</div>
						</div>

						{/* Info */}
						<div className="p-3">
							<p className="text-white text-sm font-medium truncate">{item.alt}</p>
						</div>

						{/* Edit Form */}
						{editingId === item.id && (
							<div className="border-t border-white/5 p-4 space-y-3 bg-neutral-900/30">
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Image URL</label>
									<input
										type="text"
										value={item.src}
										onChange={(e) => updateItem(item.id, "src", e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
									<CloudinaryUploadButton onUploadSuccess={(url) => updateItem(item.id, "src", url)} resourceType="image" label="Upload Project Image" />
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Project Title</label>
									<input
										type="text"
										value={item.title || item.alt || ""}
										onChange={(e) => updateItem(item.id, "title", e.target.value)}
										placeholder="e.g. Couture Collective - 7-Figure Store Design"
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-500">Client / Industry</label>
										<input
											type="text"
											value={item.client || ""}
											onChange={(e) => updateItem(item.id, "client", e.target.value)}
											placeholder="e.g. Luxury Fashion"
											className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-bold text-neutral-500">Category Tag</label>
										<input
											type="text"
											value={item.tag || ""}
											onChange={(e) => updateItem(item.id, "tag", e.target.value)}
											placeholder="e.g. Fashion"
											className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
										/>
									</div>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Alt Text</label>
									<input
										type="text"
										value={item.alt}
										onChange={(e) => updateItem(item.id, "alt", e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Order</label>
									<input
										type="number"
										value={item.order}
										onChange={(e) => updateItem(item.id, "order", parseInt(e.target.value) || 0)}
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
