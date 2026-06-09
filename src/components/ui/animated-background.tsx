"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-50 bg-background" />;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none">
      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen dark:mix-blend-lighten"
      />
      {/* Accent Glow */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/20 blur-[120px] mix-blend-screen dark:mix-blend-lighten"
      />
      {/* Subtle Bottom Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-purple-500/10 blur-[100px] mix-blend-screen dark:mix-blend-lighten"
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
