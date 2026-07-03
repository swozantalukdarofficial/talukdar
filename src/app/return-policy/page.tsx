import type { Metadata } from "next";
import { RefreshCw, CheckCircle2, ShieldAlert, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Return & Refund Policy | EVStore Bangladesh",
  description: "Read our comprehensive Return and Refund Policy. Learn about warranty claims on lithium batteries, replacement terms for e-bike controllers, and transit damage policies.",
};

export default function ReturnPolicyPage() {
  const STEPS = [
    {
      icon: <ShieldAlert className="w-5 h-5 text-emerald-800" />,
      title: "1. Inspect Upon Delivery",
      desc: "Always inspect your package during delivery. For glass solar panels, battery enclosures, or vehicles, check for visible transport damage immediately.",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-800" />,
      title: "2. Claim Within 3 Days",
      desc: "Any issues, manufacturing defects, or missing components must be reported to our support hotline within 72 hours of receiving the shipment.",
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-800" />,
      title: "3. Safe Packaging Return",
      desc: "The product must be returned unused in its original box, packaging, and containing all included manuals, accessories, and promotional gifts.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-800" />,
      title: "4. Rapid Verification & Refund",
      desc: "Once received at our hub, our technical team will inspect the item. Approved refunds/replacements will be processed within 5-7 business days.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-16 md:pb-24" id="return-policy-page">
      {/* Page Header */}
      <section className="bg-stone-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.06),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-3">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Warranty & Returns
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Return & Refund Policy</h1>
          <p className="text-stone-300 text-xs leading-relaxed max-w-md mx-auto">
            We offer fair and transparent return terms to ensure a secure shopping experience for our sustainable mobility community.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-4xl">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Quick Step Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-stone-100 pb-8">
            {STEPS.map((s, idx) => (
              <div key={idx} className="flex gap-3 bg-[#faf9f6]/50 p-4 rounded-xl border border-stone-100">
                <div className="flex-shrink-0 p-2.5 bg-white rounded-lg shadow-sm border border-stone-200/30 h-fit">
                  {s.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-tight">{s.title}</h3>
                  <p className="text-[10px] text-stone-500 leading-normal font-semibold">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Details Prose */}
          <div className="space-y-6 text-stone-600 text-xs leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                1. General Return Conditions
              </h2>
              <p>
                We accept returns for items with manufacturing faults, incorrect item shipments, or units damaged during transit. To be eligible for a return, the product must be in the same condition you received it, with original tags, labels, packaging intact, and accompanied by the official purchase invoice.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                2. Solar Panels Damage & Transit Policy
              </h2>
              <p>
                <strong>Important Notice on SUNSHINE Panels:</strong> If the glass of your Sunshine solar panel is broken during transit/delivery, EVStore will issue a complete replacement panel. However, minor visual scratches on the frame or aluminum back sheet that do not impact efficiency or power generation will not qualify for refunds or returns.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                3. Lithium Battery & Electronics Warranty Claims
              </h2>
              <p>
                Lithium battery packs (Li-Ion, LiFePO4, Graphene) and sine-wave controllers are precision electrical devices. Warranty claims cover failures in the BMS, charger malfunctions, or cells losing capacity prematurely. Warranty is rendered void if there are signs of physical abuse, water submersion, modifications, or opening of the sealed battery enclosure.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                4. Refund Process
              </h2>
              <p>
                Approved refunds are processed via the original payment method (bKash, Nagad, or Bank Transfer). Cash refunds are not available for online shipments. Processing will take 5 to 7 business days from the date of physical receipt and verification at our Dhaka service hub. Shipping costs for return items are the responsibility of the customer unless the issue is a verified manufacturing defect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
