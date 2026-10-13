import { NextResponse } from "next/server";
import { getAdminClient, requireAdmin } from "@/lib/supabase-server";

// GET /api/admin/staff — list team directory (admin only)
export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { data, error } = await getAdminClient()
      .from("staff")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ staff: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load staff" },
      { status: 500 }
    );
  }
}

// POST /api/admin/staff — add a team member (admin only)
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const phone = (body.phone || "").trim() || null;
    const role = body.role || "Support Staff";
    const status = body.status || "Active";
    const joining_date = body.joining_date || new Date().toISOString().split("T")[0];

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { data, error } = await getAdminClient()
      .from("staff")
      .insert({ name, email, phone, role, status, joining_date })
      .select()
      .single();

    if (error) {
      // Unique violation on email
      if ((error as any).code === "23505") {
        return NextResponse.json(
          { error: "A team member with this email already exists." },
          { status: 409 }
        );
      }
      throw error;
    }
    return NextResponse.json({ staff: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to add staff member" },
      { status: 500 }
    );
  }
}
