import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EV Solution BD — Premium E-Bikes & Electric Vehicles",
    template: "%s | EV Solution BD",
  },
  description:
    "Bangladesh's leading e-bike, battery and EV parts store. Shop premium electric vehicles with warranty and free delivery.",
  openGraph: {
    title: "EV Solution BD",
    description: "Premium E-Bikes, Batteries & Parts",
    type: "website",
    url: SITE_URL,
    siteName: "EV Solution BD",
  },
  verification: {
    // Google Search Console & Merchant Center site verification codes
    google: [
      "gYyToJWYPZh08hUUVbtWQMU_DfsLWfx_v_0i4oIrRsA",
      "ERO7jOqnZyavsXgg_ZiFramikyAwMLViDy7WKxPjSXs"
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

import { getAllCategories } from "@/lib/categories";
import { getStoreSettings } from "@/lib/settings";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, settings] = await Promise.all([
    getAllCategories(),
    getStoreSettings(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/silver_scooter.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body className="antialiased bg-[#faf9f6] text-stone-900 overflow-x-hidden w-full relative" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CPCHEWEBN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9CPCHEWEBN');
          `}
        </Script>
        <CartProvider>
          <Header categories={categories} />
          <main className="overflow-x-hidden w-full relative">{children}</main>
          <Footer settings={settings} />
          <Toaster position="bottom-right" theme="light" />
        </CartProvider>
      </body>
    </html>
  );
}

