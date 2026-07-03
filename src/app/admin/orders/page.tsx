"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Package, CheckCircle, Clock, Truck, Search, Eye, X, User, Phone, MapPin, CreditCard, Calendar, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: any;
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
  const [dateFilter, setDateFilter] = useState("all");

  async function deleteOrder(orderId: string) {
    if (!supabase) return;
    if (!confirm("Are you sure you want to delete this order permanently? This action cannot be undone.")) return;

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
      await fetchOrders();
    }
    setDeletingId(null);
  }

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

  async function fetchOrders() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
      // Sync selected order details if open
      if (selectedOrder) {
        const updated = data.find((o: Order) => o.id === selectedOrder.id);
        if (updated) setSelectedOrder(updated);
      }
    }
    setLoading(false);
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
      toast.success("Order status updated successfully!");
      await fetchOrders();
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
      toast.error("Failed to update payment status: " + error.message);
    } else {
      toast.success("Payment status updated successfully!");
      await fetchOrders();
    }
    setUpdatingStatus(false);
  }

  const filteredOrders = orders.filter((o) => {
    // 1. Search Filter
    const matchesSearch =
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search) ||
      o.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Date Filter
    if (dateFilter === "all") return true;

    const orderDate = new Date(o.created_at);
    const today = new Date();

    // Set hours to 0 to compare dates
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const orderZero = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());

    const diffTime = todayZero.getTime() - orderZero.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (dateFilter === "today") {
      return diffDays === 0;
    }
    if (dateFilter === "yesterday") {
      return diffDays === 1;
    }
    if (dateFilter === "7days") {
      return diffDays <= 7;
    }
    if (dateFilter === "month") {
      return (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
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
              <Package className="w-8 h-8 text-emerald-600" />
              Order Management
            </h1>
            <p className="text-stone-500 mt-1">View and manage all customer orders.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search name, phone, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-64 text-sm shadow-sm transition-all font-semibold"
              />
            </div>
            
            {/* Date Filter Dropdown */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer"
            >
              <option value="all">📅 All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Scrollable Container with max height */}
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-sm whitespace-nowrap table-auto">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Order ID & Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-stone-500 mb-1" title={order.id}>
                          #{order.id.slice(0, 8)}
                        </div>
                        <div className="text-stone-900 font-medium">
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-900">{order.customer_name}</div>
                        <div className="text-stone-500 text-xs mt-0.5">{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.order_items?.slice(0, 3).map((item, i) => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 overflow-hidden">
                                <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                          {order.order_items?.length > 3 && (
                            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                              +{order.order_items.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          {order.payment_method === "bkash" && <img src="/bkash.png" className="w-4 h-4 object-contain" alt="bKash" />}
                          {order.payment_method === "nagad" && <img src="/nagad.png" className="w-4 h-4 object-contain" alt="Nagad" />}
                          {order.payment_method === "cod" && <span className="text-lg leading-none">💵</span>}
                          <span className="font-semibold text-stone-700 capitalize">
                            {order.payment_method === "cod" ? "COD" : order.payment_method}
                          </span>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                          order.payment_status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                        )}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-extrabold text-stone-900">৳{order.total.toLocaleString("en-BD")}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold capitalize",
                          order.status === "pending" ? "bg-amber-100 text-amber-800" :
                          order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                          order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                          order.status === "delivered" ? "bg-emerald-100 text-emerald-800" :
                          "bg-stone-100 text-stone-800"
                        )}>
                          {order.status === "pending" && <Clock className="w-3.5 h-3.5" />}
                          {order.status === "confirmed" && <CheckCircle className="w-3.5 h-3.5" />}
                          {order.status === "shipped" && <Truck className="w-3.5 h-3.5" />}
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-stone-100 text-emerald-600 hover:text-emerald-700 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteOrder(order.id)}
                          disabled={deletingId === order.id}
                          className="p-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete Order"
                        >
                          {deletingId === order.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
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
              <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" />
                    Order Details
                  </h2>
                  <p className="text-xs font-mono text-stone-400 mt-1">ID: {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-stone-100 rounded-xl transition-colors text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* Top summary row: Date & status summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Date Placed</p>
                      <p className="text-sm font-semibold text-stone-800">
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
                      <p className="text-sm font-semibold text-stone-800 uppercase">
                        {selectedOrder.payment_method} ({selectedOrder.payment_status})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Delivery Status</p>
                      <p className="text-sm font-semibold text-stone-800 capitalize">{selectedOrder.status}</p>
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
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <User className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-stone-400">Name</p>
                          <p className="font-semibold text-stone-800">{selectedOrder.customer_name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-stone-400">Phone</p>
                          <p className="font-semibold text-stone-800">{selectedOrder.customer_phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-stone-400">Shipping Address</p>
                          <p className="font-semibold text-stone-800">
                            {selectedOrder.shipping_address?.street || ""}, {selectedOrder.shipping_address?.city || ""}, {selectedOrder.shipping_address?.district || ""}
                          </p>
                        </div>
                      </div>
                      {selectedOrder.notes && (
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4.5 h-4.5 text-stone-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-stone-400">Order Notes</p>
                            <p className="text-stone-600 italic">"{selectedOrder.notes}"</p>
                          </div>
                        </div>
                      )}
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
                        <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Order Status</label>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                          disabled={updatingStatus}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer"
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
                        <label className="block text-xs font-bold text-stone-500 mb-1.5 uppercase">Payment Status</label>
                        <select
                          value={selectedOrder.payment_status}
                          onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value)}
                          disabled={updatingStatus}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm cursor-pointer"
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                        </select>
                      </div>
                    </div>
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
                            <h4 className="font-bold text-stone-900 text-sm leading-tight">{item.name}</h4>
                            <p className="text-xs text-stone-500 mt-1">
                              ৳{item.price.toLocaleString("en-BD")} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-stone-900 text-sm">
                          ৳{(item.price * item.quantity).toLocaleString("en-BD")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown Summary */}
                <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>৳{selectedOrder.total ? (selectedOrder.total - 150).toLocaleString("en-BD") : "0"}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping Fee</span>
                    <span>৳150</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-stone-900 text-base pt-2 border-t border-stone-100">
                    <span>Grand Total</span>
                    <span>৳{selectedOrder.total?.toLocaleString("en-BD")}</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between gap-3">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this order permanently?")) {
                      deleteOrder(selectedOrder.id);
                    }
                  }}
                  disabled={deletingId === selectedOrder.id}
                  className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
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
                  className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 font-bold text-xs text-stone-700 rounded-xl transition-colors"
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
