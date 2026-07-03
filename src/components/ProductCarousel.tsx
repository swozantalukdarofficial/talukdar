"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  bgClassName?: string;
}

export default function ProductCarousel({
  products,
  title,
  subtitle,
  viewAllHref = "/products",
  bgClassName = "bg-[#faf9f6]",
}: ProductCarouselProps) {
  if (products.length === 0) return null;

  return (
    <section className={`py-12 md:py-16 w-full overflow-hidden ${bgClassName}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-5 gap-4 flex-wrap">
          <div>
            {subtitle && (
              <p className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-1.5">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 hover:text-emerald-800 transition-colors group shrink-0"
          >
            View all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: products.length > 3,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <CarouselPrevious className="-left-4 md:-left-6 h-10 w-10 border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 shadow-md shadow-stone-100" />
          <CarouselNext className="-right-4 md:-right-6 h-10 w-10 border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 shadow-md shadow-stone-100" />
        </Carousel>
      </div>
    </section>
  );
}
