"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/categories";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  // Auto-generate slug from name
  function handleNameChange(val: string) {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error("Name and Slug are required");
      return;
    }

    setSaving(true);
    const { error } = await createCategory({
      name: name.trim(),
      slug: slug.trim(),
      icon: icon.trim() || "📁",
      description: description.trim(),
    });

    if (error) {
      toast.error(error);
      setSaving(false);
    } else {
      toast.success("Category created successfully");
      router.push("/admin/categories");
      router.refresh();
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
          className="p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-stone-600" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight">
            Add New Category
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">
            Create a new category for products.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm"
              placeholder="e.g., Electric Bikes"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Slug (URL) *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm text-stone-600"
              placeholder="e.g., electric-bikes"
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Icon (Emoji)
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                maxLength={2}
                className="w-20 text-center text-2xl px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="🚲"
              />
              <p className="text-xs text-stone-500 font-medium">
                Use a single emoji for the category icon.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm resize-none"
            placeholder="Brief description of this category..."
          />
        </div>

        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 h-12 rounded-xl font-bold shadow-sm"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Category
          </Button>
        </div>
      </form>
    </div>
  );
}
