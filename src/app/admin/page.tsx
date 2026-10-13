import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  AlertTriangle,
  ArrowRight,
  Package,
  Layers,
  CreditCard,
  Eye,
  RefreshCw,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

// Asia/Dhaka is UTC+06:00 year-round (no daylight saving), so a fixed
// offset is correct for bucketing order dates into the store's local day.
const DHAKA_OFFSET_MS = 6 * 60 * 60 * 1000;

/** "2026-10-13T05:30:00Z" -> "2026-10-13" in Asia/Dhaka */
function toDhakaDateStr(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return new Date(d.getTime() + DHAKA_OFFSET_MS).toISOString().split("T")[0];
}

export default async function AdminDashboard() {
  let loadError = "";
  let prodCount = 0;
  let orderCount = 0;
  let totalRevenue = 0;
  let todayRevenue = 0;
  let yesterdayRevenue = 0;
  let thisMonthRevenue = 0;
  let lastMonthRevenue = 0;

  let todayCash = 0;
  let todayCard = 0;
  let yesterdayCash = 0;
  let yesterdayCard = 0;

  let pendingCount = 0;
  let pendingAmount = 0;
  let processingCount = 0;
  let deliveredCount = 0;
  let cancelledCount = 0;

  let customerCount = 0;
  let recentOrders: any[] = [];
  let lowStockProducts: any[] = [];
  let categoryDistribution: { name: string; count: number; percentage: number; color: string }[] = [];
  let dailyStats: { dateStr: string; label: string; revenue: number; orders: number }[] = [];
  let trend14: { dateStr: string; label: string; revenue: number; orders: number }[] = [];

  try {
    if (!supabase) {
      loadError = "Supabase is not configured — dashboard data is unavailable.";
    } else {
      // 1. Total Products & Category Breakdown
      // NOTE: capped at 500 — for larger catalogs move aggregation server-side.
      const { data: prodsData, count: pCount, error: prodsError } = await supabase
        .from("products")
        .select("id, category, name, stock_quantity, price", { count: "exact" })
        .limit(500);

      if (prodsError) throw prodsError;

      if (pCount !== null) prodCount = pCount;

      if (prodsData && prodsData.length > 0) {
        const catMap: Record<string, number> = {};
        prodsData.forEach((p) => {
          const c = p.category || "Uncategorized";
          catMap[c] = (catMap[c] || 0) + 1;
        });

        const colors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];
        const totalProds = prodsData.length;
        categoryDistribution = Object.entries(catMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count], i) => ({
            name: name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            count,
            percentage: Math.round((count / totalProds) * 100),
            color: colors[i % colors.length],
          }));
      }

      // 2. Orders summary
      // NOTE: capped at 2000 most recent — for larger volumes move
      // revenue aggregation into a server-side query.
      const { data: allOrders, error: ordersError } = await supabase
        .from("orders")
        .select("id, customer_name, customer_phone, customer_email, total, status, payment_method, created_at")
        .order("created_at", { ascending: false })
        .limit(2000);

      if (ordersError) throw ordersError;

      if (allOrders && allOrders.length > 0) {
        orderCount = allOrders.length;
        // Revenue counts only real sales — cancelled/refunded orders are excluded.
        const billableOrders = allOrders.filter(
          (o) =>
            !["cancelled", "refunded", "returned"].includes(
              (o.status || "pending").toLowerCase()
            )
        );
        totalRevenue = billableOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        const uniqueEmails = new Set(
          allOrders.map((o) => o.customer_email || o.customer_phone).filter(Boolean)
        );
        customerCount = uniqueEmails.size;

        // "Today" / "yesterday" / month buckets in Asia/Dhaka (the store's timezone)
        const dhakaNow = new Date(Date.now() + DHAKA_OFFSET_MS);
        const todayStr = dhakaNow.toISOString().split("T")[0];
        const yesterdayStr = new Date(dhakaNow.getTime() - 86400000)
          .toISOString()
          .split("T")[0];
        const currentYearMonth = todayStr.slice(0, 7);

        const lastMonthDate = new Date(dhakaNow);
        lastMonthDate.setUTCMonth(lastMonthDate.getUTCMonth() - 1);
        const lastYearMonth = lastMonthDate.toISOString().split("T")[0].slice(0, 7);

        allOrders.forEach((o) => {
          const total = Number(o.total) || 0;
          const status = (o.status || "pending").toLowerCase();
          const method = (o.payment_method || "cod").toLowerCase();
          const createdAt = o.created_at || "";
          const orderDay = toDhakaDateStr(createdAt);
          const isCancelled = status === "cancelled";

          // Status counts
          if (status === "pending") {
            pendingCount++;
            pendingAmount += total;
          } else if (status === "processing") {
            processingCount++;
          } else if (status === "delivered" || status === "completed") {
            deliveredCount++;
          } else if (isCancelled) {
            cancelledCount++;
          }

          // Date metrics & payment method breakdown (cancelled orders excluded)
          if (isCancelled || !orderDay) return;
          if (orderDay === todayStr) {
            todayRevenue += total;
            if (method === "cod") todayCash += total;
            else todayCard += total;
          }
          if (orderDay === yesterdayStr) {
            yesterdayRevenue += total;
            if (method === "cod") yesterdayCash += total;
            else yesterdayCard += total;
          }
          if (orderDay.slice(0, 7) === currentYearMonth) {
            thisMonthRevenue += total;
          }
          if (orderDay.slice(0, 7) === lastYearMonth) {
            lastMonthRevenue += total;
          }
        });

        // 7 Days Trend (Dhaka days, cancelled orders excluded)
        const last7DayStrs = Array.from({ length: 7 }, (_, i) => {
          return new Date(dhakaNow.getTime() - i * 86400000)
            .toISOString()
            .split("T")[0];
        }).reverse();

        dailyStats = last7DayStrs.map((dateStr) => {
          const label = new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          });
          const matched = billableOrders.filter(
            (o) => toDhakaDateStr(o.created_at || "") === dateStr
          );
          const rev = matched.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
          return {
            dateStr,
            label,
            revenue: rev,
            orders: matched.length,
          };
        });

        recentOrders = allOrders.slice(0, 8);

        // 14-day revenue trend for the SVG area chart
        // (Dhaka days, cancelled orders excluded)
        const last14DayStrs = Array.from({ length: 14 }, (_, i) => {
          return new Date(dhakaNow.getTime() - i * 86400000)
            .toISOString()
            .split("T")[0];
        }).reverse();

        trend14 = last14DayStrs.map((dateStr) => {
          const matched = billableOrders.filter(
            (o) => toDhakaDateStr(o.created_at || "") === dateStr
          );
          const rev = matched.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
          return {
            dateStr,
            label: new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }),
            revenue: rev,
            orders: matched.length,
          };
        });
      }

      // 3. Low stock products
      const { data: lowStock, error: lowStockError } = await supabase
        .from("products")
        .select("id, name, slug, stock_quantity, price, image_url, category")
        .lte("stock_quantity", 5)
        .order("stock_quantity", { ascending: true })
        .limit(5);

      if (lowStockError) throw lowStockError;
      if (lowStock) lowStockProducts = lowStock;
    }
  } catch (err) {
    console.error("Dashboard data load error:", err);
    loadError =
      err instanceof Error && err.message
        ? `Dashboard data failed to load: ${err.message}`
        : "Dashboard data failed to load. Please try refreshing the page.";
  }

  const maxRevenueDay = Math.max(...dailyStats.map((d) => d.revenue), 1000);

  // ── 14-day revenue area chart geometry (inline SVG, no deps) ──
  const CH = { w: 720, h: 230, padL: 52, padR: 10, padT: 14, padB: 30 };
  const trendMax = Math.max(...trend14.map((t) => t.revenue), 1);
  const trendTotal = trend14.reduce((s, t) => s + t.revenue, 0);
  const plotW = CH.w - CH.padL - CH.padR;
  const plotH = CH.h - CH.padT - CH.padB;
  const trendPts = trend14.map((t, i) => ({
    x: CH.padL + (trend14.length > 1 ? (i / (trend14.length - 1)) * plotW : plotW / 2),
    y: CH.padT + plotH * (1 - t.revenue / trendMax),
    ...t,
  }));
  const trendLine =
    trendPts.length > 0
      ? trendPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
      : "";
  const trendArea =
    trendPts.length > 0
      ? `${trendLine} L${trendPts[trendPts.length - 1].x.toFixed(1)},${CH.h - CH.padB} L${trendPts[0].x.toFixed(1)},${CH.h - CH.padB} Z`
      : "";
  const fmtCompact = (v: number) =>
    v >= 1000 ? `৳${Math.round(v / 1000)}k` : `৳${Math.round(v)}`;
  const yTicks = [0, 0.33, 0.66, 1].map((f) => ({
    v: trendMax * f,
    y: CH.padT + plotH * (1 - f),
  }));

  // Visible error state instead of silently rendering fake zeros
  if (loadError) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time sales analysis, order workflows, and catalog statistics
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
            Couldn't load dashboard data
          </h3>
          <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">{loadError}</p>
          <p className="text-xs text-stone-400 mt-1">
            Check your connection and Supabase configuration, then refresh the page.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Page Title & Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-2.5">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time sales analysis, order workflows, and catalog statistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/add"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-2xs"
          >
            <Package className="w-4 h-4 text-stone-500" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* ── Kachabazar 5-Column Hero Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {/* 1. Today Order (Teal-600) */}
        <div className="p-5 rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/15 flex flex-col justify-between min-h-[140px]">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-teal-100">Today Order</p>
            <p className="text-2xl font-black tracking-tight mt-0.5">
              ৳{todayRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-around text-[10px] font-medium text-teal-100/90 pt-3 border-t border-teal-500/40">
            <span>Cash: ৳{todayCash.toLocaleString()}</span>
            <span>Digital: ৳{todayCard.toLocaleString()}</span>
          </div>
        </div>

        {/* 2. Yesterday Order (Orange-500) */}
        <div className="p-5 rounded-2xl bg-orange-500 text-white shadow-md shadow-orange-500/15 flex flex-col justify-between min-h-[140px]">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-orange-100">Yesterday Order</p>
            <p className="text-2xl font-black tracking-tight mt-0.5">
              ৳{yesterdayRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-around text-[10px] font-medium text-orange-100/90 pt-3 border-t border-orange-400/40">
            <span>Cash: ৳{yesterdayCash.toLocaleString()}</span>
            <span>Digital: ৳{yesterdayCard.toLocaleString()}</span>
          </div>
        </div>

        {/* 3. This Month (Blue-500) */}
        <div className="p-5 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/15 flex flex-col justify-center text-center min-h-[140px]">
          <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-blue-100">This Month</p>
          <p className="text-2xl font-black tracking-tight mt-0.5">
            ৳{thisMonthRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-blue-200 mt-2">Current billing cycle</p>
        </div>

        {/* 4. Last Month (Cyan-700) */}
        <div className="p-5 rounded-2xl bg-cyan-700 text-white shadow-md shadow-cyan-700/15 flex flex-col justify-center text-center min-h-[140px]">
          <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
            <CreditCard className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-cyan-100">Last Month</p>
          <p className="text-2xl font-black tracking-tight mt-0.5">
            ৳{lastMonthRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-cyan-200 mt-2">Previous cycle total</p>
        </div>

        {/* 5. All Time Sales (Emerald-600) */}
        <div className="p-5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/15 flex flex-col justify-center text-center min-h-[140px]">
          <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-emerald-100">All Time Sales</p>
          <p className="text-2xl font-black tracking-tight mt-0.5">
            ৳{totalRevenue.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-200 mt-2">Gross cumulative sales</p>
        </div>
      </div>

      {/* ── Kachabazar 4 Order Status Overview Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Order (Orange) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Total Order</p>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-0.5">
              {orderCount}
            </p>
          </div>
        </div>

        {/* Orders Pending (Blue) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Orders Pending</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-blue-600">{pendingCount}</span>
              <span className="text-xs font-bold text-stone-400">
                (৳{pendingAmount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Orders Processing (Teal) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Orders Processing</p>
            <p className="text-2xl font-black text-teal-600 mt-0.5">
              {processingCount}
            </p>
          </div>
        </div>

        {/* Orders Delivered (Emerald) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Orders Delivered</p>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">
              {deliveredCount}
            </p>
          </div>
        </div>
      </div>

      {/* ── Revenue Trend — Last 14 Days (SVG area chart) ── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Revenue Trend</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Daily revenue over the last 14 days (cancelled orders excluded)
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-extrabold text-stone-900 dark:text-white">
              ৳{trendTotal.toLocaleString()}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              14-day total
            </div>
          </div>
        </div>

        {trend14.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-xs text-stone-400">
            No sales data yet
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${CH.w} ${CH.h}`}
              className="w-full h-56 min-w-[560px]"
              role="img"
              aria-label="Revenue per day for the last 14 days"
            >
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Y gridlines */}
              {yTicks.map((t, i) => (
                <g key={i}>
                  <line
                    x1={CH.padL}
                    x2={CH.w - CH.padR}
                    y1={t.y}
                    y2={t.y}
                    className="stroke-stone-200 dark:stroke-stone-800"
                    strokeWidth="1"
                    strokeDasharray={i === 0 ? "" : "4 4"}
                  />
                  <text
                    x={CH.padL - 8}
                    y={t.y + 3.5}
                    textAnchor="end"
                    className="fill-stone-400 text-[10px] font-semibold"
                  >
                    {fmtCompact(t.v)}
                  </text>
                </g>
              ))}

              {/* Area + line */}
              <path d={trendArea} fill="url(#trendFill)" />
              <path
                d={trendLine}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points with tooltips */}
              {trendPts.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    className="fill-emerald-500 stroke-white dark:stroke-stone-900"
                    strokeWidth="2"
                  >
                    <title>
                      {p.label}: ৳{p.revenue.toLocaleString()} ({p.orders} orders)
                    </title>
                  </circle>
                  {i % 2 === 0 && (
                    <text
                      x={p.x}
                      y={CH.h - 10}
                      textAnchor="middle"
                      className="fill-stone-400 text-[10px] font-semibold"
                    >
                      {p.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* ── Interactive Charts Row (Weekly Sales + Best Selling Categories) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Sales Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Weekly Sales Analytics</span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Daily sales performance over the past 7 days
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200/50">
              Updated on load
            </span>
          </div>

          <div className="h-60 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-stone-100 dark:border-stone-800">
            {dailyStats.map((stat, idx) => {
              const heightPct = Math.max(Math.round((stat.revenue / maxRevenueDay) * 100), 8);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] py-1 px-2 rounded-md font-bold whitespace-nowrap shadow-md pointer-events-none mb-1">
                    ৳{stat.revenue.toLocaleString()} ({stat.orders} ord)
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={cn(
                      "w-full max-w-[38px] rounded-t-xl transition-all duration-500 group-hover:scale-105",
                      stat.revenue > 0
                        ? "bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm shadow-emerald-500/20"
                        : "bg-stone-100 dark:bg-stone-800"
                    )}
                  />
                  <span className="text-[10px] font-bold text-stone-500 mt-1 truncate">
                    {stat.label.split(",")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
            <span>Catalog Items: <strong className="text-stone-700 dark:text-stone-200">{prodCount}</strong></span>
            <span>Registered Customers: <strong className="text-stone-700 dark:text-stone-200">{customerCount}</strong></span>
          </div>
        </div>

        {/* Best Selling Products / Categories Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-teal-600" />
                <span>Category Inventory Share</span>
              </h3>
              <span className="text-xs font-bold text-stone-400">
                Top Categories
              </span>
            </div>

            <div className="space-y-3.5 mt-4">
              {categoryDistribution.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </span>
                    <span className="font-extrabold text-stone-900 dark:text-white">
                      {cat.count} products ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
            <Link
              href="/admin/categories"
              className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Manage Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/products"
              className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              View Full Catalog
            </Link>
          </div>
        </div>
      </div>

      {/* ── Low Stock Alert ── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Low Stock Alert</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Products with 5 or fewer units remaining
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Manage Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              All stocked up
            </p>
            <p className="text-xs text-stone-400 mt-1">
              No products are running low right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {lowStockProducts.map((p) => {
              const stock = Number(p.stock_quantity) || 0;
              return (
                <Link
                  key={String(p.id)}
                  href="/admin/products"
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 hover:border-amber-300 transition-colors"
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {p.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                        stock === 0
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-800"
                      )}
                    >
                      {stock === 0 ? "Out of stock" : `${stock} left`}
                    </span>
                    <span className="text-[11px] font-bold text-stone-500">
                      ৳{(Number(p.price) || 0).toLocaleString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Recent Orders Table (Kachabazar TableContainer Style) ── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
              Recent Order
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Real-time feed of recent customer purchases
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All Orders ({orderCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-4">Invoice No</th>
                <th className="py-3 px-4">Order Time</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-400">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const status = (order.status || "pending").toLowerCase();
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        #{String(order.id).slice(0, 8)}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-stone-100">
                        {order.customer_name || "Guest Customer"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          {order.payment_method || "COD"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-stone-900 dark:text-stone-100">
                        ৳{(Number(order.total) || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[11px] font-extrabold inline-flex items-center gap-1",
                            status === "delivered" || status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : status === "processing"
                              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                              : status === "cancelled"
                              ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              status === "delivered" || status === "completed"
                                ? "bg-emerald-500"
                                : status === "processing"
                                ? "bg-blue-500"
                                : status === "cancelled"
                                ? "bg-rose-500"
                                : "bg-amber-500"
                            )}
                          />
                          {status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs font-bold text-emerald-600 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 inline-flex transition-colors"
                          title="View order"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
