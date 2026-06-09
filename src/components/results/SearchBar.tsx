"use client";

import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePDFStore } from "@/store/use-pdf-store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = usePDFStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F or Cmd+F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Esc to clear search if focused
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchQuery]);

  return (
    <div className="relative w-full sm:w-72 group">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search text (Ctrl+F)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8 h-9 bg-background/50 focus:bg-background transition-colors"
      />
    </div>
  );
}
