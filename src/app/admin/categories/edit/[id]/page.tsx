"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { updateCategory, getCategoryById } from "@/lib/categories";
import { getAllProducts, updateProduct } from "@/lib/products";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [assigning, setAssigning] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadCategory() {
      const { data, error } = await getCategoryById(id);
      if (error || !data) {
        toast.error("Category not found");
        router.push("/admin/categories");
        return;
      }
      setName(data.name);
      setSlug(data.slug);
      setIcon(data.icon || "");
      setDescription(data.description || "");
      
      const rawProds = await getAllProducts({});
      
      // Deduplicate products by name to avoid showing variations multiple times
      const uniqueProdsMap = new Map();
      for (const p of rawProds) {
        if (!uniqueProdsMap.has(p.name)) {
          uniqueProdsMap.set(p.name, p);
        }
      }
      const allProds = Array.from(uniqueProdsMap.values()) as Product[];
      
      setProducts(allProds.filter(p => p.category === data.slug));
      setOtherProducts(allProds.filter(p => p.category !== data.slug));

      setLoading(false);
    }
    loadCategory();
  }, [id, router]);

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
    const { error } = await updateCategory(id, {
      name: name.trim(),
      slug: slug.trim(),
      icon: icon.trim() || "📁",
      description: description.trim(),
    });

    if (error) {
      toast.error(error);
      setSaving(false);
    } else {
      toast.success("Category updated successfully");
      router.push("/admin/categories");
      router.refresh();
    }
  }

  async function handleRemoveProduct(productId: string) {
    if (!confirm("Remove this product from the category?")) return;
    const result = await updateProduct(productId, { category: "uncategorized" as any });
    if ("error" in result) {
      toast.error("Failed to remove: " + result.error);
    } else {
      toast.success("Product removed from category");
      const removedProd = products.find(p => p.id === productId);
      if (removedProd) {
        setProducts(products.filter(p => p.id !== productId));
        setOtherProducts([...otherProducts, removedProd]);
      }
    }
  }

  async function handleAssignProduct() {
    if (!selectedProductId) return;
    setAssigning(true);
    const result = await updateProduct(selectedProductId, { category: slug as any });
    if ("error" in result) {
      toast.error("Failed to assign: " + result.error);
    } else {
      toast.success("Product added to category");
      const addedProd = otherProducts.find(p => p.id === selectedProductId);
      if (addedProd) {
        setOtherProducts(otherProducts.filter(p => p.id !== selectedProductId));
        setProducts([...products, addedProd]);
      }
      setSelectedProductId("");
    }
    setAssigning(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
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
            Edit Category
          </h1>
          <p className="text-stone-500 text-sm font-medium mt-1">
            Update category details.
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
            Update Category
          </Button>
        </div>
      </form>

      {/* Products in this category */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Products in {name}</h2>
            <p className="text-sm text-stone-500 mt-1">{products.length} items found</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-end">
            <div className="flex items-center gap-2">
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-700 outline-none focus:border-emerald-500 w-[200px]"
              >
                <option value="">Select existing product...</option>
                {otherProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleAssignProduct}
                disabled={assigning || !selectedProductId}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 h-auto text-xs rounded-lg"
              >
                {assigning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Assign"}
              </Button>
            </div>
            
            <Link
              href={`/admin/products/add`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors px-4 py-2 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              New Product
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-sm border-2 border-dashed border-stone-200 rounded-xl">
            No products in this category yet.
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 group hover:border-emerald-200 transition-colors">
                <Link href={`/admin/products/edit/${p.id}`} className="flex items-center gap-4 flex-1">
                  <div className="relative w-12 h-12 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {p.image_url ? (
                      <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                    ) : (
                      <span className="text-xs text-stone-400">No Img</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">৳{p.price.toLocaleString("en-BD")}</p>
                  </div>
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveProduct(p.id)}
                  className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-3"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
