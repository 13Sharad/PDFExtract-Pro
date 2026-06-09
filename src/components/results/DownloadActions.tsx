"use client";

import React, { useState } from "react";
import { Copy, Check, FileJson, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePDFStore } from "@/store/use-pdf-store";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function DownloadActions() {
  const { result, metadata } = usePDFStore();
  const [copied, setCopied] = useState(false);

  if (!result || !metadata) return null;

  const originalName = metadata.name.substring(0, metadata.name.lastIndexOf(".")) || metadata.name;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.rawText);
      setCopied(true);
      toast.success("Text copied to clipboard", {
        description: `Successfully copied ${result.totalWords.toLocaleString()} words.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([result.rawText], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${originalName}_extracted.txt`);
    toast.success("TXT Download started");
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify({ metadata, result }, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    downloadBlob(blob, `${originalName}_extracted.json`);
    toast.success("JSON Download started");
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 h-8 relative w-[80px]">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 text-success"
            >
              <Check className="w-3.5 h-3.5" /> Copied
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <Button variant="outline" size="sm" onClick={handleDownloadJSON} className="gap-1.5 h-8">
        <FileJson className="w-3.5 h-3.5" /> JSON
      </Button>
      <Button variant="default" size="sm" onClick={handleDownloadTXT} className="gap-1.5 h-8">
        <FileText className="w-3.5 h-3.5" /> TXT
      </Button>
    </div>
  );
}
