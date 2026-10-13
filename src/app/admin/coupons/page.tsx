"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-api";
import {
  TicketPercent,
  Plus,
  Trash2,
  Edit,
  Search,
  Tag,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  min_order: number;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

type CouponStatus = "active" | "inactive" | "expired" | "used_up";

function couponStatus(c: Coupon): CouponStatus {
  if (!c.is_active) return "inactive";
  if (c.expires_at && new Date(c.expires_at) < new Date()) return "expired";
  if (c.max_uses != null && (c.used_count || 0) >= c.max_uses) return "used_up";
  return "active";
}

const STATUS_STYLE: Record<CouponStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300" },
  inactive: { label: "Inactive", cls: "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400" },
  expired: { label: "Expired", cls: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300" },
  used_up: { label: "Used up", cls: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300" },
};

function formatExpiry(iso: string | null): string {
  if (!iso) return "No expiry";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState("10");
  const [minOrder, setMinOrder] = useState("0");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  async function loadCoupons() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await adminFetch<{ coupons: Coupon[] }>("/api/admin/coupons");
      setCoupons(data.coupons || []);
    } catch (err: any) {
      setLoadError(err.message || "Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setCode("");
    setDiscountType("percent");
    setDiscountValue("10");
    setMinOrder("0");
    setMaxUses("");
    setExpiresAt("");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setDiscountType(c.type);
    setDiscountValue(String(c.value));
    setMinOrder(String(c.min_order ?? 0));
    setMaxUses(c.max_uses != null ? String(c.max_uses) : "");
    setExpiresAt(
      c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 10) : ""
    );
    setIsActive(c.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const val = parseFloat(discountValue);
    const min = parseFloat(minOrder) || 0;
    const max = maxUses.trim() === "" ? null : parseInt(maxUses, 10);

    if (isNaN(val) || val <= 0) {
      toast.error("Please enter a valid discount value");
      return;
    }
    if (discountType === "percent" && val > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }
    if (max !== null && (isNaN(max) || max <= 0)) {
      toast.error("Max uses must be a positive number (or empty for unlimited)");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        code: code.trim().toUpperCase(),
        type: discountType,
        value: val,
        min_order: min,
        max_uses: max,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        is_active: isActive,
      };

      if (editingCoupon) {
        const data = await adminFetch<{ coupon: Coupon }>(
          `/api/admin/coupons/${editingCoupon.id}`,
          { method: "PATCH", body: JSON.stringify(payload) }
        );
        setCoupons((prev) =>
          prev.map((c) => (c.id === editingCoupon.id ? data.coupon : c))
        );
        toast.success("Coupon updated successfully!");
      } else {
        const data = await adminFetch<{ coupon: Coupon }>("/api/admin/coupons", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setCoupons((prev) => [data.coupon, ...prev]);
        toast.success("New coupon created!");
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (c: Coupon) => {
    try {
      const data = await adminFetch<{ coupon: Coupon }>(
        `/api/admin/coupons/${c.id}`,
        { method: "PATCH", body: JSON.stringify({ is_active: !c.is_active }) }
      );
      setCoupons((prev) => prev.map((x) => (x.id === c.id ? data.coupon : x)));
      toast.success(`Coupon ${data.coupon.is_active ? "activated" : "deactivated"}.`);
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle coupon");
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete coupon ${code}?`)) return;
    try {
      await adminFetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast.success("Coupon deleted.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete coupon");
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Coupon code ${code} copied to clipboard!`);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
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
          <span>Create Coupon</span>
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
            className="w-full pl-9 pr-8 py-2.5 text-base bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* ── Coupons Grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : loadError ? (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
          <TicketPercent className="w-10 h-10 mx-auto text-stone-300 mb-2" />
          <p className="font-bold text-sm text-stone-700 dark:text-stone-300">
            Couldn't load coupons
          </p>
          <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
            {loadError.toLowerCase().includes("coupon")
              ? "The coupons table doesn't exist yet. Run supabase/add_coupons_table.sql once in your Supabase SQL Editor, then refresh."
              : loadError}
          </p>
          <button
            onClick={loadCoupons}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full p-12 text-center text-stone-400 text-xs bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <TicketPercent className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="font-bold text-sm text-stone-700 dark:text-stone-300">No coupons found</p>
              <p className="text-[11px] mt-1">Click "Create Coupon" to launch a campaign discount</p>
            </div>
          ) : (
            filtered.map((coupon) => {
              const st = couponStatus(coupon);
              return (
                <div
                  key={coupon.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold flex items-center gap-1.5 cursor-pointer border min-w-0",
                          st === "active"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-stone-100 text-stone-400 border-stone-200"
                        )}
                        onClick={() => handleCopy(coupon.code)}
                        title="Click to copy code"
                      >
                        <Tag className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{coupon.code}</span>
                      </span>

                      <button
                        onClick={() => handleToggleActive(coupon)}
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          STATUS_STYLE[st].cls
                        )}
                        title="Click to toggle active/inactive"
                      >
                        {STATUS_STYLE[st].label}
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="text-2xl font-black text-stone-900 dark:text-white">
                        {coupon.type === "percent"
                          ? `${coupon.value}% OFF`
                          : `৳${Number(coupon.value).toLocaleString()} OFF`}
                      </div>
                      <p className="text-xs text-stone-500 mt-1 font-medium">
                        Min order: ৳{Number(coupon.min_order || 0).toLocaleString()}
                        {" · "}
                        Used: {coupon.used_count || 0}
                        {coupon.max_uses != null ? `/${coupon.max_uses}` : " (unlimited)"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Exp: {formatExpiry(coupon.expires_at)}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(coupon)}
                        className="p-2.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                        title="Edit Coupon"
                        aria-label="Edit coupon"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        className="p-2.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Coupon"
                        aria-label="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Coupon Add/Edit Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90dvh] overflow-y-auto">
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/40 sticky top-0">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER2026"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2.5 text-base uppercase font-mono font-bold bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Min Order (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Max Uses <span className="font-normal text-stone-400">(blank = unlimited)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    placeholder="Unlimited"
                    className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Expiry Date <span className="font-normal text-stone-400">(blank = never)</span>
                </label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2.5 text-base bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="coupon-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 shrink-0"
                />
                <label htmlFor="coupon-active" className="text-xs font-semibold text-stone-700 dark:text-stone-300 cursor-pointer">
                  Activate coupon immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingCoupon ? "Save Changes" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
