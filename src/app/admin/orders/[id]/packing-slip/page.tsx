import { getAdminClient } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import PackingSlipPrintButton from "./PackingSlipPrintButton";

export const dynamic = "force-dynamic";

const PRINT_CSS = `
@media print {
  @page { margin: 12mm; }
  body { background: #fff !important; }
  body * { visibility: hidden; }
  #packing-slip, #packing-slip * { visibility: visible; }
  #packing-slip {
    position: absolute !important;
    left: 0; top: 0;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }
  .slip-row { break-inside: avoid; }
}
`;

export default async function PackingSlipPage({
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

  if (!order) return notFound();

  const address = order.shipping_address || {};
  const items: any[] = order.order_items || [];
  const totalQty = items.reduce((n, it) => n + (Number(it.quantity) || 1), 0);
  const addrLine = [address.street || address.address, address.city || address.district, address.zip || address.postal_code]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <style>{PRINT_CSS}</style>

      {/* ── Action Header (hidden on print) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/orders/${order.id}`}
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Packing Slip #{String(order.id).slice(0, 8)}
            </h1>
            <p className="text-xs text-stone-400">
              Print this and include it in the parcel
            </p>
          </div>
        </div>
        <PackingSlipPrintButton />
      </div>

      {/* ── The Slip ── */}
      <div
        id="packing-slip"
        className="max-w-2xl mx-auto bg-white text-stone-900 rounded-2xl border border-stone-200 shadow-2xs p-8 text-sm"
      >
        {/* Store header */}
        <div className="flex items-start justify-between pb-6 border-b-2 border-stone-900">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              EV Solution BD
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Dhaka, Bangladesh
              <br />
              Hotline: +880 1833-289578
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold uppercase tracking-widest">
              Packing Slip
            </p>
            <p className="text-xs text-stone-500 mt-1 font-mono">
              #{String(order.id).slice(0, 8)}
            </p>
          </div>
        </div>

        {/* Order + customer meta */}
        <div className="grid grid-cols-2 gap-6 py-6 border-b border-stone-200 text-xs">
          <div>
            <p className="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-2">
              Ship To
            </p>
            <p className="font-extrabold text-sm">
              {order.customer_name || "Guest Customer"}
            </p>
            <p className="mt-1 text-stone-600">{addrLine || "—"}</p>
            <p className="mt-1 text-stone-600">
              📞 {order.customer_phone || "N/A"}
            </p>
            {order.customer_email && (
              <p className="text-stone-600">✉️ {order.customer_email}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-bold uppercase tracking-wider text-stone-400 text-[10px] mb-2">
              Order Info
            </p>
            <p>
              <span className="text-stone-500">Date: </span>
              <span className="font-bold">
                {new Date(order.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
            <p className="mt-1">
              <span className="text-stone-500">Payment: </span>
              <span className="font-bold uppercase">
                {order.payment_method || "COD"}
              </span>{" "}
              <span className="text-stone-500">
                ({order.payment_status || "pending"})
              </span>
            </p>
            <p className="mt-1">
              <span className="text-stone-500">Items: </span>
              <span className="font-bold">
                {items.length} line{items.length === 1 ? "" : "s"} / {totalQty}{" "}
                pcs
              </span>
            </p>
          </div>
        </div>

        {/* Items table */}
        <table className="w-full text-xs mt-6">
          <thead>
            <tr className="border-b border-stone-300 text-left">
              <th className="py-2 pr-2 w-8">#</th>
              <th className="py-2 pr-2">Product</th>
              <th className="py-2 px-2 text-center w-16">Qty</th>
              <th className="py-2 pl-2 text-right w-24">Price</th>
              <th className="py-2 pl-2 text-center w-16">Packed</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: any, i: number) => (
              <tr key={i} className="slip-row border-b border-stone-100">
                <td className="py-3 pr-2 text-stone-400">{i + 1}</td>
                <td className="py-3 pr-2 font-bold">
                  {it.name || it.title || "Product"}
                </td>
                <td className="py-3 px-2 text-center font-extrabold text-base">
                  {it.quantity || 1}
                </td>
                <td className="py-3 pl-2 text-right">
                  ৳
                  {(
                    Number(it.price || 0) * Number(it.quantity || 1)
                  ).toLocaleString()}
                </td>
                <td className="py-3 pl-2 text-center">
                  <span className="inline-block w-5 h-5 border-2 border-stone-300 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mt-4 text-xs">
          <div className="w-56 space-y-1.5">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span className="font-bold text-stone-900">
                ৳
                {(
                  Number(order.total || 0) - Number(order.shipping_fee || 0)
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Delivery</span>
              <span className="font-bold text-stone-900">
                ৳{Number(order.shipping_fee || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-extrabold text-sm pt-2 border-t-2 border-stone-900">
              <span>Total (COD collect)</span>
              <span>৳{Number(order.total || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mt-6 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
            <span className="font-bold">Customer note: </span>
            {order.notes}
          </div>
        )}

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 mt-10 pt-6 text-xs text-stone-500">
          <div>
            <div className="border-t border-stone-300 pt-2">Packed by</div>
          </div>
          <div>
            <div className="border-t border-stone-300 pt-2">Checked by</div>
          </div>
        </div>

        <p className="text-center text-[10px] text-stone-400 mt-8">
          Thank you for shopping with EV Solution BD
        </p>
      </div>

      {/* Helper tip (hidden on print) */}
      <p className="print:hidden text-center text-xs text-stone-400 flex items-center justify-center gap-2">
        <Package className="w-3.5 h-3.5" />
        Tip: tick the "Packed" boxes by hand as you pack each item.
      </p>
    </div>
  );
}
