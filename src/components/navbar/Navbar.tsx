import React, { useEffect, useState } from "react";
import { Sparkles, Moon, Sun, ArrowRight, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-border/40 py-3.5 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            PDFExtract <span className="text-primary">Pro</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-foreground transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection("features")} className="hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="hover:text-foreground transition-colors">
            How It Works
          </button>
          <button onClick={() => scrollToSection("faq")} className="hover:text-foreground transition-colors">
            FAQ
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 text-muted-foreground hover:text-foreground rounded-lg"
          >
            {theme === "dark" ? <Sun className="w-4 w-4" /> : <Moon className="w-4 w-4" />}
          </Button>

          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex h-9 rounded-lg text-xs font-semibold gap-1.5 border-border/60">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FileCode className="w-3.5 h-3.5" /> Repository
            </a>
          </Button>

          <Button variant="default" size="sm" onClick={() => scrollToSection("workspace")} className="h-9 rounded-lg text-xs font-semibold gap-1.5 shadow-sm">
            Launch Workspace <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
