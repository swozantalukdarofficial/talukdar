import { getAllCategories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";
import { Plus } from "lucide-react";
import Link from "next/link";
import CategoryActions from "./CategoryActions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Categories | EVStore",
};

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts({}),
  ]);

  const productCounts = categories.reduce((acc, cat) => {
    acc[cat.slug] = products.filter(p => p.category === cat.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm shadow-stone-150/40">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              Categories
            </h1>
            <p className="text-stone-500 text-sm font-medium mt-1">
              Manage product categories and icons.
            </p>
          </div>
          <Link
            href="/admin/categories/add"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Link>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm shadow-stone-150/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-200">
                  <th className="px-5 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-16">
                    Icon
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Category Details
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider hidden sm:table-cell">
                    Slug
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-center">
                    Products
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-stone-500 text-sm">
                      No categories found. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-5 py-4 text-2xl">
                        {c.icon}
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                            {c.name}
                          </p>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                            {c.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                          /{c.slug}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Link href={`/admin/products?category=${c.slug}`} className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 transition-colors px-2.5 py-1 rounded-md block w-max mx-auto">
                          {productCounts[c.slug] || 0}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <CategoryActions id={c.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
