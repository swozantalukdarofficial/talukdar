"use client";

import { useState, useEffect } from "react";
import {
  X,
  Upload,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Sparkles,
  Tag,
  Sliders,
  DollarSign,
  Package,
  Layers,
} from "lucide-react";
import { createProduct, updateProduct } from "@/lib/products";
import type { Product, Category } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { adminUpload } from "@/lib/admin-api";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingProduct?: Product | null;
  categories: Category[];
}

interface VariantCombination {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

type TabId = "basic" | "pricing" | "media" | "specs" | "variants";

// Shared classes — inputs are text-base (16px) so iOS Safari never auto-zooms
const inputCls =
  "w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors";
const labelCls =
  "block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide mb-1.5";

export default function ProductDrawer({
  isOpen,
  onClose,
  onSuccess,
  editingProduct,
  categories,
}: ProductDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("basic");

  // Basic Information
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(categories[0]?.slug || "electric-bikes");
  const [brand, setBrand] = useState("Akij Motors");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");

  // Pricing & Inventory
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("10");
  const [lowStockThreshold, setLowStockThreshold] = useState("3");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isEmiAvailable, setIsEmiAvailable] = useState(true);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);

  // Media
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // Tags
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Electric", "Lithium Battery", "High Performance"]);

  // Specifications
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "Battery Type", value: "60V 30Ah Graphene / Lithium" },
    { key: "Motor Power", value: "1200W High Speed Bosch" },
    { key: "Max Range", value: "70-80 KM Per Charge" },
    { key: "Top Speed", value: "55 KM/H" },
    { key: "Charging Time", value: "4-5 Hours" },
    { key: "Braking System", value: "Front & Rear CBS Disc Brakes" },
    { key: "Warranty", value: "2 Years Official Brand Warranty" },
  ]);

  // Variant Combinations
  const [isCombination, setIsCombination] = useState(false);
  const [variantColor, setVariantColor] = useState("Red, Black, Silver");
  const [variantCapacity, setVariantCapacity] = useState("48V 20Ah, 60V 30Ah");
  const [combinations, setCombinations] = useState<VariantCombination[]>([]);

  // Body scroll lock + ESC to close while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setSlug(editingProduct.slug || "");
      setCategory(editingProduct.category || categories[0]?.slug || "electric-bikes");
      setPrice(String(editingProduct.price || ""));
      setComparePrice(editingProduct.compare_at_price ? String(editingProduct.compare_at_price) : "");
      setStockQuantity(String(editingProduct.stock_quantity ?? 10));
      setIsFeatured(editingProduct.is_featured || false);
      setImageUrl(editingProduct.image_url || "");
      setImages(editingProduct.images || (editingProduct.image_url ? [editingProduct.image_url] : []));
      setDescription(editingProduct.description || "");

      if (editingProduct.specs && typeof editingProduct.specs === "object") {
        const specArr = Object.entries(editingProduct.specs).map(([k, v]) => ({
          key: k,
          value: String(v),
        }));
        setSpecs(specArr.length > 0 ? specArr : [
          { key: "Battery Type", value: "" },
          { key: "Motor Power", value: "" },
          { key: "Max Range", value: "" },
          { key: "Warranty", value: "1 Year Official" },
        ]);
      }
    } else {
      setName("");
      setSlug("");
      setCategory(categories[0]?.slug || "electric-bikes");
      setBrand("Akij Motors");
      setSku(`EV-${Math.floor(1000 + Math.random() * 9000)}`);
      setBarcode(`880${Date.now().toString().slice(-8)}`);
      setBadge("⚡ Flash Sale");
      setPrice("");
      setComparePrice("");
      setStockQuantity("10");
      setLowStockThreshold("3");
      setIsFeatured(false);
      setIsEmiAvailable(true);
      setIsFreeDelivery(false);
      setImageUrl("");
      setImages([]);
      setDescription("");
      setTags(["Electric", "Lithium Battery", "High Performance"]);
      setSpecs([
        { key: "Battery Type", value: "60V 30Ah Graphene / Lithium" },
        { key: "Motor Power", value: "1200W High Speed Bosch" },
        { key: "Max Range", value: "70-80 KM Per Charge" },
        { key: "Top Speed", value: "55 KM/H" },
        { key: "Charging Time", value: "4-5 Hours" },
        { key: "Braking System", value: "Front & Rear CBS Disc Brakes" },
        { key: "Warranty", value: "2 Years Official Brand Warranty" },
      ]);
      setCombinations([]);
      setIsCombination(false);
      setActiveTab("basic");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingProduct, categories, isOpen]);

  // Generate slug automatically
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
      if (!sku) {
        setSku(`EV-${generated.slice(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
      }
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const data = await adminUpload(file);
        if (data.url) {
          if (!imageUrl) setImageUrl(data.url);
          setImages((prev) => Array.from(new Set([...prev, data.url])));
        }
      }
      toast.success("Images uploaded successfully!");
    } catch (err: any) {
      toast.error("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Tag Handlers
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  // Specification Handlers
  const handleAddSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  const handleSpecChange = (idx: number, field: "key" | "value", val: string) => {
    setSpecs(specs.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
  };

  // Generate Variant Combinations
  const handleGenerateVariants = () => {
    const colors = variantColor.split(",").map((c) => c.trim()).filter(Boolean);
    const capacities = variantCapacity.split(",").map((c) => c.trim()).filter(Boolean);
    const baseP = parseFloat(price) || 50000;

    const newCombos: VariantCombination[] = [];
    colors.forEach((col) => {
      capacities.forEach((cap) => {
        newCombos.push({
          id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: `${col} / ${cap}`,
          sku: `${sku || "EV"}-${col.slice(0, 3).toUpperCase()}-${cap.slice(0, 3).toUpperCase()}`,
          price: baseP,
          stock: 5,
        });
      });
    });

    setCombinations(newCombos);
    setIsCombination(true);
    toast.success(`Generated ${newCombos.length} variant combinations!`);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast.error("Please enter product name and slug");
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      toast.error("Please enter a valid product price");
      return;
    }

    const specObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specObj[s.key.trim()] = s.value.trim();
      }
    });

    // Append tags and brand to specs for full persistence
    if (brand) specObj["Brand"] = brand;
    if (sku) specObj["SKU"] = sku;
    if (barcode) specObj["Barcode"] = barcode;
    if (badge) specObj["Badge"] = badge;
    if (tags.length > 0) specObj["Tags"] = tags.join(", ");

    setLoading(true);

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      category: category as any,
      price: numPrice,
      compare_at_price: comparePrice ? parseFloat(comparePrice) : null,
      stock_quantity: parseInt(stockQuantity, 10) || 0,
      is_featured: isFeatured,
      image_url: imageUrl || images[0] || "/placeholder.png",
      images: images.length > 0 ? images : [imageUrl || "/placeholder.png"],
      description: description.trim(),
      specs: Object.keys(specObj).length > 0 ? specObj : undefined,
    };

    try {
      if (editingProduct) {
        const result = await updateProduct(editingProduct.id, payload);
        if ("error" in result) throw new Error(result.error);
        toast.success(`Product "${name}" updated successfully!`);
      } else {
        const result = await createProduct(payload as any);
        if ("error" in result) throw new Error(result.error);
        toast.success(`Product "${name}" created successfully!`);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "basic", label: "Basic", icon: Package },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "specs", label: "Specs", icon: Sliders },
    { id: "variants", label: "Variants", icon: Layers },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={editingProduct ? "Edit product" : "Add product"}
    >
      {/* Slide-over panel: full-width on mobile, max-w-md on desktop */}
      <aside
        className="absolute inset-y-0 right-0 w-full sm:max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header + tabs as ONE sticky unit (no magic offsets) ── */}
        <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="px-4 sm:px-5 pt-4 pb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="truncate">{editingProduct ? "Update Product" : "Add Product"}</span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 truncate">
                {editingProduct ? `Editing: ${editingProduct.name}` : "Details, variants, media, pricing & specs"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs — horizontally scrollable with a fade affordance */}
          <div className="relative">
            <div
              className="flex items-center gap-1 px-4 sm:px-5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Product sections"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-1.5 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 min-h-[44px]",
                      activeTab === tab.id
                        ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                        : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-stone-900 to-transparent" />
          </div>
        </div>

        {/* ── Scrollable form body ── */}
        <form onSubmit={handleSubmit} className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5">
            {/* ═════════ TAB 1: BASIC ═════════ */}
            {activeTab === "basic" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className={labelCls}>Product Title / Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Akij Durdanto V6 High Speed Electric Scooter"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className={labelCls}>Product Slug (URL Path) *</label>
                    <input
                      type="text"
                      required
                      placeholder="akij-durdanto-v6"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className={cn(inputCls, "font-mono")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Product Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={cn(inputCls, "cursor-pointer")}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.icon || "📁"} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className={labelCls}>Brand / Manufacturer</label>
                    <input
                      type="text"
                      placeholder="Akij, Walton, Yadea, JA Solar"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Product SKU Code</label>
                    <input
                      type="text"
                      placeholder="EV-SCOOT-001"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className={cn(inputCls, "font-mono")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Barcode / EAN</label>
                    <input
                      type="text"
                      placeholder="880123456789"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      className={cn(inputCls, "font-mono")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Promotional Badge (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {["🔥 15% OFF", "⚡ Flash Sale", "🔋 Top Seller", "⭐ Best Pick", "0% EMI"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBadge(b)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-xs font-bold border transition-colors min-h-[40px]",
                          badge === b
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Search & Filter Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add tag and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="shrink-0 px-4 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800"
                      >
                        <Tag className="w-3 h-3" />
                        <span className="break-words">{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          aria-label={`Remove tag ${t}`}
                          className="hover:text-rose-600 dark:hover:text-rose-400 p-1 -m-1 min-h-[28px] min-w-[28px] flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Product Overview & Story</label>
                  <textarea
                    rows={4}
                    placeholder="Features, performance specs, safety highlights, warranty..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={cn(inputCls, "leading-relaxed break-words")}
                  />
                </div>
              </div>
            )}

            {/* ═════════ TAB 2: PRICING ═════════ */}
            {activeTab === "pricing" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className={labelCls}>Selling Price (৳ BDT) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="125000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={cn(inputCls, "font-extrabold")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Compare at / Original Price (৳ BDT)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="135000"
                      value={comparePrice}
                      onChange={(e) => setComparePrice(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Stock Qty</label>
                    <input
                      type="number"
                      min="0"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className={cn(inputCls, "font-bold")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Low Stock Alert</label>
                    <input
                      type="number"
                      min="1"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
                  <h5 className="font-extrabold text-sm text-stone-900 dark:text-white">
                    Storefront Badges & Flags
                  </h5>

                  {[
                    { id: "flag-featured", checked: isFeatured, set: setIsFeatured, label: "Show on Homepage Best-Seller Grid" },
                    { id: "flag-emi", checked: isEmiAvailable, set: setIsEmiAvailable, label: "0% EMI Facility Available" },
                    { id: "flag-free-delivery", checked: isFreeDelivery, set: setIsFreeDelivery, label: "Eligible for Free Nationwide Delivery" },
                  ].map((f) => (
                    <div key={f.id} className="flex items-center gap-3 min-h-[44px]">
                      <input
                        type="checkbox"
                        id={f.id}
                        checked={f.checked}
                        onChange={(e) => f.set(e.target.checked)}
                        className="w-5 h-5 shrink-0 text-emerald-600 rounded accent-emerald-600"
                      />
                      <label htmlFor={f.id} className="text-sm font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                        {f.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═════════ TAB 3: MEDIA ═════════ */}
            {activeTab === "media" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="p-6 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50/50 dark:bg-stone-800/30 text-center space-y-2">
                  <Upload className="w-10 h-10 text-stone-400 dark:text-stone-500 mx-auto" />
                  <div>
                    <label className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold cursor-pointer inline-flex items-center justify-center min-h-[44px] shadow-sm transition-colors">
                      {uploadingImage ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                        </span>
                      ) : (
                        "Choose Media Files"
                      )}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-2">
                      Auto compressed to WebP/AVIF with CDN distribution
                    </p>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Or Direct Image URL</label>
                  <input
                    type="text"
                    placeholder="https://... or /silver_scooter.webp"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      if (e.target.value && !images.includes(e.target.value)) {
                        setImages([...images, e.target.value]);
                      }
                    }}
                    className={cn(inputCls, "font-mono break-all")}
                  />
                </div>

                {images.length > 0 && (
                  <div>
                    <label className={labelCls}>
                      Image Gallery ({images.length} uploaded)
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                          <img src={img} alt="Product" className="w-full h-full object-cover" />
                          {/* Always visible on touch — no hover-only opacity */}
                          <button
                            type="button"
                            onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                            aria-label="Delete image"
                            className="absolute top-1.5 right-1.5 min-h-[36px] min-w-[36px] flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-md transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═════════ TAB 4: SPECS ═════════ */}
            {activeTab === "specs" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-sm text-stone-900 dark:text-white">
                      Specification Matrix
                    </h4>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500">
                      Shown in the "Specifications" table on the storefront
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="shrink-0 inline-flex items-center gap-1 px-3 min-h-[40px] rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Spec name"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                        className={cn(inputCls, "font-bold")}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        aria-label="Remove spec row"
                        className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═════════ TAB 5: VARIANTS ═════════ */}
            {activeTab === "variants" && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 space-y-1">
                  <h5 className="font-extrabold text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Multi-Variant Combination Generator</span>
                  </h5>
                  <p className="text-[11px] text-teal-700 dark:text-teal-300">
                    Generate combinations for color variations and battery pack options automatically.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className={labelCls}>Color Options (comma separated)</label>
                    <input
                      type="text"
                      value={variantColor}
                      onChange={(e) => setVariantColor(e.target.value)}
                      placeholder="Red, Black, Silver, Blue"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Capacity Options (comma separated)</label>
                    <input
                      type="text"
                      value={variantCapacity}
                      onChange={(e) => setVariantCapacity(e.target.value)}
                      placeholder="48V 20Ah, 60V 30Ah Graphene"
                      className={inputCls}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateVariants}
                  className="w-full px-4 min-h-[44px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                >
                  ⚡ Generate Combinations
                </button>

                {combinations.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide mb-2">
                      {combinations.length} combinations — scroll table sideways
                    </p>
                    {/* Horizontal scroll wrapper: inputs are never clipped on mobile */}
                    <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700 -mx-1 px-1">
                      <table className="w-full min-w-[520px] text-left text-sm border-collapse">
                        <thead className="bg-stone-50 dark:bg-stone-800 text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
                          <tr>
                            <th className="py-2.5 px-3 whitespace-nowrap">Variant</th>
                            <th className="py-2.5 px-3 whitespace-nowrap">SKU</th>
                            <th className="py-2.5 px-3 whitespace-nowrap">Price (৳)</th>
                            <th className="py-2.5 px-3 whitespace-nowrap">Stock</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                          {combinations.map((c, i) => (
                            <tr key={c.id}>
                              <td className="py-2 px-3 font-bold text-stone-900 dark:text-stone-100 break-words min-w-[140px]">{c.name}</td>
                              <td className="py-2 px-3 font-mono text-xs text-stone-400 dark:text-stone-500 whitespace-nowrap">{c.sku}</td>
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  value={c.price}
                                  onChange={(e) => {
                                    const p = parseFloat(e.target.value) || 0;
                                    setCombinations(combinations.map((item, idx) => idx === i ? { ...item, price: p } : item));
                                  }}
                                  className="w-24 px-2.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-base font-bold text-stone-900 dark:text-stone-100"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  value={c.stock}
                                  onChange={(e) => {
                                    const s = parseInt(e.target.value, 10) || 0;
                                    setCombinations(combinations.map((item, idx) => idx === i ? { ...item, stock: s } : item));
                                  }}
                                  className="w-20 px-2.5 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-base font-bold text-stone-900 dark:text-stone-100"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Footer Actions (sticky, wraps on mobile) ── */}
          <div className="shrink-0 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 min-h-[44px] inline-flex items-center rounded-xl text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{editingProduct ? "Update Product" : "Publish Product"}</span>
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
