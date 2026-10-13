import { cn } from "@/lib/utils";

/**
 * Shimmer placeholder used while admin sections load.
 * Matches the admin card styling (rounded-2xl, stone borders).
 */
export default function Skeleton({
  className,
  rounded = "rounded-xl",
  style,
}: {
  className?: string;
  rounded?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "animate-pulse bg-stone-200/70 dark:bg-stone-800",
        rounded,
        className
      )}
    />
  );
}

/** A full admin-style card filled with skeleton rows. */
export function SkeletonCard({ rows = 4 }: { rows?: number }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-6 w-24" rounded="rounded-lg" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${88 - ((i * 17) % 30)}%` }}
        />
      ))}
    </div>
  );
}

/** Skeleton row mimicking a table. */
export function SkeletonTable({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
      <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex gap-3">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-28" rounded="rounded-xl" />
      </div>
      <div className="divide-y divide-stone-100 dark:divide-stone-800">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-4 px-4 py-3.5">
            <Skeleton className="h-9 w-9 shrink-0" rounded="rounded-full" />
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
