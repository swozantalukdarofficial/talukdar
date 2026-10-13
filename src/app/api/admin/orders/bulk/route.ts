import { NextResponse } from "next/server";
import { getAdminClient, getUserDbClient, requireAdmin } from "@/lib/supabase-server";
import { adminEmailFrom, logActivity } from "@/lib/activity";

const VALID_STATUSES = ["pending", "processing", "delivered", "completed", "cancelled"];

// PATCH /api/admin/orders/bulk — update status for many orders at once.
// Body: { ids: string[], status: string }
export async function PATCH(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((x: unknown) => typeof x === "string" && x)
      : [];
    const status = String(body.status || "").toLowerCase();

    if (ids.length === 0) {
      return NextResponse.json({ error: "No orders selected." }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    if (ids.length > 200) {
      return NextResponse.json(
        { error: "Too many orders at once (max 200)." },
        { status: 400 }
      );
    }

    const { data, error } = await getAdminClient()
      .from("orders")
      .update({ status })
      .in("id", ids)
      .select("id");

    if (error) throw error;

    // Best-effort activity log — never blocks the bulk update
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: `bulk_status_${status}`,
          entity: "order",
          entityId: `${(data || []).length} orders`,
          details: { status, count: (data || []).length },
        },
        getUserDbClient(req)
      );
    } catch (e: any) {
      console.error("[bulk-orders] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ updated: (data || []).length });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to update orders" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/orders/bulk — delete many orders at once.
// Body: { ids: string[] }
export async function DELETE(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((x: unknown) => typeof x === "string" && x)
      : [];

    if (ids.length === 0) {
      return NextResponse.json({ error: "No orders selected." }, { status: 400 });
    }
    if (ids.length > 200) {
      return NextResponse.json(
        { error: "Too many orders at once (max 200)." },
        { status: 400 }
      );
    }

    const { error } = await getAdminClient().from("orders").delete().in("id", ids);
    if (error) throw error;

    // Best-effort activity log — never blocks the bulk delete
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "bulk_deleted",
          entity: "order",
          entityId: `${ids.length} orders`,
          details: { count: ids.length },
        },
        getUserDbClient(req)
      );
    } catch (e: any) {
      console.error("[bulk-orders] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ deleted: ids.length });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to delete orders" },
      { status: 500 }
    );
  }
}
