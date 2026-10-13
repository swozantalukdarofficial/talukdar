import { NextResponse } from "next/server";
import { getUserDbClient, requireAdmin } from "@/lib/supabase-server";
import { adminEmailFrom, logActivity } from "@/lib/activity";

// GET /api/admin/activity — list activity log, newest first (admin only)
// Optional query params: ?action=updated&entity=order&limit=100
export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const entity = searchParams.get("entity");
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 500);

    let query = getUserDbClient(req)
      .from("admin_activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (action) query = query.eq("action", action);
    if (entity) query = query.eq("entity", entity);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ activity: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load activity log" },
      { status: 500 }
    );
  }
}

// POST /api/admin/activity — log one entry (admin only).
// Body: { action, entity, entityId?, details? }. The admin email comes from
// the verified session, so callers can't spoof who did it.
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const action = String(body.action || "").trim();
    const entity = String(body.entity || "").trim();
    if (!action || !entity) {
      return NextResponse.json(
        { error: "action and entity are required." },
        { status: 400 }
      );
    }

    await logActivity(
      {
        adminEmail: adminEmailFrom(auth),
        action,
        entity,
        entityId: body.entityId != null ? String(body.entityId) : null,
        details: body.details ?? null,
      },
      getUserDbClient(req)
    );

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to log activity" },
      { status: 500 }
    );
  }
}
