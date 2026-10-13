import { NextResponse } from "next/server";
import { getAdminClient, requireAdmin } from "@/lib/supabase-server";

// GET /api/admin/orders — list orders with their line items (admin only)
export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);

    const { data, error } = await getAdminClient()
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return NextResponse.json({ orders: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load orders" },
      { status: 500 }
    );
  }
}
