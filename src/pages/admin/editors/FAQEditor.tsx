import { useState, useEffect } from "react";
import { useContent, type FAQItem } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, Pencil, X, ChevronDown, ChevronUp } from "lucide-react";

import { useModal } from "../../../context/ModalContext";

export default function FAQEditor() {
	const { faq, addDocument, removeDocument } = useContent();
	const { showConfirm } = useModal();
	const [items, setItems] = useState<FAQItem[]>(faq);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setItems(faq);
	}, [faq]);

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			for (const item of items) {
				const { id, ...data } = item;
				await addDocument("faq", id, data);
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
			title: "Delete FAQ?",
			message: "Are you sure you want to delete this FAQ entry?",
			confirmText: "Delete",
			type: "danger",
			onConfirm: async () => {
				try {
					await removeDocument("faq", id);
					setItems((prev) => prev.filter((i) => i.id !== id));
				} catch (err) {
					console.error("Delete failed:", err);
				}
			},
		});
	};

	const handleAdd = () => {
		const newId = Date.now().toString();
		setItems([...items, { id: newId, question: "New Question", answer: "Answer here...", order: items.length }]);
		setEditingId(newId);
	};

	const updateItem = (id: string, field: keyof FAQItem, value: string | number) => {
		setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
	};

	const moveItem = (index: number, direction: "up" | "down") => {
		const newItems = [...items];
		const swapIndex = direction === "up" ? index - 1 : index + 1;
		if (swapIndex < 0 || swapIndex >= newItems.length) return;
		[newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
		newItems.forEach((item, i) => (item.order = i));
		setItems(newItems);
	};

	return (
		<div className="space-y-8 max-w-3xl min-w-0">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1">FAQ</h1>
					<p className="text-neutral-500 text-sm">Manage frequently asked questions</p>
				</div>
				<div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
					<button onClick={handleAdd} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-xs sm:text-sm">
						<Plus className="w-4 h-4" /><span>Add FAQ</span>
					</button>
					<button onClick={handleSaveAll} disabled={saving} className="flex items-center gap-1.5 px-5 py-2 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-xs sm:text-sm disabled:opacity-50">
						{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
						<span>{saved ? "Saved!" : "Save All"}</span>
					</button>
				</div>
			</div>

			<div className="space-y-3 min-w-0">
				{items.map((item, index) => (
					<div key={item.id} className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden min-w-0">
						<div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 min-w-0">
							<div className="flex flex-col gap-0.5 shrink-0">
								<button onClick={() => moveItem(index, "up")} disabled={index === 0} className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"><ChevronUp className="w-3.5 h-3.5" /></button>
								<button onClick={() => moveItem(index, "down")} disabled={index === items.length - 1} className="p-1 text-neutral-500 hover:text-white disabled:opacity-20 transition-colors"><ChevronDown className="w-3.5 h-3.5" /></button>
							</div>
							<div className="flex-1 min-w-0 overflow-hidden">
								<p className="text-white font-bold text-xs sm:text-sm truncate">{item.question}</p>
								<p className="text-neutral-500 text-[11px] sm:text-xs truncate">{item.answer}</p>
							</div>
							<div className="flex items-center gap-1 sm:gap-2 shrink-0">
								<button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-1.5 sm:p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Edit">
									{editingId === item.id ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
								</button>
								<button onClick={() => handleDelete(item.id)} className="p-1.5 sm:p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						{editingId === item.id && (
							<div className="border-t border-white/5 p-4 sm:p-5 space-y-4 bg-neutral-900/30">
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Question</label>
									<input type="text" value={item.question} onChange={(e) => updateItem(item.id, "question", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-neon-green/50" />
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-500">Answer</label>
									<textarea value={item.answer} onChange={(e) => updateItem(item.id, "answer", e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-neon-green/50 resize-none" />
								</div>
							</div>
						)}
					</div>
				))}
				{items.length === 0 && (
					<div className="text-center py-12 text-neutral-500">
						<p className="text-sm">No FAQs yet. Click "Add FAQ" to create one.</p>
					</div>
				)}
			</div>
		</div>
	);
}
