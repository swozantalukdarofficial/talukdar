import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase-server";

/**
 * Public coupon validation for checkout.
 * POST { code, subtotal } -> { valid, discount, code?, message? }
 *
 * Reads via getAdminClient() (anon fallback); the
 * "Public read active coupons" RLS policy exposes only active rows.
 * Never leaks inactive/expired coupons.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = (body.code || "").trim().toUpperCase();
    const subtotal = Number(body.subtotal) || 0;

    if (!code) {
      return NextResponse.json({ valid: false, message: "Enter a coupon code." });
    }

    const { data: coupon, error } = await getAdminClient()
      .from("coupons")
      .select("code, type, value, min_order, max_uses, used_count, expires_at, is_active")
      .ilike("code", code)
      .maybeSingle();

    if (error) throw error;
    // Note: the RLS policy only returns active coupons to anon callers,
    // but we still check everything defensively (service-role path).
    if (!coupon || !coupon.is_active) {
      return NextResponse.json({ valid: false, message: "Invalid coupon code." });
    }
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: "This coupon has expired." });
    }
    if (coupon.max_uses != null && (coupon.used_count || 0) >= coupon.max_uses) {
      return NextResponse.json({ valid: false, message: "This coupon has reached its usage limit." });
    }
    if (subtotal < Number(coupon.min_order || 0)) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order ৳${Number(coupon.min_order).toLocaleString()} required for this coupon.`,
      });
    }

    let discount: number;
    if (coupon.type === "percent") {
      discount = Math.round((subtotal * Number(coupon.value)) / 100);
    } else {
      discount = Math.min(Number(coupon.value), subtotal);
    }
    discount = Math.max(0, Math.round(discount));

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discount,
      message:
        coupon.type === "percent"
          ? `${coupon.value}% off applied!`
          : `৳${Number(coupon.value).toLocaleString()} off applied!`,
    });
  } catch (e: any) {
    return NextResponse.json(
      { valid: false, message: "Could not validate coupon. Try again." },
      { status: 500 }
    );
  }
}
