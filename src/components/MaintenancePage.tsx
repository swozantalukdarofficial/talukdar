import { Wrench } from "lucide-react";

/**
 * Clean branded page shown instead of the storefront while
 * maintenance mode is enabled (see /admin/settings -> Maintenance).
 * The admin panel (/admin/*) is never affected.
 */
export default function MaintenancePage({
  message,
  storeName = "EV Solution BD",
}: {
  message?: string;
  storeName?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 mb-6">
          <Wrench className="w-8 h-8" />
        </div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700 mb-3">
          {storeName}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 mb-4">
          We&apos;ll be right back
        </h1>
        <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
          {message ||
            "We are performing scheduled maintenance. Please check back soon."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Maintenance in progress
          </span>
        </div>
      </div>
    </div>
  );
}
