"use client";

import React from "react";
import { Layers, Activity, Clock } from "lucide-react";
import { usePDFStore } from "@/store/use-pdf-store";
import { formatDuration } from "@/utils/formatters";

export function StatsCard() {
  const { result, metadata } = usePDFStore();

  if (!result || !metadata) return null;

  // Calculate reading time (avg 238 words per minute)
  const readingTimeMin = Math.max(1, Math.ceil(result.totalWords / 238));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-border/30 bg-secondary/5 divide-x divide-y sm:divide-y-0 divide-border/20">
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Pages
        </span>
        <span className="text-lg font-bold text-foreground">{metadata.totalPages}</span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Words</span>
        <span className="text-lg font-bold text-foreground">{result.totalWords.toLocaleString()}</span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Characters</span>
        <span className="text-lg font-bold text-foreground">{result.totalChars.toLocaleString()}</span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Reading Time
        </span>
        <span className="text-lg font-bold text-foreground">{readingTimeMin} min</span>
      </div>
      <div className="p-4 flex flex-col gap-1 sm:col-span-1 col-span-2">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
          <Activity className="w-3.5 h-3.5" /> Parse Duration
        </span>
        <span className="text-lg font-bold text-foreground">{formatDuration(result.durationMs)}</span>
      </div>
    </div>
  );
}
