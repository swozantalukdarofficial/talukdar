"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

export interface TrendDay {
  dateStr: string;
  label: string;
  revenue: number;
  orders: number;
}

/**
 * 14-day revenue area chart (inline SVG, no deps).
 * Points are tappable: tapping a point pins its exact values in the
 * caption below, so touch users get the same info as hover tooltips.
 */
export default function RevenueTrendChart({ trend14 }: { trend14: TrendDay[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const CH = { w: 720, h: 230, padL: 52, padR: 10, padT: 14, padB: 30 };
  const trendMax = Math.max(...trend14.map((t) => t.revenue), 1);
  const trendTotal = trend14.reduce((s, t) => t.revenue, 0);
  const plotW = CH.w - CH.padL - CH.padR;
  const plotH = CH.h - CH.padT - CH.padB;
  const trendPts = trend14.map((t, i) => ({
    x: CH.padL + (trend14.length > 1 ? (i / (trend14.length - 1)) * plotW : plotW / 2),
    y: CH.padT + plotH * (1 - t.revenue / trendMax),
    ...t,
  }));
  const trendLine =
    trendPts.length > 0
      ? trendPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
      : "";
  const trendArea =
    trendPts.length > 0
      ? `${trendLine} L${trendPts[trendPts.length - 1].x.toFixed(1)},${CH.h - CH.padB} L${trendPts[0].x.toFixed(1)},${CH.h - CH.padB} Z`
      : "";
  const fmtCompact = (v: number) =>
    v >= 1000 ? `৳${Math.round(v / 1000)}k` : `৳${Math.round(v)}`;
  const yTicks = [0, 0.33, 0.66, 1].map((f) => ({
    v: trendMax * f,
    y: CH.padT + plotH * (1 - f),
  }));

  const active = activeIdx != null ? trendPts[activeIdx] : null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-base text-stone-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Revenue Trend</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Daily revenue over the last 14 days (cancelled orders excluded)
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-extrabold text-stone-900 dark:text-white">
            ৳{trendTotal.toLocaleString()}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            14-day total
          </div>
        </div>
      </div>

      {trend14.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-xs text-stone-400">
          No sales data yet
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${CH.w} ${CH.h}`}
              className="w-full h-56 min-w-[560px]"
              role="img"
              aria-label="Revenue per day for the last 14 days. Tap a point to see its values."
            >
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Y gridlines */}
              {yTicks.map((t, i) => (
                <g key={i}>
                  <line
                    x1={CH.padL}
                    x2={CH.w - CH.padR}
                    y1={t.y}
                    y2={t.y}
                    className="stroke-stone-200 dark:stroke-stone-800"
                    strokeWidth="1"
                    strokeDasharray={i === 0 ? "" : "4 4"}
                  />
                  <text
                    x={CH.padL - 8}
                    y={t.y + 3.5}
                    textAnchor="end"
                    className="fill-stone-400 text-[10px] font-semibold"
                  >
                    {fmtCompact(t.v)}
                  </text>
                </g>
              ))}

              {/* Area + line */}
              <path d={trendArea} fill="url(#trendFill)" />
              <path
                d={trendLine}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points — tappable, with hover tooltips on desktop */}
              {trendPts.map((p, i) => (
                <g key={i}>
                  {/* Larger invisible hit area for touch */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="18"
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  >
                    <title>
                      {p.label}: ৳{p.revenue.toLocaleString()} ({p.orders} orders)
                    </title>
                  </circle>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={activeIdx === i ? 6 : 4}
                    className="fill-emerald-500 stroke-white dark:stroke-stone-900 pointer-events-none transition-all"
                    strokeWidth="2"
                  />
                  {i % 2 === 0 && (
                    <text
                      x={p.x}
                      y={CH.h - 10}
                      textAnchor="middle"
                      className="fill-stone-400 text-[10px] font-semibold pointer-events-none"
                    >
                      {p.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Tap-to-inspect readout */}
          <div
            aria-live="polite"
            className="min-h-[2rem] flex items-center justify-center text-center"
          >
            {active ? (
              <p className="text-xs font-bold text-stone-700 dark:text-stone-200 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900 rounded-full px-4 py-1.5">
                {active.label} · ৳{active.revenue.toLocaleString()} · {active.orders}{" "}
                {active.orders === 1 ? "order" : "orders"}
                <button
                  onClick={() => setActiveIdx(null)}
                  className="ml-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold"
                  aria-label="Clear selection"
                >
                  ✕
                </button>
              </p>
            ) : (
              <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                Tap any point to see that day's exact revenue
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
