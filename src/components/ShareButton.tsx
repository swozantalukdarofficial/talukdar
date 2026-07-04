"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        description: "You can now share it with others.",
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-850 hover:text-stone-900 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
    >
      <Share2 className="w-4 h-4 text-emerald-700" />
      Share Link
    </button>
  );
}
