"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Search,
  Filter,
  ArrowUpDown,
  Check,
  X,
  Loader2,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { updateProduct, deleteProduct } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import type { Product, Category } from "@/lib/types";
import { toast } from "sonner";
import QuickCategoryChange from "./QuickCategoryChange";
import ProductDrawer from "@/components/admin/ProductDrawer";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

      const { data: prodsData, error: prodsErr } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (prodsErr) throw prodsErr;

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

  // ── Handlers ──
  const handleToggleFeatured = async (product: Product) => {
    setUpdatingId(product.id);
    const newFeatured = !product.is_featured;
    const result = await updateProduct(product.id, { is_featured: newFeatured });
    if ("error" in result) {
      toast.error("Failed to update featured status: " + result.error);
    } else {
      toast.success(newFeatured ? "Product featured on homepage!" : "Removed from featured.");
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, is_featured: newFeatured } : p))
      );
    }
    setUpdatingId(null);
  };

  const handleSavePrice = async (productId: string) => {
    const newPrice = parseFloat(editingPriceVal);
    const newComparePrice = editingComparePriceVal ? parseFloat(editingComparePriceVal) : null;

    if (isNaN(newPrice) || newPrice < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    setUpdatingId(productId);
    const result = await updateProduct(productId, {
      price: newPrice,
      compare_at_price: newComparePrice,
    });

    if ("error" in result) {
      toast.error("Failed to update price: " + result.error);
    } else {
      toast.success("Price updated successfully!");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, price: newPrice, compare_at_price: newComparePrice }
            : p
        )
      );
      setEditingPriceId(null);
    }
    setUpdatingId(null);
  };

  const handleSaveStock = async (productId: string) => {
    const newStock = parseInt(editingStockVal, 10);
    if (isNaN(newStock) || newStock < 0) {
      toast.error("Please enter a valid stock quantity.");
      return;
    }

    setUpdatingId(productId);
    const result = await updateProduct(productId, { stock_quantity: newStock });

    if ("error" in result) {
      toast.error("Failed to update stock: " + result.error);
    } else {
      toast.success("Stock quantity updated!");
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock_quantity: newStock } : p))
      );
      setEditingStockId(null);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    const result = await deleteProduct(id);
    if ("error" in result) {
      toast.error("Failed to delete: " + result.error);
    } else {
      toast.success("Product deleted.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected products?`)) return;

    setBulkDeleting(true);
    let successCount = 0;
    for (const id of selectedIds) {
      const res = await deleteProduct(id);
      if (!("error" in res)) successCount++;
    }

    toast.success(`Deleted ${successCount} products.`);
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    setBulkDeleting(false);
  };

  const handleExportCSV = () => {
    if (filteredProducts.length === 0) {
      toast.error("No products to export.");
      return;
    }

    const headers = ["ID", "Name", "Category", "Price", "Compare Price", "Stock", "Featured", "Slug"];
    const rows = filteredProducts.map((p) => [
      `"${p.id}"`,
      `"${(p.name || "").replace(/"/g, '""')}"`,
      `"${p.category || ""}"`,
      p.price || 0,
      p.compare_at_price || "",
      p.stock_quantity || 0,
      p.is_featured ? "Yes" : "No",
      `"${p.slug || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ev_products_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Export downloaded!");
  };

  // ── Filter & Sort Logic ──
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    let matchStock = true;
    if (stockFilter === "in_stock") matchStock = p.stock_quantity > 0;
    else if (stockFilter === "low_stock") matchStock = p.stock_quantity > 0 && p.stock_quantity <= 5;
    else if (stockFilter === "out_of_stock") matchStock = p.stock_quantity === 0;

    return matchSearch && matchCategory && matchStock;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "stock_asc") return a.stock_quantity - b.stock_quantity;
    if (sortBy === "stock_desc") return b.stock_quantity - a.stock_quantity;
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // ── Pagination Calculation ──
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAllOnPage = () => {
    const pageIds = paginatedProducts.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Page Header & Top Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Products Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage your store inventory, pricing, categories, and availability
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-800 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 hover:text-emerald-600 dark:hover:bg-stone-800 shadow-2xs transition-colors cursor-pointer"
            title="Refresh Products"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin text-emerald-600")} />
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setDrawerOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* ── Kachabazar Style Filter Card ── */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by product title or slug..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2.5 px-3 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.slug).length;
                return (
                  <option key={c.id} value={c.slug}>
                    {c.icon || "📁"} {c.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2.5 px-3 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock (&gt; 0)</option>
              <option value="low_stock">Low Stock (1 - 5)</option>
              <option value="out_of_stock">Out of Stock (0)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2.5 px-3 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="stock_desc">Stock: High → Low</option>
              <option value="stock_asc">Stock: Low → High</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Indicators & Reset Button */}
        {(search || categoryFilter !== "all" || stockFilter !== "all") && (
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="text-stone-500">
              Showing <strong className="text-stone-800 dark:text-stone-200">{filteredProducts.length}</strong> of {products.length} products
            </span>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStockFilter("all");
                setSortBy("newest");
                setCurrentPage(1);
              }}
              className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Bulk Actions Floating Toolbar (When Items Selected) ── */}
      {selectedIds.length > 0 && (
        <div className="p-4 rounded-2xl bg-emerald-900 text-white flex items-center justify-between shadow-lg shadow-emerald-950/20 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>{selectedIds.length} Products Selected</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-emerald-200 hover:text-white px-2 py-1"
            >
              Deselect All
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              {bulkDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Products Table Card ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold">Loading product catalog...</p>
          </div>
        ) : errorMsg ? (
          <div className="p-12 text-center text-rose-600 text-xs">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
            {errorMsg}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-stone-400 text-xs">
            <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-bold text-sm text-stone-600 dark:text-stone-300">No products match your criteria</p>
            <p className="text-[11px] mt-1">Try adjusting your search or category filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-10">
                    <button
                      onClick={handleSelectAllOnPage}
                      className="text-stone-400 hover:text-stone-600 block"
                      title="Select all on this page"
                    >
                      {paginatedProducts.every((p) => selectedIds.includes(p.id)) ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (৳)</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {paginatedProducts.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;
                  const isOutOfStock = product.stock_quantity === 0;

                  return (
                    <tr
                      key={product.id}
                      className={cn(
                        "hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors",
                        isSelected && "bg-emerald-50/30 dark:bg-emerald-950/20"
                      )}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setSelectedIds((prev) =>
                              prev.includes(product.id)
                                ? prev.filter((id) => id !== product.id)
                                : [...prev, product.id]
                            );
                          }}
                          className="text-stone-400 hover:text-stone-600"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Product Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 overflow-hidden shrink-0 relative group">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <Package className="w-5 h-5" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 max-w-xs sm:max-w-sm">
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="font-bold text-stone-900 dark:text-stone-100 hover:text-emerald-600 transition-colors line-clamp-1"
                              title={product.name}
                            >
                              {product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-stone-400 font-mono">
                                slug: {product.slug}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category Selector */}
                      <td className="py-3.5 px-4">
                        <QuickCategoryChange
                          productId={product.id}
                          currentCategorySlug={product.category}
                          categories={categories}
                        />
                      </td>

                      {/* Price & Compare Price (Inline Editable) */}
                      <td className="py-3.5 px-4">
                        {editingPriceId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <div className="space-y-1">
                              <input
                                type="number"
                                value={editingPriceVal}
                                onChange={(e) => setEditingPriceVal(e.target.value)}
                                placeholder="Price"
                                className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-stone-800"
                                autoFocus
                              />
                              <input
                                type="number"
                                value={editingComparePriceVal}
                                onChange={(e) => setEditingComparePriceVal(e.target.value)}
                                placeholder="Old Price"
                                className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-stone-800"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleSavePrice(product.id)}
                                className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingPriceId(product.id);
                              setEditingPriceVal(String(product.price));
                              setEditingComparePriceVal(String(product.compare_at_price || ""));
                            }}
                            className="cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 p-1.5 rounded-lg inline-block group"
                            title="Click to quick-edit price"
                          >
                            <div className="font-extrabold text-stone-900 dark:text-stone-100">
                              ৳{product.price.toLocaleString()}
                            </div>
                            {product.compare_at_price && (
                              <div className="text-[10px] text-stone-400 line-through">
                                ৳{product.compare_at_price.toLocaleString()}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Stock Quantity (Inline Editable) */}
                      <td className="py-3.5 px-4">
                        {editingStockId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={editingStockVal}
                              onChange={(e) => setEditingStockVal(e.target.value)}
                              className="w-16 px-2 py-1 text-xs border rounded bg-white dark:bg-stone-800"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveStock(product.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingStockId(null)}
                              className="p-1 text-stone-400 hover:bg-stone-100 rounded"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingStockId(product.id);
                              setEditingStockVal(String(product.stock_quantity));
                            }}
                            className="cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 p-1.5 rounded-lg inline-block"
                            title="Click to quick-edit stock quantity"
                          >
                            <span
                              className={cn(
                                "px-2.5 py-1 rounded-full text-[11px] font-extrabold inline-block",
                                isOutOfStock
                                  ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                  : isLowStock
                                  ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              )}
                            >
                              {product.stock_quantity} in stock
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Stock Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                            isOutOfStock
                              ? "bg-rose-100 text-rose-700"
                              : isLowStock
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "Selling"}
                        </span>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(product)}
                          disabled={updatingId === product.id}
                          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          title={product.is_featured ? "Featured on Home" : "Make Featured"}
                        >
                          {updatingId === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                          ) : (
                            <Star
                              className={cn(
                                "w-4 h-4 transition-colors",
                                product.is_featured
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-stone-300 hover:text-amber-400"
                              )}
                            />
                          )}
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/products/${product.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="View in Storefront"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setDrawerOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                            title="Edit Product Details"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Table Footer & Pagination ── */}
        {!loading && filteredProducts.length > 0 && (
          <div className="p-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} entries
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((pageNum, idx, arr) => {
                  const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
                  return (
                    <span key={pageNum} className="flex items-center">
                      {showEllipsis && <span className="px-1 text-stone-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-8 h-8 rounded-lg font-bold transition-colors cursor-pointer",
                          currentPage === pageNum
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                        )}
                      >
                        {pageNum}
                      </button>
                    </span>
                  );
                })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Slide-Over Product Drawer (Kachabazar Style) ── */}
      <ProductDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={fetchData}
        editingProduct={editingProduct}
        categories={categories}
      />
    </div>
  );
}
