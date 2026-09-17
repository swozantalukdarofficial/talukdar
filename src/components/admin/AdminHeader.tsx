"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AdminHeaderProps {
  onToggleMobile: () => void;
}

export default function AdminHeader({ onToggleMobile }: AdminHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);

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

  return (
    <header className="z-40 py-4 bg-white shadow-sm dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-emerald-500 dark:text-emerald-500">
        
        {/* Mobile hamburger */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={onToggleMobile}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Search Input (Placeholder for styling) */}
        <div className="flex justify-center flex-1 lg:mr-32">
           <div className="relative w-full max-w-xl mr-6 focus-within:text-emerald-500">
              {/* Optional Search bar here similar to Kachabazar */}
           </div>
        </div>

        {/* Right side icons */}
        <ul className="flex items-center flex-shrink-0 space-x-6 text-gray-500 dark:text-gray-400">
          
          {/* Notifications */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              {/* Notification badge */}
              {pendingOrders.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              )}
            </button>
          </li>

          {/* Profile Menu Placeholder */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 font-bold">
                 AD
              </div>
            </button>
          </li>

        </ul>
      </div>
    </header>
  );
}
