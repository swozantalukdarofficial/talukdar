import { getAdminClient } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Zap,
  CreditCard,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import PrintButton from "@/components/admin/PrintButton";
import StatusChanger from "./StatusChanger";

export const dynamic = "force-dynamic";

export default async function OrderInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let order: any = null;
  try {
    const { data, error } = await getAdminClient()
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .single();
    if (!error) order = data;
  } catch {
    order = null;
  }

  if (!order) {
    return notFound();
  }

  const address = order.shipping_address || {};
  const items = order.order_items || [];
  const subtotal = Number(order.subtotal) || (Number(order.total) - (Number(order.shipping_fee) || 0));
  const shippingFee = Number(order.shipping_fee) || 0;
  const total = Number(order.total) || 0;
  const status = (order.status || "pending").toLowerCase();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Action Header (Hidden on Print) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
              Invoice #{order.id.slice(0, 8)}
            </h1>
            <p className="text-xs text-stone-400">
              Customer Order & Fulfillment Receipt
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusChanger orderId={order.id} currentStatus={status} />
          <PrintButton order={order} />
        </div>
      </div>

      {/* ── Printable Invoice Container (Kachabazar Style) ── */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden print:border-none print:shadow-none p-6 sm:p-10 space-y-8">
        
        {/* Brand Header & Invoice Meta */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-stone-900 dark:text-white">
                EV SOLUTION BD
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed max-w-xs">
              Leading Electric Vehicles, Batteries & Solar Hub<br />
              Dhaka, Bangladesh • Hotline: +880 1833-289578<br />
              support@evsolutionbd.com • evsolutionbd.com
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-2xl font-black text-emerald-600 tracking-tight uppercase block">
              INVOICE
            </span>
            <div className="mt-1 space-y-0.5 text-xs text-stone-500">
              <p>Invoice ID: <strong className="text-stone-900 dark:text-white font-mono">#{order.id.slice(0, 8)}</strong></p>
              <p>Date: <strong className="text-stone-900 dark:text-white">{new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</strong></p>
              <p>Payment: <strong className="text-stone-900 dark:text-white uppercase">{order.payment_method || "COD"}</strong></p>
              <p>Status: <strong className="text-emerald-600 uppercase">{status}</strong></p>
            </div>
          </div>
        </div>

        {/* Customer & Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 dark:bg-stone-800/40 p-5 rounded-2xl border border-stone-100 dark:border-stone-800">
          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1.5">
              Invoiced Customer:
            </h4>
            <div className="text-xs space-y-1 font-medium text-stone-700 dark:text-stone-300">
              <p className="font-bold text-sm text-stone-900 dark:text-white">{order.customer_name || "Guest Customer"}</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-stone-400" /> {order.customer_phone || "N/A"}</p>
              {order.customer_email && <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-stone-400" /> {order.customer_email}</p>}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1.5">
              Delivery Address:
            </h4>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1 font-medium">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {address.street || address.address || "Standard Delivery"}, {address.city || address.district || "Dhaka, Bangladesh"}
                </span>
              </p>
              {order.notes && (
                <p className="text-[11px] text-amber-800 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200/50 mt-2">
                  <strong>Order Note:</strong> {order.notes}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-stone-200 dark:border-stone-700 text-stone-400 text-[11px] font-bold uppercase tracking-wider bg-stone-50/50 dark:bg-stone-800/30">
                <th className="py-3 px-3">Item Description</th>
                <th className="py-3 px-3 text-center">Unit Price</th>
                <th className="py-3 px-3 text-center">Qty</th>
                <th className="py-3 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-stone-400">
                    Product package contents
                  </td>
                </tr>
              ) : (
                items.map((item: any, idx: number) => {
                  const price = Number(item.price) || 0;
                  const qty = Number(item.quantity) || 1;
                  return (
                    <tr key={idx}>
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-stone-900 dark:text-white">
                          {item.name || item.title || "Electric Product"}
                        </p>
                      </td>
                      <td className="py-3.5 px-3 text-center font-medium">
                        ৳{price.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold">
                        {qty}
                      </td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-stone-900 dark:text-white">
                        ৳{(price * qty).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Calculation Footer */}
        <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Delivery Fee:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">৳{shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-700">
              <span>Grand Total:</span>
              <span className="text-emerald-600">৳{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-6 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 text-center space-y-1">
          <p className="font-semibold text-stone-700 dark:text-stone-300">
            Thank you for purchasing with EV Solution BD!
          </p>
          <p>Official Warranty & Technical Support: +880 1833-289578 • support@evsolutionbd.com</p>
        </div>
      </div>
    </div>
  );
}
