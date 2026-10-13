import { BadgePercent } from "lucide-react";

/**
 * Promo banner section on the homepage, shown when
 * store_settings.promo_banner is set (see /admin/store-customization).
 */
export default function PromoBanner({ text }: { text: string }) {
  if (!text) return null;
  return (
    <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
      <div className="container mx-auto px-4 py-5 flex items-center justify-center gap-3 text-center">
        <span className="hidden sm:flex w-9 h-9 shrink-0 rounded-xl bg-white/15 items-center justify-center">
          <BadgePercent className="w-5 h-5 text-white" />
        </span>
        <p className="text-sm sm:text-base font-bold text-white leading-snug">
          {text}
        </p>
      </div>
    </section>
  );
}
