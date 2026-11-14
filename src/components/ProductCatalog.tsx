"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  PRICE_RANGES,
  type Category,
  type Product,
  type ProductCategory,
} from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters, { SortDropdown } from "@/components/ProductFilters";
import Pagination from "@/components/Pagination";
import CollectionSEOContent from "@/components/CollectionSEOContent";

const COMMERCIAL_SUBCATS = ["rickshaw", "pickup", "bus", "utility"];
const ITEMS_PER_PAGE = 12;

function includes(haystack: string | null | undefined, needle: string) {
  return (haystack ?? "").toLowerCase().includes(needle.toLowerCase());
}

function matchesCategory(p: Product, category: string | undefined): boolean {
  if (!category || category === "all") return true;
  if (category === "commercial") {
    return (
      p.category === "ebike" &&
      COMMERCIAL_SUBCATS.includes((p.specs?.Subcategory ?? "").toLowerCase())
    );
  }
  return p.category === category;
}

interface CatalogParams {
  category?: string;
  sort?: string;
  priceIdx: number;
  search?: string;
  brand?: string;
  stock?: string;
  subcat?: string;
  tag?: string;
  page: number;
}

function applyFilters(products: Product[], params: CatalogParams): Product[] {
  const { category, sort, priceIdx, search, brand, stock, subcat, tag } =
    params;

  let results = products.filter((p) => matchesCategory(p, category));

  const priceRange = PRICE_RANGES[priceIdx] ?? PRICE_RANGES[0];
  if (priceRange.min !== undefined)
    results = results.filter((p) => p.price >= priceRange.min!);
  if (priceRange.max !== undefined)
    results = results.filter((p) => p.price <= priceRange.max!);

  if (stock === "in_stock") results = results.filter((p) => p.stock_quantity > 0);
  else if (stock === "out_of_stock")
    results = results.filter((p) => p.stock_quantity === 0);

  if (brand && brand !== "all")
    results = results.filter(
      (p) => (p.specs?.Brand ?? "").toLowerCase() === brand.toLowerCase()
    );

  if (subcat && subcat !== "all") {
    const q = subcat.toLowerCase();
    if (category === "battery") {
      results = results.filter(
        (p) => (p.specs?.Subcategory ?? "").toLowerCase() === q
      );
    } else {
      results = results.filter(
        (p) =>
          includes(p.name, q) ||
          includes(p.description, q) ||
          includes(p.specs?.Subcategory, q) ||
          includes(p.specs?.Type, q) ||
          includes(p.specs?.["Battery Type"], q)
      );
    }
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) => includes(p.name, q) || includes(p.description, q)
    );
  }

  if (tag) {
    results = results.filter((p) => includes(p.specs?.tags, tag));
  }

  // Same ordering the server used: created_at desc is the default ("newest").
  const sorted = [...results];
  if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") sorted.sort((a, b) => b.price - a.price);
  else if (sort === "featured")
    sorted.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
  else
    sorted.sort((a, b) =>
      (b.created_at || "").localeCompare(a.created_at || "")
    );
  return sorted;
}

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
}

export default function ProductCatalog({
  products,
  categories,
}: ProductCatalogProps) {
  const searchParams = useSearchParams();

  const params: CatalogParams = useMemo(
    () => ({
      category: searchParams.get("category") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      priceIdx: Number(searchParams.get("priceIdx") ?? 0),
      search: searchParams.get("search") ?? undefined,
      brand: searchParams.get("brand") ?? undefined,
      stock: searchParams.get("stock") ?? undefined,
      subcat: searchParams.get("subcat") ?? undefined,
      tag: searchParams.get("tag") ?? undefined,
      page: Math.max(1, Number(searchParams.get("page") ?? "1")),
    }),
    [searchParams]
  );

  const filtered = useMemo(
    () => applyFilters(products, params),
    [products, params]
  );

  // Brands are extracted from the category+search base set, same as before.
  const availableBrands = useMemo(() => {
    const base = products.filter(
      (p) =>
        matchesCategory(p, params.category) &&
        (!params.search ||
          includes(p.name, params.search) ||
          includes(p.description, params.search))
    );
    const unique = new Set<string>();
    base.forEach((p) => {
      const b = p.specs?.Brand || p.specs?.brand;
      if (b) unique.add(b.trim());
    });
    return Array.from(unique)
      .sort()
      .map((b) => ({ label: b, value: b }));
  }, [products, params.category, params.search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (params.page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const activeCategoryObj = categories.find((c) => c.slug === params.category);
  const activeCategory = params.category
    ? activeCategoryObj?.name ||
      params.category.charAt(0).toUpperCase() + params.category.slice(1)
    : "All Products";

  return (
    <>
      {/* Page header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight mb-1">
              {activeCategory}
            </h1>
            <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">
              Showing {filtered.length} result
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Suspense
              fallback={
                <div className="w-40 h-9 bg-stone-100 animate-pulse rounded-xl" />
              }
            >
              <SortDropdown />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar (desktop) + mobile toggle */}
          <Suspense fallback={null}>
            <ProductFilters
              totalCount={filtered.length}
              availableBrands={availableBrands}
              categories={categories}
            />
          </Suspense>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-stone-200 rounded-2xl p-8">
                <div className="text-4xl mb-4">🔎</div>
                <h2 className="text-lg font-bold text-stone-900 mb-1">
                  No products found
                </h2>
                <p className="text-sm text-stone-500 max-w-sm">
                  Try adjusting your filters or sorting option to discover
                  more products.
                </p>
              </div>
            ) : (
              <Suspense fallback={null}>
                <ProductGrid products={paginatedProducts} />
                <Pagination
                  currentPage={params.page}
                  totalPages={totalPages}
                />
              </Suspense>
            )}
          </div>
        </div>

        {/* Dynamic Collection-specific SEO & FAQ section */}
        <CollectionSEOContent
          category={(params.category ?? "all") as ProductCategory | "all"}
        />
      </div>
    </>
  );
}
