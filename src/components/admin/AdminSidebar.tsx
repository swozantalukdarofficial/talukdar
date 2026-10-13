"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  User,
  Compass,
  Settings,
  Layers,
  Globe,
  Target,
  LogOut,
  Menu,
  ChevronDown,
  ChevronRight,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    icon: Layers,
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
    icon: Compass,
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
    icon: Layers,
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
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link href="/admin" className="text-gray-900 dark:text-gray-200 ml-6 text-xl font-bold flex items-center gap-2">
            EV Solution
          </Link>
        </div>

        {/* Navigation Items */}
        <ul className="mt-8 flex-1 overflow-y-auto">
          {sidebarRoutes.map((route) =>
            route.routes ? (
              <SidebarSubMenu key={route.name} route={route} pathname={pathname} onCloseMobile={onCloseMobile} />
            ) : (
              <li className="relative" key={route.name}>
                <Link
                  href={route.path || "#"}
                  onClick={onCloseMobile}
                  className={cn(
                    "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-gray-200",
                    isRouteActive(route.path!) ? "text-emerald-600 dark:text-emerald-500" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {isRouteActive(route.path!) && (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  )}
                  {route.icon && <route.icon className="w-5 h-5" aria-hidden="true" />}
                  <span className="ml-4">{route.name}</span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Bottom User / Logout Card */}
        <span className="px-6 py-6 w-64 mx-auto relative mt-3 block">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer"
          >
            <LogOut className="text-lg" />
            <span>Log Out</span>
          </button>
        </span>
      </aside>
    </>
  );
}

function SidebarSubMenu({ route, pathname, onCloseMobile }: { route: any, pathname: string, onCloseMobile?: () => void }) {
  const isActiveGroup = route.routes.some((r: any) => pathname.startsWith(r.path));
  const [open, setOpen] = useState(isActiveGroup);

  return (
    <li className="relative px-6 py-3" key={route.name}>
      <button
        className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-600 dark:hover:text-gray-200 text-gray-500 dark:text-gray-400"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          {route.icon && <route.icon className="w-5 h-5" aria-hidden="true" />}
          <span className="ml-4 mt-1">{route.name}</span>
        </span>
        <span className="pl-4 mt-1">
          {open ? <ChevronDown /> : <ChevronRight />}
        </span>
      </button>

      {open && (
        <ul
          className="p-2 mt-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md dark:text-gray-400 dark:bg-gray-900 bg-gray-50/50"
          aria-label="submenu"
        >
          {route.routes.map((child: any, i: number) => (
            <li key={i + 1}>
              {child.outside ? (
                <a
                  href={child.path}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "flex items-center font-serif py-1 text-sm cursor-pointer hover:text-emerald-600 dark:hover:text-gray-200 transition-colors",
                    "text-gray-500"
                  )}
                >
                  <span className="text-xs text-gray-500 pr-1">
                    <Minus className="w-3 h-3" />
                  </span>
                  <span>{child.name}</span>
                </a>
              ) : (
                <Link
                  href={child.path}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center font-serif py-1 text-sm cursor-pointer hover:text-emerald-600 dark:hover:text-gray-200 transition-colors relative",
                    pathname.startsWith(child.path) ? "text-emerald-600 dark:text-emerald-500 font-semibold" : "text-gray-500"
                  )}
                >
                  {pathname.startsWith(child.path) && (
                     <span
                       className="absolute inset-y-0 -left-8 w-1 bg-emerald-600 rounded-tr-lg rounded-br-lg"
                       aria-hidden="true"
                     ></span>
                  )}
                  <span className="text-xs text-gray-500 pr-1">
                    <Minus className="w-3 h-3" />
                  </span>
                  <span>{child.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
