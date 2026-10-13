"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  User,
  Package,
  Settings,
  FileText,
  Globe,
  Target,
  LogOut,
  ChevronDown,
  ChevronRight,
  Minus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const sidebarRoutes = [
  {
    path: "/admin",
    icon: LayoutDashboard,
    name: "Dashboard",
  },
  {
    icon: Package,
    name: "Catalog",
    routes: [
      { path: "/admin/products", name: "Products" },
      { path: "/admin/categories", name: "Categories" },
      { path: "/admin/attributes", name: "Attributes" },
      { path: "/admin/coupons", name: "Coupons" },
    ],
  },
  {
    path: "/admin/customers",
    icon: Users,
    name: "Customers",
  },
  {
    path: "/admin/orders",
    icon: ShoppingBag,
    name: "Orders",
  },
  {
    path: "/admin/staff",
    icon: User,
    name: "Our Staff",
  },
  {
    path: "/admin/settings",
    icon: Settings,
    name: "Settings",
  },
  {
    icon: Globe,
    name: "International",
    routes: [
      { path: "/admin/languages", name: "Languages" },
      { path: "/admin/currencies", name: "Currencies" },
    ],
  },
  {
    icon: Target,
    name: "Online Store",
    routes: [
      { path: "/", name: "View Store", outside: true },
      { path: "/admin/store-customization", name: "Store Customization" },
      { path: "/admin/media", name: "Media Library" },
    ],
  },
  {
    icon: FileText,
    name: "Pages",
    routes: [
      { path: "/admin/blogs", name: "Blogs / Articles" },
      { path: "/admin/notifications", name: "Notifications" },
      { path: "/admin/activity", name: "Activity Log" },
      { path: "/admin/profile", name: "My Profile" },
    ],
  },
];

export default function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ev_admin_authenticated");
      sessionStorage.removeItem("ev_admin_passcode");
      window.location.href = "/admin";
    }
  };

  const isRouteActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href="/admin"
            onClick={onCloseMobile}
            className="text-stone-900 dark:text-stone-100 text-xl font-bold flex items-center gap-2"
          >
            EV Solution
          </Link>
          {/* Close button — visible only when the mobile drawer is open */}
          <button
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="md:hidden p-2.5 -mr-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="flex-1 overflow-y-auto py-2">
          {sidebarRoutes.map((route) =>
            route.routes ? (
              <SidebarSubMenu key={route.name} route={route} pathname={pathname} onCloseMobile={onCloseMobile} />
            ) : (
              <li className="relative" key={route.name}>
                <Link
                  href={route.path || "#"}
                  onClick={onCloseMobile}
                  className={cn(
                    "px-6 py-3.5 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-stone-100",
                    isRouteActive(route.path!)
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-stone-500 dark:text-stone-400"
                  )}
                >
                  {isRouteActive(route.path!) && (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  )}
                  {route.icon && <route.icon className="w-5 h-5 shrink-0" aria-hidden="true" />}
                  <span className="ml-4">{route.name}</span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Bottom User / Logout Card */}
        <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarSubMenu({ route, pathname, onCloseMobile }: { route: any, pathname: string, onCloseMobile?: () => void }) {
  const isActiveGroup = route.routes.some((r: any) => pathname.startsWith(r.path));
  const [open, setOpen] = useState(isActiveGroup);

  return (
    <li className="relative px-6 py-2" key={route.name}>
      <button
        className="inline-flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-stone-100 text-stone-500 dark:text-stone-400 py-1"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="inline-flex items-center">
          {route.icon && <route.icon className="w-5 h-5 shrink-0" aria-hidden="true" />}
          <span className="ml-4">{route.name}</span>
        </span>
        <span className="pl-4">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      </button>

      {open && (
        <ul
          className="mt-2 overflow-hidden text-sm font-medium rounded-xl bg-stone-50 dark:bg-stone-950/60 p-2 space-y-0.5"
          aria-label="submenu"
        >
          {route.routes.map((child: any, i: number) => {
            const active = pathname.startsWith(child.path);
            const itemClass = cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
              active
                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold"
                : "text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60"
            );
            return (
              <li key={i + 1}>
                {child.outside ? (
                  <a href={child.path} target="_blank" rel="noreferrer" className={itemClass}>
                    <Minus className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{child.name}</span>
                  </a>
                ) : (
                  <Link href={child.path} onClick={onCloseMobile} className={itemClass}>
                    <Minus className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{child.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
