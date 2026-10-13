"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Activity,
  Search,
  Loader2,
  RefreshCw,
  ChevronDown,
  User,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { adminFetch } from "@/lib/admin-api";

interface ActivityEntry {
  id: string;
  admin_email: string;
  action: string;
  entity: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

const ACTION_COLORS: Record<string, string> = {
  created: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  updated: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  deleted: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
};

function actionColor(action: string): string {
  if (ACTION_COLORS[action]) return ACTION_COLORS[action];
  if (action.startsWith("bulk")) return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300";
  return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300";
}

function formatDetails(details: Record<string, unknown> | null): string {
  if (!details) return "—";
  const parts: string[] = [];
  for (const [k, v] of Object.entries(details)) {
    if (v === null || v === undefined || v === "") continue;
    const val = typeof v === "object" ? JSON.stringify(v) : String(v);
    parts.push(`${k}: ${val}`);
  }
  return parts.length ? parts.join(" • ") : "—";
}

export default function AdminActivityPage() {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");

  async function loadActivity() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await adminFetch<{ activity: ActivityEntry[] }>(
        "/api/admin/activity?limit=200"
      );
      setEntries(data.activity || []);
    } catch (err: any) {
      setLoadError(err.message || "Failed to load activity log.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivity();
  }, []);

  const actionOptions = useMemo(() => {
    const s = new Set(entries.map((e) => e.action));
    return [...s].sort();
  }, [entries]);

  const entityOptions = useMemo(() => {
    const s = new Set(entries.map((e) => e.entity));
    return [...s].sort();
  }, [entries]);

  const filtered = entries.filter((e) => {
    if (actionFilter !== "all" && e.action !== actionFilter) return false;
    if (entityFilter !== "all" && e.entity !== entityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hay = `${e.admin_email} ${e.action} ${e.entity} ${e.entity_id || ""} ${formatDetails(e.details)}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" />
            Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Who changed what, and when — newest first
          </p>
        </div>

        <button
          onClick={loadActivity}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className={cn("w-4 h-4 text-emerald-600", loading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by admin, action, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="relative">
          <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">All actions</option>
            {actionOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="w-full pl-8 pr-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">All types</option>
            {entityOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : loadError ? (
          <div className="p-8 text-center">
            <Activity className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              Couldn't load the activity log
            </p>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              {loadError.includes("admin_activity")
                ? "The activity table doesn't exist yet. Run supabase/add_activity_log.sql once in your Supabase SQL Editor, then refresh."
                : loadError}
            </p>
            <button
              onClick={loadActivity}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-10 h-10 mx-auto text-stone-300 mb-3" />
            <p className="text-sm font-bold text-stone-700 dark:text-stone-200">
              No activity yet
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {search || actionFilter !== "all" || entityFilter !== "all"
                ? "Try clearing your filters."
                : "Actions like order updates and product saves will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/75 dark:bg-stone-800/40 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Time</th>
                  <th className="py-3.5 px-4">Admin</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 font-bold text-stone-900 dark:text-white">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        {e.admin_email}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          actionColor(e.action)
                        )}
                      >
                        {e.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-600 dark:text-stone-300 capitalize">
                        {e.entity}
                      </span>
                      {e.entity_id && (
                        <span className="block font-mono text-[10px] text-stone-400 mt-0.5">
                          {e.entity_id.length > 24
                            ? e.entity_id.slice(0, 24) + "…"
                            : e.entity_id}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 max-w-xs">
                      <details className="group">
                        <summary className="cursor-pointer list-none flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-300">
                          <span className="truncate">
                            {formatDetails(e.details)}
                          </span>
                          <ChevronDown className="w-3 h-3 shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <pre className="mt-2 p-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-[10px] font-mono whitespace-pre-wrap break-all">
                          {JSON.stringify(e.details, null, 2) || "—"}
                        </pre>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !loadError && filtered.length > 0 && (
        <p className="text-xs text-stone-400 text-center">
          Showing {filtered.length} of {entries.length} logged actions
        </p>
      )}
    </div>
  );
}
