"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  SUBCATEGORIES,
  type ProductCategory,
  type Category,
} from "@/lib/types";
import { cn } from "@/lib/utils";

interface BrandOption {
  label: string;
  value: string;
}

export default function ProductFilters({
  totalCount,
  availableBrands = [],
  categories = [],
}: {
  totalCount: number;
  availableBrands?: BrandOption[];
  categories?: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Accordion state to open/collapse sections
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    price: true,
    availability: true,
    category: true,
    brands: true,
    subcat: true,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const activeCategory = searchParams.get("category") ?? "all";
  const activeSort = searchParams.get("sort") ?? "newest";
  const activeBrand = searchParams.get("brand") ?? "all";
  const activeStock = searchParams.get("stock") ?? "all";
  const activeSubcat = searchParams.get("subcat") ?? "all";

  // Price range configuration
  const minLimit = 0;
  const maxLimit = 250000;
  const urlMin = searchParams.get("minPrice");
  const urlMax = searchParams.get("maxPrice");

  const [minPriceInput, setMinPriceInput] = useState<number>(urlMin ? Number(urlMin) : minLimit);
  const [maxPriceInput, setMaxPriceInput] = useState<number>(urlMax ? Number(urlMax) : maxLimit);

  useEffect(() => {
    setMinPriceInput(urlMin ? Number(urlMin) : minLimit);
    setMaxPriceInput(urlMax ? Number(urlMax) : maxLimit);
  }, [urlMin, urlMax]);

  const minPercent = ((minPriceInput - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((maxPriceInput - minLimit) / (maxLimit - minLimit)) * 100;

  function handleFilterRange() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset page
    if (minPriceInput > minLimit) {
      params.set("minPrice", String(minPriceInput));
    } else {
      params.delete("minPrice");
    }
    if (maxPriceInput < maxLimit) {
      params.set("maxPrice", String(maxPriceInput));
    } else {
      params.delete("maxPrice");
    }
    params.delete("priceIdx");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleClearRange() {
    setMinPriceInput(minLimit);
    setMaxPriceInput(maxLimit);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("priceIdx");
    params.delete("page"); // Reset page

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function updateParam(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset page
    if (value === undefined || value === "all" || value === "newest" || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleCategorySelect(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset page
    params.delete("brand"); // Clear brand
    params.delete("subcat"); // Clear subcategory
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  const activeFiltersCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeBrand !== "all" ? 1 : 0) +
    (activeStock !== "all" ? 1 : 0) +
    (activeSubcat !== "all" ? 1 : 0) +
    (urlMin || urlMax ? 1 : 0);

  function clearAll() {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }

  const filterContent = (
    <div className="space-y-4">
      {/* Price Range Section */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleGroup("price")}
          className="w-full flex items-center justify-between py-1.5 text-stone-850 hover:text-stone-900 focus:outline-none"
        >
          <span className="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider">
            Price Range
          </span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
              openGroups.price ? "transform rotate-180" : ""
            )}
          />
        </button>

        {openGroups.price && (
          <div className="mt-4 animate-fade-in">
            {/* Visual Slider */}
            <div className="relative w-full h-1 bg-stone-200/80 rounded-full mb-6 mt-2">
              <div
                className="absolute h-full bg-[#dfc5a6] rounded-full"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step={500}
                value={minPriceInput}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPriceInput - 5000);
                  setMinPriceInput(val);
                }}
                className="absolute pointer-events-none appearance-none z-20 h-1 w-full opacity-0 cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step={500}
                value={maxPriceInput}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPriceInput + 5000);
                  setMaxPriceInput(val);
                }}
                className="absolute pointer-events-none appearance-none z-20 h-1 w-full opacity-0 cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
              />
              {/* Visual handles */}
              <div
                className="absolute w-4 h-4 rounded-full bg-[#dfc5a6] border border-white shadow -top-1.5 -ml-2 pointer-events-none"
                style={{ left: `${minPercent}%` }}
              />
              <div
                className="absolute w-4 h-4 rounded-full bg-[#dfc5a6] border border-white shadow -top-1.5 -ml-2 pointer-events-none"
                style={{ left: `${maxPercent}%` }}
              />
            </div>

            {/* Inputs */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex-1 min-w-0">
                <input
                  type="number"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(Number(e.target.value))}
                  placeholder="Min"
                  className="w-full text-center border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-850 bg-white font-medium focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>
              <span className="text-stone-400 text-[10px] font-semibold">to</span>
              <div className="flex-1 min-w-0">
                <input
                  type="number"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                  placeholder="Max"
                  className="w-full text-center border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-850 bg-white font-medium focus:outline-none focus:border-stone-400 shadow-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleClearRange}
                className="flex-1 px-3 py-2 text-[10.5px] font-bold bg-[#e8d7c3] text-stone-800 rounded-lg hover:bg-[#dfcbb3] transition-colors cursor-pointer text-center"
              >
                Clear Filters
              </button>
              <button
                onClick={handleFilterRange}
                className="flex-1 px-3 py-2 text-[10.5px] font-bold bg-[#141824] text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-center"
              >
                Filter Range
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Availability Section */}
      <div className="border-b border-stone-100 pb-4">
        <button
          onClick={() => toggleGroup("availability")}
          className="w-full flex items-center justify-between py-1.5 text-stone-850 hover:text-stone-900 focus:outline-none"
        >
          <span className="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider">
            Availability
          </span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
              openGroups.availability ? "transform rotate-180" : ""
            )}
          />
        </button>

        {openGroups.availability && (
          <div className="flex flex-col gap-2.5 mt-3 animate-fade-in">
            {[
              { label: "All Items", value: "all" },
              { label: "In Stock Only", value: "in_stock" },
              { label: "Out of Stock", value: "out_of_stock" },
            ].map((opt) => {
              const isActive = activeStock === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => updateParam("stock", opt.value)}
                  className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-all",
                      isActive
                        ? "bg-[#141824] border-[#141824] text-white animate-scale-up"
                        : "bg-white border-stone-300 text-transparent group-hover:border-stone-400"
                    )}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold transition-colors",
                      isActive ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                    )}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Section (Only visible when viewing all products) */}
      {activeCategory === "all" ? (
        <div className="border-b border-stone-100 pb-4">
          <button
            onClick={() => toggleGroup("category")}
            className="w-full flex items-center justify-between py-1.5 text-stone-850 hover:text-stone-900 focus:outline-none"
          >
            <span className="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider">
              Category
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
                openGroups.category ? "transform rotate-180" : ""
              )}
            />
          </button>
          
          {openGroups.category && (
            <div className="flex flex-col gap-2.5 mt-3 animate-fade-in">
              {/* All Products */}
              <button
                onClick={() => handleCategorySelect("all")}
                className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    activeCategory === "all"
                      ? "border-[#141824] bg-white"
                      : "bg-white border-stone-300 group-hover:border-stone-400"
                  )}
                >
                  {activeCategory === "all" && (
                    <div className="w-2 h-2 rounded-full bg-[#141824] animate-scale-up" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    activeCategory === "all" ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                  )}
                >
                  All Products
                </span>
              </button>

              {categories.map((cat) => {
                const isActive = (activeCategory as string) === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                        isActive
                          ? "border-[#141824] bg-white"
                          : "bg-white border-stone-300 group-hover:border-stone-400"
                      )}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#141824] animate-scale-up" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold transition-colors",
                        isActive ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                      )}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="border-b border-stone-100 pb-4">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("category");
              params.delete("subcat");
              params.delete("page");
              startTransition(() => {
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
              });
            }}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-stone-700 hover:text-[#141824] transition-colors focus:outline-none cursor-pointer border border-stone-200 hover:border-stone-300 bg-white rounded-xl px-3 py-2 shadow-sm"
          >
            <span>←</span>
            <span>All Categories</span>
          </button>
        </div>
      )}

      {/* Subcategory / Type Section (Only visible inside specific category page) */}
      {activeCategory !== "all" && (SUBCATEGORIES[activeCategory as ProductCategory] || []).length > 0 && (
        <div className="border-b border-stone-100 pb-4">
          <button
            onClick={() => toggleGroup("subcat")}
            className="w-full flex items-center justify-between py-1.5 text-stone-850 hover:text-stone-900 focus:outline-none"
          >
            <span className="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider">
              {activeCategory === "battery" ? "Battery Type" : 
               activeCategory === "ebike" ? "Vehicle Type" : "Product Type"}
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
                openGroups.subcat ? "transform rotate-180" : ""
              )}
            />
          </button>

          {openGroups.subcat && (
            <div className="flex flex-col gap-2.5 mt-3 animate-fade-in">
              {/* All Types */}
              <button
                onClick={() => updateParam("subcat", "all")}
                className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    activeSubcat === "all"
                      ? "border-[#141824] bg-white"
                      : "bg-white border-stone-300 group-hover:border-stone-400"
                  )}
                >
                  {activeSubcat === "all" && (
                    <div className="w-2 h-2 rounded-full bg-[#141824] animate-scale-up" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    activeSubcat === "all" ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                  )}
                >
                  All Types
                </span>
              </button>

              {(SUBCATEGORIES[activeCategory as ProductCategory] || []).map((sub) => {
                const isActive = activeSubcat === sub.value;
                return (
                  <button
                    key={sub.value}
                    onClick={() => updateParam("subcat", sub.value)}
                    className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                        isActive
                          ? "border-[#141824] bg-white"
                          : "bg-white border-stone-300 group-hover:border-stone-400"
                      )}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#141824] animate-scale-up" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold transition-colors",
                        isActive ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                      )}
                    >
                      {sub.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Brands Section */}
      {availableBrands.length > 0 && (
        <div className="border-b border-stone-100 pb-4">
          <button
            onClick={() => toggleGroup("brands")}
            className="w-full flex items-center justify-between py-1.5 text-stone-850 hover:text-stone-900 focus:outline-none"
          >
            <span className="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider">
              Brands
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
                openGroups.brands ? "transform rotate-180" : ""
              )}
            />
          </button>

          {openGroups.brands && (
            <div className="flex flex-col gap-2.5 mt-3 animate-fade-in">
              {/* All Brands */}
              <button
                onClick={() => updateParam("brand", "all")}
                className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                    activeBrand === "all"
                      ? "bg-[#141824] border-[#141824] text-white animate-scale-up"
                      : "bg-white border-stone-300 text-transparent group-hover:border-stone-400"
                  )}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    activeBrand === "all" ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                  )}
                >
                  All Brands
                </span>
              </button>

              {availableBrands.map((br) => {
                const isActive = activeBrand.toLowerCase() === br.value.toLowerCase();
                return (
                  <button
                    key={br.value}
                    onClick={() => updateParam("brand", br.value)}
                    className="w-full flex items-center gap-3 py-1 text-left group focus:outline-none cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all",
                        isActive
                          ? "bg-[#141824] border-[#141824] text-white animate-scale-up"
                          : "bg-white border-stone-300 text-transparent group-hover:border-stone-400"
                      )}
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold transition-colors",
                        isActive ? "text-stone-900 font-bold" : "text-stone-600 group-hover:text-stone-800"
                      )}
                    >
                      {br.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeFiltersCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-50/60 rounded-xl border border-rose-100"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4 bg-white border border-stone-200/80 rounded-2xl p-3 shadow-sm">
        <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider">{totalCount} products found</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="gap-2 border-stone-200 text-stone-700 bg-white hover:bg-stone-50 shadow-sm text-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="bg-emerald-700 text-white text-[10px] h-4.5 w-4.5 p-0 flex items-center justify-center rounded-full border-0">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile filter panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border border-stone-200 rounded-2xl p-4 mb-6 shadow-md animate-fade-in">
          <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-2">
            <span className="font-extrabold text-stone-900 text-sm">Active Filters</span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Clear
              </button>
            )}
          </div>
          {filterContent}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-5 sticky top-24 shadow-sm shadow-stone-100 max-h-[calc(100vh-120px)] overflow-y-auto pr-3 scrollbar-thin">
          <div className="flex items-center justify-between mb-5 border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-stone-900 tracking-tight text-sm">Filters</h3>
              {activeFiltersCount > 0 && (
                <Badge className="bg-emerald-50 text-emerald-850 border border-emerald-100 text-[9px] font-bold px-1.5 py-0">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAll}
                className="text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 focus:outline-none"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Clear
              </button>
            )}
          </div>
          {filterContent}
        </div>
      </aside>
    </>
  );
}

export { PRICE_RANGES, SORT_OPTIONS } from "@/lib/types";

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const activeSort = searchParams.get("sort") ?? "newest";
  const activeOption = SORT_OPTIONS.find((opt) => opt.value === activeSort) || SORT_OPTIONS[0];

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    setIsOpen(false);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden sm:inline">
          Sort By
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between w-40 px-3 py-2 text-[11px] font-bold bg-white text-stone-800 border border-stone-200 rounded-xl hover:bg-stone-50 transition-all hover:border-stone-300 focus:outline-none shadow-sm cursor-pointer"
        >
          <span>{activeOption.label}</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-stone-450 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )}
          />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-stone-200/80 shadow-lg z-20 overflow-hidden animate-fade-in">
            <div className="py-1 flex flex-col">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-[11px] transition-colors flex items-center justify-between hover:bg-stone-50",
                    activeSort === opt.value
                      ? "text-emerald-800 font-extrabold bg-emerald-50/20"
                      : "text-stone-600 hover:text-stone-900"
                  )}
                >
                  <span>{opt.label}</span>
                  {activeSort === opt.value && <Check className="w-3.5 h-3.5 text-emerald-650" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
