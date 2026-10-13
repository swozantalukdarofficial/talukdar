import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase-server";

/**
 * Records one coupon redemption after an order is placed.
 * POST { code, orderId }
 *
 * Uses the SECURITY DEFINER function redeem_coupon() (see
 * supabase/add_coupons_table.sql), which only increments when the order
 * exists and was created within the last 30 minutes — so the endpoint
 * is useless without a real, fresh order. Best-effort: failures never
 * affect the order itself.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = (body.code || "").trim();
    const orderId = body.orderId;

    if (!code || !orderId) {
      return NextResponse.json({ redeemed: false });
    }

    const { data, error } = await getAdminClient().rpc("redeem_coupon", {
      p_code: code,
      p_order_id: orderId,
    });

    if (error) throw error;
    return NextResponse.json({ redeemed: Boolean(data) });
  } catch {
    // Best-effort: never fail the checkout because of usage counting.
    return NextResponse.json({ redeemed: false });
  }
}
