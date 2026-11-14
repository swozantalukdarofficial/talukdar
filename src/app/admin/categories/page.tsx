"use client";

import { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "@/lib/categories";
import { getAllProducts, revalidateStorefront } from "@/lib/products";
import { Plus, FolderTree, Package, ExternalLink, Sparkles, Pencil, Trash2, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import CategoryDrawer from "@/components/admin/CategoryDrawer";
import type { Category, Product } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [cats, prods] = await Promise.all([
        getAllCategories(),
        getAllProducts({}),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    const { error } = await deleteCategory(id);
    if (error) {
      toast.error("Delete failed: " + error);
    } else {
      toast.success("Category deleted.");
      setCategories((prev) => prev.filter((c) => c.id !== id));
      // No time-based fallback anymore: refresh the storefront on demand.
      if (!(await revalidateStorefront())) {
        toast.warning(
          "Category deleted, but the storefront did not refresh — edit any product to retry."
        );
      }
    }
  };

  const productCounts = categories.reduce((acc, cat) => {
    acc[cat.slug] = products.filter((p) => p.category === cat.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Categories & Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Organize and classify store products with icons and descriptions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 hover:text-emerald-600 shadow-2xs transition-colors cursor-pointer"
            title="Refresh Categories"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin text-emerald-600")} />
          </button>

          <button
            onClick={() => {
              setEditingCategory(null);
              setDrawerOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Category</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Total Categories</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white">{categories.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Categorized Products</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white">{products.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Storefront Status</p>
            <p className="text-sm font-bold text-emerald-600 mt-1">All Active & Synced</p>
          </div>
        </div>
      </div>

      {/* ── Categories Table Card ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold">Loading categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Icon</th>
                  <th className="py-3.5 px-4">Name & Description</th>
                  <th className="py-3.5 px-4">Slug (URL)</th>
                  <th className="py-3.5 px-4 text-center">Items Count</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-stone-400">
                      No categories found. Click "+ Add Category" to create one.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => {
                    const count = productCounts[cat.slug] || 0;
                    return (
                      <tr
                        key={cat.id}
                        className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                      >
                        {/* Icon */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-lg mx-auto shadow-2xs border border-stone-200/50">
                            {cat.icon || "📁"}
                          </span>
                        </td>

                        {/* Name & Desc */}
                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-sm text-stone-900 dark:text-white">
                            {cat.name}
                          </div>
                          {cat.description && (
                            <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 max-w-md">
                              {cat.description}
                            </div>
                          )}
                        </td>

                        {/* Slug */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md text-[11px]">
                            /products?category={cat.slug}
                          </span>
                        </td>

                        {/* Product Count Pill */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/60 inline-block">
                            {count} Products
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setDrawerOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="Edit Category"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cat.id, cat.name)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Slideover Category Drawer (Kachabazar Style) ── */}
      <CategoryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={fetchData}
        editingCategory={editingCategory}
      />
    </div>
  );
}
