"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { adminFetch } from "@/lib/admin-api";
import Link from "next/link";
import {
  Bell,
  Package,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Clock,
  Eye,
  RefreshCw,
  X,
  MailCheck,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NotificationItem {
  id: string;
  type: "order" | "stock" | "system";
  title: string;
  message: string;
  time: string;
  link: string;
  is_read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      const notifs: NotificationItem[] = [];

      // 1. Fetch pending orders (via admin API — anon RLS blocks direct reads)
      try {
        const { orders } = await adminFetch<{ orders: any[] }>(
          "/api/admin/orders?limit=200"
        );
        (orders || [])
          .filter((o) => (o.status || "").toLowerCase() === "pending")
          .slice(0, 10)
          .forEach((o) => {
            notifs.push({
              id: `ord-${o.id}`,
              type: "order",
              title: `New Order Placed: #${o.id.slice(0, 8)}`,
              message: `${o.customer_name || "Customer"} ordered ${(o.order_items || []).length} item(s) totaling ৳${(Number(o.total) || 0).toLocaleString()}`,
              time: o.created_at,
              link: `/admin/orders/${o.id}`,
              is_read: false,
            });
          });
      } catch (e) {
        console.error("notifications: orders fetch failed", e);
      }

      if (supabase) {
        // 2. Fetch low stock items (public product reads are allowed)
        const { data: lowStock } = await supabase
          .from("products")
          .select("id, name, stock_quantity")
          .lte("stock_quantity", 5)
          .limit(5);

        (lowStock || []).forEach((p) => {
          notifs.push({
            id: `stk-${p.id}`,
            type: "stock",
            title: `Low Stock Alert: ${p.name}`,
            message: `Only ${p.stock_quantity} units remaining in warehouse inventory.`,
            time: new Date().toISOString(),
            link: "/admin/products",
            is_read: false,
          });
        });
      }

      setNotifications(notifs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    toast.success("All notifications marked as read.");
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed.");
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time notifications for incoming orders, critical stock, and system alerts
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <MailCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            filter === "all"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-stone-900 text-stone-600 border border-stone-200 dark:border-stone-800"
          )}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            filter === "unread"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-stone-900 text-stone-600 border border-stone-200 dark:border-stone-800"
          )}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            filter === "read"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-stone-900 text-stone-600 border border-stone-200 dark:border-stone-800"
          )}
        >
          Read ({notifications.length - unreadCount})
        </button>
      </div>

      {/* ── Notifications List Card ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-stone-400 text-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="font-bold text-sm text-stone-700 dark:text-stone-300">All caught up!</p>
            <p className="text-[11px] mt-1">No unread notifications at this time.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors",
                !item.is_read && "bg-emerald-50/20 dark:bg-emerald-950/10"
              )}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5",
                    item.type === "order"
                      ? "bg-amber-100 text-amber-600"
                      : item.type === "stock"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-blue-100 text-blue-600"
                  )}
                >
                  {item.type === "order" ? (
                    <Package className="w-5 h-5" />
                  ) : item.type === "stock" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    {!item.is_read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.time).toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={item.link}
                  onClick={() => handleMarkAsRead(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
