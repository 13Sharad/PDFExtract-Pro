import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Eye, ShieldCheck, Database } from "lucide-react";

export function Hero() {
  const scrollToWorkspace = () => {
    const el = document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24 pb-16">
      {/* Premium background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/20 blur-[130px] pointer-events-none"
      />

      <div className="z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary animate-pulse-slow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Secure Client-Side Technology
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Extract Text from PDFs{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent-foreground">
            Securely & Instantly
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-normal"
        >
          No server uploads, no data leaks, no subscription walls. Your files are parsed directly inside your browser for total confidentiality and speed.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Button variant="glow" size="lg" onClick={scrollToWorkspace} className="gap-2 px-8 h-12 shadow-lg">
            Start Converting Free <ArrowRight className="w-4.5 h-4.5" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => {
            const el = document.getElementById("features");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }} className="px-8 h-12 border-border/60 bg-background/5 hover:bg-secondary/15">
            Learn More
          </Button>
        </motion.div>

        {/* Floating Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 border-t border-border/20 pt-8 w-full max-w-2xl text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2 justify-center">
            <ShieldCheck className="w-4.5 h-4.5 text-primary/80" />
            <span>100% Client-Side Security</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Eye className="w-4.5 h-4.5 text-primary/80" />
            <span>Zero File Transmissions</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Database className="w-4.5 h-4.5 text-primary/80" />
            <span>Layout Coordinates Intact</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
