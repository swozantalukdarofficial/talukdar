import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, Settings, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import AdminClientGuard from "@/components/AdminClientGuard";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin Dashboard | Talukdar EV",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminClientGuard>
      <div className="min-h-screen bg-[#faf9f6] flex flex-col md:flex-row pt-16">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-stone-200 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2 shrink-0">
          <div className="mb-4 px-2 hidden md:block">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Admin Panel</h2>
          </div>
          
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-sm transition-colors shrink-0">
              <LayoutDashboard className="w-5 h-5 text-emerald-600" />
              Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-sm transition-colors shrink-0">
              <Package className="w-5 h-5 text-indigo-500" />
              Orders
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-sm transition-colors shrink-0">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              Products
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-sm transition-colors shrink-0">
              <LayoutDashboard className="w-5 h-5 text-purple-500" />
              Categories
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold text-sm transition-colors shrink-0 md:mt-auto">
              <Settings className="w-5 h-5 text-stone-400" />
              Settings
            </Link>
            <AdminLogoutButton />
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </AdminClientGuard>
  );
}
