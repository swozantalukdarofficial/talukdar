import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getAdminClient, requireAdmin } from "@/lib/supabase-server";

function bearerToken(req: Request): string {
  const header = req.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

/**
 * Supabase client for coupon reads/writes.
 * - If SUPABASE_SERVICE_ROLE_KEY is configured, uses the service-role client.
 * - Otherwise attaches the admin's own JWT to the anon-key client so the
 *   email-allowlist RLS policy in supabase/add_coupons_table.sql applies.
 */
export function getCouponDbClient(req: Request): SupabaseClient {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return getAdminClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase is not configured");
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${bearerToken(req)}` } },
  });
}

export interface CouponInput {
  code?: string;
  type?: string;
  value?: number;
  min_order?: number;
  max_uses?: number | null;
  expires_at?: string | null;
  is_active?: boolean;
}

/** Shared validation for create/update. Returns an error message or null. */
export function validateCouponInput(body: CouponInput): string | null {
  if (body.code !== undefined) {
    if (typeof body.code !== "string" || !body.code.trim()) {
      return "Coupon code is required.";
    }
    if (!/^[A-Z0-9_-]+$/i.test(body.code.trim())) {
      return "Coupon code may only contain letters, numbers, dashes and underscores.";
    }
  }
  if (body.type !== undefined && !["percent", "fixed"].includes(body.type)) {
    return 'Coupon type must be "percent" or "fixed".';
  }
  if (body.value !== undefined) {
    const v = Number(body.value);
    if (!Number.isFinite(v) || v <= 0) {
      return "Discount value must be greater than 0.";
    }
    if (body.type === "percent" && v > 100) {
      return "Percentage discount cannot exceed 100%.";
    }
  }
  if (body.min_order !== undefined) {
    const m = Number(body.min_order);
    if (!Number.isFinite(m) || m < 0) {
      return "Minimum order must be 0 or more.";
    }
  }
  if (
    body.max_uses !== undefined &&
    body.max_uses !== null &&
    (!Number.isInteger(Number(body.max_uses)) || Number(body.max_uses) <= 0)
  ) {
    return "Max uses must be a positive whole number (or empty for unlimited).";
  }
  return null;
}

// GET /api/admin/coupons — list all coupons, newest first (admin only)
export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { data, error } = await getCouponDbClient(req)
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ coupons: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load coupons" },
      { status: 500 }
    );
  }
}

// POST /api/admin/coupons — create a coupon (admin only)
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = (await req.json()) as CouponInput;
    const err = validateCouponInput({ ...body, code: body.code ?? "" });
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    if (body.type === "percent" && Number(body.value) > 100) {
      return NextResponse.json(
        { error: "Percentage discount cannot exceed 100%." },
        { status: 400 }
      );
    }
    if (body.value === undefined) {
      return NextResponse.json(
        { error: "Discount value is required." },
        { status: 400 }
      );
    }

    const code = body.code!.trim().toUpperCase();
    const db = getCouponDbClient(req);

    // Case-insensitive duplicate check (friendly 409 instead of a raw PG error)
    const { data: clash, error: clashErr } = await db
      .from("coupons")
      .select("id")
      .ilike("code", code)
      .maybeSingle();
    if (clashErr) throw clashErr;
    if (clash) {
      return NextResponse.json(
        { error: `A coupon with the code "${code}" already exists.` },
        { status: 409 }
      );
    }

    const { data, error } = await db
      .from("coupons")
      .insert([
        {
          code,
          type: body.type || "percent",
          value: Number(body.value),
          min_order: Number(body.min_order) || 0,
          max_uses:
            body.max_uses === null || body.max_uses === undefined
              ? null
              : Number(body.max_uses),
          expires_at: body.expires_at || null,
          is_active: body.is_active !== false,
        },
      ])
      .select("*")
      .single();

    if (error) {
      if ((error as any).code === "23505") {
        return NextResponse.json(
          { error: `A coupon with the code "${code}" already exists.` },
          { status: 409 }
        );
      }
      throw error;
    }
    return NextResponse.json({ coupon: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to create coupon" },
      { status: 500 }
    );
  }
}
