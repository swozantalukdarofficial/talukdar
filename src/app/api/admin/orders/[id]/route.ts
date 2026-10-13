import { NextResponse } from "next/server";
import { getAdminClient, getUserDbClient, requireAdmin } from "@/lib/supabase-server";
import { adminEmailFrom, logActivity } from "@/lib/activity";
import {
  buildReviewRequestEmail,
  sendEmail,
  type OrderEmailData,
} from "@/lib/email";

// GET /api/admin/orders/[id] — single order with line items (admin only)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const { data, error } = await getAdminClient()
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load order" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/orders/[id] — update status / payment_status / refund info (admin only)
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
    const allowed: Record<string, unknown> = {};
    if (typeof body.status === "string") allowed.status = body.status;
    if (typeof body.payment_status === "string")
      allowed.payment_status = body.payment_status;
    // Refund bookkeeping (no payment-gateway reversal — records only)
    if (body.refunded_amount !== undefined) {
      const amt = Number(body.refunded_amount);
      if (!Number.isFinite(amt) || amt < 0) {
        return NextResponse.json(
          { error: "Refunded amount must be 0 or more." },
          { status: 400 }
        );
      }
      allowed.refunded_amount = amt;
    }
    if (body.refunded_at !== undefined)
      allowed.refunded_at = body.refunded_at || null;
    if (body.refund_reason !== undefined)
      allowed.refund_reason = (body.refund_reason || "").trim() || null;
    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const { data, error } = await getAdminClient()
      .from("orders")
      .update(allowed)
      .eq("id", id)
      .select("*, order_items(*)")
      .single();

    if (error) throw error;

    // Log the status/payment change (best-effort, never blocks the update)
    try {
      const changes: Record<string, unknown> = {};
      if (typeof allowed.status === "string") changes.status = allowed.status;
      if (typeof allowed.payment_status === "string")
        changes.payment_status = allowed.payment_status;
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "updated",
          entity: "order",
          entityId: id,
          details: {
            ...changes,
            customer: (data as any)?.customer_name || null,
            total: (data as any)?.total ?? null,
          },
        },
        getUserDbClient(req)
      );
    } catch (e: any) {
      console.error("[admin-orders] activity log failed:", e?.message || e);
    }

    // When an order is marked delivered, ask the customer for a review
    // (fire-and-forget — never blocks the status update)
    if (
      typeof allowed.status === "string" &&
      ["delivered", "completed"].includes(allowed.status.toLowerCase()) &&
      (data as any)?.customer_email?.includes("@")
    ) {
      try {
        const { subject, html } = buildReviewRequestEmail(
          data as OrderEmailData
        );
        sendEmail((data as any).customer_email, subject, html).catch((e) =>
          console.error("review-request email failed:", e.message)
        );
      } catch (e: any) {
        console.error("review-request email failed:", e.message);
      }
    }

    return NextResponse.json({ order: data });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/orders/[id] — delete order (admin only)
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
    const { error } = await getAdminClient()
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // Log the deletion (best-effort, never blocks)
    try {
      await logActivity(
        {
          adminEmail: adminEmailFrom(auth),
          action: "deleted",
          entity: "order",
          entityId: id,
          details: null,
        },
        getUserDbClient(req)
      );
    } catch (e: any) {
      console.error("[admin-orders] activity log failed:", e?.message || e);
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to delete order" },
      { status: 500 }
    );
  }
}
