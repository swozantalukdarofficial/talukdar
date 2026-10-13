"use client";

import { useState, useEffect } from "react";
import { Printer, Loader2, AlertTriangle, RotateCcw } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF, { ensureInvoiceFonts } from "./InvoicePDF";

export default function PrintButton({ order }: { order: any }) {
  const [isClient, setIsClient] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
    // Load Noto Sans Bengali (৳ glyph) via our font API before rendering
    // the PDF so amounts never render as tofu boxes.
    ensureInvoiceFonts().finally(() => setFontsReady(true));
  }, [retryKey]);

  if (!isClient || !fontsReady) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/50 text-white text-xs sm:text-sm font-bold cursor-wait"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading PDF...</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink
      key={retryKey}
      document={<InvoicePDF order={order} />}
      fileName={`Invoice_EV_${order.id.slice(0, 8)}.pdf`}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
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
              className="inline-flex items-center gap-2 text-white"
              title={String(error?.message || error)}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="inline-flex items-center gap-1">
                PDF failed — tap to retry <RotateCcw className="w-3.5 h-3.5" />
              </span>
            </span>
          );
        }
        return (
          <>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Printer className="w-4 h-4" />
            )}
            <span>{loading ? "Preparing PDF..." : "Download PDF"}</span>
          </>
        );
      }}
    </PDFDownloadLink>
  );
}
