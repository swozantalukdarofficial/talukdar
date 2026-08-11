import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/Footer"));
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
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
      <body className={`antialiased bg-[#faf9f6] text-stone-900 overflow-x-hidden w-full relative ${plusJakartaSans.className}`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CPCHEWEBN"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

