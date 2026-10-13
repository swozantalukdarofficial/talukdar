"use client";

import { Construction } from "lucide-react";

/**
 * Honest placeholder banner for admin sections that are not wired to the
 * backend yet. The UI is explorable, but nothing here persists or affects
 * the storefront — this banner makes that explicit so the admin is never
 * misled by success toasts.
 */
export default function ComingSoonBanner({ feature }: { feature: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">
      <Construction className="w-4 h-4 shrink-0 mt-0.5" />
      <p>
        <span className="font-bold">{feature} isn't connected yet.</span> You can
        explore the interface, but changes here are not saved and don't affect
        your store. This section will be wired up soon.
      </p>
    </div>
  );
}
