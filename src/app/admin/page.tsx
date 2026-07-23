import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, DollarSign, Users, Clock, CheckCircle, Truck, AlertCircle, AlertTriangle, TrendingUp } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let prodCount = 0;
  let orderCount = 0;
  let totalRevenue = 0;
  let activeCustomers = 0;
  let recentOrders: any[] = [];
  let lowStockProducts: any[] = [];
  let errorMsg = null;
  let dailyStats: { dateStr: string; label: string; revenue: number; count: number }[] = [];

  try {
    if (supabase) {
      // 1. Fetch total products count
      const { count, error: prodErr } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });
      if (!prodErr && count !== null) {
        prodCount = count;
      }

      // 2. Fetch all orders for stats & charts
      const { data: orders, error: orderErr } = await supabase
        .from("orders")
        .select("total, customer_email, created_at");
      
      if (!orderErr && orders) {
        orderCount = orders.length;
        totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        
        const uniqueEmails = new Set(orders.map(o => o.customer_email).filter(Boolean));
        activeCustomers = uniqueEmails.size;

        // Calculate 7 Days Trend
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();

        dailyStats = last7Days.map(dateObj => {
          const dateStr = dateObj.toISOString().split("T")[0];
          const label = dateObj.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
          
          // Match orders created on this local/UTC day prefix
          const dayOrders = orders.filter(o => o.created_at && o.created_at.startsWith(dateStr));
          const revenue = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
          const count = dayOrders.length;
          
          return { dateStr, label, revenue, count };
        });
      }

      // 3. Fetch top 5 recent orders for activity log
      const { data: recents, error: recentsErr } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!recentsErr && recents) {
        recentOrders = recents;
      }

      // 4. Fetch low stock products (stock <= 5)
      const { data: lowStock, error: lowStockErr } = await supabase
        .from("products")
        .select("id, name, slug, stock_quantity, price")
        .lte("stock_quantity", 5)
        .order("stock_quantity", { ascending: true })
        .limit(5);

      if (!lowStockErr && lowStock) {
        lowStockProducts = lowStock;
      }
    } else {
      errorMsg = "Supabase configuration missing.";
    }
  } catch (err: any) {
    console.error("Dashboard error:", err);
    errorMsg = err.message || "An unexpected error occurred.";
  }

  const maxRevenue = Math.max(...dailyStats.map(d => d.revenue), 1);

  const stats = [
    {
      label: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString("en-BD")}`,
      icon: <DollarSign className="w-6 h-6 text-emerald-650" />,
      color: "bg-emerald-50 border-emerald-100",
      description: "Lifetime store earnings",
    },
    {
      label: "Total Orders",
      value: orderCount.toString(),
      icon: <Package className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-100",
      description: "Placed by customers",
    },
    {
      label: "Total Products",
      value: prodCount.toString(),
      icon: <ShoppingBag className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-50 border-orange-100",
      description: "Items in active inventory",
    },
    {
      label: "Active Customers",
      value: activeCustomers.toString(),
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-100",
      description: "Unique buyers list",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-stone-500 mt-1">Real-time storefront metrics directly from database.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 bg-white border border-stone-200 px-4 py-2.5 rounded-xl shadow-sm">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          Live Connection Stable
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-sm font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
            <div className={`p-3 rounded-xl ${stat.color} border shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-extrabold text-stone-900 mt-1">{stat.value}</p>
              <p className="text-[11px] text-stone-400 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Layout for Charts, Low Stock, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Sales Trend and Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Sales Trend Chart */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  7-Day Sales Performance
                </h2>
                <p className="text-xs text-stone-450">Daily revenue chart comparison</p>
              </div>
            </div>

            {/* Light CSS Bar Chart */}
            <div className="h-64 flex items-end gap-2 sm:gap-6 pt-4 border-b border-stone-200/80">
              {dailyStats.map((day, idx) => {
                const heightPercentage = Math.max(8, Math.round((day.revenue / maxRevenue) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 bg-stone-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-10 whitespace-nowrap">
                      ৳{day.revenue.toLocaleString("en-BD")} ({day.count} orders)
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full bg-stone-100 border border-stone-200/60 rounded-t-lg group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300 relative cursor-pointer"
                      style={{ height: `${heightPercentage}%` }}
                    >
                      {day.revenue > 0 && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-stone-600 group-hover:text-white hidden sm:block">
                          ৳{day.revenue > 1000 ? `${(day.revenue / 1000).toFixed(0)}k` : day.revenue}
                        </div>
                      )}
                    </div>
                    {/* X Axis Label */}
                    <span className="text-[10px] font-bold text-stone-500 mt-2 text-center truncate w-full">
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders / Activity Stream */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">Recent Customer Activity</h2>
              <Link href="/admin/orders" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
                View All Orders
              </Link>
            </div>
            
            <div className="divide-y divide-stone-100 flex-1">
              {recentOrders.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center p-6">
                  <span className="text-4xl mb-4">🛒</span>
                  <p className="text-stone-400 font-medium">No customer orders placed yet.</p>
                  <p className="text-stone-400 text-xs max-w-xs mt-1">When customers place orders, they will show up here instantly.</p>
                </div>
              ) : (
                recentOrders.map((order) => {
                  const statusColors = 
                    order.status === "pending" ? "bg-amber-100 text-amber-850" :
                    order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                    order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                    order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                    "bg-stone-100 text-stone-800";

                  return (
                    <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-stone-50/30 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{order.customer_name}</span>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="font-mono text-xs text-stone-500">#{order.id.slice(0, 8)}</span>
                        </div>
                        <div className="text-xs text-stone-500">
                          {order.customer_phone} | {new Date(order.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-extrabold text-stone-900">৳{order.total.toLocaleString("en-BD")}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Alerts */}
        <div className="space-y-8">
          
          {/* Quick Operations */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-base font-bold text-stone-900">Quick Operations</h2>
              <p className="text-xs text-stone-400 mt-1">Common administrative actions.</p>
            </div>

            <div className="space-y-3">
              <Link 
                href="/admin/products/add" 
                className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-100 hover:bg-stone-100/60 rounded-xl transition-all font-bold text-stone-700 text-xs uppercase tracking-wider"
              >
                <span>Add New Product</span>
                <span className="text-stone-400">→</span>
              </Link>
              <Link 
                href="/admin/orders" 
                className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-100 hover:bg-stone-100/60 rounded-xl transition-all font-bold text-stone-700 text-xs uppercase tracking-wider"
              >
                <span>Check Pending Deliveries</span>
                <span className="text-stone-400">→</span>
              </Link>
              <Link 
                href="/" 
                className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-100 hover:bg-stone-100/60 rounded-xl transition-all font-bold text-stone-700 text-xs uppercase tracking-wider"
              >
                <span>Go to Front Store</span>
                <span className="text-stone-400">→</span>
              </Link>
            </div>
          </div>

          {/* Low Stock Warnings Widget */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Inventory Alerts
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">Products with low inventory (≤ 5)</p>
              </div>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {lowStockProducts.length} Alert{lowStockProducts.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="space-y-3.5">
              {lowStockProducts.length === 0 ? (
                <div className="py-6 text-center text-stone-405 text-xs font-semibold">
                  ✅ All product inventories are healthy!
                </div>
              ) : (
                lowStockProducts.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between gap-3 text-xs bg-stone-50 border border-stone-100 p-3 rounded-xl hover:bg-stone-100/30 transition-all">
                    <div className="min-w-0">
                      <Link href={`/admin/products/edit/${prod.id}`} className="font-bold text-stone-900 hover:underline truncate block">
                        {prod.name}
                      </Link>
                      <p className="text-[10px] text-stone-450 font-semibold mt-0.5">Price: ৳{prod.price.toLocaleString("en-BD")}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider shrink-0 ${
                      prod.stock_quantity === 0 
                        ? "bg-rose-100 text-rose-800" 
                        : "bg-amber-105 text-amber-900 bg-amber-50 border border-amber-200/50"
                    }`}>
                      {prod.stock_quantity} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
