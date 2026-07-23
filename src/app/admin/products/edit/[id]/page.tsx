"use client";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById, updateProduct } from "@/lib/products";
import type { CreateProductInput } from "@/lib/products";
import type { ProductCategory, Category } from "@/lib/types";
import { getAllCategories } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Plus,
  Loader2,
  CheckCircle,
  ImageIcon,
  ArrowLeft,
  Trash2,
  FileText,
  DollarSign,
  Settings,
  Layers,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ProductOptionsManager from "@/components/ProductOptionsManager";

interface SpecRow {
  key: string;
  value: string;
}

const INITIAL_SPECS: SpecRow[] = [{ key: "", value: "" }];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // ── Form fields ──────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [descMode, setDescMode] = useState<"edit" | "preview">("edit");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("ebike");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [specs, setSpecs] = useState<SpecRow[]>(INITIAL_SPECS);
  const [stock, setStock] = useState("10");
  const [isFeatured, setIsFeatured] = useState(false);

  // SEO fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"general" | "pricing" | "options" | "specs" | "media">("general");

  // ── Image upload state ───────────────────────────────────────
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  // Fetch product
  useEffect(() => {
    async function loadProduct() {
      const p = await getProductById(id);
      if (p) {
        setName(p.name);
        setSlug(p.slug);
        setDescription(p.description || "");
        setPrice(p.price.toString());
        setComparePrice(p.compare_at_price?.toString() || "");
        setCategory(p.category);
        setStock(p.stock_quantity.toString());
        setIsFeatured(p.is_featured);
        setImageUrl(p.image_url);
        setImagePreview(p.image_url);
        if (p.images && p.images.length > 0) {
          setGalleryImages(p.images);
        }
        
        if (p.specs) {
          // Parse SEO tags
          if (p.specs.meta_title) {
            setMetaTitle(p.specs.meta_title as string);
          }
          if (p.specs.meta_description) {
            setMetaDescription(p.specs.meta_description as string);
          }

          if (p.specs.tags) {
            setSelectedTags((p.specs.tags as string).split(",").map(t => t.trim()));
          }

          // Build specs list (filtering out metadata)
          const specEntries = Object.entries(p.specs).filter(
            ([k]) => k !== "tags" && k !== "meta_title" && k !== "meta_description"
          );

          if (specEntries.length > 0) {
            setSpecs(specEntries.map(([k, v]) => ({ key: k, value: v as string })));
          }
        }
      } else {
        toast.error("Product not found");
        router.push("/admin/products");
      }
      setLoading(false);
    }
    loadProduct();
  }, [id, router]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Submit state
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from name
  function handleNameChange(val: string) {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    );
  }

  // Handle main image upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setUploading(true);
    setUploadProgress(10);

    try {
      const fd = new FormData();
      fd.append("file", file);

      setUploadProgress(40);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      setUploadProgress(80);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Upload failed");
      }

      const data = await res.json();
      setImageUrl(data.url);
      setImagePreview(data.url);
      setUploadProgress(100);
      toast.success("Main image updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  // Handle gallery image upload
  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    let newUrls: string[] = [];

    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (res.ok) {
          const data = await res.json();
          newUrls.push(data.url);
        }
      } catch (err) {
        toast.error("Failed to upload gallery image");
      }
    }
    
    setGalleryImages((prev) => [...prev, ...newUrls]);
    setUploading(false);
    toast.success(`Uploaded ${newUrls.length} gallery images!`);
  }

  // Spec rows helper
  function updateSpec(idx: number, field: "key" | "value", val: string) {
    setSpecs((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: val } : row))
    );
  }
  function addSpecRow() {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  }
  function removeSpecRow(idx: number) {
    setSpecs((prev) => prev.filter((_, i) => i !== idx));
  }

  // Submit edits
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !slug || !price) {
      toast.error("Name, slug, and price are required!");
      return;
    }
    if (!imageUrl) {
      toast.error("Please upload product image!");
      setActiveTab("media");
      return;
    }

    setSaving(true);

    const specsObj = specs
      .filter((r) => r.key.trim() && r.value.trim())
      .reduce(
        (acc, r) => ({ ...acc, [r.key.trim()]: r.value.trim() }),
        {} as Record<string, string>
      );
      
    if (selectedTags.length > 0) {
      specsObj["tags"] = selectedTags.join(",");
    }

    if (metaTitle.trim()) {
      specsObj["meta_title"] = metaTitle.trim();
    }
    if (metaDescription.trim()) {
      specsObj["meta_description"] = metaDescription.trim();
    }

    const payload: Partial<CreateProductInput> = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      price: parseFloat(price),
      compare_at_price: comparePrice ? parseFloat(comparePrice) : null,
      category,
      image_url: imageUrl,
      images: galleryImages,
      stock_quantity: parseInt(stock),
      is_featured: isFeatured,
      specs: specsObj,
    };

    const res = await updateProduct(id, payload);

    if ("error" in res) {
      toast.error(res.error);
    } else {
      toast.success("Product updated successfully!");
      router.push("/admin/products");
      router.refresh();
    }
    setSaving(false);
  }

  const tabsConfig = [
    { id: "general", label: "General Info", icon: <FileText className="w-4 h-4" /> },
    { id: "pricing", label: "Pricing & Stock", icon: <DollarSign className="w-4 h-4" /> },
    { id: "options", label: "Variations & Addons", icon: <Layers className="w-4 h-4" /> },
    { id: "specs", label: "Specs & SEO", icon: <Settings className="w-4 h-4" /> },
    { id: "media", label: "Media & Images", icon: <ImageIcon className="w-4 h-4" /> },
  ] as const;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-24 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="text-sm font-semibold text-stone-500">Loading product data...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/products" className="text-stone-400 hover:text-stone-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Edit Product</h1>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Modify database details for this item
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none pb-2 border-b border-stone-200 gap-1.5">
            {tabsConfig.map((t) => {
              const isSelected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all border-b-2 border-transparent uppercase tracking-wider",
                    isSelected
                      ? "bg-white text-emerald-800 border-emerald-600 shadow-sm"
                      : "text-stone-500 hover:text-stone-750 hover:bg-stone-100/50"
                  )}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Form Content Cards */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">

            {/* TAB: GENERAL */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-base font-bold text-stone-900">General Information</h2>
                  <p className="text-xs text-stone-400">Modify base details of your product.</p>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. EV Solution Alpha E-Bike"
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Slug (URL Slug) *
                  </label>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                    <span className="text-stone-400 text-xs font-medium">/products/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="ev-solution-alpha-ebike"
                      required
                      className="flex-1 bg-transparent text-sm text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Grid Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.slug)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-xs font-bold text-center",
                          category === cat.slug
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-stone-200 text-stone-500 hover:border-stone-300 bg-white"
                        )}
                      >
                        <span className="text-xl filter drop-shadow-sm">{cat.icon || "📦"}</span>
                        <span className="truncate w-full">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description Editor + Realtime Preview Toggle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Description
                    </label>
                    <div className="bg-stone-100 p-0.5 rounded-lg flex border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setDescMode("edit")}
                        className={cn(
                          "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all",
                          descMode === "edit" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"
                        )}
                      >
                        Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setDescMode("preview")}
                        className={cn(
                          "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all",
                          descMode === "preview" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500"
                        )}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {descMode === "edit" ? (
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      placeholder="Describe this product. Markdown formatting is supported..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  ) : (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 min-h-[144px] prose prose-sm max-w-none">
                      {description ? (
                        <div className="whitespace-pre-wrap">{description}</div>
                      ) : (
                        <span className="text-stone-400 italic">No description details written.</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Tag Selection */}
                <div className="space-y-2 pt-4 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Product Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Best Selling", "Top Rated", "Discount", "New Arrival"].map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTags(selectedTags.filter((t) => t !== tag));
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                            isSelected
                              ? "bg-stone-900 border-stone-900 text-white"
                              : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                          )}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: PRICING & STOCK */}
            {activeTab === "pricing" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-base font-bold text-stone-900">Pricing & Inventory</h2>
                  <p className="text-xs text-stone-400">Configure cost specifications and stock availability.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Price (BDT) *
                    </label>
                    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                      <span className="text-stone-400 font-bold">৳</span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="85000"
                        required
                        min="0"
                        className="flex-1 bg-transparent text-sm text-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Compare Price */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Compare Price (BDT)
                    </label>
                    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                      <span className="text-stone-400 font-bold">৳</span>
                      <input
                        type="number"
                        value={comparePrice}
                        onChange={(e) => setComparePrice(e.target.value)}
                        placeholder="95000"
                        min="0"
                        className="flex-1 bg-transparent text-sm text-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      min="0"
                      required
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Featured Status
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsFeatured(!isFeatured)}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-bold transition-all h-12",
                        isFeatured
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-stone-200 text-stone-500 hover:border-stone-300 bg-white"
                      )}
                    >
                      {isFeatured ? "⭐ Featured Product" : "☆ Not Featured"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: VARIATIONS & ADD-ONS */}
            {activeTab === "options" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-base font-bold text-stone-900">Variations & Add-ons</h2>
                  <p className="text-xs text-stone-400">Offer product options like body-only pricing, upgrades, and warranties.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProductOptionsManager
                    label="Variations (e.g., Different Battery Capacity)"
                    value={specs.find((s) => s.key === "_variations")?.value || ""}
                    placeholderName="e.g. ONLY BODY PRICE / WITH BATTERY"
                    placeholderPrice="120000"
                    onChange={(val) => {
                      const specIdx = specs.findIndex((s) => s.key === "_variations");
                      if (specIdx >= 0) {
                        updateSpec(specIdx, "value", val);
                      } else {
                        setSpecs([...specs, { key: "_variations", value: val }]);
                      }
                    }}
                  />
                  <ProductOptionsManager
                    label="Add-ons (e.g., Extended Warranty)"
                    value={specs.find((s) => s.key === "_addons")?.value || ""}
                    placeholderName="e.g. WARRANTY-1 YEARS-MOTOR,CONTROLLER"
                    placeholderPrice="5000"
                    onChange={(val) => {
                      const specIdx = specs.findIndex((s) => s.key === "_addons");
                      if (specIdx >= 0) {
                        updateSpec(specIdx, "value", val);
                      } else {
                        setSpecs([...specs, { key: "_addons", value: val }]);
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* TAB: SPECS & SEO */}
            {activeTab === "specs" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {/* Specifications Section */}
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-stone-900">Technical Specifications</h2>
                      <p className="text-xs text-stone-400">Add dynamic spec properties (e.g., motor power, range).</p>
                    </div>
                    <Badge className="bg-stone-100 text-stone-500 text-[10px] font-bold border-0">
                      Optional
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {specs.filter(row => row.key !== "_variations" && row.key !== "_addons").map((row, idx) => {
                      const actualIdx = specs.indexOf(row);
                      return (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={row.key}
                            onChange={(e) => updateSpec(actualIdx, "key", e.target.value)}
                            placeholder="e.g. range"
                            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                          />
                          <span className="text-stone-300 text-sm font-bold">:</span>
                          <input
                            type="text"
                            value={row.value}
                            onChange={(e) => updateSpec(actualIdx, "value", e.target.value)}
                            placeholder="e.g. 80km"
                            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                          />
                          {specs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSpecRow(actualIdx)}
                              className="text-stone-400 hover:text-rose-600 p-1 border-0 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors border-0 bg-transparent py-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add spec row
                  </button>
                </div>

                {/* SEO Properties Section */}
                <div className="space-y-4 pt-6 border-t border-stone-100">
                  <div className="pb-2">
                    <h2 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-700" />
                      SEO Settings
                    </h2>
                    <p className="text-xs text-stone-400">Optimize product details for Google Search Engine indexing.</p>
                  </div>

                  {/* Meta Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="e.g. EV Solution Alpha E-Bike Price in Bangladesh"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Meta Description
                    </label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={3}
                      placeholder="Provide meta description summarizing the product for listing snips..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB: MEDIA & IMAGES */}
            {activeTab === "media" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-base font-bold text-stone-900">Product Media</h2>
                  <p className="text-xs text-stone-400">Manage primary thumbnail and detail variation images.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Primary Image Upload Box */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-stone-750 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-800" />
                      Primary Thumbnail Image
                    </h3>

                    {/* Drag n Drop zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "relative aspect-video rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden bg-stone-50 flex items-center justify-center",
                        imagePreview ? "border-emerald-600/50" : "border-stone-200 hover:border-stone-400"
                      )}
                    >
                      {imagePreview ? (
                        <>
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized={true} />
                          <div className="absolute inset-0 bg-stone-900/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-xs font-bold uppercase tracking-wider">Change Image</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-stone-400 p-4">
                          <Upload className="w-8 h-8 text-stone-300" />
                          <p className="text-xs text-center font-bold">Upload main thumbnail</p>
                        </div>
                      )}

                      {uploading && (
                        <div className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center gap-3">
                          <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                          <p className="text-white text-[10px] font-bold uppercase">Uploading to Cloudinary...</p>
                        </div>
                      )}
                    </div>

                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

                    {imageUrl && (
                      <div className="flex items-center justify-between text-[11px] bg-stone-50 p-3 border rounded-xl">
                        <span className="truncate text-stone-550 max-w-[200px] font-mono">{imageUrl}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("");
                            setImagePreview("");
                          }}
                          className="text-rose-600 font-bold hover:underline border-0 bg-transparent shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Variation Images Gallery Box */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-stone-750 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-emerald-800" />
                      Detail Gallery Images
                    </h3>

                    <div className="grid grid-cols-3 gap-2.5">
                      {galleryImages.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200">
                          <Image src={url} alt="Gallery" fill className="object-cover" unoptimized={true} />
                          <button
                            type="button"
                            onClick={() => setGalleryImages((prev) => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-rose-500 hover:text-rose-755 z-10"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <div
                        onClick={() => galleryInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-stone-200 hover:border-emerald-500 cursor-pointer flex flex-col items-center justify-center gap-1.5 bg-stone-50 text-stone-400 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Add</span>
                      </div>
                    </div>

                    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Form Actions Footer Bar */}
          <div className="flex items-center justify-between bg-stone-900 p-4 rounded-2xl text-white">
            <span className="text-xs font-bold text-stone-400">
              {activeTab === "media" ? "Ready to save edits?" : "Fill details or click save"}
            </span>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={saving || uploading || !imageUrl}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider disabled:opacity-40 border-0 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

        </form>
      </div>
    </main>
  );
}
