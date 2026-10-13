import { Megaphone } from "lucide-react";

/**
 * Thin announcement strip rendered above the site header when
 * store_settings.announcement_bar is set (see /admin/store-customization).
 */
export default function AnnouncementBar({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="bg-emerald-700 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <Megaphone className="w-3.5 h-3.5 shrink-0" />
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide truncate">
          {text}
        </p>
      </div>
    </div>
  );
}
