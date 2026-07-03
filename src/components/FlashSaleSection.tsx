"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, ShoppingCart } from "lucide-react";
import { type Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface FlashSaleSectionProps {
  products: Product[];
}

export default function FlashSaleSection({ products }: FlashSaleSectionProps) {
  const { addItem, openCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 0,
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;
        
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#faf9f6] border-y border-stone-200/60 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-stone-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200/70 text-rose-700 rounded-full text-xs font-extrabold uppercase tracking-wider w-fit">
              <Flame className="w-4 h-4 fill-rose-550 text-rose-600 animate-pulse" />
              Flash Sale
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900">
              Today&apos;s Hot Offers
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest mr-2">Ends In:</span>
            <div className="flex gap-1.5">
              {[
                { val: timeLeft.hours, label: "H" },
                { val: timeLeft.minutes, label: "M" },
                { val: timeLeft.seconds, label: "S" },
              ].map((t, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
                    <span className="text-lg font-black text-emerald-800 tabular-nums">
                      {String(t.val).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-bold text-stone-400 uppercase">{t.label}</span>
                  </div>
                  {idx < 2 && <span className="text-lg font-bold text-stone-300 px-1 animate-pulse">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 pb-4 lg:grid lg:grid-cols-4 lg:overflow-x-visible lg:pb-0">
          {products.map((product) => {
            const hasDiscount = !!(product.compare_at_price && product.compare_at_price > product.price);
            const discountPercent = (hasDiscount && product.compare_at_price)
              ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white border border-stone-200/85 hover:border-emerald-600/30 rounded-2xl p-3 flex flex-col justify-between hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] transition-all duration-300 relative w-[240px] sm:w-[260px] lg:w-auto shrink-0 snap-start"
              >
                {/* Discount Badge */}
                {hasDiscount && (
                  <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black uppercase rounded-lg tracking-wider shadow-md">
                    -{discountPercent}% OFF
                  </span>
                )}

                {/* Product Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="block relative aspect-square w-full rounded-xl overflow-hidden bg-stone-50/50 mb-3 border border-stone-100 p-2 cursor-pointer"
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1 block">
                      {product.category}
                    </span>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm font-bold text-stone-800 hover:text-emerald-800 transition-colors line-clamp-1 block mb-2"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div>
                    {/* Prices */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base font-extrabold text-stone-900">
                        ৳{product.price.toLocaleString()}
                      </span>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ৳{product.compare_at_price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 text-center py-2 bg-stone-50 hover:bg-stone-100 text-stone-750 hover:text-stone-900 rounded-xl text-xs font-bold transition-all border border-stone-200"
                      >
                        Details
                      </Link>
                      <Button
                        size="icon"
                        onClick={() => {
                          addItem(product);
                          openCart();
                        }}
                        className="bg-emerald-700 hover:bg-emerald-850 text-white rounded-xl h-8.5 w-8.5 shrink-0 border-0 shadow-sm"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
