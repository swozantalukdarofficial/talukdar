"use client";

import { useState, useEffect } from "react";
import { Download, Loader2, AlertTriangle, RotateCcw } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PackingSlipPDF from "./PackingSlipPDF";
import { ensureInvoiceFonts } from "./InvoicePDF";

export default function PackingSlipDownloadButton({
  order,
}: {
  order: any;
}) {
  const [isClient, setIsClient] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
    ensureInvoiceFonts().finally(() => setFontsReady(true));
  }, [retryKey]);

  if (!isClient || !fontsReady) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-400 text-xs sm:text-sm font-bold cursor-wait"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline">Loading PDF...</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink
      key={retryKey}
      document={<PackingSlipPDF order={order} />}
      fileName={`PackingSlip_${String(order.id).slice(0, 8)}.pdf`}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
    >
      {({ loading, error }) => {
        if (error) {
          return (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                setRetryKey((k) => k + 1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setRetryKey((k) => k + 1);
                }
              }}
              className="inline-flex items-center gap-2 text-rose-600"
              title={String(error?.message || error)}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Failed — retry</span>
              <RotateCcw className="w-3.5 h-3.5 sm:hidden" />
            </span>
          );
        }
        return (
          <>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4 text-emerald-600" />
            )}
            <span className="hidden sm:inline">
              {loading ? "Preparing..." : "Download PDF"}
            </span>
          </>
        );
      }}
    </PDFDownloadLink>
  );
}
