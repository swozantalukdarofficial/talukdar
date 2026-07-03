"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  function handlePageChange(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > totalPages || isPending) return;

    const params = new URLSearchParams(searchParams.toString());
    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  // Generate page numbers to show (e.g. 1, 2, 3 ... totalPages)
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Logic to show a window of pages
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = 5;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-12 py-4 border-t border-stone-100", isPending && "opacity-60 pointer-events-none")}>
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "h-10 w-10 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-stone-200 transition-all cursor-pointer shadow-sm focus:outline-none"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={cn(
              "h-10 min-w-10 px-3.5 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm border focus:outline-none",
              isCurrent
                ? "bg-[#141824] border-[#141824] text-white"
                : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300"
            )}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "h-10 w-10 flex items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-stone-200 transition-all cursor-pointer shadow-sm focus:outline-none"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
