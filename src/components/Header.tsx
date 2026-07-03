"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Zap,
  Menu,
  Search,
  Phone,
  Gift,
  BookOpen,
  CreditCard,
  MapPin,
  Percent,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import CartDrawer from "@/components/CartDrawer";
import { getAllProducts } from "@/lib/products";
import type { Category } from "@/lib/types";

export default function Header({ categories = [] }: { categories?: Category[] }) {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const router = useRouter();

  // Debounced autocomplete search suggestion fetch
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const results = await getAllProducts({ search: searchQuery.trim() });
        setSuggestions(results.slice(0, 5));
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-stone-200/80">

      {/* 2. MAIN HEADER BAR */}
      <div className="bg-white py-3 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-emerald-500/20 bg-stone-950 shadow-md shadow-emerald-500/10 group-hover:shadow-emerald-500/25 transition-all">
              <img src="/logo.svg" alt="Talukdar EV Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold tracking-tight text-stone-900">
              Talukdar <span className="text-emerald-700">EV</span>
            </span>
          </Link>

          {/* Search bar in the center */}
          <div className="relative flex-1 max-w-xl mx-4 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-stone-200 border-r-0 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-r-lg flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim().length >= 2 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-stone-100 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                {isLoadingSuggestions ? (
                  <div className="p-4 text-center text-xs text-stone-400 font-semibold flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-emerald-750 border-t-transparent rounded-full animate-spin" />
                    Searching matching products...
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="p-4 text-center text-xs text-stone-400 font-semibold">
                    No matching products found 🔎
                  </div>
                ) : (
                  <>
                    <div className="p-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-50/50">
                      Suggested Products
                    </div>
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          router.push(`/products/${product.slug}`);
                          setSearchQuery("");
                          setShowSuggestions(false);
                        }}
                        className="w-full flex items-center gap-3 p-2.5 text-left hover:bg-stone-50 transition-colors"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-150">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-stone-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-[10px] font-semibold text-emerald-800 mt-0.5">
                            ৳{product.price.toLocaleString("en-BD")}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                          {categories.find(c => c.slug === product.category)?.name || product.category}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-center py-2.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50/30 hover:bg-emerald-50 transition-colors block border-t border-stone-100"
                    >
                      See all search results for "{searchQuery}"
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions (Offer, Pre-Order, Cart, Login) */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Offer button */}
            <Link
              href="/products?sort=featured"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100/80 rounded-full border border-amber-200/50 transition-colors uppercase tracking-wider"
            >
              <Percent className="h-3 w-3 animate-pulse" />
              Offer
            </Link>

            {/* Pre-Order button */}
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-750 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors uppercase tracking-wider"
            >
              Pre-Order
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 text-emerald-700" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Cart</span>
              {totalItems > 0 && (
                <Badge className="h-5 min-w-[20px] rounded-full p-0 flex items-center justify-center text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-0">
                  {totalItems}
                </Badge>
              )}
            </button>

            {/* Login button */}
            <Link
              href="/admin/products"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors uppercase tracking-wider"
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* Mobile hamburger menu (opens the sheet) */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#faf9f6] border-stone-200 text-stone-900 w-80 p-0">
                {/* Mobile side navigation header */}
                <div className="flex items-center gap-2 px-5 py-5 border-b border-stone-200 bg-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-emerald-500/20 bg-stone-950 shadow-md">
                    <img src="/logo.svg" alt="Talukdar EV Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-lg font-bold">
                    Talukdar <span className="text-emerald-700">EV</span>
                  </span>
                </div>

                 {/* Mobile search */}
                 <div className="relative p-4 bg-white border-b border-stone-200">
                   <form onSubmit={(e) => { handleSearchSubmit(e); setMobileOpen(false); }} className="flex items-center">
                     <input
                       type="text"
                       placeholder="Search products..."
                       value={searchQuery}
                       onFocus={() => setShowSuggestions(true)}
                       onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="flex-1 px-3 py-2 border border-stone-200 border-r-0 rounded-l-lg text-sm bg-stone-50 focus:outline-none"
                     />
                     <button type="submit" className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-r-lg text-stone-700">
                       <Search className="h-4 w-4" />
                     </button>
                   </form>

                   {/* Mobile Suggestions inline */}
                   {showSuggestions && searchQuery.trim().length >= 2 && (
                     <div className="mt-2 bg-white border border-stone-150 rounded-xl overflow-hidden divide-y divide-stone-100 max-h-60 overflow-y-auto">
                       {isLoadingSuggestions ? (
                         <div className="p-3 text-center text-xs text-stone-400 font-semibold flex items-center justify-center gap-2">
                           <span className="w-3.5 h-3.5 border-2 border-emerald-750 border-t-transparent rounded-full animate-spin" />
                           Searching...
                         </div>
                       ) : suggestions.length === 0 ? (
                         <div className="p-3 text-center text-xs text-stone-400">
                           No products found 🔎
                         </div>
                       ) : (
                         <>
                           {suggestions.map((product) => (
                             <button
                               key={product.id}
                               onClick={() => {
                                 router.push(`/products/${product.slug}`);
                                 setSearchQuery("");
                                 setShowSuggestions(false);
                                 setMobileOpen(false);
                               }}
                               className="w-full flex items-center gap-2.5 p-2 text-left hover:bg-stone-50 transition-colors"
                             >
                               <div className="relative w-8 h-8 rounded bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-150">
                                 <img
                                   src={product.image_url}
                                   alt={product.name}
                                   className="object-cover w-full h-full"
                                 />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <p className="text-xs font-bold text-stone-900 truncate">
                                   {product.name}
                                 </p>
                                 <p className="text-[10px] font-semibold text-emerald-800 mt-0.5">
                                   ৳{product.price.toLocaleString("en-BD")}
                                 </p>
                               </div>
                             </button>
                           ))}
                         </>
                       )}
                     </div>
                   )}
                 </div>

                {/* Mobile categories & pages */}
                <div className="flex flex-col gap-6 p-5">
                  <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Categories</h3>
                    <nav className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-stone-100 text-stone-700"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <span>{cat.name}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Quick Links</h3>
                    <nav className="flex flex-col gap-1">
                      <Link href="/products" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100">All Products</Link>
                      <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100">About Us</Link>
                      <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100">Contact Us</Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION BAR */}
      <div className="hidden md:block border-t border-stone-100 py-2.5 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Category menu trigger */}
            <Link
              href="/products"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-lg text-stone-755 transition-colors text-xs font-bold uppercase tracking-wider shrink-0"
            >
              <Menu className="h-3.5 w-3.5 text-emerald-700" />
              Shop Categories
            </Link>

            {/* Categories List */}
            <nav className="flex items-center gap-6 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </nav>
          </div>


        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  );
}
