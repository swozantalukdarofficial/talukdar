import { Zap, Phone, Mail, MapPin } from "lucide-react";
import {
  STORE_NAME,
  STORE_TAGLINE,
  STORE_CONTACT_LINE1,
  STORE_CONTACT_LINE2,
  STORE_FOOTER_THANKS,
  STORE_FOOTER_SUPPORT,
  getInvoiceTotals,
  formatBDT,
  paymentLabel,
  invoiceDate,
  invoiceRef,
} from "@/lib/invoice";

/**
 * The ONE invoice body used by the order detail page and the invoice modal.
 * Mobile-first: stacks cleanly at 390px, long emails/names/addresses wrap,
 * the items table scrolls horizontally instead of crushing.
 */
export default function InvoiceContent({ order }: { order: any }) {
  if (!order) return null;

  const t = getInvoiceTotals(order);
  const address = order.shipping_address || {};
  const items: any[] = order.order_items || [];
  const status = String(order.status || "pending");
  const addrLine = [
    address.street || address.address,
    address.city || address.district,
    address.zip || address.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6 sm:space-y-8 text-stone-900 dark:text-stone-100">
      {/* ── Brand header & invoice meta ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="text-xl font-black tracking-tight break-words">
              {STORE_NAME.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed max-w-xs">
            {STORE_TAGLINE}
            <br />
            {STORE_CONTACT_LINE1}
            <br />
            {STORE_CONTACT_LINE2}
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <span className="text-2xl font-black text-emerald-600 tracking-tight uppercase block">
            Invoice
          </span>
          <div className="mt-1 space-y-0.5 text-xs text-stone-500">
            <p>
              Invoice No:{" "}
              <strong className="text-stone-900 dark:text-white font-mono break-all">
                {invoiceRef(order.id)}
              </strong>
            </p>
            <p>
              Date:{" "}
              <strong className="text-stone-900 dark:text-white">
                {invoiceDate(order.created_at)}
              </strong>
            </p>
            <p>
              Payment:{" "}
              <strong className="text-stone-900 dark:text-white">
                {paymentLabel(order.payment_method)}
              </strong>
            </p>
            <p>
              Status:{" "}
              <strong className="text-emerald-600 uppercase">{status}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* ── Customer & shipping cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 dark:bg-stone-800/40 p-4 sm:p-5 rounded-2xl border border-stone-100 dark:border-stone-800">
        <div className="min-w-0">
          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1.5">
            Invoiced Customer:
          </h4>
          <div className="text-xs space-y-1 font-medium text-stone-700 dark:text-stone-300">
            <p className="font-bold text-sm text-stone-900 dark:text-white break-words">
              {order.customer_name || "Guest Customer"}
            </p>
            <p className="flex items-center gap-1.5 break-words">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{order.customer_phone || "N/A"}</span>
            </p>
            {order.customer_email && (
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="break-all">{order.customer_email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 mb-1.5">
            Delivery Address:
          </h4>
          <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1 font-medium">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="break-words">
                {addrLine || "Standard Delivery"}
              </span>
            </p>
            {order.notes && (
              <p className="text-[11px] text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200/50 mt-2 break-words">
                <strong>Order Note:</strong> {order.notes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Line items ── */}
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[520px] text-left text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-200 dark:border-stone-700 text-stone-400 text-[11px] font-bold uppercase tracking-wider bg-stone-50/50 dark:bg-stone-800/30">
              <th className="py-3 px-3">Item Description</th>
              <th className="py-3 px-3 text-center whitespace-nowrap">Unit Price</th>
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
                      <p className="font-bold text-stone-900 dark:text-white break-words min-w-[140px]">
                        {item.name || item.title || "Electric Product"}
                      </p>
                    </td>
                    <td className="py-3.5 px-3 text-center font-medium whitespace-nowrap">
                      {formatBDT(price)}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold">{qty}</td>
                    <td className="py-3.5 px-3 text-right font-extrabold text-stone-900 dark:text-white whitespace-nowrap">
                      {formatBDT(price * qty)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Totals ── */}
      <div className="flex justify-end pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="w-full sm:w-72 space-y-2 text-xs">
          <div className="flex justify-between text-stone-500">
            <span>Subtotal:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">
              {formatBDT(t.subtotal)}
            </span>
          </div>
          {t.discount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
              <span>Discount{t.couponCode ? ` (${t.couponCode})` : ""}:</span>
              <span className="font-bold">−{formatBDT(t.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-500">
            <span>Delivery Fee:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">
              {formatBDT(t.shippingFee)}
            </span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-700">
            <span>Grand Total:</span>
            <span className="text-emerald-600">{formatBDT(t.total)}</span>
          </div>
          {t.refundedAmount > 0 && (
            <div className="flex justify-between text-rose-600 dark:text-rose-400 font-bold pt-1">
              <span>Refunded:</span>
              <span>−{formatBDT(t.refundedAmount)}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="pt-6 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 text-center space-y-1">
        <p className="font-semibold text-stone-700 dark:text-stone-300">
          {STORE_FOOTER_THANKS}
        </p>
        <p className="break-words">{STORE_FOOTER_SUPPORT}</p>
      </div>
    </div>
  );
}
