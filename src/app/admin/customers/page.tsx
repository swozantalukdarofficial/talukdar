"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Search,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
  Eye,
  Loader2,
  X,
  Package,
  CheckCircle2,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CustomerAggregated {
  id: string; // phone or email
  name: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  orders: any[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerAggregated[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAggregated | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      if (!supabase) return;

      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group orders by phone or email
      const map: Record<string, CustomerAggregated> = {};

      (ordersData || []).forEach((order) => {
        const key = (order.customer_phone || order.customer_email || order.customer_name || "guest").trim();
        if (!key) return;

        const total = Number(order.total) || 0;
        const addr = order.shipping_address?.street || order.shipping_address?.address || order.shipping_address?.city || "";

        if (!map[key]) {
          map[key] = {
            id: key,
            name: order.customer_name || "Guest Customer",
            phone: order.customer_phone || "",
            email: order.customer_email || "",
            address: addr,
            totalOrders: 0,
            totalSpent: 0,
            lastOrderDate: order.created_at || "",
            orders: [],
          };
        }

        map[key].totalOrders += 1;
        map[key].totalSpent += total;
        map[key].orders.push(order);
        if (!map[key].name && order.customer_name) map[key].name = order.customer_name;
        if (!map[key].phone && order.customer_phone) map[key].phone = order.customer_phone;
        if (!map[key].email && order.customer_email) map[key].email = order.customer_email;
        if (!map[key].address && addr) map[key].address = addr;
      });

      const list = Object.values(map).sort((a, b) => b.totalSpent - a.totalSpent);
      setCustomers(list);
    } catch (err: any) {
      console.error("Error fetching customers:", err);
      toast.error("Failed to load customer list");
    } finally {
      setLoading(false);
    }
  }

  const handleExportCSV = () => {
    if (customers.length === 0) return;

    const headers = ["Name", "Phone", "Email", "Address", "Total Orders", "Total Spent (BDT)", "Last Order Date"];
    const rows = customers.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.address.replace(/"/g, '""')}"`,
      c.totalOrders,
      c.totalSpent,
      c.lastOrderDate,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ev_customers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Customer list exported to CSV!");
  };

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            View customer order histories, lifetime spend (LTV), and contact profiles
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchCustomers}
            className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 hover:text-emerald-600 shadow-2xs transition-colors cursor-pointer"
            title="Refresh Customers"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin text-emerald-600")} />
          </button>
        </div>
      </div>

      {/* ── Top Summary Metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Total Unique Customers</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white">{customers.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Total Customer Spend</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white">৳{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-400">Average Spend / Customer</p>
            <p className="text-xl font-extrabold text-stone-900 dark:text-white">
              ৳{customers.length > 0 ? Math.round(totalRevenue / customers.length).toLocaleString() : 0}
            </p>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, email, or address..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Customers Table ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold">Loading customer records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-stone-400 text-xs">
            <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-bold text-sm text-stone-600 dark:text-stone-300">No customers found</p>
            <p className="text-[11px] mt-1">Customers will automatically appear here as new orders are placed</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Shipping Location</th>
                  <th className="py-3.5 px-4 text-center">Orders</th>
                  <th className="py-3.5 px-4 text-right">Total Spent (LTV)</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {paginated.map((customer, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          {customer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-stone-900 dark:text-white">
                          {customer.name}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300 font-medium">
                      {customer.phone || "N/A"}
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-stone-500">
                      {customer.email || "N/A"}
                    </td>

                    {/* Address */}
                    <td className="py-3.5 px-4 text-stone-500 max-w-xs truncate">
                      {customer.address || "Dhaka, Bangladesh"}
                    </td>

                    {/* Orders Count */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 inline-block">
                        {customer.totalOrders} {customer.totalOrders === 1 ? "Order" : "Orders"}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      ৳{customer.totalSpent.toLocaleString()}
                    </td>

                    {/* View Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="View Customer Order History"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && filtered.length > 0 && (
          <div className="p-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} customers
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 hover:bg-stone-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg font-bold transition-colors",
                    currentPage === pageNum
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 hover:bg-stone-50 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Customer Order History Slide-over Drawer ── */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 h-full overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {selectedCustomer.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {selectedCustomer.phone || selectedCustomer.email || "Customer Profile"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              {/* Lifetime Stat Card */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                    Total Purchases
                  </span>
                  <p className="text-lg font-black text-emerald-900 dark:text-emerald-100">
                    ৳{selectedCustomer.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                    Completed Orders
                  </span>
                  <p className="text-lg font-black text-emerald-900 dark:text-emerald-100">
                    {selectedCustomer.totalOrders}
                  </p>
                </div>
              </div>

              {/* Order History Timeline */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Order History</span>
                </h4>

                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
                  {selectedCustomer.orders.map((o) => (
                    <div key={o.id} className="p-3.5 bg-white dark:bg-stone-900 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-stone-900 dark:text-stone-100">
                          #{o.id.slice(0, 8)}
                        </span>
                        <span className="font-extrabold text-emerald-600">
                          ৳{(Number(o.total) || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                        <span>
                          {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="capitalize font-bold text-stone-600 dark:text-stone-300">
                          Status: {o.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
