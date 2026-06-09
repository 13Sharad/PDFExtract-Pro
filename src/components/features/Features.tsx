import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, ShieldCheck, Copy, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Fast PDF Processing",
      description: "Direct web-assembly rendering extracts text from extensive documents in fractions of a second.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Secure Conversion",
      description: "Complete local browser execution ensures your private reports and papers never traverse the web.",
    },
    {
      icon: <Copy className="w-6 h-6 text-blue-500" />,
      title: "Copy Text",
      description: "Instantly synchronize extracted strings to your clipboard with custom clean-whitespace formatting.",
    },
    {
      icon: <Download className="w-6 h-6 text-indigo-500" />,
      title: "Download Text",
      description: "Export clean plain-text documents directly to your local file system, organized by original page markers.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything you need for extraction
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
          Our browser utility is designed with simple aesthetics and high-performance algorithms to replace complex online converters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={`feat-${idx}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <Card className="h-full border-border/50 bg-secondary/5 hover:bg-secondary/15 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
              <CardHeader className="pb-3">
                <div className="p-3 w-fit rounded-lg bg-background border shadow-sm group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300 mb-3">
                  {feat.icon}
                </div>
                <CardTitle className="text-base font-bold">{feat.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {feat.description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
