"use client";

import { useState, useEffect } from "react";
import {
  Sliders,
  Megaphone,
  BadgePercent,
  Save,
  Plus,
  Trash2,
  Loader2,
  Upload,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  getStoreSettings,
  updateStoreSettings,
  DEFAULT_HERO_SLIDES,
  type HeroSlide,
} from "@/lib/settings";
import { adminUpload } from "@/lib/admin-api";

const THEME_OPTIONS: { value: HeroSlide["theme"]; label: string }[] = [
  { value: "emerald", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "amber", label: "Amber" },
];

const inputCls =
  "w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500";
const labelCls = "block font-bold text-stone-700 dark:text-stone-300 mb-1";

export default function StoreCustomizationPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "announcement" | "promo">("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [announcement, setAnnouncement] = useState("");
  const [promoBanner, setPromoBanner] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getStoreSettings();
        if (data.hero_slides && data.hero_slides.length > 0) {
          setSlides(data.hero_slides);
        }
        setAnnouncement(data.announcement_bar || "");
        setPromoBanner(data.promo_banner || "");
      } catch {
        toast.error("Failed to load homepage settings.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleUpdateSlide = (id: number | string, field: keyof HeroSlide, val: string) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now(),
      tag: "New Arrival",
      theme: "emerald",
      headline: "Your Headline",
      sub: "Goes Here",
      description: "Short description of this slide's offer.",
      image: "/silver_scooter.webp",
      ctaLabel: "Shop Now",
      ctaHref: "/products",
      ctaSecondaryLabel: "View All",
      ctaSecondaryHref: "/products",
    };
    setSlides((prev) => [...prev, newSlide]);
  };

  const handleDeleteSlide = (id: number | string) => {
    if (slides.length <= 1) {
      toast.error("You must keep at least 1 hero slide");
      return;
    }
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  async function handleSlideImageUpload(idx: number, file: File) {
    setUploadingIdx(idx);
    try {
      const data = await adminUpload(file);
      setSlides((prev) =>
        prev.map((s, i) => (i === idx ? { ...s, image: data.url } : s))
      );
      toast.success("Slide image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploadingIdx(null);
    }
  }

  async function handleSaveAll(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    try {
      const { error } = await updateStoreSettings({
        hero_slides: slides,
        announcement_bar: announcement.trim(),
        promo_banner: promoBanner.trim(),
      });
      if (error) {
        if (
          error.includes("hero_slides") ||
          error.includes("announcement_bar") ||
          error.includes("promo_banner")
        ) {
          toast.warning(
            "Homepage settings need the one-time DB update: run supabase/add_homepage_settings.sql in Supabase SQL Editor."
          );
        } else {
          throw new Error(error);
        }
      } else {
        // Refresh the homepage instantly
        try {
          await fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paths: ["/"] }),
          });
        } catch {
          /* revalidation is best-effort */
        }
        toast.success("Homepage published! Changes are live on your store.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save homepage settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Homepage Manager
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Edit hero slides, the announcement bar, and the promo banner — changes go live on your store
          </p>
        </div>

        <button
          onClick={() => handleSaveAll()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save & Publish</span>
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {[
          { id: "hero", label: "Hero Slides", icon: Sliders },
          { id: "announcement", label: "Announcement Bar", icon: Megaphone },
          { id: "promo", label: "Promo Banner", icon: BadgePercent },
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
              Hero Slides ({slides.length})
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
                key={String(slide.id)}
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
                    <label className={labelCls}>Badge Pill</label>
                    <input
                      type="text"
                      value={slide.tag}
                      onChange={(e) => handleUpdateSlide(slide.id, "tag", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Color Theme</label>
                    <select
                      value={slide.theme}
                      onChange={(e) => handleUpdateSlide(slide.id, "theme", e.target.value)}
                      className={inputCls}
                    >
                      {THEME_OPTIONS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Headline (line 1)</label>
                    <input
                      type="text"
                      value={slide.headline}
                      onChange={(e) => handleUpdateSlide(slide.id, "headline", e.target.value)}
                      className={cn(inputCls, "font-bold")}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Headline (line 2, gradient)</label>
                    <input
                      type="text"
                      value={slide.sub}
                      onChange={(e) => handleUpdateSlide(slide.id, "sub", e.target.value)}
                      className={cn(inputCls, "font-bold")}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>Description</label>
                    <textarea
                      rows={2}
                      value={slide.description}
                      onChange={(e) => handleUpdateSlide(slide.id, "description", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>Slide Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => handleUpdateSlide(slide.id, "image", e.target.value)}
                        placeholder="/silver_scooter.webp or https://…"
                        className={cn(inputCls, "font-mono text-[11px]")}
                      />
                      <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold cursor-pointer transition-colors">
                        {uploadingIdx === idx ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingIdx !== null}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleSlideImageUpload(idx, f);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Button Text</label>
                    <input
                      type="text"
                      value={slide.ctaLabel}
                      onChange={(e) => handleUpdateSlide(slide.id, "ctaLabel", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Button Link</label>
                    <input
                      type="text"
                      value={slide.ctaHref}
                      onChange={(e) => handleUpdateSlide(slide.id, "ctaHref", e.target.value)}
                      className={cn(inputCls, "font-mono")}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Secondary Button Text</label>
                    <input
                      type="text"
                      value={slide.ctaSecondaryLabel}
                      onChange={(e) => handleUpdateSlide(slide.id, "ctaSecondaryLabel", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Secondary Button Link</label>
                    <input
                      type="text"
                      value={slide.ctaSecondaryHref}
                      onChange={(e) => handleUpdateSlide(slide.id, "ctaSecondaryHref", e.target.value)}
                      className={cn(inputCls, "font-mono")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 2. Announcement Bar Tab ── */}
      {activeTab === "announcement" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-5 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Announcement Bar
            </h3>
            <p className="text-stone-400 mt-0.5">
              A thin strip at the very top of every page, above the header. Leave empty to hide it.
            </p>
          </div>
          <div>
            <label className={labelCls}>Announcement text</label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="e.g. 🚚 Free delivery on orders over ৳5,000"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          {announcement.trim() && (
            <div>
              <label className={labelCls}>Preview</label>
              <div className="bg-emerald-700 text-white rounded-xl">
                <div className="px-4 py-2 flex items-center justify-center gap-2 text-center">
                  <Megaphone className="w-3.5 h-3.5 shrink-0" />
                  <p className="text-[11px] sm:text-xs font-semibold truncate">{announcement}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 3. Promo Banner Tab ── */}
      {activeTab === "promo" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-5 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Homepage Promo Banner
            </h3>
            <p className="text-stone-400 mt-0.5">
              A bold banner section right below the hero carousel on the homepage. Leave empty to hide it.
            </p>
          </div>
          <div>
            <label className={labelCls}>Promo message</label>
            <textarea
              rows={3}
              value={promoBanner}
              onChange={(e) => setPromoBanner(e.target.value)}
              placeholder="e.g. 🔥 Flash Sale: 15% flat discount on all graphene batteries this week!"
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          {promoBanner.trim() && (
            <div>
              <label className={labelCls}>Preview</label>
              <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-xl">
                <div className="px-4 py-5 flex items-center justify-center gap-3 text-center">
                  <BadgePercent className="w-5 h-5 text-white shrink-0" />
                  <p className="text-sm font-bold text-white">{promoBanner}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 text-[11px] text-stone-400">
        <Globe className="w-3.5 h-3.5" />
        <span>Saving publishes instantly to your live storefront.</span>
      </div>
    </div>
  );
}
