"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Package, CheckCircle, Clock, Truck, Search, Eye, X, User, Phone, MapPin, CreditCard, Calendar, FileText, Trash2, Printer, CheckSquare, Square, ShieldCheck, RefreshCw, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Advanced Filter states
  const [dateFilter, setDateFilter] = useState("all");
  const [statusTab, setStatusTab] = useState("all");

  // Selection states for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkUpdating, setBulkUpdating] = useState(false);

  // Private note edit state in modal
  const [noteEditVal, setNoteEditVal] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      ?.channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      channel?.unsubscribe();
    };
  }, []);

  // Update noteEditVal when selectedOrder changes
  useEffect(() => {
    if (selectedOrder) {
      setNoteEditVal(selectedOrder.notes || "");
    }
  }, [selectedOrder]);

  async function fetchOrders() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
      if (selectedOrder) {
        const updated = data.find((o: Order) => o.id === selectedOrder.id);
        if (updated) setSelectedOrder(updated);
      }
    }
    setLoading(false);
  }

  async function deleteOrder(orderId: string) {
    if (!supabase) return;
    setDeletingId(orderId);
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to delete order: " + error.message);
    } else {
      toast.success("Order deleted successfully!");
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
      setProductsAfterDeletion(orderId);
    }
    setDeletingId(null);
  }

  function setProductsAfterDeletion(orderId: string) {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setSelectedIds((prev) => prev.filter((id) => id !== orderId));
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    if (!supabase) return;
    setUpdatingStatus(true);
    
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update status: " + error.message);
    } else {
      toast.success(`Status updated to "${newStatus}"!`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    }
    setUpdatingStatus(false);
  }

  async function updatePaymentStatus(orderId: string, newPaymentStatus: string) {
    if (!supabase) return;
    setUpdatingStatus(true);

    const { error } = await supabase
      .from("orders")
      .update({ payment_status: newPaymentStatus })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update payment: " + error.message);
    } else {
      toast.success("Payment status updated!");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: newPaymentStatus } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, payment_status: newPaymentStatus } : null);
      }
    }
    setUpdatingStatus(false);
  }

  // Save private internal note
  async function handleSaveNote() {
    if (!selectedOrder || !supabase) return;
    setSavingNote(true);

    const { error } = await supabase
      .from("orders")
      .update({ notes: noteEditVal })
      .eq("id", selectedOrder.id);

    if (error) {
      toast.error("Failed to save note: " + error.message);
    } else {
      toast.success("Order note updated successfully!");
      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? { ...o, notes: noteEditVal } : o))
      );
      setSelectedOrder((prev) => prev ? { ...prev, notes: noteEditVal } : null);
    }
    setSavingNote(false);
  }

  // Bulk Actions
  async function handleBulkStatusChange(newStatus: string) {
    if (selectedIds.length === 0 || !supabase) return;
    setBulkUpdating(true);

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .in("id", selectedIds);

    if (error) {
      toast.error("Bulk status change failed: " + error.message);
    } else {
      toast.success(`Successfully updated ${selectedIds.length} orders to ${newStatus}!`);
      setOrders((prev) =>
        prev.map((o) => (selectedIds.includes(o.id) ? { ...o, status: newStatus } : o))
      );
      setSelectedIds([]);
    }
    setBulkUpdating(false);
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0 || !supabase) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} orders permanently?`)) return;
    setBulkUpdating(true);

    const { error } = await supabase
      .from("orders")
      .delete()
      .in("id", selectedIds);

    if (error) {
      toast.error("Bulk deletion failed: " + error.message);
    } else {
      toast.success(`Successfully deleted ${selectedIds.length} orders!`);
      setOrders((prev) => prev.filter((o) => !selectedIds.includes(o.id)));
      setSelectedIds([]);
    }
    setBulkUpdating(false);
  }

  // Select Row handlers
  function handleSelectRow(oId: string) {
    setSelectedIds((prev) =>
      prev.includes(oId) ? prev.filter((id) => id !== oId) : [...prev, oId]
    );
  }

  function handleSelectAll(visibleOrders: Order[]) {
    const visibleIds = visibleOrders.map((o) => o.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  }

  // Print Invoice Layout
  function printInvoice(order: Order) {
    const itemsRows = order.order_items
      ?.map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f5f5f4;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f5f5f4; text-align: center;">৳${item.price.toLocaleString("en-BD")}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f5f5f4; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #f5f5f4; text-align: right; font-weight: bold;">৳${(
          item.price * item.quantity
        ).toLocaleString("en-BD")}</td>
      </tr>`
      )
      .join("");

    const win = window.open("", "_blank");
    if (!win) {
      toast.error("Pop-up blocked! Please allow pop-ups to print invoices.");
      return;
    }

    const street = order.shipping_address?.street || "";
    const city = order.shipping_address?.city || "";
    const district = order.shipping_address?.district || "";

    win.document.write(`
      <html>
      <head>
        <title>Invoice - EV Solution BD</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1c1917; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #047857; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 26px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px; }
          .title { font-size: 14px; font-weight: 700; color: #78716c; text-align: right; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; font-size: 13px; }
          .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #a8a29e; letter-spacing: 1px; border-bottom: 1px solid #e7e5e4; padding-bottom: 5px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #f5f5f4; text-align: left; padding: 12px 10px; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #e7e5e4; color: #78716c; font-weight: 800; }
          .totals { margin-left: auto; width: 300px; font-size: 13px; line-height: 1.8; }
          .row { display: flex; justify-content: space-between; padding: 4px 0; }
          .grand { font-size: 16px; font-weight: 800; color: #047857; border-top: 2px solid #e7e5e4; padding-top: 10px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 60px; font-size: 11px; color: #a8a29e; border-top: 1px solid #e7e5e4; padding-top: 20px; }
          @media print {
            body { padding: 10px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">EV Solution BD</div>
          <div class="title">INVOICE OFFICIAL<br/><span style="font-mono; font-weight:normal; font-size:11px;">#${order.id}</span></div>
        </div>

        <div class="details">
          <div>
            <div class="section-title">Billing & Shipping Details</div>
            <strong style="font-size:14px;">${order.customer_name}</strong><br/>
            Phone: ${order.customer_phone}<br/>
            Email: ${order.customer_email || "N/A"}<br/>
            Address: ${street}, ${city}, ${district}
          </div>
          <div>
            <div class="section-title">Order Information</div>
            Date Placed: ${new Date(order.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}<br/>
            Payment Method: <span style="text-transform:uppercase; font-weight:bold;">${
              order.payment_method
            }</span><br/>
            Payment Status: <span style="text-transform:uppercase; font-weight:bold;">${
              order.payment_status
            }</span><br/>
            Delivery Status: <span style="text-transform:uppercase; font-weight:bold;">${order.status}</span>
          </div>
        </div>

        <div class="section-title">Order Items</div>
        <table>
          <thead>
            <tr>
              <th>Product Details</th>
              <th style="text-align: center; width: 100px;">Price</th>
              <th style="text-align: center; width: 80px;">Qty</th>
              <th style="text-align: right; width: 120px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="totals">
          <div class="row">
            <span>Subtotal</span>
            <span>৳${(order.total - order.shipping_fee).toLocaleString("en-BD")}</span>
          </div>
          <div class="row">
            <span>Shipping Fee</span>
            <span>৳${order.shipping_fee}</span>
          </div>
          <div class="row grand">
            <span>Grand Total</span>
            <span>৳${order.total.toLocaleString("en-BD")}</span>
          </div>
        </div>

        <div class="footer">
          Thank you for choosing EV Solution BD. For support, contact support@evsolutionbd.com
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    win.document.close();
  }

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    // 1. Search Query
    const matchesSearch =
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      o.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Status Tab Filter
    if (statusTab !== "all" && o.status !== statusTab) {
      return false;
    }

    // 3. Date Range Filter
    if (dateFilter === "all") return true;

    const orderDate = new Date(o.created_at);
    const today = new Date();

    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const orderZero = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());

    const diffTime = todayZero.getTime() - orderZero.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (dateFilter === "today") return diffDays === 0;
    if (dateFilter === "yesterday") return diffDays === 1;
    if (dateFilter === "7days") return diffDays <= 7;
    if (dateFilter === "month") {
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });

  const orderStatuses = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-24 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        <p className="text-sm font-semibold text-stone-500">Loading orders list...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <Package className="w-8 h-8 text-emerald-600 shrink-0" />
              Order Management
            </h1>
            <p className="text-stone-500 mt-1">Review, print invoices, and update shipping details.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-64 text-xs font-bold text-stone-850 shadow-sm"
              />
            </div>
            
            {/* Date Filter Dropdown */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer text-stone-750"
            >
              <option value="all">📅 All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Order Status Tabs */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none pb-2 border-b border-stone-200 gap-1.5">
          {orderStatuses.map((status) => {
            const isSelected = statusTab === status;
            const count = orders.filter((o) => status === "all" || o.status === status).length;
            
            return (
              <button
                key={status}
                onClick={() => setStatusTab(status)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-b-2 border-transparent uppercase tracking-wider flex items-center gap-2",
                  isSelected
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100/50"
                )}
              >
                <span>{status}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  isSelected ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-600"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bulk Actions Header */}
        {selectedIds.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-stone-950 text-white px-5 py-4 rounded-2xl gap-3 animate-in slide-in-from-top-2 duration-200">
            <span className="text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {selectedIds.length} order{selectedIds.length === 1 ? "" : "s"} selected
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs text-stone-400 hover:text-white font-bold px-2 py-1.5 transition-colors border-0 bg-transparent"
              >
                Deselect
              </button>
              
              <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 px-2">Mark status</span>
                {["pending", "confirmed", "shipped", "delivered"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleBulkStatusChange(status)}
                    disabled={bulkUpdating}
                    className="bg-stone-800 hover:bg-stone-700 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-colors capitalize border-0"
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button
                onClick={handleBulkDelete}
                disabled={bulkUpdating}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 border-0 transition-colors"
              >
                {bulkUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Orders Table Container */}
        <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs whitespace-nowrap table-auto">
              <thead className="bg-stone-50/50 text-stone-550 font-bold border-b border-stone-200 sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-4 w-12 text-center">
                    <button
                      onClick={() => handleSelectAll(filteredOrders)}
                      className="text-stone-400 hover:text-stone-600 p-1 border-0 bg-transparent flex items-center justify-center mx-auto"
                    >
                      {filteredOrders.every((o) => selectedIds.includes(o.id)) ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Order ID & Date</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Customer</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Items</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Payment</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Total</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[9px] text-stone-400">Status</th>
                  <th className="px-6 py-4 text-right uppercase tracking-widest text-[9px] text-stone-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center text-stone-400 font-medium">
                      No customer orders found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isSelected = selectedIds.includes(order.id);
                    return (
                      <tr 
                        key={order.id} 
                        className={cn(
                          "transition-colors duration-150",
                          isSelected ? "bg-emerald-50/20 hover:bg-emerald-50/30" : "hover:bg-stone-50/40"
                        )}
                      >
                        {/* Checkbox */}
                        <td className="px-5 py-4 w-12 text-center">
                          <button
                            onClick={() => handleSelectRow(order.id)}
                            className="text-stone-400 hover:text-stone-600 p-1 border-0 bg-transparent flex items-center justify-center mx-auto"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-mono text-stone-400 mb-0.5" title={order.id}>
                            #{order.id.slice(0, 8)}
                          </div>
                          <div className="text-stone-900 font-bold text-xs">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="font-bold text-stone-900">{order.customer_name}</div>
                          <div className="text-stone-450 font-semibold text-[10px] mt-0.5">{order.customer_phone}</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {order.order_items?.slice(0, 3).map((item, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 overflow-hidden relative shadow-sm">
                                  <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            {order.order_items?.length > 3 && (
                              <span className="text-[10px] font-extrabold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border">
                                +{order.order_items.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {order.payment_method === "bkash" && <span className="bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded text-[10px] font-bold">bKash</span>}
                            {order.payment_method === "nagad" && <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded text-[10px] font-bold">Nagad</span>}
                            {order.payment_method === "cod" && <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-[10px] font-bold">COD</span>}
                            <span className="font-bold text-stone-700 uppercase text-[10px]">
                              {order.payment_method === "cod" ? "Cash" : order.payment_method}
                            </span>
                          </div>
                          <span className={cn(
                            "text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                            order.payment_status === "paid" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                          )}>
                            {order.payment_status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-extrabold text-stone-900 text-sm">৳{order.total.toLocaleString("en-BD")}</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                            order.status === "pending" ? "bg-amber-50 text-amber-800 border-amber-200" :
                            order.status === "confirmed" ? "bg-blue-50 text-blue-800 border-blue-200" :
                            order.status === "shipped" ? "bg-purple-50 text-purple-800 border-purple-200" :
                            order.status === "delivered" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                            "bg-stone-50 text-stone-855 border-stone-200"
                          )}>
                            {order.status === "pending" && <Clock className="w-3 h-3 text-amber-600" />}
                            {order.status === "confirmed" && <CheckCircle className="w-3 h-3 text-blue-600" />}
                            {order.status === "shipped" && <Truck className="w-3 h-3 text-purple-600" />}
                            {order.status === "delivered" && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                            {order.status}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="p-2 hover:bg-stone-100 text-emerald-600 hover:text-emerald-700 rounded-xl transition-colors border-0 bg-transparent"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteOrder(order.id)}
                              disabled={deletingId === order.id}
                              className="p-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-xl transition-colors disabled:opacity-50 border-0 bg-transparent"
                              title="Delete Order"
                            >
                              {deletingId === order.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal Overlay */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-stone-150 flex items-center justify-between bg-stone-50/50">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" />
                    Order Invoice Details
                  </h2>
                  <p className="text-xs font-mono text-stone-400 mt-1">Order UUID: {selectedOrder.id}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Print Button */}
                  <button
                    onClick={() => printInvoice(selectedOrder)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors border-0"
                    title="Print Invoice"
                  >
                    <Printer className="w-4 h-4 text-stone-600" />
                    Print
                  </button>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-stone-100 rounded-xl transition-colors text-stone-400 hover:text-stone-600 border-0 bg-transparent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* Top summary row: Date & status summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Date Placed</p>
                      <p className="text-xs font-bold text-stone-800">
                        {new Date(selectedOrder.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Payment Method</p>
                      <p className="text-xs font-bold text-stone-800 uppercase">
                        {selectedOrder.payment_method} ({selectedOrder.payment_status})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Delivery Status</p>
                      <p className="text-xs font-bold text-stone-800 capitalize">{selectedOrder.status}</p>
                    </div>
                  </div>
                </div>

                {/* Info Grid (Customer details & Status updates) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Customer Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                      Customer Information
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <User className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-semibold">Name</p>
                          <p className="font-bold text-stone-800">{selectedOrder.customer_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-semibold">Phone</p>
                          <p className="font-bold text-stone-800">{selectedOrder.customer_phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-semibold">Shipping Address</p>
                          <p className="font-bold text-stone-800 leading-normal">
                            {selectedOrder.shipping_address?.street || ""}, {selectedOrder.shipping_address?.city || ""}, {selectedOrder.shipping_address?.district || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Status Management */}
                  <div className="space-y-4 bg-stone-50/50 p-4 rounded-2xl border border-stone-100">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                      Management Controls
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Order Status Selector */}
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 mb-1.5 uppercase">Order Status</label>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                          disabled={updatingStatus}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer text-stone-750"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Payment Status Selector */}
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 mb-1.5 uppercase">Payment Status</label>
                        <select
                          value={selectedOrder.payment_status}
                          onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value)}
                          disabled={updatingStatus}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer text-stone-750"
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editable Private Internal Notes */}
                <div className="space-y-3 bg-stone-50/30 p-4 rounded-2xl border border-stone-200/60">
                  <div className="flex items-center justify-between border-b border-stone-150 pb-2">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-800" />
                      Private Internal Notes
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <textarea
                      value={noteEditVal}
                      onChange={(e) => setNoteEditVal(e.target.value)}
                      placeholder="Add internal shipping notes, tracking numbers, or customer followups here..."
                      rows={2}
                      className="flex-1 bg-white border border-stone-200 rounded-xl p-3 text-xs font-semibold text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 resize-none"
                    />
                    <button
                      onClick={handleSaveNote}
                      disabled={savingNote || noteEditVal === (selectedOrder.notes || "")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border-0 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
                      title="Save Note"
                    >
                      {savingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span className="text-[9px]">Save</span>
                    </button>
                  </div>
                </div>

                {/* Purchased Items List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
                    Items Purchased ({selectedOrder.order_items?.length || 0})
                  </h3>
                  <div className="divide-y divide-stone-100">
                    {selectedOrder.order_items?.map((item: any, i: number) => (
                      <div key={i} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0">
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-stone-900 text-xs leading-tight">{item.name}</h4>
                            <p className="text-[10px] text-stone-450 font-bold mt-1">
                              ৳{item.price.toLocaleString("en-BD")} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-stone-900 text-xs">
                          ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown Summary */}
                <div className="border-t border-stone-100 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-500 font-semibold">
                    <span>Subtotal</span>
                    <span>৳{selectedOrder.total ? (selectedOrder.total - selectedOrder.shipping_fee).toLocaleString("en-BD") : "0"}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 font-semibold">
                    <span>Shipping Fee</span>
                    <span>৳{selectedOrder.shipping_fee || 150}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-stone-900 text-sm pt-2 border-t border-stone-100">
                    <span>Grand Total</span>
                    <span>৳{selectedOrder.total?.toLocaleString("en-BD")}</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-150 flex justify-between gap-3">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this order permanently?")) {
                      deleteOrder(selectedOrder.id);
                    }
                  }}
                  disabled={deletingId === selectedOrder.id}
                  className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50 border-0 cursor-pointer"
                >
                  {deletingId === selectedOrder.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete Order
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 font-bold text-xs text-stone-700 rounded-xl transition-colors border-0 cursor-pointer"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
