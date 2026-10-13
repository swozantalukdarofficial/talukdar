"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import CommandPalette from "./CommandPalette";
import MobileBottomNav from "./MobileBottomNav";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Lock body scroll while the mobile sidebar drawer is open so the
  // page doesn't scroll behind the dimmed drawer.
  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen bg-stone-100 dark:bg-stone-950 overflow-hidden font-sans text-stone-900 dark:text-stone-100">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <AdminHeader onToggleMobile={() => setMobileSidebarOpen(true)} />
        <main className="h-full overflow-y-auto">
          <div className="mx-auto px-4 pt-6 pb-24 md:pb-8 sm:px-6 lg:px-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Global admin utilities */}
      <CommandPalette />
      <MobileBottomNav />
    </div>
  );
}
