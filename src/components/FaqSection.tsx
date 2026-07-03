"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How long does the battery warranty last?",
    answer: "We provide a 1-year comprehensive replacement warranty on all premium lithium-ion and LiFePO4 batteries. The warranty covers manufacturer defects, BMS malfunctions, and capacity degradation below 80% under standard use.",
  },
  {
    question: "Do you deliver all over Bangladesh?",
    answer: "Yes, we ship to all 64 districts in Bangladesh. Delivery within Dhaka takes 24 to 48 hours, while delivery to other districts takes 3 to 5 business days. Safe transit packaging is guaranteed.",
  },
  {
    question: "Is EMI payment option available?",
    answer: "Yes, we support EMI schemes up to 12 months with major credit cards from selected partner banks in Bangladesh. You can choose your preferred bank and installment tenure during the checkout process.",
  },
  {
    question: "Can I get assembly support for my E-Bike?",
    answer: "Absolutely! We offer free professional assembly and safety verification services for customers within Dhaka and Chattogram. For other regions, we provide detailed video manuals and dedicated phone support.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-[#faf9f6] border-b border-stone-200/50">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Support Center
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-stone-500 mt-2">
            Got questions about warranty, delivery, or specifications? We&apos;ve got you covered.
          </p>
        </div>

        {/* Collapsible FAQ List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "border bg-white rounded-2xl transition-all duration-200",
                  isOpen ? "border-emerald-600/25 shadow-sm" : "border-stone-200/60"
                )}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-bold text-stone-850 hover:text-[#141824] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ml-4",
                      isOpen ? "transform rotate-180 text-emerald-700" : ""
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-40 border-t border-stone-100" : "max-h-0"
                  )}
                >
                  <p className="p-5 text-xs md:text-sm text-stone-550 leading-relaxed bg-stone-50/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
