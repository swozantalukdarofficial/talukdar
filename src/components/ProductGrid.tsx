import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-white border border-stone-200/80 rounded-2xl p-8">
        <p className="text-stone-700 text-lg font-bold">No products found</p>
        <p className="text-stone-400 text-sm">Try adjusting your search query or filters to discover more items!</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
