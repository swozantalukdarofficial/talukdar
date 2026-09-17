"use client";

import { useState, useEffect } from "react";
import {
  X,
  Upload,
  Loader2,
  FolderTree,
  Save,
  Sparkles,
  Tag
} from "lucide-react";
import { createCategory, updateCategory } from "@/lib/categories";
import type { Category } from "@/lib/types";
import { toast } from "sonner";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCategory?: Category | null;
}

export default function CategoryDrawer({
  isOpen,
  onClose,
  onSuccess,
  editingCategory,
}: CategoryDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("📁");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
      setSlug(editingCategory.slug || "");
      setIcon(editingCategory.icon || "📁");
      setDescription(editingCategory.description || "");
    } else {
      setName("");
      setSlug("");
      setIcon("📁");
      setDescription("");
    }
  }, [editingCategory, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error("Please enter category name and slug");
      return;
    }

    setLoading(true);
    try {
      if (editingCategory) {
        const { error } = await updateCategory(editingCategory.id, {
          name: name.trim(),
          slug: slug.trim(),
          icon: icon.trim(),
          description: description.trim() || null,
        });
        if (error) throw new Error(error);
        toast.success(`Category "${name}" updated!`);
      } else {
        const { error } = await createCategory({
          name: name.trim(),
          slug: slug.trim(),
          icon: icon.trim(),
          description: description.trim() || null,
        });
        if (error) throw new Error(error);
        toast.success(`Category "${name}" created!`);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {editingCategory ? `Editing: ${editingCategory.name}` : "Create a new product collection & slug"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 text-xs">
          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Category Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Electric Scooters"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Category Slug (URL Path) *
            </label>
            <input
              type="text"
              required
              placeholder="electric-scooters"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Icon (Emoji or SVG Symbol)
            </label>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-xl shrink-0">
                {icon || "📁"}
              </span>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="🛵 or 🔋 or ☀️"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-sm"
              />
            </div>
            <p className="text-[10px] text-stone-400 mt-1">
              Quick presets: 🛵 🏍️ 🔋 ☀️ ⚡ 🛠️ 🚲
            </p>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Description / SEO Summary
            </label>
            <textarea
              rows={3}
              placeholder="Short description displayed on collection pages..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-stone-900 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editingCategory ? "Update Category" : "Publish Category"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
