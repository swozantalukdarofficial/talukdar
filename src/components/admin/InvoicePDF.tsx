import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import {
  STORE_NAME,
  STORE_TAGLINE,
  STORE_CONTACT_LINE1,
  STORE_CONTACT_LINE2,
  STORE_FOOTER_THANKS,
  STORE_FOOTER_SUPPORT,
  getInvoiceTotals,
  formatBDT,
  paymentLabel,
  invoiceDate,
  invoiceRef,
} from '@/lib/invoice';

// Noto Sans Bengali covers the ৳ (U+09F3) glyph plus full Latin — the PDF's
// standard Helvetica has no Bengali glyphs, so ৳ would render as a tofu box.
// Font URLs come from our own /api/fonts/invoice route: it fetches the Google
// Fonts CSS server-side with a legacy User-Agent, so Google returns
// full-charset TTF files (one per weight). A direct browser fetch can't
// override User-Agent (forbidden header), which would return woff2 files
// split into unicode-range subsets — @react-pdf/renderer uses one file per
// weight and would render tofu for ৳ or Latin.

let fontsPromise: Promise<void> | null = null;

/** Fetch Noto Sans Bengali TTFs via our API route and register them once. */
export function ensureInvoiceFonts(): Promise<void> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const res = await fetch("/api/fonts/invoice");
      if (!res.ok) throw new Error(`Font API failed: ${res.status}`);
      const data = await res.json();
      const faces = Array.isArray(data.fonts) ? data.fonts : [];
      if (faces.length === 0) throw new Error("No font faces from API");
      Font.register({ family: "NotoSansBengali", fonts: faces });
    })().catch((err) => {
      // Never break PDF generation over fonts — fall back to Helvetica.
      console.warn("[InvoicePDF] font load failed, using fallback:", err);
      fontsPromise = null;
    });
  }
  return fontsPromise;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'NotoSansBengali',
    fontSize: 10,
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669', // Emerald 600
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.4,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  invoiceMeta: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  metaValue: {
    fontWeight: 'bold',
    color: '#111111',
  },
  addresses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  addressBlock: {
    width: '45%',
  },
  addressTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#999999',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },
  addressName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 2,
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    height: 24,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    alignItems: 'center',
    minHeight: 24,
    paddingVertical: 4,
  },
  col1: { width: '40%', paddingLeft: 8 },
  col2: { width: '20%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'center' },
  col4: { width: '20%', textAlign: 'right', paddingRight: 8 },
  colText: { fontSize: 9 },
  colHeader: { fontSize: 9, color: '#666666', fontWeight: 'bold' },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalsBlock: {
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 9,
    color: '#666666',
  },
  totalValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111111',
  },
  discountLabel: {
    fontSize: 9,
    color: '#047857',
  },
  discountValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#047857',
  },
  refundLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#be123c',
  },
  refundValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#be123c',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  grandTotalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#059669',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
    marginBottom: 2,
  },
});

interface InvoicePDFProps {
  order: any;
}

export default function InvoicePDF({ order }: InvoicePDFProps) {
  const address = order?.shipping_address || {};
  const items = order?.order_items || [];
  const t = getInvoiceTotals(order);
  const status = String(order?.status || "pending").toUpperCase();
  const addrLine = [address?.street || address?.address, address?.city || address?.district]
    .filter(Boolean)
    .join(", ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{STORE_NAME.toUpperCase()}</Text>
            <Text style={styles.companyDetails}>{STORE_TAGLINE}</Text>
            <Text style={styles.companyDetails}>{STORE_CONTACT_LINE1}</Text>
            <Text style={styles.companyDetails}>{STORE_CONTACT_LINE2}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>
              Invoice No: <Text style={styles.metaValue}>{invoiceRef(order?.id)}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              Date: <Text style={styles.metaValue}>{invoiceDate(order?.created_at)}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              Payment: <Text style={styles.metaValue}>{paymentLabel(order?.payment_method)}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              Status: <Text style={{ color: '#059669', fontWeight: 'bold' }}>{status}</Text>
            </Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.addresses}>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>Invoiced Customer:</Text>
            <Text style={styles.addressName}>{order?.customer_name || "Guest Customer"}</Text>
            <Text style={styles.addressText}>{order?.customer_phone || "N/A"}</Text>
            {order?.customer_email && <Text style={styles.addressText}>{order?.customer_email}</Text>}
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.addressTitle}>Delivery Address:</Text>
            <Text style={styles.addressText}>
              {addrLine || "Standard Delivery"}
            </Text>
            {order?.notes && (
              <Text style={{ ...styles.addressText, marginTop: 4, color: '#92400e' }}>
                Note: {order.notes}
              </Text>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={[styles.col1, styles.colHeader]}>Item Description</Text>
            <Text style={[styles.col2, styles.colHeader]}>Unit Price</Text>
            <Text style={[styles.col3, styles.colHeader]}>Qty</Text>
            <Text style={[styles.col4, styles.colHeader]}>Total</Text>
          </View>

          {items.map((item: any, i: number) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 1;
            return (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.col1, styles.colText]}>{item.name || item.title || "Electric Product"}</Text>
                <Text style={[styles.col2, styles.colText]}>{formatBDT(price)}</Text>
                <Text style={[styles.col3, styles.colText]}>{qty}</Text>
                <Text style={[styles.col4, styles.colText, { fontWeight: 'bold' }]}>{formatBDT(price * qty)}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals — same math as the web invoice */}
        <View style={styles.totals}>
          <View style={styles.totalsBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>{formatBDT(t.subtotal)}</Text>
            </View>
            {t.discount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.discountLabel}>
                  Discount{t.couponCode ? ` (${t.couponCode})` : ""}:
                </Text>
                <Text style={styles.discountValue}>-{formatBDT(t.discount)}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery Fee:</Text>
              <Text style={styles.totalValue}>{formatBDT(t.shippingFee)}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Grand Total:</Text>
              <Text style={styles.grandTotalValue}>{formatBDT(t.total)}</Text>
            </View>
            {t.refundedAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.refundLabel}>Refunded:</Text>
                <Text style={styles.refundValue}>-{formatBDT(t.refundedAmount)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{STORE_FOOTER_THANKS}</Text>
          <Text style={styles.footerText}>{STORE_FOOTER_SUPPORT}</Text>
        </View>

      </Page>
    </Document>
  );
}
