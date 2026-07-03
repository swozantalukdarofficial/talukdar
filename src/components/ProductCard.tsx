"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCart();

  const discount = product.compare_at_price
    ? Math.round(
      ((product.compare_at_price - product.price) /
        product.compare_at_price) *
      100
    )
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
  };

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card className="group relative overflow-hidden bg-white border border-stone-200/80 hover:border-emerald-600/30 transition-all duration-300 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] hover:scale-[1.01] cursor-pointer h-full flex flex-col rounded-2xl">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-stone-50 border-b border-stone-100 flex items-center justify-center p-2">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discount && (
              <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] tracking-wide border-0 px-2 py-0.5 shadow-sm">
                {discount}% OFF
              </Badge>
            )}
            {product.stock_quantity === 0 && (
              <Badge
                variant="secondary"
                className="bg-stone-800/80 hover:bg-stone-800 text-white border-0 text-[10px] tracking-wide px-2 py-0.5"
              >
                Out of Stock
              </Badge>
            )}
            {product.is_featured && (
              <div className="flex flex-col gap-1">
                {product.category === "ebike" && (
                  <Badge className="bg-rose-600 text-white border-0 text-[9px] tracking-wide px-2 py-0.5 font-black shadow-sm flex items-center gap-0.5 uppercase w-fit">
                    <span>🔥</span> Top Selling
                  </Badge>
                )}
                <Badge className="bg-[#141824] text-white border-0 text-[9px] tracking-wide px-2 py-0.5 font-bold shadow-sm flex items-center gap-1 w-fit">
                  <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[9px] font-bold text-emerald-800 tracking-wider uppercase mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-bold text-stone-800 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Specs preview */}
          {product.specs && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {Object.entries(product.specs)
                .slice(0, 2)
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="text-[9px] font-bold bg-stone-50 text-stone-500 px-2 py-0.5 uppercase tracking-wide rounded-md border border-stone-200/40"
                  >
                    {value}
                  </span>
                ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="px-3 sm:px-4 pb-4 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full gap-1.5">
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] sm:text-[17px] font-extrabold text-stone-900 leading-tight truncate">
                ৳{product.price.toLocaleString("en-BD")}
              </span>
              {product.compare_at_price && (
                <span className="text-[10px] sm:text-xs text-stone-400 line-through font-medium leading-none mt-0.5">
                  ৳{product.compare_at_price.toLocaleString("en-BD")}
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <Button
              size="icon"
              className="h-8 w-8 bg-emerald-700 hover:bg-emerald-850 text-white rounded-full transition-all duration-300 shadow-sm border-0 group-hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
