import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import ProductCatalog from "@/components/ProductCatalog";
import { ProductGridSkeleton } from "@/components/Skeletons";
import CollectionSchema from "@/components/CollectionSchema";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";

// Static metadata only — reading searchParams here would force the page to
// render dynamically on every request. Category-specific titles are handled
// by the client-side catalog UI instead.
export const metadata: Metadata = {
  title: "All Products — Premium EV Parts & Accessories | EV Solution BD",
  description:
    "Browse our full range of e-bikes, lithium batteries, chargers, and parts. High-quality products with warranty and fast delivery across Bangladesh.",
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: "All Products | EV Solution BD",
    description:
      "Browse e-bikes, lithium batteries, chargers, and parts with warranty in Bangladesh.",
    url: `${SITE_URL}/products`,
  },
};

// Fully static (on-demand only): the product list is fetched once at build
// time and refreshed only when an admin edit calls /api/revalidate — no
// time-based revalidation, no function run per listing view. Filtering,
// sorting and pagination run in the browser inside ProductCatalog, which
// reads the URL params client-side.
export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts({}),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      {/* Schema Markup for search engines */}
      <CollectionSchema
        products={products.slice(0, 12)}
        categoryName="All Products"
        categorySlug="all"
      />

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductCatalog products={products} categories={categories} />
      </Suspense>
    </main>
  );
}
