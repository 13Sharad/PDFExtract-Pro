import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-card/20 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold tracking-tight text-foreground">
            PDFExtract <span className="text-primary">Pro</span>
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <p>© {currentYear} PDFExtract Pro. This is a group project.</p>
          <p className="text-xs flex items-center gap-1">
            Built client-side with Next.js & PDF.js
          </p>
        </div>

      </div>
    </footer>
  );
}
