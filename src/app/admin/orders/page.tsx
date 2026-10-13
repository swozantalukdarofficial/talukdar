"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import {
  Loader2,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Search,
  Eye,
  X,
  User,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Trash2,
  Printer,
  RefreshCw,
  Filter,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import InvoiceModal from "@/components/admin/InvoiceModal";

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  shipping_address: any;
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  notes: string;
  created_at: string;
  order_items: any[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState("processing");
  const [bulkWorking, setBulkWorking] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  // Status Tab
  const [statusTab, setStatusTab] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchOrders();

    // Realtime postgres_changes can't reach the anon client (RLS), so poll
    // every 30s for new orders while the page is open.
    const timer = setInterval(fetchOrders, 30000);
    return () => clearInterval(timer);
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { orders } = await adminFetch<{ orders: Order[] }>(
        "/api/admin/orders?limit=200"
      );
      setOrders(orders || []);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { order } = await adminFetch<{ order: Order }>(
        `/api/admin/orders/${orderId}`,
        { method: "PATCH", body: JSON.stringify({ status: newStatus }) }
      );

      toast.success(`Order #${orderId.slice(0, 8)} status updated to ${newStatus}!`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...order, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err: any) {
      toast.error("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm(`Are you sure you want to delete order #${orderId.slice(0, 8)}?`)) return;

    try {
      await adminFetch(`/api/admin/orders/${orderId}`, { method: "DELETE" });
      toast.success("Order deleted successfully.");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
    } catch (err: any) {
      toast.error("Failed to delete order: " + err.message);
    }
  };

  // ── Bulk actions ──
  const toggleSelect = (orderId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  };

  const toggleSelectPage = () => {
    const pageIds = paginatedOrders.map((o) => o.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) pageIds.forEach((id) => next.delete(id));
      else pageIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleBulkStatus = async () => {
    if (selectedIds.size === 0) return;
    setBulkWorking(true);
    try {
      const { updated } = await adminFetch<{ updated: number }>(
        "/api/admin/orders/bulk",
        {
          method: "PATCH",
          body: JSON.stringify({ ids: [...selectedIds], status: bulkStatus }),
        }
      );
      toast.success(`${updated} order(s) marked as ${bulkStatus}!`);
      setOrders((prev) =>
        prev.map((o) =>
          selectedIds.has(o.id) ? { ...o, status: bulkStatus } : o
        )
      );
      setSelectedIds(new Set());
    } catch (err: any) {
      toast.error("Bulk update failed: " + err.message);
    } finally {
      setBulkWorking(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setBulkWorking(true);
    try {
      await adminFetch("/api/admin/orders/bulk", {
        method: "DELETE",
        body: JSON.stringify({ ids: [...selectedIds] }),
      });
      toast.success(`${selectedIds.size} order(s) deleted.`);
      setOrders((prev) => prev.filter((o) => !selectedIds.has(o.id)));
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
    } catch (err: any) {
      toast.error("Bulk delete failed: " + err.message);
    } finally {
      setBulkWorking(false);
    }
  };

  // ── Filter Calculations ──
  const pendingCount = orders.filter((o) => (o.status || "").toLowerCase() === "pending").length;
  const processingCount = orders.filter((o) => (o.status || "").toLowerCase() === "processing").length;
  const deliveredCount = orders.filter((o) => ["delivered", "completed"].includes((o.status || "").toLowerCase())).length;
  const cancelledCount = orders.filter((o) => (o.status || "").toLowerCase() === "cancelled").length;

  const filteredOrders = orders.filter((order) => {
    const s = (order.status || "").toLowerCase();

    // Tab filter
    if (statusTab === "pending" && s !== "pending") return false;
    if (statusTab === "processing" && s !== "processing") return false;
    if (statusTab === "delivered" && !["delivered", "completed"].includes(s)) return false;
    if (statusTab === "cancelled" && s !== "cancelled") return false;

    // Payment Filter
    if (paymentFilter !== "all" && (order.payment_method || "").toLowerCase() !== paymentFilter) {
      return false;
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = (order.customer_name || "").toLowerCase().includes(q);
      const matchPhone = (order.customer_phone || "").toLowerCase().includes(q);
      const matchEmail = (order.customer_email || "").toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchEmail) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Customer Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track, process, and print invoices for all customer purchases
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className={cn("w-4 h-4 text-emerald-600", loading && "animate-spin")} />
          <span>Sync Orders</span>
        </button>
      </div>

      {/* ── Kachabazar Status Navigation Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {[
          { id: "all", label: "All Orders", count: orders.length, color: "text-stone-600" },
          { id: "pending", label: "Pending", count: pendingCount, color: "text-amber-600" },
          { id: "processing", label: "Processing", count: processingCount, color: "text-blue-600" },
          { id: "delivered", label: "Delivered", count: deliveredCount, color: "text-emerald-600" },
          { id: "cancelled", label: "Cancelled", count: cancelledCount, color: "text-rose-600" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setStatusTab(tab.id);
              setCurrentPage(1);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
              statusTab === tab.id
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50"
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-extrabold",
                statusTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Filter Card ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, email, or order ID..."
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

        {/* Payment Method */}
        <div>
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2.5 px-3 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="all">All Payment Methods</option>
            <option value="cod">Cash On Delivery (COD)</option>
            <option value="bkash">bKash Payment</option>
            <option value="nagad">Nagad Payment</option>
            <option value="card">Card Payment</option>
          </select>
        </div>
      </div>

      {/* ── Bulk Action Bar (appears when orders are selected) ── */}
      {selectedIds.size > 0 && (
        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 flex flex-col sm:flex-row sm:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="text-xs font-extrabold flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            {selectedIds.size} order{selectedIds.size === 1 ? "" : "s"} selected
          </span>

          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:justify-end">
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
              disabled={bulkWorking}
              className="py-2 px-3 text-xs font-bold bg-white/15 border border-white/25 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer disabled:opacity-50 [&>option]:text-stone-900"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={handleBulkStatus}
              disabled={bulkWorking}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-700 text-xs font-extrabold hover:bg-emerald-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {bulkWorking ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Apply Status
            </button>

            <button
              onClick={() => setBulkDeleteOpen(true)}
              disabled={bulkWorking}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-500/90 text-white text-xs font-extrabold hover:bg-rose-500 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected
            </button>

            <button
              onClick={() => setSelectedIds(new Set())}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* ── Orders Table Card ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-xs font-semibold">Loading customer orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-16 text-center text-stone-400 text-xs">
            <Package className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-bold text-sm text-stone-600 dark:text-stone-300">No orders found</p>
            <p className="text-[11px] mt-1">Try switching status tabs or clear search filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 pl-4 pr-1 w-10">
                    <button
                      onClick={toggleSelectPage}
                      title={paginatedOrders.every((o) => selectedIds.has(o.id)) ? "Deselect page" : "Select page"}
                      className="text-stone-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      {paginatedOrders.length > 0 &&
                      paginatedOrders.every((o) => selectedIds.has(o.id)) ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3.5 px-4">Invoice No</th>
                  <th className="py-3.5 px-4">Order Time</th>
                  <th className="py-3.5 px-4">Customer Info</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status Selector</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {paginatedOrders.map((order) => {
                  const status = (order.status || "pending").toLowerCase();
                  const isUpdating = updatingId === order.id;

                  return (
                    <tr
                      key={order.id}
                      className={cn(
                        "hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors",
                        selectedIds.has(order.id) && "bg-emerald-50/50 dark:bg-emerald-950/20"
                      )}
                    >
                      {/* Select checkbox */}
                      <td className="py-3.5 pl-4 pr-1">
                        <button
                          onClick={() => toggleSelect(order.id)}
                          title={selectedIds.has(order.id) ? "Deselect" : "Select"}
                          className="text-stone-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        >
                          {selectedIds.has(order.id) ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Invoice ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 dark:text-stone-100">
                        #{order.id.slice(0, 8)}
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 dark:text-stone-100">
                          {order.customer_name || "Guest Customer"}
                        </div>
                        <div className="text-[10px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{order.customer_phone || "N/A"}</span>
                        </div>
                      </td>

                      {/* Method */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          {order.payment_method || "COD"}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-extrabold text-stone-900 dark:text-stone-100">
                        ৳{(Number(order.total) || 0).toLocaleString()}
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4">
                        <div className="relative inline-flex items-center">
                          <select
                            value={status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            disabled={isUpdating}
                            className={cn(
                              "text-xs font-extrabold py-1 pl-2.5 pr-7 rounded-lg appearance-none cursor-pointer border transition-colors disabled:opacity-50",
                              status === "delivered" || status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : status === "processing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : status === "cancelled"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            )}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <div className="absolute right-2 pointer-events-none text-stone-400">
                            {isUpdating ? (
                              <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                            ) : (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setInvoiceOrder(order)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Print Invoice"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="View Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && filteredOrders.length > 0 && (
          <div className="p-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 disabled:opacity-40"
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
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-50 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Order Details Slide-Over / Modal ── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-stone-900 h-full overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <div>
                <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                  Order Details
                </h3>
                <p className="text-xs text-stone-400 font-mono">
                  Invoice #{selectedOrder.id.slice(0, 8)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInvoiceOrder(selectedOrder)}
                  className="p-2 rounded-xl text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              {/* Status Update Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                    Order Status
                  </span>
                  <p className="font-extrabold text-sm text-emerald-900 dark:text-emerald-100 capitalize">
                    {selectedOrder.status || "Pending"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {["pending", "processing", "delivered", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-extrabold capitalize transition-colors",
                        selectedOrder.status === st
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer & Address */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-3">
                <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Customer & Shipping Info</span>
                </h4>
                <div className="space-y-1 text-stone-600 dark:text-stone-300">
                  <p><strong>Name:</strong> {selectedOrder.customer_name || "Guest"}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer_phone || "N/A"}</p>
                  {selectedOrder.customer_email && <p><strong>Email:</strong> {selectedOrder.customer_email}</p>}
                  <p><strong>Address:</strong> {selectedOrder.shipping_address?.street || selectedOrder.shipping_address?.address || "N/A"}</p>
                  <p><strong>District/City:</strong> {selectedOrder.shipping_address?.city || selectedOrder.shipping_address?.district || "Dhaka"}</p>
                  {selectedOrder.notes && (
                    <p className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 mt-2">
                      <strong>Customer Note:</strong> {selectedOrder.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Ordered Items</span>
                </h4>

                <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden">
                  {(selectedOrder.order_items || []).map((item: any, idx: number) => {
                    const price = Number(item.price) || 0;
                    const qty = Number(item.quantity) || 1;
                    return (
                      <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white dark:bg-stone-900">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-stone-900 dark:text-white truncate">
                            {item.name || item.title || "Product"}
                          </p>
                          <p className="text-[11px] text-stone-400">
                            ৳{price.toLocaleString()} × {qty}
                          </p>
                        </div>
                        <span className="font-extrabold text-stone-900 dark:text-white">
                          ৳{(price * qty).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-2">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal:</span>
                  <span className="font-bold text-stone-900 dark:text-white">
                    ৳{((Number(selectedOrder.total) || 0) - (Number(selectedOrder.shipping_fee) || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Charge:</span>
                  <span className="font-bold text-stone-900 dark:text-white">
                    ৳{(Number(selectedOrder.shipping_fee) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 dark:text-white pt-2 border-t border-stone-200">
                  <span>Grand Total:</span>
                  <span className="text-emerald-600">
                    ৳{(Number(selectedOrder.total) || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bulk Delete Confirmation (in-app) ── */}
      {bulkDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
              Delete {selectedIds.size} order{selectedIds.size === 1 ? "" : "s"}?
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              This permanently removes the selected orders and their line
              items. This cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-2 mt-5">
              <button
                onClick={() => setBulkDeleteOpen(false)}
                disabled={bulkWorking}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-bold disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={bulkWorking}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
              >
                {bulkWorking && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Printable Invoice Modal ── */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
