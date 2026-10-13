import { getAdminClient } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Package,
} from "lucide-react";
import PrintButton from "@/components/admin/PrintButton";
import InvoiceContent from "@/components/admin/InvoiceContent";
import StatusChanger from "./StatusChanger";
import RefundSection from "./RefundSection";

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

  const total = Number(order.total) || 0;
  const refundedAmount = Number(order.refunded_amount) || 0;
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
          <Link
            href={`/admin/orders/${order.id}/packing-slip`}
            title="Packing Slip"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-bold hover:bg-stone-50 transition-colors"
          >
            <Package className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Packing Slip</span>
          </Link>
          <PrintButton order={order} />
        </div>
      </div>

      {/* ── Printable Invoice (shared InvoiceContent component) ── */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden print:border-none print:shadow-none p-6 sm:p-10">
        <InvoiceContent order={order} />
      </div>

      {/* ── Refund bookkeeping (hidden on print) ── */}
      <RefundSection
        orderId={order.id}
        orderTotal={total}
        initialRefundedAmount={refundedAmount}
        initialRefundedAt={order.refunded_at || null}
        initialRefundReason={order.refund_reason || null}
      />
    </div>
  );
}
