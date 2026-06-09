import React from "react";
import { FileText, Trash2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/utils/formatters";
import { ExtractionStatus } from "@/types";

interface FilePreviewProps {
  fileName: string;
  fileSize: number;
  status: ExtractionStatus;
  progress: number;
  currentPage: number;
  totalPages?: number;
  error?: string | null;
  onRemove: () => void;
}

export function FilePreview({
  fileName,
  fileSize,
  status,
  progress,
  currentPage,
  totalPages,
  error,
  onRemove,
}: FilePreviewProps) {
  const isProcessing = status === "loading" || status === "parsing";
  const isCompleted = status === "completed";
  const isError = status === "error";

  return (
    <div className="w-full p-4 rounded-xl border border-border/60 bg-secondary/5 flex flex-col gap-4">
      {/* File Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-sm text-foreground truncate max-w-[240px] sm:max-w-md">
              {fileName}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatBytes(fileSize)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </Badge>
          )}
          {isError && (
            <Badge variant="error" className="gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Error
            </Badge>
          )}
          {isProcessing && (
            <Badge variant="glass" className="gap-1 text-primary border-primary/20">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> Processing
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-muted-foreground hover:text-error hover:bg-error/10 w-8 h-8 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>
              {status === "loading"
                ? "Reading document..."
                : `Extracting pages (${currentPage}/${totalPages || "?"})`}
            </span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {/* Error Details */}
      {isError && error && (
        <div className="p-3 rounded-lg bg-error/5 border border-error/20 flex items-start gap-2 text-xs text-error">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-error">Extraction Failed:</span>
            <p className="leading-relaxed text-muted-foreground">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
