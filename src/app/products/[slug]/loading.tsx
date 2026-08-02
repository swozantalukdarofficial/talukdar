import React from "react";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6] animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-stone-200 bg-white py-3.5 px-4">
        <div className="max-w-7xl mx-auto h-4 w-64 bg-stone-200 rounded-md"></div>
      </div>

      {/* Main Product Details Skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl bg-stone-200/80 border border-stone-200"></div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-stone-200/60 border border-stone-200"></div>
              ))}
            </div>
          </div>

          {/* Right Column: Text & Purchase Action Skeleton */}
          <div className="lg:col-span-6 space-y-5">
            <div className="h-4 w-24 bg-emerald-100 rounded-md"></div>
            <div className="h-8 w-3/4 bg-stone-300 rounded-lg"></div>
            <div className="h-4 w-1/3 bg-stone-200 rounded-md"></div>

            <div className="h-12 w-full bg-stone-200/60 rounded-xl my-4"></div>

            <div className="space-y-3 pt-4">
              <div className="h-10 w-full bg-stone-200 rounded-lg"></div>
              <div className="flex gap-3">
                <div className="h-12 flex-1 bg-stone-200 rounded-xl"></div>
                <div className="h-12 flex-1 bg-emerald-200/80 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
