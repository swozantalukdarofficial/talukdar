"use client";

import { useState } from "react";
import { updateProduct } from "@/lib/products";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Category } from "@/lib/types";

export default function QuickCategoryChange({
  productId,
  currentCategorySlug,
  categories,
}: {
  productId: string;
  currentCategorySlug: string;
  categories: Category[];
}) {
  const [updating, setUpdating] = useState(false);
  const [category, setCategory] = useState(currentCategorySlug);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCat = e.target.value;
    if (newCat === category) return;

    setUpdating(true);
    const result = await updateProduct(productId, { category: newCat as any });

    if ("error" in result) {
      toast.error("Failed to change category: " + result.error);
      setCategory(category); // revert UI
    } else {
      toast.success("Category updated!");
      setCategory(newCat);
    }
    setUpdating(false);
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={category}
        onChange={handleChange}
        disabled={updating}
        className="text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 pl-3 pr-8 py-1.5 rounded-lg appearance-none cursor-pointer border border-transparent focus:outline-none focus:border-stone-300 transition-colors disabled:opacity-50"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.icon || "📁"} {c.name}
          </option>
        ))}
      </select>
      
      {/* Down arrow icon override since we hid default appearance */}
      <div className="absolute right-2 pointer-events-none text-stone-500">
        {updating ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        )}
      </div>
    </div>
  );
}
