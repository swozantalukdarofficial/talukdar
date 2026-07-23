import { useState, useEffect } from "react";
import { useContent, type ServiceItem } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, GripVertical, Pencil, X } from "lucide-react";

import { useModal } from "../../../context/ModalContext";

export default function ServicesEditor() {
	const { services, updateDocument, addDocument, removeDocument } = useContent();
	const { showConfirm, showAlert } = useModal();
	const [items, setItems] = useState<ServiceItem[]>(services);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setItems(services);
	}, [services]);

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			for (const item of items) {
				const { id, ...data } = item;
				await addDocument("services", id, data);
			}
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
			showAlert({ title: "Error", message: "Failed to save services.", type: "warning" });
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = (id: string) => {
		showConfirm({
			title: "Delete Service?",
			message: "Are you sure you want to delete this service item?",
			confirmText: "Delete",
			type: "danger",
			onConfirm: async () => {
				try {
					await removeDocument("services", id);
					setItems((prev) => prev.filter((i) => i.id !== id));
				} catch (err) {
					console.error("Delete failed:", err);
				}
			},
		});
	};

	const handleAdd = () => {
		const newId = Date.now().toString();
		const newItem: ServiceItem = {
			id: newId,
			title: "New Service",
			description: "Service description here",
			iconName: "Zap",
			color: "text-neon-green",
			href: "/services/new-service",
		};
		setItems([...items, newItem]);
		setEditingId(newId);
	};

	const updateItem = (id: string, field: keyof ServiceItem, value: string) => {
		setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
	};

	return (
		<div className="space-y-8 max-w-4xl">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">Services</h1>
					<p className="text-neutral-500 text-sm">Manage your service offerings</p>
				</div>
				<div className="flex items-center gap-3">
					<button
						onClick={handleAdd}
						className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm"
					>
						<Plus className="w-4 h-4" />
						<span>Add Service</span>
					</button>
					<button
						onClick={handleSaveAll}
						disabled={saving}
						className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50"
					>
						{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
						<span>{saved ? "Saved!" : "Save All"}</span>
					</button>
				</div>
			</div>

			{/* Services List */}
			<div className="space-y-3">
				{items.map((item) => (
					<div
						key={item.id}
						className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden"
					>
						{/* Collapsed View */}
						<div className="flex items-center gap-4 p-4">
							<GripVertical className="w-4 h-4 text-neutral-600 shrink-0 cursor-grab" />
							<div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color} shrink-0 text-sm font-bold`}>
								{item.iconName?.[0] || "S"}
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-white font-bold text-sm truncate">{item.title}</p>
								<p className="text-neutral-500 text-xs truncate">{item.description}</p>
							</div>
							<div className="flex items-center gap-2 shrink-0">
								<button
									onClick={() => setEditingId(editingId === item.id ? null : item.id)}
									className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
								>
									{editingId === item.id ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
								</button>
								<button
									onClick={() => handleDelete(item.id)}
									className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Expanded Edit */}
						{editingId === item.id && (
							<div className="border-t border-white/5 p-5 space-y-4 bg-neutral-900/30">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<EditorField label="Title" value={item.title} onChange={(v) => updateItem(item.id, "title", v)} />
									<EditorField label="Icon Name (Lucide)" value={item.iconName} onChange={(v) => updateItem(item.id, "iconName", v)} />
									<EditorField label="Color Class" value={item.color} onChange={(v) => updateItem(item.id, "color", v)} />
									<EditorField label="Page URL" value={item.href} onChange={(v) => updateItem(item.id, "href", v)} />
								</div>
								<EditorField label="Description" value={item.description} onChange={(v) => updateItem(item.id, "description", v)} />
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

function EditorField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div className="space-y-1.5">
			<label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
			/>
		</div>
	);
}
