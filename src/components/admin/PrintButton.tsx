"use client";

import { useState, useEffect } from "react";
import { Printer, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF, { ensureInvoiceFonts } from "./InvoicePDF";

export default function PrintButton({ order }: { order: any }) {
  const [isClient, setIsClient] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load Noto Sans Bengali (৳ glyph) from the Google Fonts CDN before
    // rendering the PDF so amounts never render as tofu boxes.
    ensureInvoiceFonts().finally(() => setFontsReady(true));
  }, []);

  if (!isClient || !fontsReady) {
    return (
      <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/50 text-white text-xs sm:text-sm font-bold cursor-not-allowed">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading PDF...</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDF order={order} />}
      fileName={`Invoice_EV_${order.id.slice(0, 8)}.pdf`}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
    >
      {/* 
        //@ts-ignore - The react-pdf types for PDFDownloadLink children are slightly mismatched in newer React versions 
      */}
      {({ loading }) => (
        <>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
          <span>{loading ? "Preparing PDF..." : "Download PDF"}</span>
        </>
      )}
    </PDFDownloadLink>
  );
}
