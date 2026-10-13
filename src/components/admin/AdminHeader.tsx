"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

interface AdminHeaderProps {
  onToggleMobile: () => void;
}

export default function AdminHeader({ onToggleMobile }: AdminHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const notifRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    async function loadNotifications() {
      if (!supabase) return;
      const { data } = await supabase
        .from("orders")
        .select("id, customer_name, total, created_at, status")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) {
        setPendingOrders(data);
      }
    }

    loadNotifications();

    const channel = supabase
      ?.channel("admin-header-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => {
          loadNotifications();
        }
      )
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
  }, []);

  // Close the notifications dropdown on outside click / Escape
  useEffect(() => {
    if (!notificationsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [notificationsOpen]);

  return (
    <header className="z-40 py-3 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 mx-auto text-stone-500 dark:text-stone-400">

        {/* Mobile hamburger */}
        <button
          className="p-2.5 -ml-2 rounded-lg md:hidden text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={onToggleMobile}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Search trigger — opens the command palette (Ctrl+K) */}
        <div className="flex justify-center flex-1 lg:mr-32 min-w-0">
          <button
            onClick={openCommandPalette}
            className="hidden sm:flex items-center gap-3 w-full max-w-xl mr-6 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800/70 text-stone-400 dark:text-stone-500 text-sm hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Search admin (Ctrl+K)"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="flex-1 truncate">Search pages, actions…</span>
            <kbd className="text-[10px] font-bold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-1.5 py-0.5 rounded">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right side icons */}
        <ul className="flex items-center flex-shrink-0 space-x-1 sm:space-x-2">

          {/* Mobile search entry — the desktop pill is hidden on phones */}
          <li className="sm:hidden">
            <button
              onClick={openCommandPalette}
              className="p-2.5 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Search admin"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>
          </li>

          {/* Notifications */}
          <li className="relative" ref={notifRef}>
            <button
              className="relative p-2.5 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              aria-haspopup="true"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              {/* Notification badge */}
              {pendingOrders.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-1 inline-block w-2.5 h-2.5 bg-red-600 border-2 border-white rounded-full dark:border-stone-900"
                ></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Pending orders</p>
                  <Link
                    href="/admin/orders"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                {pendingOrders.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-stone-500 dark:text-stone-400 text-center">
                    No pending orders 🎉
                  </p>
                ) : (
                  <ul className="max-h-80 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                    {pendingOrders.map((o) => (
                      <li key={o.id}>
                        <Link
                          href={`/admin/orders/${o.id}`}
                          onClick={() => setNotificationsOpen(false)}
                          className="block px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
                        >
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {o.customer_name || "Guest"}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            ৳{Number(o.total || 0).toLocaleString()} ·{" "}
                            {o.created_at ? new Date(o.created_at).toLocaleDateString() : ""}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>

          {/* Profile */}
          <li>
            <Link
              href="/admin/profile"
              className="block p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="My profile"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                AD
              </div>
            </Link>
          </li>

        </ul>
      </div>
    </header>
  );
}
