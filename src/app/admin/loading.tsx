import Skeleton, { SkeletonCard, SkeletonTable } from "@/components/admin/Skeleton";

/**
 * Shown while navigating between /admin sections (Next.js route loading
 * state) so the panel shows shimmering placeholders instead of a blank hang.
 */
export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200" aria-busy="true" aria-label="Loading">
      {/* Header placeholder */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <Skeleton className="h-10 w-36" rounded="rounded-xl" />
      </div>

      {/* Stat cards placeholder */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8" rounded="rounded-xl" />
            </div>
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Content placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard rows={5} />
        <SkeletonCard rows={5} />
      </div>
      <SkeletonTable rows={5} cols={4} />
    </div>
  );
}
