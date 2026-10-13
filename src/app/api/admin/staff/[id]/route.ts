import { NextResponse } from "next/server";
import { getAdminClient, requireAdmin } from "@/lib/supabase-server";

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

    const { data, error } = await getAdminClient()
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

    // Guard: never delete the last Super Admin entry
    const { data: supers, error: countErr } = await getAdminClient()
      .from("staff")
      .select("id")
      .eq("role", "Super Admin");
    if (countErr) throw countErr;

    const { data: target } = await getAdminClient()
      .from("staff")
      .select("role")
      .eq("id", id)
      .single();

    if (target?.role === "Super Admin" && (supers?.length || 0) <= 1) {
      return NextResponse.json(
        { error: "You cannot remove the last Super Admin." },
        { status: 400 }
      );
    }

    const { error } = await getAdminClient().from("staff").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to remove staff member" },
      { status: 500 }
    );
  }
}
