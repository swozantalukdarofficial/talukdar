"use client";

import React from "react";
import { X } from "lucide-react";
import PrintButton from "./PrintButton";
import InvoiceContent from "./InvoiceContent";
import { invoiceRef } from "@/lib/invoice";

interface InvoiceModalProps {
  order: any;
  onClose: () => void;
}

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/70 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto overflow-x-hidden bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 my-8 print:my-0 print:max-h-none print:overflow-visible print:border-none print:shadow-none print:w-full">
        {/* Modal Action Bar (Hidden on Print) */}
        <div className="sticky top-0 z-10 p-4 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm text-stone-800 dark:text-stone-200 shrink-0">
              Customer Invoice
            </span>
            <span className="font-mono text-xs text-stone-400 truncate">
              {invoiceRef(order.id)}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <PrintButton order={order} />
            <button
              onClick={onClose}
              aria-label="Close invoice"
              className="p-2.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Printable Invoice Body (shared with the order detail page) ── */}
        <div className="p-6 sm:p-10 print:p-6">
          <InvoiceContent order={order} />
        </div>
      </div>
    </div>
  );
}
