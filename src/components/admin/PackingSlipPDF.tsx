import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  STORE_NAME,
  STORE_CONTACT_LINE1,
  formatBDT,
  paymentLabel,
  invoiceDate,
  invoiceRef,
} from "@/lib/invoice";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "NotoSansBengali",
    fontSize: 10,
    color: "#1c1917",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#1c1917",
    paddingBottom: 16,
    marginBottom: 16,
  },
  storeName: { fontSize: 20, fontWeight: "bold" },
  storeMeta: { fontSize: 9, color: "#78716c", marginTop: 4 },
  slipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
  },
  slipRef: { fontSize: 10, color: "#78716c", marginTop: 4, textAlign: "right" },
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e7e5e4",
    paddingBottom: 14,
    marginBottom: 14,
  },
  metaCol: { width: "48%" },
  metaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#a8a29e",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  metaName: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  metaText: { fontSize: 9, color: "#57534e", marginBottom: 2 },
  metaRow: { fontSize: 9, marginBottom: 3 },
  metaKey: { color: "#78716c" },
  metaVal: { fontWeight: "bold" },
  table: { marginBottom: 14 },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#a8a29e",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f4",
    paddingVertical: 8,
    alignItems: "center",
  },
  th: { fontSize: 8, fontWeight: "bold", color: "#78716c", textTransform: "uppercase" },
  td: { fontSize: 9 },
  colNum: { width: "8%" },
  colProduct: { width: "52%", paddingRight: 8, fontWeight: "bold" },
  colQty: { width: "12%", textAlign: "center", fontWeight: "bold" },
  colPrice: { width: "16%", textAlign: "right" },
  colPacked: { width: "12%", textAlign: "center" },
  packedBox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: "#a8a29e",
  },
  totalsWrap: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6 },
  totalsBlock: { width: "45%" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalLabel: { fontSize: 9, color: "#78716c" },
  totalValue: { fontSize: 9, fontWeight: "bold" },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#1c1917",
    marginTop: 6,
    paddingTop: 8,
  },
  grandLabel: { fontSize: 10, fontWeight: "bold" },
  grandValue: { fontSize: 11, fontWeight: "bold" },
  notes: {
    marginTop: 14,
    padding: 8,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fde68a",
    fontSize: 9,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
  },
  sigCol: { width: "40%", borderTopWidth: 1, borderTopColor: "#a8a29e", paddingTop: 6 },
  sigText: { fontSize: 9, color: "#78716c" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 8,
    color: "#a8a29e",
  },
});

export default function PackingSlipPDF({ order }: { order: any }) {
  const address = order?.shipping_address || {};
  const items: any[] = order?.order_items || [];
  const totalQty = items.reduce((n, it) => n + (Number(it.quantity) || 1), 0);
  const addrLine = [
    address?.street || address?.address,
    address?.city || address?.district,
    address?.zip || address?.postal_code,
  ]
    .filter(Boolean)
    .join(", ");
  const subtotal = Number(order?.total || 0) - Number(order?.shipping_fee || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.storeName}>{STORE_NAME}</Text>
            <Text style={styles.storeMeta}>{STORE_CONTACT_LINE1}</Text>
          </View>
          <View>
            <Text style={styles.slipTitle}>Packing Slip</Text>
            <Text style={styles.slipRef}>{invoiceRef(order?.id)}</Text>
          </View>
        </View>

        {/* Ship to / Order info */}
        <View style={styles.metaGrid}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Ship To</Text>
            <Text style={styles.metaName}>
              {order?.customer_name || "Guest Customer"}
            </Text>
            <Text style={styles.metaText}>{addrLine || "—"}</Text>
            <Text style={styles.metaText}>
              {order?.customer_phone || "N/A"}
            </Text>
            {order?.customer_email && (
              <Text style={styles.metaText}>{order.customer_email}</Text>
            )}
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Order Info</Text>
            <Text style={styles.metaRow}>
              <Text style={styles.metaKey}>Date: </Text>
              <Text style={styles.metaVal}>
                {invoiceDate(order?.created_at)}
              </Text>
            </Text>
            <Text style={styles.metaRow}>
              <Text style={styles.metaKey}>Payment: </Text>
              <Text style={styles.metaVal}>
                {paymentLabel(order?.payment_method)}
              </Text>
              <Text style={styles.metaKey}>
                {" "}
                ({order?.payment_status || "pending"})
              </Text>
            </Text>
            <Text style={styles.metaRow}>
              <Text style={styles.metaKey}>Items: </Text>
              <Text style={styles.metaVal}>
                {items.length} line{items.length === 1 ? "" : "s"} / {totalQty}{" "}
                pcs
              </Text>
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colNum]}>#</Text>
            <Text style={[styles.th, styles.colProduct]}>Product</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colPrice]}>Price</Text>
            <Text style={[styles.th, styles.colPacked]}>Packed</Text>
          </View>
          {items.map((it: any, i: number) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.td, styles.colNum]}>{i + 1}</Text>
              <Text style={[styles.td, styles.colProduct]}>
                {it.name || it.title || "Product"}
              </Text>
              <Text style={[styles.td, styles.colQty]}>
                {it.quantity || 1}
              </Text>
              <Text style={[styles.td, styles.colPrice]}>
                {formatBDT(
                  Number(it.price || 0) * Number(it.quantity || 1)
                )}
              </Text>
              <View style={[styles.colPacked, { alignItems: "center" }]}>
                <View style={styles.packedBox} />
              </View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsWrap}>
          <View style={styles.totalsBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatBDT(subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery</Text>
              <Text style={styles.totalValue}>
                {formatBDT(order?.shipping_fee)}
              </Text>
            </View>
            <View style={styles.grandRow}>
              <Text style={styles.grandLabel}>Total (COD collect)</Text>
              <Text style={styles.grandValue}>{formatBDT(order?.total)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {order?.notes && (
          <View style={styles.notes}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Customer note: </Text>
              {order.notes}
            </Text>
          </View>
        )}

        {/* Signatures */}
        <View style={styles.signatures}>
          <View style={styles.sigCol}>
            <Text style={styles.sigText}>Packed by</Text>
          </View>
          <View style={styles.sigCol}>
            <Text style={styles.sigText}>Checked by</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for shopping with {STORE_NAME}
        </Text>
      </Page>
    </Document>
  );
}
