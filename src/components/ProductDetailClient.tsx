"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Zap, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LIFESTYLE_IMAGE = "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1000";

const FAQ_ITEMS = [
  {
    q: "What should I do if the battery gets damaged?",
    a: "All our electric vehicles and batteries come with an official warranty of up to 2 years. If any issue arises during this period, please contact our support team and we will troubleshoot, repair, or replace the battery free of charge."
  },
  {
    q: "How long does delivery take?",
    a: "For orders inside Dhaka and Chittagong, we deliver within 24 to 48 hours. For other districts across Bangladesh, delivery safely takes 3 to 5 business days via our partner cargo service."
  },
  {
    q: "Can I purchase via EMI?",
    a: "Yes, you can enjoy up to 12 months 0% interest EMI options using credit cards from leading commercial banks in Bangladesh. You can select your preferred EMI plan during checkout."
  }
];

// Grouping mapping for structured specs matching the user image
const SPEC_GROUPS_MAPPING: Record<string, string[]> = {
  "POWER & MOTOR": ["motor power", "motor", "top speed", "range", "power", "speed", "mileage", "torque", "engine", "transmission", "clutch"],
  "BATTERY & CHARGING": ["battery", "charging", "voltage", "battery type"],
  "CHASSIS & BRAKES": ["brake", "tires", "tyre", "frame", "brakes", "max load", "load capacity", "chassis", "suspension", "wheelbase", "length", "height", "weight"],
  "ELECTRONICS & DESIGN": ["display", "brand", "launched", "features", "headlight", "indicator", "speedometer", "abs", "vehicle type", "made in"]
};

const EMOJI_MARKERS = ["✅", "✔", "☑", "✓", "🔋", "⚡", "⚙️", "🛠️", "⭐", "🌟", "🔌", "⚙", "🛠"];

function isMarker(line: string): boolean {
  const trimmed = line.trim();
  if (EMOJI_MARKERS.includes(trimmed)) return true;
  if (trimmed.length <= 4 && /\p{Emoji}/u.test(trimmed)) {
    return true;
  }
  return false;
}

function getStartingMarker(line: string): string | null {
  const trimmed = line.trim();
  for (const m of EMOJI_MARKERS) {
    if (trimmed.startsWith(m)) {
      return m;
    }
  }
  const match = trimmed.match(/^[\p{Emoji}\u2700-\u27BF]/u);
  if (match) {
    return match[0];
  }
  return null;
}

function startsWithMarker(line: string): boolean {
  return getStartingMarker(line) !== null;
}

function cleanName(name: string): string {
  let cleaned = name.trim();
  if (cleaned.endsWith(":")) {
    cleaned = cleaned.slice(0, -1);
  }
  if (cleaned.startsWith("-") || cleaned.startsWith("–") || cleaned.startsWith("—")) {
    cleaned = cleaned.substring(1).trim();
  }
  return cleaned;
}

function cleanDesc(desc: string): string {
  let cleaned = desc.trim();
  if (cleaned.startsWith("-") || cleaned.startsWith("–") || cleaned.startsWith("—") || cleaned.startsWith("~")) {
    cleaned = cleaned.substring(1).trim();
  }
  if (cleaned) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

function isHeaderLine(line: string, index: number): boolean {
  const trimmed = line.trim();
  return trimmed.endsWith(":") ||
    trimmed.startsWith("Why Choose") ||
    trimmed.startsWith("Key Features") ||
    trimmed.startsWith("Perfect for") ||
    trimmed.startsWith("Specifications:") ||
    trimmed.startsWith("Advantages Over") ||
    trimmed.startsWith("Technical Applications") ||
    (trimmed.length < 50 && index === 0);
}

function parseMarkerItem(lines: string[], startIndex: number): { item: { name: string; desc: string } | null; nextIndex: number } {
  let j = startIndex;
  const line = lines[j];

  if (isMarker(line)) {
    let featureName = "";
    let featureDesc = "";

    let k = j + 1;
    while (k < lines.length && !lines[k]) { k++; }
    if (k < lines.length) {
      featureName = lines[k];
    }

    let m = k + 1;
    while (m < lines.length && !lines[m]) { m++; }
    if (m < lines.length && !isMarker(lines[m]) && !startsWithMarker(lines[m]) && !isHeaderLine(lines[m], m)) {
      featureDesc = lines[m];
      return {
        item: { name: cleanName(featureName), desc: featureDesc },
        nextIndex: m + 1
      };
    } else {
      return {
        item: { name: cleanName(featureName), desc: "" },
        nextIndex: k + 1
      };
    }
  }

  const markerMatch = getStartingMarker(line);
  if (markerMatch) {
    const featureName = line.substring(markerMatch.length).trim();
    let k = j + 1;
    while (k < lines.length && !lines[k]) { k++; }
    if (k < lines.length && !isMarker(lines[k]) && !startsWithMarker(lines[k]) && !isHeaderLine(lines[k], k)) {
      const featureDesc = lines[k];
      return {
        item: { name: cleanName(featureName), desc: featureDesc },
        nextIndex: k + 1
      };
    } else {
      return {
        item: { name: cleanName(featureName), desc: "" },
        nextIndex: j + 1
      };
    }
  }

  return { item: null, nextIndex: j + 1 };
}

function renderBlogStyleDescription(description: string) {
  const lines = description.split("\n").map(l => l.trim());
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line) {
      i++;
      continue;
    }

    if (isMarker(line)) {
      i++;
      continue;
    }

    let isHeaderBlock = false;
    let lookAheadIndex = i + 1;
    while (lookAheadIndex < lines.length && !lines[lookAheadIndex]) {
      lookAheadIndex++;
    }
    if (lookAheadIndex < lines.length && (isMarker(lines[lookAheadIndex]) || startsWithMarker(lines[lookAheadIndex]))) {
      isHeaderBlock = true;
    }

    if (isHeaderBlock) {
      elements.push(
        <h3 key={`h-${i}`} className="text-stone-900 font-extrabold text-sm sm:text-base tracking-tight mt-8 mb-4 flex items-center gap-2 border-l-2 border-emerald-600 pl-3">
          {line}
        </h3>
      );

      const features: Array<{ name: string; desc: string; marker: string }> = [];
      let j = lookAheadIndex;

      while (j < lines.length) {
        const nextLine = lines[j];
        if (!nextLine) {
          j++;
          continue;
        }

        if (isMarker(nextLine) || startsWithMarker(nextLine)) {
          const markerUsed = isMarker(nextLine) ? nextLine : (getStartingMarker(nextLine) || "✓");
          const parsed = parseMarkerItem(lines, j);
          if (parsed.item) {
            features.push({
              name: parsed.item.name,
              desc: cleanDesc(parsed.item.desc),
              marker: markerUsed
            });
          }
          j = parsed.nextIndex;
        } else {
          break;
        }
      }

      if (features.length > 0) {
        elements.push(
          <div key={`grid-${i}`} className="border border-stone-200/80 rounded-xl overflow-hidden bg-white my-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-12 bg-stone-50/80 p-3.5 text-[9px] font-bold text-stone-500 uppercase tracking-widest border-b border-stone-100">
              <div className="col-span-5 sm:col-span-4 pl-2 text-stone-700">Parameter</div>
              <div className="col-span-7 sm:col-span-8 text-stone-700">Specification & Details</div>
            </div>
            <div className="divide-y divide-stone-100">
              {features.map((f, idx) => (
                <div key={idx} className="grid grid-cols-12 items-start p-4 text-[11px] sm:text-xs hover:bg-stone-50/30 transition-colors">
                  <div className="col-span-5 sm:col-span-4 font-bold text-stone-850 flex items-start gap-2 pr-3">
                    <span className="inline-flex items-center justify-center w-5.5 h-5.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] shrink-0 font-extrabold shadow-sm border border-emerald-100/50">
                      {f.marker}
                    </span>
                    <span className="leading-tight mt-0.5">{f.name}</span>
                  </div>
                  <div className="col-span-7 sm:col-span-8 text-stone-600 font-medium leading-relaxed pl-1">
                    {f.desc || "Verified specification"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        i = j;
        continue;
      }
    }

    if (isHeaderLine(line, i)) {
      elements.push(
        <h3
          key={i}
          className="text-stone-900 font-extrabold text-xs sm:text-sm tracking-tight mt-8 mb-3 flex items-center gap-2 border-l-2 border-emerald-600 pl-3"
        >
          {line}
        </h3>
      );
      i++;
    } else {
      let mergedParagraph = line;
      let nextIdx = i + 1;

      while (nextIdx < lines.length) {
        const nextLine = lines[nextIdx];
        if (!nextLine) {
          break;
        }

        if (isMarker(nextLine) || startsWithMarker(nextLine) || isHeaderLine(nextLine, nextIdx)) {
          break;
        }

        let tempIdx = nextIdx + 1;
        while (tempIdx < lines.length && !lines[tempIdx]) { tempIdx++; }
        if (tempIdx < lines.length && (isMarker(lines[tempIdx]) || startsWithMarker(lines[tempIdx]))) {
          break;
        }

        if (nextLine.startsWith(".") || nextLine.startsWith(",") || nextLine.startsWith(";") || nextLine.startsWith(":")) {
          mergedParagraph += nextLine;
        } else {
          mergedParagraph += " " + nextLine;
        }
        nextIdx++;
      }

      mergedParagraph = mergedParagraph
        .replace(/\s+\./g, ".")
        .replace(/\s+,/g, ",")
        .replace(/\s+;/g, ";")
        .replace(/\s+:/g, ":");

      elements.push(
        <p key={i} className="text-stone-650 leading-relaxed font-medium text-xs sm:text-sm my-3">
          {mergedParagraph}
        </p>
      );

      i = nextIdx;
    }
  }

  return (
    <div className="space-y-4">
      {elements}
    </div>
  );
}

export default function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const { dispatch, openCart } = useCart();
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState<"specification" | "description" | "shipping">("specification");

  // Accordion collapsed state for specs categories (true = expanded)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "POWER & MOTOR": true,
    "BATTERY & CHARGING": true,
    "CHASSIS & BRAKES": true,
    "ELECTRONICS & DESIGN": true,
    "OTHER PARAMETERS": true,
  });

  // Dynamic Variations & Addons parsing
  const rawVariations = (product.specs?._variations as string) || "";
  const rawAddons = (product.specs?._addons as string) || "";
  
  const parsedVariations = rawVariations.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const [name, price] = l.split(':').map(s => s.trim());
    return { name, price: parseFloat(price) || 0 };
  });

  const parsedAddons = rawAddons.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const [name, price] = l.split(':').map(s => s.trim());
    return { name, price: parseFloat(price) || 0 };
  });

  const hasDynamicOptions = parsedVariations.length > 0 || parsedAddons.length > 0;

  // Dynamic colors parsing
  const rawColors = (product.specs?.Colors || product.specs?.colors || product.specs?.Color || product.specs?.color || product.specs?.["Available Colors"]) as string;
  const parsedColors = rawColors ? rawColors.split(',').map(c => c.trim()).filter(Boolean) : (hasDynamicOptions ? [] : ["Matte Black", "Neon Green", "Pearl White"]);

  // State options
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(parsedColors.length > 0 ? parsedColors[0] : "Default");
  const [selectedVariationIdx, setSelectedVariationIdx] = useState(0);
  const [selectedAddonIdxs, setSelectedAddonIdxs] = useState<number[]>([]);
  
  // Legacy states for products without dynamic options
  const [batteryOption, setBatteryOption] = useState<"regular" | "upgraded">("regular");
  const [warrantyAddon, setWarrantyAddon] = useState(false);
  const [coverAddon, setCoverAddon] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Gallery main image state
  const [activeImage, setActiveImage] = useState(product.image_url);

  // Sticky floating buy bar state & scroll effect
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Combined gallery images
  const allImages = Array.from(new Set([product.image_url, ...(product.images || [])].filter(Boolean)));

  // Specifications highlights (fallback to defaults if not in specs)
  const topSpeed = product.specs?.["Top Speed"] || product.specs?.["speed"] || "45 km/h";
  const range = product.specs?.["Range"] || product.specs?.["range"] || "60 km per charge";
  const motor = product.specs?.["Motor Power"] || product.specs?.["motor"] || "1000W BLDC";

  // Calculate pricing based on options
  let currentPrice = product.price;
  let customizedName = product.name;
  
  if (hasDynamicOptions) {
    if (parsedVariations.length > 0) {
      const v = parsedVariations[selectedVariationIdx];
      if (v) {
        currentPrice = v.price; // Variation replaces base price
        customizedName += ` - ${v.name}`;
      }
    }
    
    const addonsList: string[] = [];
    selectedAddonIdxs.forEach(idx => {
      const a = parsedAddons[idx];
      if (a) {
        currentPrice += a.price;
        addonsList.push(a.name);
      }
    });
    
    if (addonsList.length > 0) {
      customizedName += ` + [${addonsList.join(", ")}]`;
    }
  } else {
    // Legacy pricing
    const batteryPremium = batteryOption === "upgraded" ? 5000 : 0;
    const warrantyPremium = warrantyAddon ? 2500 : 0;
    const coverPremium = coverAddon ? 500 : 0;
    currentPrice += batteryPremium + warrantyPremium + coverPremium;
    
    const selectedBatteryLabel = batteryOption === "upgraded" ? "48V 20Ah (+৳৫,০০০)" : "48V 15Ah (Regular)";
    const addonsList: string[] = [];
    if (warrantyAddon) addonsList.push("Extended Warranty");
    if (coverAddon) addonsList.push("Premium Cover");
    customizedName = `${product.name} - ${selectedColor} (${selectedBatteryLabel})${addonsList.length > 0 ? ` + [${addonsList.join(", ")}]` : ""}`;
  }

  const originalComparePrice = product.compare_at_price || (product.price * 1.12);
  const currentComparePrice = originalComparePrice + (currentPrice - product.price);

  const discount = Math.round(((currentComparePrice - currentPrice) / currentComparePrice) * 100);
  const savings = currentComparePrice - currentPrice;
  const isOutOfStock = product.stock_quantity === 0;

  // Build customized product object for Cart
  const getCustomizedProduct = (): Product => {
    return {
      ...product,
      name: customizedName,
      price: currentPrice,
      image_url: activeImage,
      images: [activeImage]
    };
  };

  function handleAddToCart() {
    const customized = getCustomizedProduct();
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: customized });
    }
    toast.success(`${quantity}x ${product.name} added to cart!`, {
      description: `৳${(currentPrice * quantity).toLocaleString("en-BD")}`,
    });
    openCart();
  }

  function handleBuyNow() {
    const customized = getCustomizedProduct();
    // Clear and add item
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "ADD_ITEM", payload: customized });
    router.push("/checkout");
  }

  // Toggle specs category visibility
  function toggleCategory(cat: string) {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  }

  // Process specifications into categories
  const groupedSpecs: Record<string, Array<{ key: string; value: string }>> = {
    "POWER & MOTOR": [],
    "BATTERY & CHARGING": [],
    "CHASSIS & BRAKES": [],
    "ELECTRONICS & DESIGN": [],
    "OTHER PARAMETERS": []
  };

  if (product.specs) {
    Object.entries(product.specs).forEach(([key, val]) => {
      const lowerKey = key.toLowerCase();
      // Skip internal keys and subcategory
      if (
        lowerKey.startsWith("_") || 
        lowerKey === "subcategory"
      ) return;

      const value = String(val);
      let matched = false;

      for (const [groupName, searchKeys] of Object.entries(SPEC_GROUPS_MAPPING)) {
        if (searchKeys.some(sk => lowerKey.includes(sk))) {
          groupedSpecs[groupName].push({ key, value });
          matched = true;
          break;
        }
      }

      if (!matched) {
        groupedSpecs["OTHER PARAMETERS"].push({ key, value });
      }
    });
  }

  // Dynamic list of key specs to display in the header highlight box
  const highlightSpecs: Array<{ label: string; value: string; icon: string }> = [];
  if (product.specs) {
    const specMetadata: Record<string, { label: string; icon: string }> = {
      motor: { label: "Motor", icon: "⚡" },
      "motor power": { label: "Motor Power", icon: "⚡" },
      "motor type": { label: "Motor", icon: "⚡" },
      power: { label: "Motor Power", icon: "⚡" },
      range: { label: "Max Range", icon: "🔋" },
      mileage: { label: "Mileage", icon: "🔋" },
      speed: { label: "Top Speed", icon: "🚀" },
      "top speed": { label: "Top Speed", icon: "🚀" },
      "battery type": { label: "Battery", icon: "🔋" },
      battery: { label: "Battery", icon: "🔋" },
      charging: { label: "Charging", icon: "🔌" },
      "charging time": { label: "Charging", icon: "🔌" },
      capacity: { label: "Capacity", icon: "🔋" },
      voltage: { label: "Voltage", icon: "⚡" },
      weight: { label: "Net Weight", icon: "⚖️" },
      compatible: { label: "Compatibility", icon: "🔌" },
      cycles: { label: "Lifespan", icon: "🔄" },
      torque: { label: "Torque", icon: "⚙️" },
      certification: { label: "Certification", icon: "🛡️" },
      output: { label: "Output Power", icon: "🔌" },
    };

    const addedKeys = new Set<string>();
    Object.entries(product.specs).forEach(([k, v]) => {
      const lowerK = k.toLowerCase().trim();
      const match = Object.entries(specMetadata).find(([key]) => lowerK === key || lowerK.includes(key));
      if (match && highlightSpecs.length < 5 && !addedKeys.has(match[1].label)) {
        highlightSpecs.push({
          label: match[1].label,
          value: String(v),
          icon: match[1].icon
        });
        addedKeys.add(match[1].label);
      }
    });

    if (highlightSpecs.length < 4) {
      Object.entries(product.specs).forEach(([k, v]) => {
        const lowerK = k.toLowerCase().trim();
        
        // Skip internal or redundant keys
        if (
          lowerK.startsWith("_") || 
          lowerK === "subcategory"
        ) return;

        const labelFormatted = k.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        const alreadyAdded = highlightSpecs.some(hs => hs.label.toLowerCase() === lowerK || lowerK.includes(hs.label.toLowerCase()));
        if (!alreadyAdded && highlightSpecs.length < 4) {
          highlightSpecs.push({
            label: labelFormatted,
            value: String(v),
            icon: "⚙️"
          });
        }
      });
    }
  }

  const hasSpecs = highlightSpecs.length > 0;

  return (
    <div className="space-y-8">
      {/* ── 1. Hero Section (Left & Right Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] group p-6 flex items-center justify-center">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-102"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-emerald-700 text-white font-extrabold text-[10px] tracking-wide px-3 py-1 shadow-md border-0 uppercase">
                🔥 Hot Sale
              </Badge>
              {savings > 0 && (
                <Badge className="bg-rose-600 text-white font-extrabold text-[10px] tracking-wide px-3 py-1 shadow-md border-0 uppercase">
                  Save ৳{savings.toLocaleString("en-BD")}
                </Badge>
              )}
            </div>

            {isOutOfStock && (
              <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-white/95 text-stone-900 font-bold px-5 py-2.5 rounded-xl shadow-lg border border-stone-200">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border transition-all shadow-sm ${activeImage === img
                    ? "border-emerald-700 ring-2 ring-emerald-50 bg-stone-50"
                    : "border-stone-200 hover:border-stone-450 bg-white"
                  }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-contain p-1.5"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 flex flex-col gap-4">

          {/* Header */}
          <div>
            <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/60 inline-block mb-1.5">
              {product.category}
            </span>
            <h1 className={cn(
              "font-extrabold text-stone-900 leading-tight tracking-tight transition-all duration-300",
              product.name.length > 50
                ? "text-base sm:text-lg md:text-xl"
                : product.name.length > 30
                  ? "text-xl sm:text-2xl md:text-2xl"
                  : "text-2xl md:text-3xl"
            )}>
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-1.5">
              <span>BRAND: {product.specs?.["Brand"] || product.specs?.["brand"] || "EV STORE"}</span>
              <span className="text-stone-300">|</span>
              <span className={product.stock_quantity > 0 ? "text-emerald-700" : "text-rose-600"}>
                {product.stock_quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2.5 border-y border-stone-200/60 py-2.5">
            <span className="text-2xl font-extrabold text-emerald-850">
              ৳{currentPrice.toLocaleString("en-BD")}
            </span>
            {currentComparePrice > currentPrice && (
              <>
                <span className="text-sm text-stone-450 line-through">
                  ৳{currentComparePrice.toLocaleString("en-BD")}
                </span>
                <Badge className="bg-rose-50 text-rose-700 border border-rose-100 font-bold px-2 py-0.5 text-[10px]">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Important specs or service features list */}
          <div className="bg-[#faf9f6] border border-stone-200/60 rounded-xl p-3 text-[11px] sm:text-xs leading-relaxed text-stone-700 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 shadow-sm">
            {hasSpecs ? (
              highlightSpecs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-stone-500 w-4 text-center shrink-0">{spec.icon}</span>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-stone-850">{spec.label}: </span>
                    <span className="text-stone-600 font-medium">{spec.value}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 shrink-0">🛠️</span>
                  <span>Free assembly & testing prior to handover</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 shrink-0">💵</span>
                  <span>Cash, card & EMI on delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 shrink-0">🛡️</span>
                  <span>2 Year warranty on battery & motor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 shrink-0">🚚</span>
                  <span>Express delivery across BD regions</span>
                </div>
              </>
            )}
          </div>

          {/* Variant Selector: Colors */}
          {parsedColors.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Color: {selectedColor}</span>
              <div className="flex flex-wrap gap-2">
                {parsedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all border shadow-sm ${selectedColor === color
                        ? "bg-stone-900 border-stone-900 text-white"
                        : "bg-white border-stone-200 text-stone-700 hover:border-stone-450 hover:bg-stone-50"
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selector & Add-ons */}
          {hasDynamicOptions ? (
            <>
              {parsedVariations.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Variations</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {parsedVariations.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariationIdx(idx)}
                        className={`text-left p-3 rounded-lg border transition-all shadow-sm flex items-center justify-between ${selectedVariationIdx === idx
                            ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-50"
                            : "border-stone-200 bg-white hover:border-stone-300"
                          }`}
                      >
                        <div>
                          <p className="text-[11px] font-bold text-stone-850">{v.name}</p>
                          <p className="text-[9px] text-emerald-600 mt-0.5 font-bold font-mono">৳{v.price.toLocaleString("en-BD")}</p>
                        </div>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedVariationIdx === idx ? "border-emerald-600 bg-emerald-600" : "border-stone-300 bg-white"}`}>
                          {selectedVariationIdx === idx && <Check className="w-2 h-2 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {parsedAddons.length > 0 && (
                <div className="space-y-1.5 mt-4">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Add-ons (Optional)</span>
                  <div className="space-y-1.5">
                    {parsedAddons.map((a, idx) => {
                      const isSelected = selectedAddonIdxs.includes(idx);
                      return (
                        <label key={idx} className="flex items-center gap-2.5 p-2.5 bg-white border border-stone-200/85 rounded-lg cursor-pointer hover:bg-stone-50/50 transition-colors shadow-sm">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAddonIdxs([...selectedAddonIdxs, idx]);
                              } else {
                                setSelectedAddonIdxs(selectedAddonIdxs.filter(i => i !== idx));
                              }
                            }}
                            className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                          />
                          <div className="flex-1 min-w-0 flex items-center justify-between">
                            <p className="text-[11px] font-bold text-stone-800">{a.name}</p>
                            <p className="text-[10px] font-mono text-emerald-700 font-bold">+৳{a.price.toLocaleString("en-BD")}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Legacy Variant Selector: Battery Options */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Battery Option</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setBatteryOption("regular")}
                    className={`text-left p-3 rounded-lg border transition-all shadow-sm flex items-center justify-between ${batteryOption === "regular"
                        ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                  >
                    <div>
                      <p className="text-[11px] font-bold text-stone-850">48V 15Ah (Regular)</p>
                      <p className="text-[9px] text-stone-400 mt-0.5">Standard Factory Range</p>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${batteryOption === "regular" ? "border-emerald-600 bg-emerald-600" : "border-stone-300 bg-white"}`}>
                      {batteryOption === "regular" && <Check className="w-2 h-2 text-white" />}
                    </div>
                  </button>

                  <button
                    onClick={() => setBatteryOption("upgraded")}
                    className={`text-left p-3 rounded-lg border transition-all shadow-sm flex items-center justify-between ${batteryOption === "upgraded"
                        ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-50"
                        : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                  >
                    <div>
                      <p className="text-[11px] font-bold text-stone-850">48V 20Ah (+৳৫,০০০)</p>
                      <p className="text-[9px] text-stone-400 mt-0.5">Extended High Capacity</p>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${batteryOption === "upgraded" ? "border-emerald-600 bg-emerald-600" : "border-stone-300 bg-white"}`}>
                      {batteryOption === "upgraded" && <Check className="w-2 h-2 text-white" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* Legacy Add-ons / Care Package */}
              <div className="space-y-1.5 mt-4">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Add-ons / Care Package (Upselling)</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2.5 p-2.5 bg-white border border-stone-200/85 rounded-lg cursor-pointer hover:bg-stone-50/50 transition-colors shadow-sm">
                    <input
                      type="checkbox"
                      checked={warrantyAddon}
                      onChange={(e) => setWarrantyAddon(e.target.checked)}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-stone-800">1 Year Extended Battery Warranty (+৳২,৫০০)</p>
                      <p className="text-[9px] text-stone-400 mt-0.5">Worry-free coverage for additional 12 months</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 bg-white border border-stone-200/85 rounded-lg cursor-pointer hover:bg-stone-50/50 transition-colors shadow-sm">
                    <input
                      type="checkbox"
                      checked={coverAddon}
                      onChange={(e) => setCoverAddon(e.target.checked)}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-stone-800">Premium Bike Cover (+৳৫০০)</p>
                      <p className="text-[9px] text-stone-400 mt-0.5">Heavy-duty dust & waterproof protective shield</p>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Purchase Actions */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between bg-stone-50/50 p-2.5 rounded-lg border border-stone-100">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Quantity:</span>
                <div className="flex items-center gap-1 bg-stone-100 border border-stone-200/50 rounded-lg p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 rounded transition-colors text-stone-500 hover:text-stone-900 border-0"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-stone-900 text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock_quantity, quantity + 1))
                    }
                    className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 rounded transition-colors text-stone-500 hover:text-stone-900 border-0"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Total Price dynamic display matching Juul pods design */}
              <div className="text-right flex items-baseline gap-1.5">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">TOTAL:</span>
                <span className="text-lg font-extrabold text-rose-600">
                  ৳{(currentPrice * quantity).toLocaleString("en-BD")}
                </span>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-850 border border-stone-200 font-extrabold py-3.5 px-5 text-sm rounded-lg shadow-sm transition-all active:translate-y-px disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-stone-600 animate-pulse-subtle" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 px-5 text-sm rounded-lg shadow-md shadow-emerald-700/10 transition-all active:translate-y-px disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                Buy It Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Unified Specifications & Description Tabs (Matching user screen) ── */}
      <div className="border-t border-stone-200/60 pt-8">
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("specification")}
            className={`px-6 py-2.5 text-xs font-bold transition-all rounded-md ${activeTab === "specification"
                ? "bg-[#ecdac3] text-stone-950 border border-stone-400/80 shadow-sm"
                : "bg-white text-stone-650 border border-stone-200 hover:bg-stone-50"
              }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-2.5 text-xs font-bold transition-all rounded-md ${activeTab === "description"
                ? "bg-[#ecdac3] text-stone-950 border border-stone-400/80 shadow-sm"
                : "bg-white text-stone-650 border border-stone-200 hover:bg-stone-50"
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`px-6 py-2.5 text-xs font-bold transition-all rounded-md ${activeTab === "shipping"
                ? "bg-[#ecdac3] text-stone-950 border border-stone-400/80 shadow-sm"
                : "bg-white text-stone-650 border border-stone-200 hover:bg-stone-50"
              }`}
          >
            Shipping & Returns
          </button>
        </div>

        {/* Tab Content: Specification Table (Matches screenshot layout) */}
        {activeTab === "specification" && (
          <div className="space-y-4">
            {Object.entries(groupedSpecs).map(([groupName, items]) => {
              if (items.length === 0) return null;
              const isExpanded = expandedCategories[groupName] ?? true;

              return (
                <div key={groupName} className="border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(groupName)}
                    className="w-full bg-[#f4ebe1] hover:bg-[#ede1d5] text-stone-850 px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-colors border-0"
                  >
                    <span>{groupName}</span>
                    <span className="text-stone-500 font-extrabold text-sm">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {/* Category Specs Rows */}
                  {isExpanded && (
                    <div className="bg-white">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 items-center bg-[#fbfbfa] hover:bg-stone-50/50 border-b border-white text-stone-850 text-[11px] leading-relaxed transition-colors"
                        >
                          {/* Spec Name */}
                          <div className="col-span-4 md:col-span-3 font-bold uppercase tracking-wider p-3.5 pl-5 text-stone-500">
                            {item.key.replace(/_/g, " ")}
                          </div>

                          {/* Dotted/Dashed Divider Line */}
                          <div className="col-span-1 text-stone-300 font-normal border-l border-stone-300 border-dashed h-10 flex items-center justify-center">
                            |
                          </div>

                          {/* Spec Value */}
                          <div className="col-span-7 md:col-span-8 font-semibold p-3.5 pr-5 text-stone-800">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content: Detailed Description & Lifestyle Overview */}
        {activeTab === "description" && (
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-sm">📝</div>
                <div>
                  <h2 className="text-xs font-bold text-stone-755 uppercase tracking-widest">
                    Product Description
                  </h2>
                  <p className="text-[9px] text-stone-400 font-semibold mt-0.5">Comprehensive overview and feature list</p>
                </div>
              </div>

              {product.description ? (
                renderBlogStyleDescription(product.description)
              ) : (
                <p className="text-stone-450 text-xs italic">No detailed description available for this product.</p>
              )}

              <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 text-emerald-850 text-xs leading-relaxed mt-8">
                <strong>💡 Technical Note:</strong> To ensure maximum lifespan and performance, follow the recommended charging cycle guidelines and keep all terminals free of corrosion.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Shipping & Returns */}
        {activeTab === "shipping" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-sm">🚚</div>
                <span>Shipping Policy</span>
              </div>
              <ul className="space-y-2.5 text-stone-600 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Dhaka & Chittagong:</strong> 24 to 48 Hours home delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Other Districts:</strong> 3 to 5 business days via cargo partner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Tracking:</strong> Live SMS tracking will be sent upon shipment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Delivery Charge:</strong> Free delivery on selected promotional offers, otherwise calculated at checkout.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-sm">🔄</div>
                <span>Returns & Claims</span>
              </div>
              <ul className="space-y-2.5 text-stone-600 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>7-Day Return Policy:</strong> Returns accepted for unused items in original packaging within 7 days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Warranty Claims:</strong> Official 2-year warranty support for batteries & motors is handled via our service centers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-semibold mt-0.5">•</span>
                  <span><strong>Cancellation:</strong> Orders can be cancelled anytime before dispatch. Refund will be processed within 5-7 bank working days.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. Trust Signals & FAQ ── */}
      <div className="border-t border-stone-200/60 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Why Choose Us */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest">Why Choose Us</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight mt-1">
              Our Commitment
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🛠️", title: "Free Assembly", desc: "We professionally assemble & test your bike before handover" },
              { icon: "🚚", title: "All BD Delivery", desc: "Secure home delivery to all districts across Bangladesh" },
              { icon: "💳", title: "EMI Available", desc: "Up to 12 months 0% interest EMI options available" },
              { icon: "💯", title: "Authentic Parts", desc: "100% brand new, authentic, and genuine EV parts guarantee" },
            ].map((card, idx) => (
              <div key={idx} className="bg-white border border-stone-200/60 p-4.5 rounded-2xl shadow-sm text-center flex flex-col items-center gap-2 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <p className="text-xs font-bold text-stone-900 mt-1.5">{card.title}</p>
                <p className="text-[10px] text-stone-500 leading-normal mt-0.5">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest">FAQ</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-stone-300">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left font-bold text-xs text-stone-850 flex items-center justify-between hover:bg-stone-50/50 transition-colors gap-3"
                >
                  <span>{item.q}</span>
                  <span className="text-emerald-850 text-sm font-semibold">{faqOpen === idx ? "−" : "+"}</span>
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-4 text-[11px] text-stone-600 leading-relaxed border-t border-stone-100 pt-3 bg-[#faf9f6]/40">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Floating Sticky Purchase Bar ── */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] py-3 px-4 transition-all duration-500 ease-in-out transform",
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Product Info Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-50 border border-stone-100 flex-shrink-0">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-900 truncate max-w-[140px] sm:max-w-[250px] md:max-w-[320px]">
                {product.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-stone-450 font-medium">
                <span className="uppercase">Battery: {batteryOption === "regular" ? "Regular" : "Upgraded"}</span>
                <span>•</span>
                <span>Color: {selectedColor}</span>
              </div>
            </div>
          </div>

          {/* Right: Price & Quick Action Buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none mb-1">TOTAL PRICE</p>
              <p className="text-sm font-extrabold text-rose-600 leading-none">
                ৳{(currentPrice * quantity).toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-stone-50 text-stone-850 border border-stone-200 font-extrabold py-2 px-3.5 text-xs rounded-lg shadow-sm transition-all active:translate-y-px disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden md:inline">Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2 px-4 text-xs rounded-lg shadow-sm transition-all active:translate-y-px disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Buy It Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
