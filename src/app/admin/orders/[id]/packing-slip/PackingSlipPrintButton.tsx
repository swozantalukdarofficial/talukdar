"use client";

import { Printer } from "lucide-react";

export default function PackingSlipPrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer print:hidden"
    >
      <Printer className="w-4 h-4" />
      <span>Print Packing Slip</span>
    </button>
  );
}
