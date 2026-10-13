// ── Shared invoice logic ──────────────────────────────────────────────
// Single source of truth for every invoice surface:
//   • order detail page  (src/app/admin/orders/[id]/page.tsx)
//   • invoice modal      (src/components/admin/InvoiceModal.tsx)
//   • PDF invoice        (src/components/admin/InvoicePDF.tsx)
//   • packing slip       (src/app/admin/orders/[id]/packing-slip/page.tsx)
// Change copy, labels, or totals math here once — every surface follows.

export const STORE_NAME = "EV Solution BD";
export const STORE_TAGLINE = "Leading Electric Vehicles, Batteries & Solar Hub";
export const STORE_CONTACT_LINE1 = "Dhaka, Bangladesh • Hotline: +880 1833-289578";
export const STORE_CONTACT_LINE2 = "support@evsolutionbd.com • evsolutionbd.com";
export const STORE_FOOTER_THANKS = "Thank you for purchasing with EV Solution BD!";
export const STORE_FOOTER_SUPPORT =
  "Official Warranty & Technical Support: +880 1833-289578 • support@evsolutionbd.com";

export interface InvoiceTotals {
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingFee: number;
  total: number;
  refundedAmount: number;
}

/** Canonical totals math. `total` is the order grand total as stored. */
export function getInvoiceTotals(order: any): InvoiceTotals {
  const shippingFee = Number(order?.shipping_fee) || 0;
  const total = Number(order?.total) || 0;
  const subtotal = Number(order?.subtotal) || total - shippingFee;
  const discount = Number(order?.discount_amount) || 0;
  const couponCode = order?.coupon_code ? String(order.coupon_code) : null;
  const refundedAmount = Number(order?.refunded_amount) || 0;
  return { subtotal, discount, couponCode, shippingFee, total, refundedAmount };
}

/** "৳1,250" — the one currency format used on every invoice surface. */
export function formatBDT(value: number | string | null | undefined): string {
  const n = Number(value) || 0;
  return `৳${n.toLocaleString("en-US")}`;
}

/** Normalise stored payment codes ("cod") into human labels ("Cash on Delivery"). */
export function paymentLabel(method: string | null | undefined): string {
  const raw = String(method ?? "").trim();
  const m = raw.toLowerCase();
  if (!m || m === "cod" || m === "cash on delivery" || m === "cash_on_delivery") {
    return "Cash on Delivery";
  }
  if (m === "bkash") return "bKash";
  if (m === "nagad") return "Nagad";
  if (m === "rocket") return "Rocket";
  if (m === "card" || m === "card payment") return "Card Payment";
  if (m === "bank" || m === "bank transfer") return "Bank Transfer";
  return raw;
}

/** "Oct 13, 2026" — one date format on every invoice surface. */
export function invoiceDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Short invoice reference, e.g. "#a1b2c3d4". */
export function invoiceRef(id: string | null | undefined): string {
  return `#${String(id ?? "").slice(0, 8)}`;
}
