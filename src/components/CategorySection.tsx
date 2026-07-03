import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ImageIcon } from "lucide-react";
import { getAllCategories } from "@/lib/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CATEGORY_IMAGES: Record<string, string> = {
  ebike: "https://res.cloudinary.com/wgjgoifx/image/upload/v1783040653/ev_categories/ebike.avif",
  commercial: "/commercial_evs_cat.avif",
  battery: "https://res.cloudinary.com/wgjgoifx/image/upload/v1783040654/ev_categories/battery.avif",
  solar: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
  parts: "https://res.cloudinary.com/wgjgoifx/image/upload/v1783040655/ev_categories/parts.jpg",
  accessories: "https://res.cloudinary.com/wgjgoifx/image/upload/v1783040656/ev_categories/accessories.jpg",
};

export default async function CategorySection() {
  const categories = await getAllCategories();

  return (
    <section className="py-16 bg-[#faf9f6] border-b border-stone-200/55">
      <div className="container mx-auto px-4 md:px-6">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full relative"
        >
          {/* Heading & Controls */}
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-emerald-800 text-xs font-extrabold uppercase tracking-widest mb-2">
                Browse by Category
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
                What are you looking for?
              </h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <CarouselPrevious className="static transform-none h-10 w-10 border-stone-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200" />
                <CarouselNext className="static transform-none h-10 w-10 border-stone-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200" />
              </div>
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-emerald-855 transition-colors uppercase tracking-wider group"
              >
                View all products
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Carousel Content */}
          <CarouselContent className="-ml-4 md:-ml-5">
            {categories.map((cat) => {
              const imageSrc = CATEGORY_IMAGES[cat.slug];
              return (
                <CarouselItem key={cat.id} className="pl-4 md:pl-5 basis-[260px] md:basis-[280px]">
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-emerald-600/30 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50 flex items-center justify-center p-2 border-b border-stone-100">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={cat.name}
                          fill
                          className="object-cover p-0 group-hover:scale-103 transition-transform duration-500"
                          sizes="280px"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-stone-400">
                          <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content Block */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base">{cat.icon}</span>
                          <h3 className="text-sm font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                            {cat.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-normal line-clamp-2 mb-3">
                          {cat.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 text-[11px] font-bold text-stone-800 group-hover:text-emerald-800 transition-colors uppercase tracking-wider">
                        <span>Shop Now</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
