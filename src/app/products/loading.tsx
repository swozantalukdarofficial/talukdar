import React from "react";
import { ProductGridSkeleton } from "@/components/Skeletons";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Title skeleton */}
        <div className="h-8 w-64 bg-stone-300 rounded-lg animate-pulse"></div>
        {/* Filters skeleton */}
        <div className="h-12 w-full bg-white border border-stone-200 rounded-xl animate-pulse"></div>
        {/* Grid skeleton */}
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
