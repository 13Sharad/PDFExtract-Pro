import React from "react";
import { Upload, FileSearch, Download } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Upload className="w-5 h-5 text-primary" />,
      title: "Upload PDF",
      description: "Drop your PDF file into the secure workspace, adjusting your layout extraction settings as required.",
    },
    {
      num: "02",
      icon: <FileSearch className="w-5 h-5 text-primary" />,
      title: "Extract Text",
      description: "PDF.js compiles page rendering layers locally, extracting layout strings and paragraph separations.",
    },
    {
      num: "03",
      icon: <Download className="w-5 h-5 text-primary" />,
      title: "Copy or Download",
      description: "Instantly copy text streams directly to your clipboard or download clean formatted plain text files.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-secondary/5 border-y border-border/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How PDFExtract Pro Works
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Convert documents in three straightforward steps. No software installations or registrations needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={`step-${idx}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center space-y-4 relative group"
            >
              {/* Number overlay */}
              <div className="absolute top-[-30px] text-7xl font-extrabold text-foreground/5 select-none transition-all duration-300 group-hover:text-primary/5">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className="p-4 rounded-full bg-background border shadow-md flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105 border-border/60">
                {step.icon}
              </div>

              {/* Text */}
              <div className="space-y-2 relative z-10">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
