import { useState, useEffect } from "react";
import { useContent, type TeamMember } from "../../../context/ContentContext";
import { Save, Check, Plus, Trash2, Pencil, X, Users, User } from "lucide-react";
import CloudinaryUploadButton from "../../../components/admin/CloudinaryUploadButton";

export default function TeamEditor() {
	const { teamMembers, addDocument, removeDocument } = useContent();
	const [items, setItems] = useState<TeamMember[]>(teamMembers);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setItems(teamMembers);
	}, [teamMembers]);

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			for (const item of items) {
				const { id, ...data } = item;
				await addDocument("team", id, data);
			}
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		} catch (err) {
			console.error("Save failed:", err);
			alert("Failed to save team members. Please check console.");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this team member?")) return;
		try {
			await removeDocument("team", id);
			setItems(items.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	const handleAdd = () => {
		const newId = Date.now().toString();
		const newItem: TeamMember = {
			id: newId,
			name: "New Member",
			role: "Designation / Role",
			profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
			portfolio: "https://webestone.com",
			contact: "mailto:contact@webestone.com",
			order: items.length + 1,
		};
		setItems([...items, newItem]);
		setEditingId(newId);
	};

	const updateItem = (id: string, field: keyof TeamMember, value: string | number) => {
		setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
	};

	return (
		<div className="space-y-8 max-w-4xl">
			{/* Page Header */}
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
						<Users className="w-6 h-6 text-neon-green" />
						Manage Team Members
					</h1>
					<p className="text-neutral-500 text-sm">Add and edit team member profiles, designations (podobi), portfolio links, and contact info</p>
				</div>
				<div className="flex items-center gap-3">
					<button
						onClick={handleAdd}
						className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm cursor-pointer"
					>
						<Plus className="w-4 h-4 text-neon-green" />
						<span>Add Member</span>
					</button>
					<button
						onClick={handleSaveAll}
						disabled={saving}
						className="flex items-center gap-2 px-6 py-2.5 bg-neon-green text-black font-bold rounded-xl hover:bg-neon-green/90 transition-all text-sm disabled:opacity-50 cursor-pointer"
					>
						{saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
						<span>{saved ? "Saved!" : "Save All"}</span>
					</button>
				</div>
			</div>

			{/* Team List Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{items.map((item) => (
					<div key={item.id} className="bg-neutral-900/50 border border-white/5 rounded-2xl p-5 space-y-4 relative overflow-hidden group">
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-center gap-3.5">
								<div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0">
									{item.profile ? (
										<img src={item.profile} alt={item.name} className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full flex items-center justify-center text-neutral-500">
											<User className="w-6 h-6" />
										</div>
									)}
								</div>
								<div>
									<h3 className="text-white font-bold text-base leading-tight group-hover:text-neon-green transition-colors">{item.name}</h3>
									<p className="text-neon-green text-xs font-semibold mt-0.5">{item.role || "No designation"}</p>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<button
									onClick={() => setEditingId(editingId === item.id ? null : item.id)}
									className="p-2 text-neutral-400 hover:text-white rounded-lg transition-all"
									title="Edit Member"
								>
									{editingId === item.id ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
								</button>
								<button
									onClick={() => handleDelete(item.id)}
									className="p-2 text-neutral-400 hover:text-red-400 rounded-lg transition-all"
									title="Delete Member"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Quick Links Preview */}
						<div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/5">
							{item.portfolio && (
								<span className="truncate bg-white/5 px-2 py-0.5 rounded border border-white/5">
									Portfolio: {item.portfolio}
								</span>
							)}
							{item.contact && (
								<span className="truncate bg-white/5 px-2 py-0.5 rounded border border-white/5">
									Contact: {item.contact}
								</span>
							)}
						</div>

						{/* Edit Form Drawer */}
						{editingId === item.id && (
							<div className="border-t border-white/5 pt-4 space-y-3 bg-neutral-950/40 p-4 rounded-xl">
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Name</label>
									<input
										type="text"
										value={item.name}
										onChange={(e) => updateItem(item.id, "name", e.target.value)}
										placeholder="e.g. Alamin"
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Role / Designation (Podobi)</label>
									<input
										type="text"
										value={item.role}
										onChange={(e) => updateItem(item.id, "role", e.target.value)}
										placeholder="e.g. Founder & Growth Strategist"
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Profile Photo URL</label>
									<input
										type="text"
										value={item.profile}
										onChange={(e) => updateItem(item.id, "profile", e.target.value)}
										placeholder="https://images.unsplash.com/..."
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
									<CloudinaryUploadButton
										onUploadSuccess={(url) => updateItem(item.id, "profile", url)}
										resourceType="image"
										label="Upload Profile Photo"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Portfolio Link</label>
									<input
										type="text"
										value={item.portfolio || ""}
										onChange={(e) => updateItem(item.id, "portfolio", e.target.value)}
										placeholder="https://github.com/... or https://behance.net/..."
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Contact Link / Email / Social</label>
									<input
										type="text"
										value={item.contact || ""}
										onChange={(e) => updateItem(item.id, "contact", e.target.value)}
										placeholder="mailto:name@webestone.com or https://linkedin.com/in/..."
										className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50"
									/>
								</div>
								<div className="space-y-1.5">
									<label className="text-xs font-bold text-neutral-400">Order</label>
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

			{items.length === 0 && (
				<div className="text-center py-12 text-neutral-500 bg-neutral-900/30 rounded-2xl border border-white/5">
					<p className="text-sm">No team members added yet. Click "Add Member" to create one.</p>
				</div>
			)}
		</div>
	);
}
