import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UploadArea } from "./UploadArea";
import { FilePreview } from "./FilePreview";
import { usePDFStore } from "@/store/use-pdf-store";
import { usePDFParser } from "@/hooks/use-pdf-parser";
import { Settings, Sparkles } from "lucide-react";

export function UploadCard() {
  const { file, metadata, status, progress, currentPage, error, config, updateConfig, reset } = usePDFStore();
  const { parseFile } = usePDFParser();

  const handleFileSelect = (selectedFile: File) => {
    parseFile(selectedFile);
  };

  return (
    <Card glass className="w-full shadow-xl glow-accent border-border/40 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="w-5 h-5 text-primary" />
          Workspace
        </CardTitle>
        <CardDescription>
          Upload your PDF document to begin client-side extraction.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {file ? (
          <FilePreview
            fileName={file.name}
            fileSize={file.size}
            status={status}
            progress={progress}
            currentPage={currentPage}
            totalPages={metadata?.totalPages}
            error={error?.message}
            onRemove={reset}
          />
        ) : (
          <UploadArea onFileSelect={handleFileSelect} disabled={status === "loading" || status === "parsing"} />
        )}

        {/* Configuration Panel */}
        <div className="border-t border-border/40 pt-4 mt-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" /> Extraction Settings
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Clean Whitespace */}
            <label className="flex items-center gap-2 p-3 rounded-lg border bg-secondary/5 hover:bg-secondary/10 cursor-pointer text-xs font-medium text-foreground select-none transition-all duration-200">
              <input
                type="checkbox"
                checked={config.cleanWhitespace}
                disabled={status === "loading" || status === "parsing"}
                onChange={(e) => updateConfig({ cleanWhitespace: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
              />
              <div className="space-y-0.5">
                <span className="block font-medium">Clean Spacing</span>
                <span className="block text-[10px] text-muted-foreground/80 font-normal">Remove extra spaces</span>
              </div>
            </label>

            {/* Preserve Layout */}
            <label className="flex items-center gap-2 p-3 rounded-lg border bg-secondary/5 hover:bg-secondary/10 cursor-pointer text-xs font-medium text-foreground select-none transition-all duration-200">
              <input
                type="checkbox"
                checked={config.preserveLayout}
                disabled={status === "loading" || status === "parsing"}
                onChange={(e) => updateConfig({ preserveLayout: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
              />
              <div className="space-y-0.5">
                <span className="block font-medium">Preserve Layout</span>
                <span className="block text-[10px] text-muted-foreground/80 font-normal">Group by text lines</span>
              </div>
            </label>

            {/* Add Page Markers */}
            <label className="flex items-center gap-2 p-3 rounded-lg border bg-secondary/5 hover:bg-secondary/10 cursor-pointer text-xs font-medium text-foreground select-none transition-all duration-200">
              <input
                type="checkbox"
                checked={config.addPageMarkers}
                disabled={status === "loading" || status === "parsing"}
                onChange={(e) => updateConfig({ addPageMarkers: e.target.checked })}
                className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
              />
              <div className="space-y-0.5">
                <span className="block font-medium">Page Separators</span>
                <span className="block text-[10px] text-muted-foreground/80 font-normal">Add PAGE markers</span>
              </div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
