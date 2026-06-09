export interface PDFMetadata {
  name: string;
  size: number;
  totalPages: number;
  lastModified?: number;
}

export interface PageExtraction {
  pageNumber: number;
  text: string;
  wordCount: number;
  charCount: number;
}

export interface ExtractionResult {
  rawText: string;
  pages: PageExtraction[];
  totalWords: number;
  totalChars: number;
  durationMs: number;
}

export interface PDFParserConfig {
  cleanWhitespace: boolean;
  preserveLayout: boolean;
  addPageMarkers: boolean;
}

export interface RecentUpload {
  id: string;
  name: string;
  date: number;
  size: number;
  words: number;
}
