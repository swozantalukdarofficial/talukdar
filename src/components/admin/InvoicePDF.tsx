import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
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
  const subtotal = Number(order?.subtotal) || (Number(order?.total) - (Number(order?.shipping_fee) || 0));
  const shippingFee = Number(order?.shipping_fee) || 0;
  const total = Number(order?.total) || 0;
  const status = (order?.status || "pending").toUpperCase();
  const dateStr = new Date(order?.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>EV SOLUTION BD</Text>
            <Text style={styles.companyDetails}>Leading Electric Vehicles, Batteries & Solar Hub</Text>
            <Text style={styles.companyDetails}>Dhaka, Bangladesh • Hotline: +880 1833-289578</Text>
            <Text style={styles.companyDetails}>support@evsolutionbd.com • evsolutionbd.com</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>
              Invoice ID: <Text style={styles.metaValue}>#{order?.id?.slice(0, 8)}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              Date: <Text style={styles.metaValue}>{dateStr}</Text>
            </Text>
            <Text style={styles.invoiceMeta}>
              Payment: <Text style={styles.metaValue}>{(order?.payment_method || "COD").toUpperCase()}</Text>
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
              {address?.street || address?.address || "Standard Delivery"}, {address?.city || address?.district || "Dhaka, Bangladesh"}
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
                <Text style={[styles.col2, styles.colText]}>TK {price.toLocaleString()}</Text>
                <Text style={[styles.col3, styles.colText]}>{qty}</Text>
                <Text style={[styles.col4, styles.colText, { fontWeight: 'bold' }]}>TK {(price * qty).toLocaleString()}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalsBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>TK {subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery Fee:</Text>
              <Text style={styles.totalValue}>TK {shippingFee.toLocaleString()}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Grand Total:</Text>
              <Text style={styles.grandTotalValue}>TK {total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for purchasing with EV Solution BD!</Text>
          <Text style={styles.footerText}>Official Warranty & Technical Support: +880 1833-289578 • support@evsolutionbd.com</Text>
        </View>
        
      </Page>
    </Document>
  );
}
