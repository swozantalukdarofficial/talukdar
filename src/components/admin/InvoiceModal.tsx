"use client";

import React from "react";
import { X, Printer, Download, CheckCircle2, Zap } from "lucide-react";
import PrintButton from "./PrintButton";

interface InvoiceModalProps {
  order: any;
  onClose: () => void;
}

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  if (!order) return null;



  const address = order.shipping_address || {};
  const items = order.order_items || [];
  const subtotal = Number(order.subtotal) || (Number(order.total) - (Number(order.shipping_fee) || 0));
  const shippingFee = Number(order.shipping_fee) || 0;
  const total = Number(order.total) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8 print:my-0 print:border-none print:shadow-none print:w-full">
        
        {/* Modal Action Bar (Hidden on Print) */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-stone-800 dark:text-stone-200">
              Customer Invoice
            </span>
            <span className="font-mono text-xs text-stone-400">
              #{order.id.slice(0, 8)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PrintButton order={order} />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Printable Invoice Body ── */}
        <div className="p-6 sm:p-10 space-y-8 print:p-6 text-stone-900 dark:text-stone-100">
          
          {/* Header Brand & Invoice Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  EV SOLUTION BD
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                Bangladesh's Leading Electric Vehicle & Solar Tech Hub<br />
                Dhaka, Bangladesh • Hotline: +880 1833-289578<br />
                support@evsolutionbd.com • evsolutionbd.com
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-emerald-600 tracking-tight uppercase block">
                INVOICE
              </span>
              <div className="mt-1 space-y-0.5 text-xs text-stone-500">
                <p>Invoice No: <strong className="text-stone-900 dark:text-white font-mono">#{order.id.slice(0, 8)}</strong></p>
                <p>Date: <strong className="text-stone-900 dark:text-white">{new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</strong></p>
                <p>Payment: <strong className="text-stone-900 dark:text-white uppercase">{order.payment_method || "Cash On Delivery"}</strong></p>
              </div>
            </div>
          </div>

          {/* Customer / Billing Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 dark:bg-stone-800/40 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1">
                Invoiced To (Customer):
              </h4>
              <div className="text-xs space-y-0.5 font-medium">
                <p className="font-bold text-sm text-stone-900 dark:text-white">{order.customer_name || "Guest Customer"}</p>
                <p className="text-stone-600 dark:text-stone-300">Phone: {order.customer_phone || "N/A"}</p>
                {order.customer_email && <p className="text-stone-600 dark:text-stone-300">Email: {order.customer_email}</p>}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1">
                Shipping Destination:
              </h4>
              <div className="text-xs text-stone-600 dark:text-stone-300 space-y-0.5">
                <p>{address.street || address.address || "Street Address Not Specified"}</p>
                <p>{address.city || address.district || "Dhaka, Bangladesh"}</p>
                {order.notes && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded-lg mt-1 border border-amber-200/50">
                    <strong>Order Note:</strong> {order.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200 dark:border-stone-700 text-stone-400 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-2">Item Description</th>
                  <th className="py-2.5 px-2 text-center">Unit Price</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-stone-400">
                      Standard Package Items
                    </td>
                  </tr>
                ) : (
                  items.map((item: any, idx: number) => {
                    const price = Number(item.price) || 0;
                    const qty = Number(item.quantity) || 1;
                    return (
                      <tr key={idx}>
                        <td className="py-3 px-2">
                          <p className="font-bold text-stone-900 dark:text-white">
                            {item.name || item.title || "Electric Vehicle Product"}
                          </p>
                        </td>
                        <td className="py-3 px-2 text-center font-medium">
                          ৳{price.toLocaleString()}
                        </td>
                        <td className="py-3 px-2 text-center font-bold">
                          {qty}
                        </td>
                        <td className="py-3 px-2 text-right font-extrabold text-stone-900 dark:text-white">
                          ৳{(price * qty).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-stone-800">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Delivery Charge:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">৳{shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-700">
                <span>Grand Total:</span>
                <span className="text-emerald-600">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-6 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 text-center space-y-1">
            <p className="font-semibold text-stone-600 dark:text-stone-300">Thank you for choosing EV Solution BD!</p>
            <p>For warranty, servicing, or support queries, contact us at <strong>+880 1833-289578</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
