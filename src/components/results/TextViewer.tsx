"use client";

import React, { useMemo } from "react";
import { usePDFStore } from "@/store/use-pdf-store";

interface TextViewerProps {
  currentPageView: number | "all";
}

export function TextViewer({ currentPageView }: TextViewerProps) {
  const { result, searchQuery } = usePDFStore();

  const displayedText = useMemo(() => {
    if (!result) return "";
    let textToDisplay = "";

    if (currentPageView === "all") {
      textToDisplay = result.pages.map((p) => p.text).join("\n");
    } else {
      const pageObj = result.pages.find((p) => p.pageNumber === currentPageView);
      textToDisplay = pageObj ? pageObj.text : "";
    }

    return textToDisplay;
  }, [result, currentPageView]);

  const renderHighlightedText = () => {
    if (!searchQuery.trim()) {
      return displayedText;
    }

    // Escape regex characters from search query
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = displayedText.split(new RegExp(`(${escapedQuery})`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={index} className="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <div className="relative w-full h-80 sm:h-96 p-6 overflow-y-auto bg-background/5">
      <pre className="font-mono text-xs leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
        {displayedText ? renderHighlightedText() : "No text available."}
      </pre>
    </div>
  );
}
