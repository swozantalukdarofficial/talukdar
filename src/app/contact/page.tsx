import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | EVStore Bangladesh - Customer Service & Technical Support",
  description: "Get in touch with EVStore Bangladesh. Reach out to our technical support team for lithium batteries, e-bike conversions, and solar installation queries. Visit our Dhaka head office.",
};

export default function ContactPage() {
  const PHONE_1 = "01341-757541";
  const PHONE_2 = "01725-667788"; // Secondary phone
  const EMAIL = "support@evstorebd.com";

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 pb-16 md:pb-24" id="contact-us-page">
      {/* 1. Header Section */}
      <section className="bg-stone-900 text-white py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent)]" />
        <div className="container mx-auto px-4 relative z-10 max-w-2xl space-y-4">
          <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
            Get Support
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact Our Experts</h1>
          <p className="text-stone-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl mx-auto">
            Have questions about lithium battery packs, solar panels, or custom e-bike designs? We are here to help you configure the perfect setup.
          </p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-8 relative z-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Info */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-3">
                Contact Information
              </h2>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 h-fit border border-emerald-100/50">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-stone-750 uppercase tracking-tight mb-1">
                      Our Head Office
                    </h3>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-semibold">
                      Suite 402, Floor 4, Pragati Sarani, Gulshan-Badda Link Road, Dhaka, Bangladesh.
                    </p>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 h-fit border border-emerald-100/50">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-stone-750 uppercase tracking-tight mb-1">
                      Phone Numbers
                    </h3>
                    <div className="space-y-0.5 text-[11px] text-stone-550 font-semibold">
                      <a href={`tel:${PHONE_1}`} className="hover:text-emerald-800 hover:underline block">
                        {PHONE_1} (Sales & Queries)
                      </a>
                      <a href={`tel:${PHONE_2}`} className="hover:text-emerald-800 hover:underline block">
                        {PHONE_2} (Technical Support)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 h-fit border border-emerald-100/50">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-stone-750 uppercase tracking-tight mb-1">
                      Email Address
                    </h3>
                    <a href={`mailto:${EMAIL}`} className="text-[11px] text-stone-550 font-semibold hover:text-emerald-800 hover:underline block">
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-800 h-fit border border-emerald-100/50">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-stone-750 uppercase tracking-tight mb-1">
                      Business Hours
                    </h3>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-semibold">
                      Saturday – Thursday: 10:00 AM – 8:00 PM <br />
                      <span className="text-rose-600 font-bold">Friday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note/Notice box */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-3 text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wide">Technical Support Notice</h4>
                <p className="text-[10px] leading-relaxed text-stone-600 font-medium">
                  For custom LiFePO4 battery pack dimensions and cell count customization, please request an appointment before visiting the lab to ensure a technician is available.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* 3. Interactive Location Map */}
        <div className="mt-12 bg-white border border-stone-200/90 rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs font-bold text-stone-750 uppercase tracking-widest border-b border-stone-100 pb-3 mb-4">
            Our Location Map
          </h3>
          <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1578330751996!2d90.4201389!3d23.7773611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c793ffde93e7%3A0x7d6f51cb3e4776!2sGulshan-Badda%20Link%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1683000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EVStore BD Office Map"
              id="google-maps-iframe"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
