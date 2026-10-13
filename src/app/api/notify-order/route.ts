import { NextRequest, NextResponse } from "next/server";
import {
  buildAdminNewOrderEmail,
  buildCustomerConfirmationEmail,
  getOrderNotificationEmails,
  sendEmail,
  type OrderEmailData,
} from "@/lib/email";
import { getAdminClient } from "@/lib/supabase-server";

/**
 * POST /api/notify-order { orderId }
 * Sends TWO emails for a new order:
 *   1. Admin notification (who ordered + what they ordered)
 *   2. Customer order confirmation (invoice + payment status)
 * Called fire-and-forget after a successful placeOrder.
 * Verifies the order really exists to prevent abuse.
 */
export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }

    // Verify the order exists — prevents spamming arbitrary emails
    const { data: order, error } = await getAdminClient()
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const o = order as OrderEmailData;
    const results: Record<string, string> = {};

    // 1. Admin notification
    try {
      const to = await getOrderNotificationEmails();
      const { subject, html } = buildAdminNewOrderEmail(o);
      await sendEmail(to, subject, html);
      results.admin = `sent to ${to.join(", ")}`;
    } catch (e: any) {
      results.admin = `failed: ${e.message}`;
    }

    // 2. Customer confirmation (only if we have their email)
    if (o.customer_email && o.customer_email.includes("@")) {
      try {
        const { subject, html } = buildCustomerConfirmationEmail(o);
        await sendEmail(o.customer_email, subject, html);
        results.customer = `sent to ${o.customer_email}`;
      } catch (e: any) {
        results.customer = `failed: ${e.message}`;
      }
    } else {
      results.customer = "skipped (no customer email)";
    }

    return NextResponse.json({ results });
  } catch (e: any) {
    console.error("notify-order:", e.message);
    return NextResponse.json(
      { error: e.message || "Failed to send notifications" },
      { status: 500 }
    );
  }
}
