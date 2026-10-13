import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase-server";
import {
  buildLowStockEmail,
  getOrderNotificationEmails,
  sendEmail,
} from "@/lib/email";

export const LOW_STOCK_THRESHOLD = 5;

// POST /api/admin/stock-alert — email the admin about a low-stock product.
// Body: { productName, stock }. Fire-and-forget friendly: never throws for
// missing Resend config, just reports { emailed: false }.
export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const productName = String(body.productName || "").trim();
    const stock = Number(body.stock);

    if (!productName || Number.isNaN(stock)) {
      return NextResponse.json(
        { error: "productName and stock are required." },
        { status: 400 }
      );
    }
    if (stock > LOW_STOCK_THRESHOLD) {
      return NextResponse.json({ emailed: false, reason: "stock above threshold" });
    }

    const to = await getOrderNotificationEmails();
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ emailed: false, reason: "email not configured" });
    }

    const { subject, html } = buildLowStockEmail(productName, stock);
    await sendEmail(to, subject, html);
    return NextResponse.json({ emailed: true, to });
  } catch (e: any) {
    console.error("[stock-alert] failed:", e?.message || e);
    return NextResponse.json(
      { emailed: false, error: e.message || "Failed to send stock alert" },
      { status: 500 }
    );
  }
}
