"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MoreHorizontal,
  Users,
  Tag,
  FileText,
  Bell,
  Settings,
  User,
  Store,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { path: "/admin", label: "Home", icon: LayoutDashboard, exact: true },
  { path: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { path: "/admin/products", label: "Products", icon: Package },
];

const MORE_LINKS = [
  { path: "/admin/customers", label: "Customers", icon: Users },
  { path: "/admin/coupons", label: "Coupons", icon: Tag },
  { path: "/admin/blogs", label: "Blogs", icon: FileText },
  { path: "/admin/notifications", label: "Notifications", icon: Bell },
  { path: "/admin/staff", label: "Staff", icon: User },
  { path: "/admin/settings", label: "Settings", icon: Settings },
  { path: "/", label: "View Store", icon: Store },
];

function isActive(pathname: string, path: string, exact?: boolean) {
  if (exact) return pathname === path;
  return pathname === path || pathname.startsWith(path + "/");
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* Bottom sheet for "More" */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-[70] bg-stone-900/60 backdrop-blur-sm md:hidden animate-in fade-in duration-150"
          onClick={() => setMoreOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed bottom-0 inset-x-0 z-[75] md:hidden transition-transform duration-300",
          moreOpen ? "translate-y-0" : "translate-y-full"
        )}
        aria-hidden={!moreOpen}
      >
        <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 rounded-t-3xl shadow-2xl px-4 pt-2 pb-8 max-h-[60vh] overflow-y-auto">
          <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700 mx-auto my-2" />
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-sm font-extrabold text-stone-900 dark:text-white">
              More sections
            </span>
            <button
              onClick={() => setMoreOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MORE_LINKS.map((l) => {
              const Icon = l.icon;
              const active = isActive(pathname, l.path);
              return (
                <Link
                  key={l.path + l.label}
                  href={l.path}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl border text-xs font-bold transition-colors",
                    active
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300"
                      : "bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-[60] md:hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur border-t border-stone-200 dark:border-stone-800"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Mobile admin navigation"
      >
        <div className="grid grid-cols-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = isActive(pathname, t.path, t.exact);
            return (
              <Link
                key={t.path}
                href={t.path}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors",
                  active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-stone-400 dark:text-stone-500"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-5 h-5" />
                {t.label}
                <span
                  className={cn(
                    "h-1 w-8 rounded-full transition-all",
                    active ? "bg-emerald-500" : "bg-transparent"
                  )}
                />
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen((o) => !o)}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors cursor-pointer",
              moreOpen
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-stone-400 dark:text-stone-500"
            )}
            aria-expanded={moreOpen}
            aria-label="More sections"
          >
            <MoreHorizontal className="w-5 h-5" />
            More
            <span
              className={cn(
                "h-1 w-8 rounded-full transition-all",
                moreOpen ? "bg-emerald-500" : "bg-transparent"
              )}
            />
          </button>
        </div>
      </nav>
    </>
  );
}
