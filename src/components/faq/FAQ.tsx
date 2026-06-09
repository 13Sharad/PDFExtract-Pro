import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is my document data secure?",
      a: "Absolutely. PDFExtract Pro uses client-side WebAssembly and JS workers. All extraction takes place directly inside your browser's sandboxed environment. Your files are never sent to a server, keeping your private data completely safe.",
    },
    {
      q: "Are there any file size limitations?",
      a: "Yes, the workspace is optimized for files up to 20MB. This restriction prevents browser memory overflow and ensures quick client-side rendering.",
    },
    {
      q: "Can I preserve column layouts or complex text structures?",
      a: "Yes. By activating 'Preserve Layout' in the settings, the extractor groups characters vertically by checking line height variations (Y coordinates). This aligns columns and tabular structures correctly.",
    },
    {
      q: "Is this utility free to use?",
      a: "Yes, PDFExtract Pro is a group project. It is fully free and has no advertisements, registrations, or usage caps.",
    },
  ];

  const toggleFAQ = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-6 max-w-3xl mx-auto scroll-mt-20">
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" /> Support
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Find responses to standard questions about security, sizes, and formats.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <div
              key={`faq-${idx}`}
              className="border border-border/60 rounded-xl bg-card/40 overflow-hidden transition-all duration-300 hover:border-primary/20"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 flex items-center justify-between text-left font-medium text-sm sm:text-base text-foreground focus:outline-none bg-transparent"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
