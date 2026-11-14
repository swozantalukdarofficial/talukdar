import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import ProductCatalog from "@/components/ProductCatalog";
import { ProductGridSkeleton } from "@/components/Skeletons";
import CollectionSchema from "@/components/CollectionSchema";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";

// The virtual "commercial" category (ebikes with rickshaw/pickup/bus/utility
// subcategories) has no row in the categories table.
const COMMERCIAL_SLUG = "commercial";
const COMMERCIAL_NAME = "Commercial";

function displayName(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

async function getCategoryName(slug: string): Promise<string | null> {
  if (slug === COMMERCIAL_SLUG) return COMMERCIAL_NAME;
  const cat = await getCategoryBySlug(slug);
  return cat ? cat.name : null;
}

// Static at build time: one page per category, each with its own SEO
// title/description. New categories generate on demand (dynamicParams) and
// are cached indefinitely; admin category changes revalidate them via
// /api/revalidate (pattern /products/category/[slug]).
export async function generateStaticParams() {
  const categories = await getAllCategories();
  const slugs = categories.map((c) => c.slug);
  if (!slugs.includes(COMMERCIAL_SLUG)) slugs.push(COMMERCIAL_SLUG);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = (await getCategoryName(slug)) ?? displayName(slug);
  const canonicalUrl = `${SITE_URL}/products/category/${slug}`;

  return {
    title: `${name} — Premium E-Bike & EV Parts | EV Solution BD`,
    description: `Shop premium ${name.toLowerCase()} in Bangladesh. We offer original products with warranty, best price, and instant delivery.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${name} | EV Solution BD`,
      description: `Shop premium ${name.toLowerCase()} in Bangladesh. Original products with warranty.`,
      url: canonicalUrl,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = await getCategoryName(slug);
  if (!name) notFound();

  const [products, categories] = await Promise.all([
    getAllProducts({}),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      {/* Schema Markup for search engines */}
      <CollectionSchema
        products={products.slice(0, 12)}
        categoryName={name}
        categorySlug={slug}
      />

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductCatalog
          products={products}
          categories={categories}
          fixedCategory={slug}
        />
      </Suspense>
    </main>
  );
}
