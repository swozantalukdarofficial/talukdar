"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin-api";
import { toast } from "sonner";
import { Loader2, RotateCcw, X } from "lucide-react";

/**
 * Refund bookkeeping for an order (records only — no payment-gateway reversal).
 * Shown on the admin order detail page.
 */
export default function RefundSection({
  orderId,
  orderTotal,
  initialRefundedAmount,
  initialRefundedAt,
  initialRefundReason,
}: {
  orderId: string;
  orderTotal: number;
  initialRefundedAmount: number;
  initialRefundedAt: string | null;
  initialRefundReason: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(String(orderTotal));
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleRefund(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid refund amount.");
      return;
    }
    if (amt > orderTotal) {
      toast.error(`Refund cannot exceed the order total (৳${orderTotal.toLocaleString()}).`);
      return;
    }

    setSaving(true);
    try {
      await adminFetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "refunded",
          refunded_amount: amt,
          refunded_at: new Date().toISOString(),
          refund_reason: reason.trim() || null,
        }),
      });
      toast.success(`৳${amt.toLocaleString()} marked as refunded.`);
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error("Failed to record refund: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleClearRefund() {
    if (!confirm("Clear the refund record for this order?")) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          refunded_amount: 0,
          refunded_at: null,
          refund_reason: null,
        }),
      });
      toast.success("Refund record cleared.");
      router.refresh();
    } catch (err: any) {
      toast.error("Failed to clear refund: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  // ── Already refunded: show the record ──
  if (initialRefundedAmount > 0) {
    return (
      <div className="print:hidden rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-rose-800 dark:text-rose-200">
                Refunded ৳{initialRefundedAmount.toLocaleString()}
              </h3>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-300/70 mt-0.5">
                {initialRefundedAt
                  ? new Date(initialRefundedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
                {initialRefundReason ? ` · ${initialRefundReason}` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={handleClearRefund}
            disabled={saving}
            className="text-[11px] font-bold text-rose-500 hover:text-rose-700 disabled:opacity-50"
          >
            {saving ? "Working..." : "Clear"}
          </button>
        </div>
      </div>
    );
  }

  // ── Not refunded: collapsible form ──
  return (
    <div className="print:hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5">
      {!open ? (
        <button
          onClick={() => {
            setAmount(String(orderTotal));
            setReason("");
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Record a Refund
        </button>
      ) : (
        <form onSubmit={handleRefund} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              Record a Refund
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                Refund Amount (৳)
              </label>
              <input
                type="number"
                min="1"
                max={orderTotal}
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Order total: ৳{orderTotal.toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300 mb-1">
                Reason (optional)
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Damaged in transit"
                className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>

          <p className="text-[11px] text-amber-700 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900 rounded-xl px-3 py-2">
            This only records the refund in your books — it does not reverse any
            bKash/Nagad/card payment. The order status will be set to "Refunded".
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Mark as Refunded
          </button>
        </form>
      )}
    </div>
  );
}
