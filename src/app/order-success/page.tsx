import Link from "next/link";
import { CheckCircle, Package, Phone, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | EVStore Bangladesh",
};

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderId = params.id ?? "N/A";

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success animation */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-emerald-50 border-2 border-emerald-600 rounded-full flex items-center justify-center shadow-md">
            <CheckCircle className="w-12 h-12 text-emerald-700" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
          Order Confirmed! 🎉
        </h1>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
          আপনার অর্ডার সফলভাবে place হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।
        </p>

        {/* Order ID */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-4 shadow-sm shadow-stone-150/30">
          <p className="text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-widest">
            Order ID
          </p>
          <p className="font-mono text-emerald-800 font-bold text-sm break-all">
            {orderId}
          </p>
        </div>

        {/* Next steps */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-8 text-left space-y-4 shadow-sm shadow-stone-150/30">
          <h2 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">
            What happens next?
          </h2>
          {[
            {
              icon: <Phone className="w-4 h-4 text-emerald-750" />,
              title: "We'll call you",
              desc: "Our team will call within 2-4 hours to verify & confirm shipping details.",
            },
            {
              icon: <Package className="w-4 h-4 text-emerald-750" />,
              title: "Fast Delivery",
              desc: "Dhaka region: 1-2 days · Outside Dhaka districts: 3-5 days.",
            },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-3">
              <div className="mt-0.5 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100/50">{step.icon}</div>
              <div>
                <p className="text-sm font-bold text-stone-800">{step.title}</p>
                <p className="text-xs text-stone-500 leading-normal mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl border border-stone-200 transition-colors text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md shadow-emerald-700/10 border-0"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Contact */}
        <p className="mt-6 text-xs text-stone-400">
          প্রশ্ন বা অনুসন্ধানের জন্য?{" "}
          <a
            href="tel:09638001122"
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline"
          >
            Call support: 09638001122
          </a>
        </p>
      </div>
    </main>
  );
}
