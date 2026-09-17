"use client";

import { useState } from "react";
import {
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
  Globe,
  Layers,
  HelpCircle,
  Megaphone,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SlideItem {
  id: number;
  headline: string;
  subheadline: string;
  badge: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const INITIAL_SLIDES: SlideItem[] = [
  {
    id: 1,
    badge: "⚡ Bangladesh's #1 EV & Solar Store",
    headline: "Akij, Walton & Yadea High Performance Scooters",
    subheadline: "Save up to ৳10,000 this month. 0% EMI available on top electric bikes & lithium batteries.",
    image: "/silver_scooter.webp",
    buttonText: "Shop Electric Bikes",
    buttonLink: "/products?category=electric-bikes",
  },
  {
    id: 2,
    badge: "🔋 Long-Life LiFePO4 Energy",
    headline: "Smart Lithium & Graphene Battery Packs",
    subheadline: "Up to 5x longer lifespan than lead-acid with 3-year official replacement warranty.",
    image: "/banner2.webp",
    buttonText: "Explore Batteries",
    buttonLink: "/products?category=batteries",
  },
  {
    id: 3,
    badge: "☀️ Tier 1 Solar Power Systems",
    headline: "Hybrid Solar Inverters & High-Efficiency Panels",
    subheadline: "Cut electricity bills to zero with JA Solar, Jinko, Growatt, and Solis high-output inverters.",
    image: "/banner3.webp",
    buttonText: "Browse Solar Tech",
    buttonLink: "/products?category=solar-panels",
  },
];

export default function StoreCustomizationPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "promo" | "seo" | "faq">("hero");
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);

  // Promo Banner State
  const [flashSaleActive, setFlashSaleActive] = useState(true);
  const [flashSaleText, setFlashSaleText] = useState("🔥 Flash Sale: 15% Flat Discount On All Graphene Batteries This Week!");
  const [flashSaleLink, setFlashSaleLink] = useState("/products?category=batteries");

  // SEO State
  const [metaTitle, setMetaTitle] = useState("EV Solution BD | Leading Electric Vehicles, Batteries & Solar Systems");
  const [metaDesc, setMetaDesc] = useState("Buy electric bikes, scooters, graphene batteries, LiFePO4 energy storage, and solar hybrid inverters in Bangladesh with official warranty.");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("G-9CPCHEWEBN");

  const handleUpdateSlide = (id: number, field: keyof SlideItem, val: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: Date.now(),
      badge: "🔥 Special Promotional Campaign",
      headline: "New Arrival Product Title",
      subheadline: "Short description of the special offer and key features.",
      image: "/silver_scooter.webp",
      buttonText: "View Collection",
      buttonLink: "/products",
    };
    setSlides([...slides, newSlide]);
    toast.success("New hero slide added!");
  };

  const handleDeleteSlide = (id: number) => {
    if (slides.length <= 1) {
      toast.error("You must keep at least 1 hero slide");
      return;
    }
    setSlides(slides.filter((s) => s.id !== id));
    toast.success("Slide removed.");
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Homepage customization saved & published!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Store Customization & Visual Banners
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage homepage hero slider, promotional notices, and global SEO meta tags
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish</span>
        </button>
      </div>

      {/* ── Tabs (Kachabazar Style) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {[
          { id: "hero", label: "Hero Carousel Slides", icon: Sliders },
          { id: "promo", label: "Flash Sale & Notices", icon: Megaphone },
          { id: "seo", label: "Search Engine SEO", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 1. Hero Slides Tab ── */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Hero Banner Slides ({slides.length})
            </h3>
            <button
              onClick={handleAddSlide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200/60 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Slide</span>
            </button>
          </div>

          <div className="space-y-5">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-stone-900 dark:text-white">
                      Slide #{idx + 1}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Top Badge Pill
                    </label>
                    <input
                      type="text"
                      value={slide.badge}
                      onChange={(e) => handleUpdateSlide(slide.id, "badge", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Slide Image URL (e.g. /silver_scooter.webp or Cloudinary URL)
                    </label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => handleUpdateSlide(slide.id, "image", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Main Headline Title
                    </label>
                    <input
                      type="text"
                      value={slide.headline}
                      onChange={(e) => handleUpdateSlide(slide.id, "headline", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Subheadline Description
                    </label>
                    <input
                      type="text"
                      value={slide.subheadline}
                      onChange={(e) => handleUpdateSlide(slide.id, "subheadline", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={slide.buttonText}
                      onChange={(e) => handleUpdateSlide(slide.id, "buttonText", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      CTA Button Destination Link
                    </label>
                    <input
                      type="text"
                      value={slide.buttonLink}
                      onChange={(e) => handleUpdateSlide(slide.id, "buttonLink", e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 2. Promo & Flash Sale Tab ── */}
      {activeTab === "promo" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-5 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Promotional Announcement Banner
            </h3>
            <p className="text-stone-400 mt-0.5">
              Displays a high-visibility announcement strip at the very top of the website
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="flash-sale-toggle"
              checked={flashSaleActive}
              onChange={(e) => setFlashSaleActive(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label htmlFor="flash-sale-toggle" className="font-bold text-stone-900 dark:text-white cursor-pointer">
              Enable Promotional Top Bar
            </label>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Banner Message
            </label>
            <input
              type="text"
              value={flashSaleText}
              onChange={(e) => setFlashSaleText(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Banner Target URL
            </label>
            <input
              type="text"
              value={flashSaleLink}
              onChange={(e) => setFlashSaleLink(e.target.value)}
              className="w-full sm:w-96 px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
            />
          </div>
        </div>
      )}

      {/* ── 3. SEO Settings Tab ── */}
      {activeTab === "seo" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-5 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Global Search Engine Optimization (SEO)
            </h3>
            <p className="text-stone-400 mt-0.5">
              Default meta titles, descriptions, and Google Analytics tracking tags
            </p>
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Default Homepage Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Default Meta Description (Google Snippet)
            </label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
              Google Analytics Measurement ID (GA4)
            </label>
            <input
              type="text"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
              className="w-full sm:w-80 px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
}
