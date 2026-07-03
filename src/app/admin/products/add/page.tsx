"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProduct } from "@/lib/products";
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
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SpecRow {
  key: string;
  value: string;
}

const INITIAL_SPECS: SpecRow[] = [{ key: "", value: "" }];

export default function AddProductPage() {
  const router = useRouter();

  // ── Form fields ──────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("ebike");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [stock, setStock] = useState("10");
  const [isFeatured, setIsFeatured] = useState(false);
  const [specs, setSpecs] = useState<SpecRow[]>(INITIAL_SPECS);

  // ── Image upload state ───────────────────────────────────────
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // ── Submit state ─────────────────────────────────────────────
  const [saving, setSaving] = useState(false);

  // ── Fetch Categories ─────────────────────────────────────────
  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  // ── Auto-generate slug from name ─────────────────────────────
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

  // ── Handle image file select & upload ─────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
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
      toast.success("Image uploaded to Cloudinary! ✅", {
        description: `${Math.round(data.bytes / 1024)} KB`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  // ── Handle gallery image upload ──────────────────────────────
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
        toast.error("Failed to upload an image");
      }
    }
    
    setGalleryImages((prev) => [...prev, ...newUrls]);
    setUploading(false);
    toast.success(`Uploaded ${newUrls.length} variation images!`);
  }

  // ── Spec row helpers ─────────────────────────────────────────
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

  // ── Submit ───────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload a product image first!");
      return;
    }
    if (!name || !slug || !price) {
      toast.error("Name, slug, and price are required!");
      return;
    }

    setSaving(true);

    // Build specs object (ignore empty rows)
    const specsObj = specs
      .filter((r) => r.key.trim() && r.value.trim())
      .reduce(
        (acc, r) => ({ ...acc, [r.key.trim()]: r.value.trim() }),
        {} as Record<string, string>
      );
      
    if (selectedTags.length > 0) {
      specsObj["tags"] = selectedTags.join(",");
    }

    const input: CreateProductInput = {
      name,
      slug,
      description,
      price: parseFloat(price),
      compare_at_price: comparePrice ? parseFloat(comparePrice) : null,
      category,
      image_url: imageUrl,
      images: galleryImages,
      stock_quantity: parseInt(stock),
      is_featured: isFeatured,
      specs: Object.keys(specsObj).length > 0 ? specsObj : undefined,
    };

    const result = await createProduct(input);

    if ("error" in result) {
      toast.error("Failed: " + result.error);
      setSaving(false);
      return;
    }

    toast.success(`"${name}" product added! 🎉`);
    router.push("/admin/products");
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/products"
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Add New Product</h1>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Image → Cloudinary | Data → Supabase
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: Image Upload ── */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 rounded-2xl p-5 sticky top-24 shadow-sm shadow-stone-150/50">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-800" />
                  Product Image
                </h2>

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative aspect-square rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden bg-stone-50",
                    imagePreview
                      ? "border-emerald-600/50"
                      : "border-stone-200 hover:border-stone-400"
                  )}
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="300px"
                        unoptimized={imagePreview.startsWith("blob:")}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold uppercase tracking-wider">
                          Click to change
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-stone-400">
                      <Upload className="w-8 h-8 text-stone-300" />
                      <p className="text-xs text-center px-4 leading-normal font-medium">
                        Click to upload<br />
                        <span className="text-[10px] text-stone-400 font-normal">
                          JPG, PNG, WEBP (max 10MB)
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Upload progress overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                      <div className="w-32 h-1 bg-stone-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-white text-[10px] font-bold uppercase tracking-wider">Uploading...</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* Upload status */}
                {imageUrl && !uploading && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Upload successful! ✅</span>
                  </div>
                )}
                {imageUrl && (
                  <p className="mt-1 text-stone-400 text-[10px] truncate">{imageUrl}</p>
                )}

                {/* Remove image */}
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl("");
                      setImagePreview("");
                    }}
                    className="mt-3 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Remove image
                  </button>
                )}
              </div>

              {/* Gallery Images */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 mt-6 shadow-sm shadow-stone-150/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-800" />
                    Variation Images
                  </h2>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {galleryImages.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200">
                      <Image src={url} alt="Variation" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-rose-500 hover:text-rose-700 z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-stone-200 hover:border-emerald-500 cursor-pointer flex flex-col items-center justify-center gap-1 bg-stone-50 text-stone-400"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Add</span>
                  </div>
                </div>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryUpload}
                />
              </div>
            </div>


            {/* ── Right: Product Details ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Basic info */}
              <div className="bg-white border border-stone-200/85 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-150/40">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-2.5">Basic Information</h2>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Thunder X1 E-Bike"
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Slug (URL) *
                  </label>
                  <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                    <span className="text-stone-400 text-xs font-medium">/products/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="thunder-x1-ebike"
                      required
                      className="flex-1 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe this product details..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.slug)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-xs font-bold",
                          category === cat.slug
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-stone-200 text-stone-500 hover:border-stone-300 bg-white"
                        )}
                      >
                        <span className="text-xl filter drop-shadow-sm">{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2 mt-4 pt-4 border-t border-stone-100">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Product Tags (Optional)
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
                              setSelectedTags(selectedTags.filter(t => t !== tag));
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

                {/* Variations & Addons */}
                <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-stone-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Variations (Name:Price)
                    </label>
                    <textarea
                      placeholder="Red: 120000&#10;Blue: 125000"
                      rows={3}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                      onChange={(e) => {
                        const val = e.target.value;
                        const specIdx = specs.findIndex(s => s.key === "_variations");
                        if (specIdx >= 0) {
                          updateSpec(specIdx, "value", val);
                        } else {
                          setSpecs([...specs, { key: "_variations", value: val }]);
                        }
                      }}
                    />
                    <p className="text-[10px] text-stone-500 font-medium">Add one per line. Use exact format: <b>Name: Price</b></p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Add-ons (Name:Price)
                    </label>
                    <textarea
                      placeholder="Extended Warranty: 2500&#10;Bike Cover: 500"
                      rows={3}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                      onChange={(e) => {
                        const val = e.target.value;
                        const specIdx = specs.findIndex(s => s.key === "_addons");
                        if (specIdx >= 0) {
                          updateSpec(specIdx, "value", val);
                        } else {
                          setSpecs([...specs, { key: "_addons", value: val }]);
                        }
                      }}
                    />
                    <p className="text-[10px] text-stone-500 font-medium">Add one per line. Use exact format: <b>Name: Price</b></p>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-white border border-stone-200/85 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-150/40">
                <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-2.5">Pricing & Stock</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Price (BDT) *
                    </label>
                    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                      <span className="text-stone-400 font-bold text-sm">৳</span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="85000"
                        required
                        min="0"
                        className="flex-1 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Compare Price (BDT)
                    </label>
                    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5">
                      <span className="text-stone-400 font-bold text-sm">৳</span>
                      <input
                        type="number"
                        value={comparePrice}
                        onChange={(e) => setComparePrice(e.target.value)}
                        placeholder="95000"
                        min="0"
                        className="flex-1 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                      />
                    </div>
                  </div>

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
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                      Featured Product?
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsFeatured(!isFeatured)}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold transition-all h-10",
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

              {/* Specs */}
              <div className="bg-white border border-stone-200/85 rounded-2xl p-6 space-y-4 shadow-sm shadow-stone-150/40">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest">Specifications</h2>
                  <Badge className="bg-stone-100 text-stone-500 text-[10px] font-bold border-0">
                    Optional
                  </Badge>
                </div>

                <div className="space-y-2">
                  {specs.map((row, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={row.key}
                        onChange={(e) => updateSpec(idx, "key", e.target.value)}
                        placeholder="e.g. range"
                        className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      />
                      <span className="text-stone-300 text-sm font-bold">:</span>
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) =>
                          updateSpec(idx, "value", e.target.value)
                        }
                        placeholder="e.g. 80km"
                        className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                      />
                      {specs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpecRow(idx)}
                          className="text-stone-400 hover:text-rose-600 p-1 border-0 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addSpecRow}
                  className="flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors border-0 bg-transparent py-1"
                >
                  <Plus className="w-4 h-4" />
                  Add spec row
                </button>
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={saving || uploading || !imageUrl}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold h-12 text-sm gap-2 disabled:opacity-50 rounded-xl shadow-md shadow-emerald-700/10 border-0"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving to Supabase...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Product
                  </>
                )}
                </Button>

                {!imageUrl && (
                  <p className="text-center text-xs font-bold text-amber-700 bg-amber-50 py-2 rounded-xl border border-amber-100/50">
                    ⚠️ Please upload a product image first to enable Save button.
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
