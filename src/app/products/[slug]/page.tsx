import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCarousel from "@/components/ProductCarousel";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate SEO metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | EVStore Bangladesh`,
    description:
      product.description ??
      `Buy ${product.name} at the best price in Bangladesh.`,
    openGraph: {
      title: product.name,
      description: product.description ?? "",
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // Smart Related Products query
  let related = [];
  let isEbikeRelated = false;
  if (product.category === "ebike") {
    // If it's an e-bike, show accessories/parts/batteries
    const accessories = await getRelatedProducts("accessories", "");
    const batteries = await getRelatedProducts("battery", "");
    const parts = await getRelatedProducts("parts", "");
    related = [...accessories, ...batteries, ...parts].slice(0, 6);

    if (related.length === 0) {
      // Fallback to other e-bikes if no accessories exist
      related = await getRelatedProducts("ebike", product.slug);
      isEbikeRelated = true;
    }
  } else {
    // If it's an accessory, battery, or part, show other items from same category, plus some popular bikes
    const sameCategory = await getRelatedProducts(product.category, product.slug);
    const bikes = await getRelatedProducts("ebike", "");
    related = [...sameCategory, ...bikes].slice(0, 6);
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-0">
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
