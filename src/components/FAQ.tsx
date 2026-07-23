import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useContent } from "../context/ContentContext";

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Paid campaigns on Google Ads and Meta Ads typically show measurable results in 4 to 6 weeks. Organic Search Engine Optimization and content marketing build compounding returns over 3 to 6 months. We share weekly performance updates from day one so you always know where you stand.",
  },
  {
    question: "Do you offer custom AI marketing plans?",
    answer: "Yes. Every plan is built around your specific industry, audience, budget, and goals. No templates. No copy-paste strategies. Every campaign we run is tailored after a discovery audit.",
  },
  {
    question: "What is a Free Marketing Audit?",
    answer: "A no-commitment review of your website performance, SEO health, social media engagement, and ad spend efficiency. You receive a clear report identifying exactly where you are losing revenue and what to fix first.",
  },
  {
    question: "How do you track success?",
    answer: "Through real-time dashboards connected to Google Analytics, Google Search Console, Meta Ads Manager, and our internal AI reporting tools. You see every metric live, 24/7. No monthly PDF surprises.",
  },
  {
    question: "Which industries do you specialize in?",
    answer: "E-Commerce, SaaS & Tech, and Ed-Tech are our strongest verticals with proven case studies. We also work with Real Estate, Energy, and NGO clients on a project basis.",
  },
];

function FAQItem({ faq, index }: { faq: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border-b border-slate-100 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-600'}`}>
          {faq.question}
        </span>
        <div className={`p-2 rounded-lg border transition-all ${isOpen ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed max-w-3xl font-medium">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { faq: dynamicFaq } = useContent();
  const displayFaqs = dynamicFaq && dynamicFaq.length > 0 ? dynamicFaq : faqs;

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Everything you need to know about growing your brand with WeBestOne.
            </p>
          </motion.div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
          {displayFaqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
