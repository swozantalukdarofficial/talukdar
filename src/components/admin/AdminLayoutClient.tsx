"use client";

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <AdminHeader onToggleMobile={() => setMobileSidebarOpen(true)} />
        <main className="h-full overflow-y-auto">
          <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto pt-8 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
