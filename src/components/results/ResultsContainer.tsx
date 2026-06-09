"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw } from "lucide-react";
import { usePDFStore } from "@/store/use-pdf-store";
import { StatsCard } from "./StatsCard";
import { SearchBar } from "./SearchBar";
import { DownloadActions } from "./DownloadActions";
import { TextViewer } from "./TextViewer";

export function ResultsContainer() {
  const { result, metadata, reset } = usePDFStore();
  const [currentPageView, setCurrentPageView] = useState<number | "all">("all");

  if (!result || !metadata) return null;

  return (
    <Card glass className="w-full shadow-2xl border-border/40 overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Extracted Results
            </CardTitle>
            <CardDescription>
              Review, filter, and export the extracted text elements.
            </CardDescription>
          </div>
          <DownloadActions />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <StatsCard />

        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-border/20 bg-card/30">
          <SearchBar />

          {/* Page Picker */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-end">
            <span className="text-xs text-muted-foreground font-medium mr-1">View:</span>
            <Button
              key="all-pages-btn"
              variant={currentPageView === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPageView("all")}
              className="h-7 px-2.5 text-xs rounded-md transition-colors"
            >
              All Pages
            </Button>
            {result.pages.map((p) => (
              <Button
                key={`p-view-${p.pageNumber}`}
                variant={currentPageView === p.pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPageView(p.pageNumber)}
                className="h-7 px-2 text-xs rounded-md transition-colors"
              >
                P. {p.pageNumber}
              </Button>
            ))}
          </div>
        </div>

        <TextViewer currentPageView={currentPageView} />

        {/* Reset trigger */}
        <div className="p-4 border-t border-border/30 flex justify-end bg-secondary/5">
          <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 h-8 text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Start New Conversion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
