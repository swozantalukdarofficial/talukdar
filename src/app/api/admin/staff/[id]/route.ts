import { NextResponse } from "next/server";
import { getUserDbClient, requireAdmin } from "@/lib/supabase-server";
import { adminEmailFrom, logActivity } from "@/lib/activity";

// PATCH /api/admin/staff/[id] — update a team member (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const db = getUserDbClient(req);

    const updates: Record<string, any> = {};
    if (body.name !== undefined) updates.name = body.name.trim();
    if (body.email !== undefined) updates.email = body.email.trim().toLowerCase();
    if (body.phone !== undefined) updates.phone = body.phone.trim() || null;
    if (body.role !== undefined) updates.role = body.role;
    if (body.status !== undefined) updates.status = body.status;
    if (body.joining_date !== undefined) updates.joining_date = body.joining_date;

    if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { data, error } = await db
      .from("staff")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if ((error as any).code === "23505") {
        return NextResponse.json(
          { error: "A team member with this email already exists." },
          { status: 409 }
        );
      }
      throw error;
    }
    if (!data) {
      return NextResponse.json({ error: "Staff member not found." }, { status: 404 });
    }

    // Log the update (best-effort, never blocks)
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "updated",
          entity: "staff",
          entityId: id,
          details: { name: data.name, ...updates },
        },
        db
      );
    } catch (e: any) {
      console.error("[admin-staff] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ staff: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to update staff member" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/staff/[id] — remove a team member (admin only)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const db = getUserDbClient(req);

    // Guard: never delete the last Super Admin entry
    const { data: supers, error: countErr } = await db
      .from("staff")
      .select("id")
      .eq("role", "Super Admin");
    if (countErr) throw countErr;

    const { data: target } = await db
      .from("staff")
      .select("role, name")
      .eq("id", id)
      .single();

    if (target?.role === "Super Admin" && (supers?.length || 0) <= 1) {
      return NextResponse.json(
        { error: "You cannot remove the last Super Admin." },
        { status: 400 }
      );
    }

    const { error } = await db.from("staff").delete().eq("id", id);
    if (error) throw error;

    // Log the removal (best-effort, never blocks)
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "deleted",
          entity: "staff",
          entityId: id,
          details: { name: target?.name || null },
        },
        db
      );
    } catch (e: any) {
      console.error("[admin-staff] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to remove staff member" },
      { status: 500 }
    );
  }
}
