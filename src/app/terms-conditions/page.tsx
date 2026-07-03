import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | EVStore Bangladesh",
  description: "Read the official Terms of Service and Conditions of EVStore Bangladesh, covering product usage regulations, warranty claims, and shipping policies.",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-16 md:pb-24" id="terms-conditions-page">
      {/* Page Header */}
      <section className="bg-stone-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.06),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-3">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Usage Policy
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="text-stone-300 text-xs leading-relaxed max-w-md mx-auto">
            By browsing our website and purchasing our green mobility products, you agree to follow the standard conditions outlined below.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-3xl">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 text-stone-600 text-xs leading-relaxed">
          
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              1. Store Agreement & Account Use
            </h2>
            <p>
              By accessing evstorebd.com, you certify that you are at least 18 years of age or are browsing under the supervision of a parent or legal guardian. You agree to provide true, accurate, and current information when creating an account or placing orders.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              2. Product Prices & Stock Availability
            </h2>
            <p>
              While we make every effort to display accurate product prices and specs (including lithium cell brands, motor ratings, and panel dimensions), occasional scraping or data entry errors can occur. In the event of a listing error, EVStore reserves the right to cancel affected orders and issue a full refund. All listed item prices are subject to change without prior notice.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              3. Battery Shipping & Hazardous Materials
            </h2>
            <p>
              High-capacity lithium battery packs are classified as sensitive cargo in transit. Shipping and delivery across Bangladesh may take slightly longer than standard accessories due to transport safety regulations. Extra precautions are taken to pack all lithium units in secure, shock-proof, and waterproof packaging.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              4. Custom Conversions & Liability
            </h2>
            <p>
              EVStore supplies motors, controllers, and battery packs for DIY e-bike and e-scooter modifications. DIY modifications are carried out at the owner's risk. EVStore is not liable for structural damage, wiring accidents, or system failures caused by incorrect installation or manual modification by uncertified local technicians.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              5. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising from transactions or usage policies will be resolved under the jurisdiction of the courts of Dhaka.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
