import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | EVStore Bangladesh",
  description: "Understand how EVStore Bangladesh collects, protects, and handles your customer registration data, order history, and online transactions securely.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-16 md:pb-24" id="privacy-policy-page">
      {/* Page Header */}
      <section className="bg-stone-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-3">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Security & Trust
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-stone-300 text-xs leading-relaxed max-w-md mx-auto">
            Your privacy is highly valued. We implement strict security layers to safeguard all customer and transaction details.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-3xl">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-stone-600 text-xs leading-relaxed">
          
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you purchase an e-bike, configure a lithium battery pack, or order solar components from EVStore, we collect personal details such as your name, billing address, shipping location, email address, phone number, and transaction selections.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              2. How We Use Customer Data
            </h2>
            <p>
              We utilize collected info primarily to fulfill your orders, verify battery warranty registries, deliver packages via courier services, send order updates, answer technical inquiries, and occasionally inform you of store offers or promotional events.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              3. Secure Payments & Bank Transactions
            </h2>
            <p>
              We prioritize your transaction security. Credit/Debit card payments, bKash, and Nagad details are processed over secure SSL-encrypted third-party payment gateways (e.g. SSLCommerz). EVStore does not store or see your raw card numbers or wallet PIN codes on our servers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              4. Data Sharing & Third-Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to advertisers. Customer addresses and phone numbers are shared only with authorized logistics partners (like Pathao Courier or Steadfast) solely to ensure delivery of your purchased e-commerce items.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              5. User Rights & Corrections
            </h2>
            <p>
              You hold the right to access, edit, or request deletion of your personal account details saved in our store database at any time. Simply contact our support desk or email support@evstorebd.com to complete account details updates.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
