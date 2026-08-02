import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCarousel from "@/components/ProductCarousel";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";
import ProductSchema from "@/components/ProductSchema";
import { getProductMetaDescription } from "@/lib/metaDescriptions";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate SEO metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const metaDesc = getProductMetaDescription(product.slug, product.name, product.description, product.specs);

  return {
    title: product.name,
    description: metaDesc,
    alternates: {
      canonical: `${SITE_URL}/products/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: metaDesc,
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // Smart Related Products query (Parallel fetch for speed)
  let related = [];
  let isEbikeRelated = false;
  if (product.category === "ebike") {
    // Parallel fetch for accessories/parts/batteries
    const [accessories, batteries, parts] = await Promise.all([
      getRelatedProducts("accessories", ""),
      getRelatedProducts("battery", ""),
      getRelatedProducts("parts", ""),
    ]);
    related = [...accessories, ...batteries, ...parts].slice(0, 6);

    if (related.length === 0) {
      // Fallback to other e-bikes if no accessories exist
      related = await getRelatedProducts("ebike", product.slug);
      isEbikeRelated = true;
    }
  } else {
    // Parallel fetch for same category + bikes
    const [sameCategory, bikes] = await Promise.all([
      getRelatedProducts(product.category, product.slug),
      getRelatedProducts("ebike", ""),
    ]);
    related = [...sameCategory, ...bikes].slice(0, 6);
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
      {/* Schema Markup for search engines */}
      <ProductSchema product={product} />

      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white shadow-sm shadow-stone-100/50">
        <div className="max-w-7xl mx-auto px-4 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
            <a href="/" className="hover:text-emerald-850 transition-colors">
              Home
            </a>
            <span className="text-stone-300">/</span>
            <a
              href="/products"
              className="hover:text-emerald-850 transition-colors"
            >
              Products
            </a>
            <span className="text-stone-300">/</span>
            <a
              href={`/products?category=${product.category}`}
              className="hover:text-emerald-850 transition-colors capitalize text-emerald-800"
            >
              {product.category}
            </a>
            <span className="text-stone-300">/</span>
            <span className="text-stone-700 truncate max-w-[200px] normal-case font-bold">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <ProductDetailClient product={product} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-stone-200 bg-[#faf9f6]">
          <ProductCarousel
            products={related}
            title={product.category === 'ebike' && !isEbikeRelated ? `Accessories for ${product.name}` : "Frequently Bought Together"}
            subtitle="Recommended for you"
          />
        </div>
      )}
    </main>
  );
}
