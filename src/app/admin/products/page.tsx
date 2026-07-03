import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import { Plus, Pencil, Package } from "lucide-react";
import ProductActions from "./ProductActions";
import QuickCategoryChange from "./QuickCategoryChange";
import { getAllCategories } from "@/lib/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Products | EVStore",
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts({ sortBy: "newest", category }),
    getAllCategories()
  ]);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Products</h1>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{products.length} total products</p>
          </div>
          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/10 transition-colors text-sm border-0"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {/* Product table */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 text-sm mb-4">No products uploaded yet</p>
            <Link
              href="/admin/products/add"
              className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-800 shadow-md shadow-emerald-700/10 transition-colors text-sm border-0"
            >
              <Plus className="w-4 h-4" />
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm shadow-stone-150/55">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/50">
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Product
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Price
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden md:table-cell">
                      Stock
                    </th>
                    <th className="text-left px-5 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden md:table-cell">
                      Featured
                    </th>
                    <th className="px-5 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/40 transition-colors">
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-50 border border-stone-150 shrink-0">
                            <Image
                              src={p.image_url}
                              alt={p.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-stone-900 truncate max-w-[180px]">
                              {p.name}
                            </p>
                            <p className="text-[10px] font-mono text-stone-400 truncate max-w-[180px] mt-0.5">
                              /{p.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <QuickCategoryChange
                          productId={p.id}
                          currentCategorySlug={p.category}
                          categories={categories}
                        />
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-emerald-850">
                            ৳{p.price.toLocaleString("en-BD")}
                          </p>
                          {p.compare_at_price && (
                            <p className="text-xs text-stone-400 line-through">
                              ৳{p.compare_at_price.toLocaleString("en-BD")}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            p.stock_quantity > 10
                              ? "text-emerald-800 bg-emerald-50"
                              : p.stock_quantity > 0
                              ? "text-amber-800 bg-amber-50"
                              : "text-rose-800 bg-rose-50"
                          }`}
                        >
                          {p.stock_quantity}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        {p.is_featured ? (
                          <span className="text-amber-500 text-sm filter drop-shadow-sm">⭐</span>
                        ) : (
                          <span className="text-stone-300 text-sm">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <ProductActions id={p.id} slug={p.slug} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
