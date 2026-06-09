import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ExtractionStatus,
  PDFMetadata,
  ExtractionResult,
  ExtractionError,
  PDFParserConfig,
  RecentUpload,
} from "@/types";

interface PDFStoreState {
  file: File | null;
  metadata: PDFMetadata | null;
  status: ExtractionStatus;
  progress: number;
  currentPage: number;
  result: ExtractionResult | null;
  error: ExtractionError | null;
  config: PDFParserConfig;
  searchQuery: string;
  recentUploads: RecentUpload[];
}

interface PDFStoreActions {
  setFile: (file: File | null) => void;
  setMetadata: (metadata: PDFMetadata | null) => void;
  setStatus: (status: ExtractionStatus) => void;
  setProgress: (progress: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setResult: (result: ExtractionResult | null) => void;
  setError: (error: ExtractionError | null) => void;
  updateConfig: (config: Partial<PDFParserConfig>) => void;
  setSearchQuery: (query: string) => void;
  addRecentUpload: (upload: RecentUpload) => void;
  clearHistory: () => void;
  reset: () => void;
}

const initialConfig: PDFParserConfig = {
  cleanWhitespace: true,
  preserveLayout: false,
  addPageMarkers: true,
};

export const usePDFStore = create<PDFStoreState & PDFStoreActions>()(
  persist(
    (set) => ({
      file: null,
      metadata: null,
      status: "idle",
      progress: 0,
      currentPage: 0,
      result: null,
      error: null,
      config: initialConfig,
      searchQuery: "",
      recentUploads: [],

      setFile: (file) => set({ file }),
      setMetadata: (metadata) => set({ metadata }),
      setStatus: (status) => set({ status }),
      setProgress: (progress) => set({ progress }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setResult: (result) => set({ result }),
      setError: (error) => set({ error }),
      updateConfig: (newConfig) =>
        set((state) => ({ config: { ...state.config, ...newConfig } })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addRecentUpload: (upload) =>
        set((state) => {
          // Keep only top 10 recent uploads
          const newHistory = [upload, ...state.recentUploads.filter((u) => u.id !== upload.id)].slice(0, 10);
          return { recentUploads: newHistory };
        }),
      clearHistory: () => set({ recentUploads: [] }),
      reset: () =>
        set({
          file: null,
          metadata: null,
          status: "idle",
          progress: 0,
          currentPage: 0,
          result: null,
          error: null,
          searchQuery: "",
        }),
    }),
    {
      name: "pdf-extract-pro-storage",
      partialize: (state) => ({
        config: state.config,
        recentUploads: state.recentUploads,
      }), // Only persist these fields
    }
  )
);
