import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Talukdar EV — Premium E-Bikes & Electric Vehicles",
    template: "%s | Talukdar EV",
  },
  description:
    "Bangladesh's leading e-bike, battery and EV parts store. Shop premium electric vehicles with warranty and free delivery.",
  keywords: ["e-bike", "electric bike", "EV", "battery", "Bangladesh", "ই-বাইক"],
  openGraph: {
    title: "Talukdar EV",
    description: "Premium E-Bikes, Batteries & Parts",
    type: "website",
  },
};

import { getAllCategories } from "@/lib/categories";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#faf9f6] text-stone-900" suppressHydrationWarning>
        <CartProvider>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
          <Toaster position="bottom-right" theme="light" />
        </CartProvider>
      </body>
    </html>
  );
}
