import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { PRICE_RANGES, type ProductCategory } from "@/lib/types";
import { getAllCategories } from "@/lib/categories";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters, { SortDropdown } from "@/components/ProductFilters";
import { ProductGridSkeleton } from "@/components/Skeletons";
import Pagination from "@/components/Pagination";
import CollectionSEOContent from "@/components/CollectionSEOContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | EVStore Bangladesh",
  description:
    "Browse our full range of e-bikes, batteries, parts, and accessories. Filter by category and price.",
};

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    priceIdx?: string;
    search?: string;
    brand?: string;
    stock?: string;
    page?: string;
    subcat?: string;
    tag?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category as ProductCategory | undefined;
  const sortBy = params.sort as
    | "price_asc"
    | "price_desc"
    | "newest"
    | "featured"
    | undefined;
  const priceIdx = Number(params.priceIdx ?? 0);
  const priceRange = PRICE_RANGES[priceIdx] ?? PRICE_RANGES[0];
  const search = params.search;
  const brand = params.brand;
  const stock = params.stock;
  const subcat = params.subcat;
  const tag = params.tag;

  const inStock = stock === "in_stock" ? true : stock === "out_of_stock" ? false : undefined;

  // Run database queries in parallel for peak performance
  const [products, brandLookupProducts] = await Promise.all([
    getAllProducts({
      category: category ?? "all",
      sortBy: sortBy ?? "newest",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      search,
      brand,
      inStock,
      subcat,
      tag,
    }),
    getAllProducts({
      category: category ?? "all",
      search,
    })
  ]);

  // Extract unique brands dynamically from the category products
  const uniqueBrands = new Set<string>();
  brandLookupProducts.forEach((p) => {
    const b = p.specs?.Brand || p.specs?.brand;
    if (b) uniqueBrands.add(b.trim());
  });

  const availableBrands = Array.from(uniqueBrands)
    .sort()
    .map((b) => ({
      label: b,
      value: b,
    }));

  const categories = await getAllCategories();
  
  const activeCategoryObj = categories.find(c => c.slug === category);
  const activeCategory = category
    ? activeCategoryObj?.name || category
    : "All Products";

  // Pagination Configuration
  const ITEMS_PER_PAGE = 12;
  const currentPage = Math.max(1, Number(params.page ?? "1"));
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      {/* Page header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 md:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight mb-1">
              {activeCategory}
            </h1>
            <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">
              Showing {products.length} result{products.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex-shrink-0">
            <Suspense fallback={<div className="w-40 h-9 bg-stone-100 animate-pulse rounded-xl" />}>
              <SortDropdown />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar (desktop) + mobile toggle */}
          <Suspense fallback={null}>
            <ProductFilters totalCount={products.length} availableBrands={availableBrands} categories={categories} />
          </Suspense>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-stone-200 rounded-2xl p-8">
                <div className="text-4xl mb-4">🔎</div>
                <h2 className="text-lg font-bold text-stone-900 mb-1">
                  No products found
                </h2>
                <p className="text-sm text-stone-500 max-w-sm">
                  Try adjusting your filters or sorting option to discover more products.
                </p>
              </div>
            ) : (
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid products={paginatedProducts} />
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </Suspense>
            )}
          </div>
        </div>

        {/* Dynamic Collection-specific SEO & FAQ section */}
        <CollectionSEOContent category={category ?? "all"} />
      </div>
    </main>
  );
}
