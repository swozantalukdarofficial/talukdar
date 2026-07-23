"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Package, Search, Filter, ArrowUpDown, Check, X, Loader2, CheckSquare, Square, AlertCircle, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { updateProduct, deleteProduct } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import type { Product, Category } from "@/lib/types";
import { toast } from "sonner";
import QuickCategoryChange from "./QuickCategoryChange";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Selection state for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Inline Quick Edit state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editingPriceVal, setEditingPriceVal] = useState("");
  const [editingComparePriceVal, setEditingComparePriceVal] = useState("");

  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editingStockVal, setEditingStockVal] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setErrorMsg(null);
      if (!supabase) {
        throw new Error("Supabase client is not available.");
      }

      // Fetch products
      const { data: prodsData, error: prodsErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (prodsErr) throw prodsErr;

      // Fetch categories
      const cats = await getAllCategories();
      setCategories(cats);
      setProducts(prodsData || []);
    } catch (err: any) {
      console.error("Error loading products/categories:", err);
      setErrorMsg(err.message || "Failed to load products from database.");
    } finally {
      setLoading(false);
    }
  }

  // Handle single delete
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setUpdatingId(id);

    const result = await deleteProduct(id);
    if ("error" in result) {
      toast.error("Failed to delete product: " + result.error);
    } else {
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
    setUpdatingId(null);
  }

  // Handle bulk delete
  async function handleBulkDelete() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} products permanently?`)) return;

    setBulkDeleting(true);
    let successCount = 0;
    let failCount = 0;

    for (const id of selectedIds) {
      const result = await deleteProduct(id);
      if ("error" in result) {
        failCount++;
      } else {
        successCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully deleted ${successCount} products!`);
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
    if (failCount > 0) {
      toast.error(`Failed to delete ${failCount} products.`);
    }

    setBulkDeleting(false);
  }

  // Handle inline price update
  async function handleSavePrice(pId: string) {
    const newPrice = parseFloat(editingPriceVal);
    const newCompare = editingComparePriceVal ? parseFloat(editingComparePriceVal) : null;
    if (isNaN(newPrice)) {
      toast.error("Invalid price value");
      return;
    }

    setUpdatingId(pId);
    const result = await updateProduct(pId, {
      price: newPrice,
      compare_at_price: newCompare,
    });

    if ("error" in result) {
      toast.error("Failed to update price: " + result.error);
    } else {
      toast.success("Price updated successfully!");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === pId
            ? { ...p, price: newPrice, compare_at_price: newCompare }
            : p
        )
      );
      setEditingPriceId(null);
    }
    setUpdatingId(null);
  }

  // Handle inline stock update
  async function handleSaveStock(pId: string) {
    const newStock = parseInt(editingStockVal);
    if (isNaN(newStock) || newStock < 0) {
      toast.error("Invalid stock value");
      return;
    }

    setUpdatingId(pId);
    const result = await updateProduct(pId, {
      stock_quantity: newStock,
    });

    if ("error" in result) {
      toast.error("Failed to update stock: " + result.error);
    } else {
      toast.success("Stock quantity updated!");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === pId ? { ...p, stock_quantity: newStock } : p
        )
      );
      setEditingStockId(null);
    }
    setUpdatingId(null);
  }

  // Checkbox handlers
  function handleSelectRow(pId: string) {
    setSelectedIds((prev) =>
      prev.includes(pId) ? prev.filter((id) => id !== pId) : [...prev, pId]
    );
  }

  function handleSelectAll(visibleProducts: Product[]) {
    const visibleIds = visibleProducts.map((p) => p.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      // Unselect only the visible ones
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      // Select all visible ones, avoiding duplicates
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  }

  // Client-side filtering & sorting
  const filteredProducts = products.filter((p) => {
    // 1. Search Query
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Category Filter
    if (categoryFilter !== "all" && p.category !== categoryFilter) {
      return false;
    }

    // 3. Stock Filter
    if (stockFilter === "instock" && p.stock_quantity === 0) return false;
    if (stockFilter === "outofstock" && p.stock_quantity > 0) return false;
    if (stockFilter === "lowstock" && (p.stock_quantity === 0 || p.stock_quantity > 5)) return false;

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "stock_asc") return a.stock_quantity - b.stock_quantity;
    if (sortBy === "stock_desc") return b.stock_quantity - a.stock_quantity;
    if (sortBy === "newest") {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-24 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        <p className="text-sm font-semibold text-stone-500">Loading products database...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <Package className="w-8 h-8 text-emerald-600 shrink-0" />
              Products Database
            </h1>
            <p className="text-stone-500 mt-1">Manage, sort, filter, and inline edit store items.</p>
          </div>
          <Link
            href="/admin/products/add"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-xl shadow-md shadow-emerald-700/10 transition-all text-xs uppercase tracking-wider self-start sm:self-center border-0"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span className="text-sm font-semibold">{errorMsg}</span>
          </div>
        )}

        {/* Filters and Search toolbar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search products by name or slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full text-xs font-bold text-stone-800 placeholder:text-stone-400 transition-all shadow-inner"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-stone-400">Category</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-750 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm"
              >
                <option value="all">📂 All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.icon || "📁"} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Level Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-stone-400">Stock</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-750 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm"
              >
                <option value="all">📦 All Levels</option>
                <option value="instock">In Stock</option>
                <option value="outofstock">Out of Stock</option>
                <option value="lowstock">Low Stock (≤ 5)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-stone-400">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-750 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-sm"
              >
                <option value="newest">📅 Newest First</option>
                <option value="price_asc">📈 Price: Low to High</option>
                <option value="price_desc">📉 Price: High to Low</option>
                <option value="stock_asc">📦 Stock: Low to High</option>
                <option value="stock_desc">📦 Stock: High to Low</option>
              </select>
            </div>

          </div>

          {/* Bulk Actions Panel */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between bg-stone-900 text-white px-5 py-3.5 rounded-xl animate-in slide-in-from-top-2 duration-200">
              <span className="text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {selectedIds.length} product{selectedIds.length === 1 ? "" : "s"} selected
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-xs text-stone-400 hover:text-white font-bold px-3 py-1.5 transition-colors border-0 bg-transparent"
                >
                  Deselect All
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={bulkDeleting}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50 transition-colors border-0"
                >
                  {bulkDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Product listing table */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium mb-4">No matching products found</p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStockFilter("all");
              }}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-5 py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm shadow-stone-150/55">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/50">
                    <th className="px-5 py-4 w-12 text-center">
                      <button
                        onClick={() => handleSelectAll(sortedProducts)}
                        className="text-stone-400 hover:text-stone-600 p-1 border-0 bg-transparent flex items-center justify-center mx-auto"
                      >
                        {sortedProducts.every((p) => selectedIds.includes(p.id)) ? (
                          <CheckSquare className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Product
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest w-48">
                      Price (BDT) <span className="text-[8px] text-stone-450 normal-case font-normal">(Click value to edit)</span>
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest w-36">
                      Stock <span className="text-[8px] text-stone-450 normal-case font-normal">(Click to edit)</span>
                    </th>
                    <th className="text-center px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest w-24">
                      Featured
                    </th>
                    <th className="px-5 py-4 w-44" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {sortedProducts.map((p) => {
                    const isUpdating = updatingId === p.id;
                    const isSelected = selectedIds.includes(p.id);

                    return (
                      <tr 
                        key={p.id} 
                        className={`transition-colors duration-150 ${
                          isSelected ? "bg-emerald-50/20 hover:bg-emerald-50/30" : "hover:bg-stone-50/40"
                        }`}
                      >
                        {/* Checkbox selection */}
                        <td className="px-5 py-4 w-12 text-center">
                          <button
                            onClick={() => handleSelectRow(p.id)}
                            className="text-stone-400 hover:text-stone-600 p-1 border-0 bg-transparent flex items-center justify-center mx-auto"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        {/* Product Detail info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-50 border border-stone-150 shrink-0">
                              <img
                                src={p.image_url}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <Link 
                                href={`/admin/products/edit/${p.id}`}
                                className="text-sm font-bold text-stone-900 hover:underline truncate max-w-[240px] block"
                              >
                                {p.name}
                              </Link>
                              <p className="text-[10px] font-mono text-stone-400 truncate max-w-[240px] mt-0.5">
                                /{p.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category Dropdown */}
                        <td className="px-5 py-4">
                          <QuickCategoryChange
                            productId={p.id}
                            currentCategorySlug={p.category}
                            categories={categories}
                          />
                        </td>

                        {/* Price Inline editing */}
                        <td className="px-5 py-4">
                          {editingPriceId === p.id ? (
                            <div className="flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-stone-450 font-bold">Price:</span>
                                <input
                                  type="number"
                                  value={editingPriceVal}
                                  onChange={(e) => setEditingPriceVal(e.target.value)}
                                  className="w-24 bg-stone-50 border border-stone-200 px-2 py-1 rounded text-xs font-bold focus:outline-none"
                                  placeholder="Price"
                                  autoFocus
                                />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-stone-450 font-bold">Compare:</span>
                                <input
                                  type="number"
                                  value={editingComparePriceVal}
                                  onChange={(e) => setEditingComparePriceVal(e.target.value)}
                                  className="w-24 bg-stone-50 border border-stone-200 px-2 py-1 rounded text-xs font-bold focus:outline-none"
                                  placeholder="Compare"
                                />
                              </div>
                              <div className="flex gap-2.5 mt-1">
                                <button
                                  onClick={() => handleSavePrice(p.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-0.5 border-0"
                                >
                                  <Check className="w-3 h-3" /> Save
                                </button>
                                <button
                                  onClick={() => setEditingPriceId(null)}
                                  className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-0.5 border-0"
                                >
                                  <X className="w-3 h-3" /> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingPriceId(p.id);
                                setEditingPriceVal(p.price.toString());
                                setEditingComparePriceVal(p.compare_at_price ? p.compare_at_price.toString() : "");
                              }}
                              className="cursor-pointer hover:bg-stone-50 p-1.5 rounded-lg border border-transparent hover:border-stone-100 transition-all w-fit group"
                              title="Click to quick-edit price"
                            >
                              <p className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 flex items-center gap-1">
                                ৳{p.price.toLocaleString("en-BD")}
                                <Pencil className="w-3 h-3 text-stone-300 group-hover:text-stone-500 opacity-0 group-hover:opacity-100" />
                              </p>
                              {p.compare_at_price && p.compare_at_price > p.price && (
                                <p className="text-[10px] text-stone-400 line-through">
                                  ৳{p.compare_at_price.toLocaleString("en-BD")}
                                </p>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Stock Inline editing */}
                        <td className="px-5 py-4">
                          {editingStockId === p.id ? (
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="number"
                                value={editingStockVal}
                                onChange={(e) => setEditingStockVal(e.target.value)}
                                className="w-16 bg-stone-50 border border-stone-200 px-2 py-1 rounded text-xs font-bold focus:outline-none"
                                placeholder="Stock"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveStock(p.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded border-0 shrink-0"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingStockId(null)}
                                className="bg-stone-200 hover:bg-stone-300 text-stone-700 p-1 rounded border-0 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingStockId(p.id);
                                setEditingStockVal(p.stock_quantity.toString());
                              }}
                              className="cursor-pointer hover:bg-stone-50 p-1.5 rounded-lg border border-transparent hover:border-stone-100 transition-all w-fit group flex items-center gap-1.5"
                              title="Click to quick-edit stock"
                            >
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  p.stock_quantity > 10
                                    ? "text-emerald-800 bg-emerald-50"
                                    : p.stock_quantity > 0
                                    ? "text-amber-800 bg-amber-50"
                                    : "text-rose-800 bg-rose-50"
                                }`}
                              >
                                {p.stock_quantity}
                              </span>
                              <Pencil className="w-3 h-3 text-stone-300 group-hover:text-stone-500 opacity-0 group-hover:opacity-100" />
                            </div>
                          )}
                        </td>

                        {/* Featured */}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={async () => {
                              setUpdatingId(p.id);
                              const targetFeatured = !p.is_featured;
                              const result = await updateProduct(p.id, { is_featured: targetFeatured });
                              if ("error" in result) {
                                toast.error("Failed to update featured flag: " + result.error);
                              } else {
                                toast.success("Product featured status changed!");
                                setProducts((prev) => prev.map((pr) => pr.id === p.id ? { ...pr, is_featured: targetFeatured } : pr));
                              }
                              setUpdatingId(null);
                            }}
                            disabled={isUpdating}
                            className="p-1 text-base hover:scale-110 transition-all border-0 bg-transparent cursor-pointer"
                            title="Toggle featured status"
                          >
                            {p.is_featured ? (
                              <span className="text-amber-500 filter drop-shadow-sm">⭐</span>
                            ) : (
                              <span className="text-stone-300 hover:text-stone-400">☆</span>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/products/edit/${p.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 bg-stone-100 hover:bg-emerald-50 px-3 py-2 rounded-xl transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id)}
                              disabled={isUpdating}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-3 py-2 rounded-xl transition-colors disabled:opacity-50 border-0"
                            >
                              {isUpdating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
