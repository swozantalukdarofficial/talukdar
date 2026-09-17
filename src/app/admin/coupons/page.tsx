"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  TicketPercent,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Search,
  Tag,
  Copy,
  Calendar,
  X,
  Loader2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_spend: number;
  expires_at: string;
  is_active: boolean;
  usage_count?: number;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: "cpn-1",
    code: "WELCOME500",
    discount_type: "fixed",
    discount_value: 500,
    min_spend: 5000,
    expires_at: "2026-12-31",
    is_active: true,
    usage_count: 34,
  },
  {
    id: "cpn-2",
    code: "EVECO10",
    discount_type: "percentage",
    discount_value: 10,
    min_spend: 20000,
    expires_at: "2026-10-15",
    is_active: true,
    usage_count: 18,
  },
  {
    id: "cpn-3",
    code: "FREESHIP",
    discount_type: "fixed",
    discount_value: 150,
    min_spend: 3000,
    expires_at: "2026-09-01",
    is_active: false,
    usage_count: 52,
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState("10");
  const [minSpend, setMinSpend] = useState("5000");
  const [expiresAt, setExpiresAt] = useState("2026-12-31");
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setCode("");
    setDiscountType("percentage");
    setDiscountValue("10");
    setMinSpend("5000");
    setExpiresAt("2026-12-31");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setDiscountType(c.discount_type);
    setDiscountValue(String(c.discount_value));
    setMinSpend(String(c.min_spend));
    setExpiresAt(c.expires_at);
    setIsActive(c.is_active);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const val = parseFloat(discountValue);
    const min = parseFloat(minSpend) || 0;

    if (isNaN(val) || val <= 0) {
      toast.error("Please enter a valid discount value");
      return;
    }

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingCoupon.id
            ? {
                ...c,
                code: code.trim().toUpperCase(),
                discount_type: discountType,
                discount_value: val,
                min_spend: min,
                expires_at: expiresAt,
                is_active: isActive,
              }
            : c
        )
      );
      toast.success("Coupon updated successfully!");
    } else {
      const newCoupon: Coupon = {
        id: `cpn-${Date.now()}`,
        code: code.trim().toUpperCase(),
        discount_type: discountType,
        discount_value: val,
        min_spend: min,
        expires_at: expiresAt,
        is_active: isActive,
        usage_count: 0,
      };
      setCoupons((prev) => [newCoupon, ...prev]);
      toast.success("New coupon created!");
    }
    setModalOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
    );
    toast.success("Coupon status toggled.");
  };

  const handleDelete = (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete coupon ${code}?`)) return;
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.success("Coupon deleted.");
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
  };

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Coupons & Discounts
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Create promotional voucher codes, percentage discounts, and minimum order requirements
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Coupon</span>
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search coupons by code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* ── Coupons Grid (Kachabazar Style) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center text-stone-400 text-xs bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <TicketPercent className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="font-bold text-sm text-stone-700 dark:text-stone-300">No coupons found</p>
            <p className="text-[11px] mt-1">Click "+ Create Coupon" to launch a campaign discount</p>
          </div>
        ) : (
          filtered.map((coupon) => (
            <div
              key={coupon.id}
              className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold flex items-center gap-1.5 cursor-pointer border",
                      coupon.is_active
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "bg-stone-100 text-stone-400 border-stone-200"
                    )}
                    onClick={() => handleCopy(coupon.code)}
                    title="Click to copy code"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{coupon.code}</span>
                  </span>

                  <button
                    onClick={() => handleToggleActive(coupon.id)}
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      coupon.is_active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-500"
                    )}
                  >
                    {coupon.is_active ? "Active" : "Expired"}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="text-2xl font-black text-stone-900 dark:text-white">
                    {coupon.discount_type === "percentage"
                      ? `${coupon.discount_value}% OFF`
                      : `৳${coupon.discount_value.toLocaleString()} OFF`}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 font-medium">
                    Min Spend: ৳{coupon.min_spend.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Exp: {coupon.expires_at}</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(coupon)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="Edit Coupon"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id, coupon.code)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Coupon Add/Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER2026"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-xs uppercase font-mono font-bold bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Min Spend (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minSpend}
                    onChange={(e) => setMinSpend(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="coupon-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="coupon-active" className="font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                  Activate coupon immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  {editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
