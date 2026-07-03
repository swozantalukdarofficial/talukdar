import type { Metadata } from "next";
import { CreditCard, Landmark, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "EMI Policy & Payment Options | EVStore Bangladesh",
  description: "Browse flexible 0% interest EMI installment plans for e-bikes, lithium batteries, and solar panel packages at EVStore. Available with 18+ leading banks in Bangladesh.",
};

export default function EmiPolicyPage() {
  const BANKS = [
    "BRAC Bank", "City Bank (Amex)", "Eastern Bank (EBL)", 
    "Dutch-Bangla Bank (DBBL)", "Standard Chartered", "Mutual Trust Bank (MTB)",
    "Dhaka Bank", "Prime Bank", "LankaBangla Finance", "Jamuna Bank",
    "United Commercial Bank (UCB)", "Bank Asia"
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-16 md:pb-24" id="emi-policy-page">
      {/* Page Header */}
      <section className="bg-stone-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-3">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Easy Installments
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">EMI & Installment Plans</h1>
          <p className="text-stone-300 text-xs leading-relaxed max-w-md mx-auto">
            Switch to smart mobility and green solar energy today with our convenient, low-cost financing and EMI solutions.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-4xl">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-stone-50 border border-stone-100 p-5 rounded-2xl space-y-2">
              <div className="text-emerald-800"><CreditCard className="w-5 h-5" /></div>
              <h3 className="text-xs font-bold uppercase tracking-tight text-stone-850">0% Interest EMI</h3>
              <p className="text-[10px] leading-relaxed text-stone-500 font-semibold">Available for 3 and 6-month tenures on selected credit cards.</p>
            </div>
            <div className="bg-stone-50 border border-stone-100 p-5 rounded-2xl space-y-2">
              <div className="text-emerald-800"><Landmark className="w-5 h-5" /></div>
              <h3 className="text-xs font-bold uppercase tracking-tight text-stone-850">18+ Partner Banks</h3>
              <p className="text-[10px] leading-relaxed text-stone-500 font-semibold">Compatible with credit cards issued by almost all major local banks.</p>
            </div>
            <div className="bg-stone-50 border border-stone-100 p-5 rounded-2xl space-y-2">
              <div className="text-emerald-800"><ShieldCheck className="w-5 h-5" /></div>
              <h3 className="text-xs font-bold uppercase tracking-tight text-stone-850">Easy Online Setup</h3>
              <p className="text-[10px] leading-relaxed text-stone-500 font-semibold">Convert your transaction via our payment gateway or local branch.</p>
            </div>
          </div>

          <div className="space-y-6 text-stone-600 text-xs leading-relaxed">
            {/* Eligibility */}
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                1. Eligibility & Requirements
              </h2>
              <p>
                EMI facilities are applicable for credit cardholders of participating banks in Bangladesh. The minimum order value required to qualify for EMI conversion is <strong>৳10,000 BDT</strong>. Installment offers are not valid on debit cards, pre-paid cards, or mobile wallets (like bKash/Nagad).
              </p>
            </div>

            {/* Tenures */}
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                2. Installment Terms & Fees
              </h2>
              <p>
                We offer interest-free (0%) EMI for 3-month and 6-month tenures. For extended tenures of 9, 12, 18, or 24 months, standard bank interest rates (bank charges) will apply and are calculated dynamically during the checkout process based on your selected bank's criteria.
              </p>
            </div>

            {/* Partner banks */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                3. Partner Banks List
              </h2>
              <p>
                EVStore coordinates with leading payment processors to offer instant EMI setups for credit cards from:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {BANKS.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-stone-700 font-semibold text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to avail */}
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                4. How to Convert to EMI
              </h2>
              <p>
                <strong>Online:</strong> Select "SSLCommerz / Online Payment" during checkout. After selecting credit card details, choose the EMI tenure of your choice before confirming the transaction. The bank will convert the payment into monthly installments within 5-7 business days. <br />
                <strong>Offline:</strong> Visit our physical retail office in Dhaka and request our representative to process your payment via the POS terminal machine for manual bank authorization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
