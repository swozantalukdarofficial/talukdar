import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";
import { getCouponDbClient, validateCouponInput } from "../route";

// PATCH /api/admin/coupons/[id] — update a coupon (admin only)
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
    const db = getCouponDbClient(req);

    const { data: existing, error: existErr } = await db
      .from("coupons")
      .select("id, type")
      .eq("id", id)
      .maybeSingle();
    if (existErr) throw existErr;
    if (!existing) {
      return NextResponse.json({ error: "Coupon not found." }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};
    if (body.code !== undefined) updates.code = body.code.trim().toUpperCase();
    if (body.type !== undefined) updates.type = body.type;
    if (body.value !== undefined) updates.value = Number(body.value);
    if (body.min_order !== undefined) updates.min_order = Number(body.min_order);
    if (body.max_uses !== undefined)
      updates.max_uses = body.max_uses === null ? null : Number(body.max_uses);
    if (body.expires_at !== undefined) updates.expires_at = body.expires_at || null;
    if (body.is_active !== undefined) updates.is_active = Boolean(body.is_active);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    // Validate with the effective type (existing type if not being changed)
    const err = validateCouponInput({
      ...(updates as any),
      type: (updates.type as string) || (existing as any).type,
    });
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    // Duplicate code check (case-insensitive, excluding self)
    if (updates.code) {
      const { data: clash, error: clashErr } = await db
        .from("coupons")
        .select("id")
        .ilike("code", updates.code as string)
        .neq("id", id)
        .maybeSingle();
      if (clashErr) throw clashErr;
      if (clash) {
        return NextResponse.json(
          { error: `A coupon with the code "${updates.code}" already exists.` },
          { status: 409 }
        );
      }
    }

    const { data, error } = await db
      .from("coupons")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if ((error as any).code === "23505") {
        return NextResponse.json(
          { error: `A coupon with the code "${updates.code}" already exists.` },
          { status: 409 }
        );
      }
      throw error;
    }
    return NextResponse.json({ coupon: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to update coupon" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/coupons/[id] — delete a coupon (admin only)
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
    const { error } = await getCouponDbClient(req)
      .from("coupons")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
