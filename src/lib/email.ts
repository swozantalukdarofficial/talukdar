import { Resend } from "resend";
import { getAdminClient } from "./supabase-server";

/**
 * Server-only email helpers (Resend). NEVER import in client components.
 */

export interface OrderEmailData {
  id: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_address?: any;
  subtotal?: number;
  shipping_fee?: number;
  total?: number;
  status?: string;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
  created_at?: string;
  order_items?: Array<{
    name?: string;
    image_url?: string;
    price?: number;
    quantity?: number;
  }>;
}

let resend: Resend | null = null;

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  if (!resend) resend = new Resend(key);
  return resend;
}

export function getNotifyFrom(): string {
  return (
    process.env.NOTIFY_FROM_EMAIL ||
    "EV Solution BD <onboarding@resend.dev>"
  );
}

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const money = (n: unknown) => `৳${Number(n || 0).toLocaleString()}`;

function itemsTable(order: OrderEmailData): string {
  const rows = (order.order_items || [])
    .map(
      (it) => `<tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(it.name || "Product")}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${it.quantity || 1}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${money(it.price)}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">${money(Number(it.price || 0) * Number(it.quantity || 1))}</td>
      </tr>`
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0;">
    <tr style="background:#f4f4f5;text-align:left;">
      <th style="padding:10px;">Product</th>
      <th style="padding:10px;text-align:center;">Qty</th>
      <th style="padding:10px;text-align:right;">Price</th>
      <th style="padding:10px;text-align:right;">Total</th>
    </tr>${rows}</table>`;
}

function totalsBlock(order: OrderEmailData): string {
  return `<p style="text-align:right;font-size:14px;line-height:1.9;">
    Subtotal: ${money(order.subtotal)}<br/>
    Delivery charge: ${money(order.shipping_fee)}<br/>
    <strong style="font-size:18px;color:#047857;">Grand total: ${money(order.total)}</strong>
  </p>`;
}

function shell(inner: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1c1917;">${inner}
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
    <p style="font-size:12px;color:#a8a29e;">EV Solution BD • Dhaka, Bangladesh • Hotline: +880 1833-289578</p>
  </div>`;
}

// ─── 1. Admin: new order notification ──────────────────────────
export function buildAdminNewOrderEmail(order: OrderEmailData): {
  subject: string;
  html: string;
} {
  const addr = order.shipping_address || {};
  return {
    subject: `🧾 New Order #${order.id.slice(0, 8)} — ${money(order.total)} (${order.customer_name || "Customer"})`,
    html: shell(`
      <h2 style="color:#047857;">New order received!</h2>
      <p><strong>Order:</strong> #${order.id.slice(0, 8)}<br/>
      <strong>Date:</strong> ${new Date(order.created_at || Date.now()).toLocaleString("en-GB")}<br/>
      <strong>Payment:</strong> ${(order.payment_method || "COD").toUpperCase()}${order.payment_status ? ` (${order.payment_status})` : ""}</p>
      <h3>Customer</h3>
      <p>${escapeHtml(order.customer_name)}<br/>${escapeHtml(order.customer_phone)}<br/>${escapeHtml(order.customer_email)}
      <br/>${escapeHtml(addr.street || addr.address || "")}, ${escapeHtml(addr.city || addr.district || "")}</p>
      ${order.notes ? `<p style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px;"><strong>Note:</strong> ${escapeHtml(order.notes)}</p>` : ""}
      <h3>Items (${(order.order_items || []).length})</h3>
      ${itemsTable(order)}
      ${totalsBlock(order)}
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/orders/${order.id}" style="display:inline-block;background:#047857;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">View in admin panel →</a></p>`),
  };
}

// ─── 2. Customer: order confirmation + invoice ─────────────────
export function buildCustomerConfirmationEmail(order: OrderEmailData): {
  subject: string;
  html: string;
} {
  const addr = order.shipping_address || {};
  const payLabel = (order.payment_method || "cod").toLowerCase();
  const payText =
    payLabel === "cod"
      ? "Cash on Delivery — please keep the amount ready."
      : payLabel === "bkash"
        ? "bKash — our team will confirm your payment shortly."
        : payLabel === "nagad"
          ? "Nagad — our team will confirm your payment shortly."
          : "Card — payment received, thank you!";
  return {
    subject: `✅ Order confirmed #${order.id.slice(0, 8)} — ${money(order.total)} | EV Solution BD`,
    html: shell(`
      <h2 style="color:#047857;">Thank you, ${escapeHtml(order.customer_name || "customer")}!</h2>
      <p>Your order <strong>#${order.id.slice(0, 8)}</strong> has been received and is being processed.</p>
      <h3>🧾 Invoice</h3>
      ${itemsTable(order)}
      ${totalsBlock(order)}
      <h3>💳 Payment</h3>
      <p><strong>Method:</strong> ${(order.payment_method || "COD").toUpperCase()}<br/>
      <strong>Status:</strong> ${(order.payment_status || "pending").toUpperCase()}<br/>
      ${escapeHtml(payText)}</p>
      <h3>📦 Delivery address</h3>
      <p>${escapeHtml(addr.street || addr.address || "")}, ${escapeHtml(addr.city || addr.district || "")}<br/>${escapeHtml(order.customer_phone || "")}</p>
      <p style="font-size:13px;color:#78716c;">Questions? Reply to this email or call +880 1833-289578.</p>`),
  };
}

// ─── 3. Customer: review request after delivery ────────────────
export function buildReviewRequestEmail(order: OrderEmailData): {
  subject: string;
  html: string;
} {
  const names = (order.order_items || [])
    .map((it) => it.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    subject: `⭐ How was your order #${order.id.slice(0, 8)}? Leave a review!`,
    html: shell(`
      <h2 style="color:#047857;">Your order was delivered! 🎉</h2>
      <p>Hi ${escapeHtml(order.customer_name || "customer")},</p>
      <p>We hope you're enjoying <strong>${escapeHtml(names || "your products")}</strong>.</p>
      <p>Your feedback helps other customers choose with confidence — it takes less than a minute:</p>
      <p><a href="${site}/products" style="display:inline-block;background:#047857;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">⭐ Write a review</a></p>
      <p style="font-size:13px;color:#78716c;">Thank you for shopping with EV Solution BD!</p>`),
  };
}

/**
 * Resolves which email address(es) should receive order notifications:
 * 1. store_settings.order_notification_email (set in admin panel)
 * 2. ADMIN_NOTIFY_EMAILS / NEXT_PUBLIC_ADMIN_EMAILS env
 * 3. Built-in default
 */
export async function getOrderNotificationEmails(): Promise<string[]> {
  try {
    const { data } = await getAdminClient()
      .from("store_settings")
      .select("*")
      .eq("id", "global")
      .maybeSingle();
    const fromDb = (data as any)?.order_notification_email as string | undefined;
    if (fromDb && fromDb.trim()) {
      return fromDb.split(",").map((e) => e.trim()).filter(Boolean);
    }
  } catch {
    /* column may not exist yet — fall through to env */
  }
  const raw =
    process.env.ADMIN_NOTIFY_EMAILS ||
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    "swozantalukdaofficial@gmail.com";
  return raw.split(",").map((e) => e.trim()).filter(Boolean);
}

export async function sendEmail(to: string | string[], subject: string, html: string) {
  const { error } = await getResend().emails.send({
    from: getNotifyFrom(),
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
  if (error) throw new Error(error.message);
}
