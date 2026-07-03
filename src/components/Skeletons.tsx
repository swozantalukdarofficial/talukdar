import { Skeleton } from "@/components/ui/skeleton";

// ─── Single product card skeleton ─────────────────────────────────
export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-stone-200/80 flex flex-col shadow-sm">
      {/* Image */}
      <Skeleton className="aspect-square w-full bg-stone-200/60" />
      {/* Content */}
      <div className="p-4 flex-1 space-y-3">
        <Skeleton className="h-3 w-16 bg-stone-200/60" />
        <Skeleton className="h-4 w-full bg-stone-200/60" />
        <Skeleton className="h-4 w-3/4 bg-stone-200/60" />
        {/* Spec pills */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-14 rounded-full bg-stone-200/60" />
          <Skeleton className="h-5 w-14 rounded-full bg-stone-200/60" />
        </div>
      </div>
      {/* Price */}
      <div className="px-4 pb-4">
        <Skeleton className="h-5 w-24 bg-stone-200/60" />
      </div>
    </div>
  );
}

// ─── Grid of skeleton cards ────────────────────────────────────────
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Carousel row of skeleton cards ───────────────────────────────
export function ProductCarouselSkeleton() {
  return (
    <section className="py-16 md:py-20 w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 bg-stone-200/60" />
            <Skeleton className="h-8 w-48 bg-stone-200/60" />
          </div>
          <Skeleton className="h-4 w-16 bg-stone-200/60" />
        </div>
        {/* Cards row */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[280px]">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Hero skeleton (shown during slow load) ────────────────────────
export function HeroSkeleton() {
  return (
    <div className="relative min-h-[92vh] bg-[#faf9f6] flex items-center">
      <div className="container mx-auto px-4 md:px-6 space-y-6">
        <Skeleton className="h-6 w-44 rounded-full bg-stone-200/60" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-3/4 bg-stone-200/60" />
          <Skeleton className="h-16 w-1/2 bg-stone-200/60" />
        </div>
        <Skeleton className="h-5 w-xl max-w-lg bg-stone-200/60" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-36 rounded-xl bg-stone-200/60" />
          <Skeleton className="h-12 w-36 rounded-xl bg-stone-200/60" />
        </div>
      </div>
    </div>
  );
}

// ─── Product detail page skeleton ─────────────────────────────────
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <Skeleton className="aspect-square w-full rounded-2xl bg-stone-200/60" />
        {/* Info */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-20 bg-stone-200/60" />
          <Skeleton className="h-9 w-full bg-stone-200/60" />
          <Skeleton className="h-9 w-3/4 bg-stone-200/60" />
          <Skeleton className="h-6 w-32 bg-stone-200/60" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full bg-stone-200/60" />
            <Skeleton className="h-4 w-5/6 bg-stone-200/60" />
            <Skeleton className="h-4 w-4/6 bg-stone-200/60" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 flex-1 rounded-xl bg-stone-200/60" />
            <Skeleton className="h-12 w-12 rounded-xl bg-stone-200/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
