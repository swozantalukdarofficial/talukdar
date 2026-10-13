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
  Barcode,
  ShieldCheck,
  Truck,
  CreditCard,
  Flame,
  CheckCircle2
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

export default function ProductDrawer({
  isOpen,
  onClose,
  onSuccess,
  editingProduct,
  categories,
}: ProductDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "pricing" | "media" | "specs" | "variants">("basic");

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
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-stone-900 max-h-[95vh] rounded-2xl overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* ── Drawer Header ── */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50 sticky top-0 z-20">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <span>{editingProduct ? "Update Product Catalog" : "Add New Catalog Product"}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {editingProduct ? `Editing: ${editingProduct.name}` : "Configure product details, variants, media, pricing and specifications"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Navigation Tabs (Kachabazar Style) ── */}
        <div className="flex items-center gap-1 px-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 overflow-x-auto hide-scrollbar sticky top-[69px] z-10">
          {[
            { id: "basic", label: "1. Basic Information", icon: Package },
            { id: "pricing", label: "2. Pricing & Stock", icon: DollarSign },
            { id: "media", label: "3. Images & Media", icon: ImageIcon },
            { id: "specs", label: "4. Specifications", icon: Sliders },
            { id: "variants", label: "5. Variants & Combos", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors shrink-0 cursor-pointer",
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 text-xs">

          {/* ═════════ TAB 1: BASIC INFORMATION ═════════ */}
          {activeTab === "basic" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Product Title / Model Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Akij Durdanto V6 High Speed Electric Scooter"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Product Slug (URL Path) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="akij-durdanto-v6"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Product Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl cursor-pointer font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.icon || "📁"} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Brand / Manufacturer
                  </label>
                  <input
                    type="text"
                    placeholder="Akij, Walton, Yadea, JA Solar"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Product SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="EV-SCOOT-001"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Barcode / EAN
                  </label>
                  <input
                    type="text"
                    placeholder="880123456789"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Promotional Badge Pill (Optional)
                </label>
                <div className="flex gap-2">
                  {["🔥 15% OFF", "⚡ Flash Sale", "🔋 Top Seller", "⭐ Best Pick", "0% EMI"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBadge(b)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors",
                        badge === b ? "bg-emerald-600 text-white border-emerald-600" : "bg-stone-50 text-stone-600 border-stone-200"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Tags */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Search & Filter Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add tag (e.g. Lithium, 60V, Long Range) and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Product Overview & Story
                </label>
                <textarea
                  rows={4}
                  placeholder="Detailed description of features, performance specs, safety highlights, and warranty details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* ═════════ TAB 2: PRICING & INVENTORY ═════════ */}
          {activeTab === "pricing" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Selling Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="125000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-extrabold text-base text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Compare at / Original Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="135000"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-600 dark:text-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Available Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Low Stock Alert Trigger
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
                <h5 className="font-extrabold text-stone-900 dark:text-white">
                  Storefront Badges & Flags
                </h5>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flag-featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="flag-featured" className="font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                    Show on Homepage Best-Seller Grid
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flag-emi"
                    checked={isEmiAvailable}
                    onChange={(e) => setIsEmiAvailable(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="flag-emi" className="font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                    0% EMI Facility Available (City Bank, BRAC Bank, etc.)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flag-free-delivery"
                    checked={isFreeDelivery}
                    onChange={(e) => setIsFreeDelivery(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <label htmlFor="flag-free-delivery" className="font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                    Eligible for Free Nationwide Delivery
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ═════════ TAB 3: MEDIA & IMAGES ═════════ */}
          {activeTab === "media" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-6 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50/50 dark:bg-stone-800/30 text-center space-y-2">
                <Upload className="w-10 h-10 text-stone-400 mx-auto" />
                <div>
                  <label className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer inline-block shadow-sm">
                    {uploadingImage ? "Uploading to Cloudinary..." : "Choose Media Files"}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-stone-400 mt-2">
                    Auto compressed to WebP/AVIF format with CDN distribution
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Or Direct Image URL
                </label>
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
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                />
              </div>

              {images.length > 0 && (
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-2">
                    Image Gallery ({images.length} images uploaded)
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden group">
                        <img src={img} alt="Product" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                          className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═════════ TAB 4: SPECIFICATIONS ═════════ */}
          {activeTab === "specs" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-stone-900 dark:text-white">
                    Product Specification Matrix
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Shown in the "Specifications" table on the storefront product page
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Spec Row</span>
                </button>
              </div>

              <div className="space-y-2">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Spec Name (e.g. Battery Voltage)"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                      className="w-1/3 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 60V 30Ah Graphene)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(idx)}
                      className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═════════ TAB 5: VARIANTS & COMBINATIONS ═════════ */}
          {activeTab === "variants" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 space-y-1">
                <h5 className="font-extrabold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Multi-Variant Combination Generator (Kachabazar Suite)</span>
                </h5>
                <p className="text-[11px] text-teal-700 dark:text-teal-300">
                  Generate combinations for color variations and battery pack options automatically.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Color Options (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={variantColor}
                    onChange={(e) => setVariantColor(e.target.value)}
                    placeholder="Red, Black, Silver, Blue"
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Capacity Options (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={variantCapacity}
                    onChange={(e) => setVariantCapacity(e.target.value)}
                    placeholder="48V 20Ah, 60V 30Ah Graphene"
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleGenerateVariants}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  ⚡ Generate Combinations
                </button>
              </div>

              {combinations.length > 0 && (
                <div className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-stone-50 dark:bg-stone-800 text-[10px] uppercase font-bold text-stone-400">
                      <tr>
                        <th className="py-2.5 px-3">Variant Combination</th>
                        <th className="py-2.5 px-3">Variant SKU</th>
                        <th className="py-2.5 px-3">Price (৳)</th>
                        <th className="py-2.5 px-3">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {combinations.map((c, i) => (
                        <tr key={c.id}>
                          <td className="py-2 px-3 font-bold">{c.name}</td>
                          <td className="py-2 px-3 font-mono text-[10px] text-stone-400">{c.sku}</td>
                          <td className="py-2 px-3">
                            <input
                              type="number"
                              value={c.price}
                              onChange={(e) => {
                                const p = parseFloat(e.target.value) || 0;
                                setCombinations(combinations.map((item, idx) => idx === i ? { ...item, price: p } : item));
                              }}
                              className="w-20 px-2 py-1 bg-stone-50 border rounded font-bold"
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
                              className="w-16 px-2 py-1 bg-stone-50 border rounded font-bold"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Footer Actions ── */}
          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between sticky bottom-0 bg-white dark:bg-stone-900 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
            >
              Cancel
            </button>
            
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{editingProduct ? "Update Product" : "Publish Product"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
