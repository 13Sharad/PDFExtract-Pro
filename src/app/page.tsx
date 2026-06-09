"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Features } from "@/components/features/Features";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { FAQ } from "@/components/faq/FAQ";
import { Footer } from "@/components/footer/Footer";
import { UploadCard } from "@/components/upload/UploadCard";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { usePDFStore } from "@/store/use-pdf-store";
import { ResultsContainer } from "@/components/results/ResultsContainer";

export default function Home() {
  const { result } = usePDFStore();

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Workspace Section */}
      <section id="workspace" className="py-16 px-6 max-w-4xl mx-auto scroll-mt-24 flex flex-col gap-10">
        <UploadCard />

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="results-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ResultsContainer />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <Features />

      {/* How it works Section */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
