import type { Metadata } from "next";
import { SITE_URL } from "@/config/seo";

export const metadata: Metadata = {
  title: "Checkout | EV Solution BD",
  description: "Complete your order securely at EV Solution BD.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${SITE_URL}/checkout`,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
