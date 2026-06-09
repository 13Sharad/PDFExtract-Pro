import { useCallback, useRef } from "react";
import { usePDFStore } from "@/store/use-pdf-store";
import { PDFExtractor } from "@/services/pdfExtractor";
import { toast } from "sonner";

export function usePDFParser() {
  const store = usePDFStore();
  const extractorRef = useRef<PDFExtractor | null>(null);

  const getExtractor = useCallback(() => {
    if (!extractorRef.current) {
      extractorRef.current = new PDFExtractor();
    }
    return extractorRef.current;
  }, []);

  const parseFile = useCallback(
    async (file: File) => {
      if (!file) return;

      const extractor = getExtractor();
      store.reset();
      store.setFile(file);
      store.setStatus("loading");

      try {
        // Step 1: Read metadata
        const metadata = await extractor.getMetadata(file);
        store.setMetadata(metadata);
        store.setStatus("parsing");

        // Step 2: Extract text
        const result = await extractor.extractText(
          file,
          store.config,
          (progress, currentPage) => {
            store.setProgress(progress);
            store.setCurrentPage(currentPage);
          }
        );

        store.setResult(result);
        store.setStatus("completed");
        
        store.addRecentUpload({
          id: Date.now().toString(),
          name: metadata.name,
          date: Date.now(),
          size: metadata.size,
          words: result.totalWords,
        });
        
        toast.success("PDF extraction completed successfully!", {
          description: `Extracted ${result.totalWords} words across ${metadata.totalPages} pages in ${(result.durationMs / 1000).toFixed(2)}s.`,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during extraction.";
        store.setError({ message: errorMessage });
        store.setStatus("error");
        
        toast.error("Extraction failed", {
          description: errorMessage,
        });
      }
    },
    [getExtractor, store]
  );

  return {
    parseFile,
    reset: store.reset,
    status: store.status,
    progress: store.progress,
    currentPage: store.currentPage,
    result: store.result,
    metadata: store.metadata,
    error: store.error,
    config: store.config,
    updateConfig: store.updateConfig,
  };
}
