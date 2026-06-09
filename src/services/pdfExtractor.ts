/* eslint-disable @typescript-eslint/no-explicit-any */
import { PDFMetadata, ExtractionResult, PageExtraction, PDFParserConfig } from "../types/pdf";

export class PDFExtractor {
  private pdfjs: any = null;

  private async getPdfjs() {
    if (this.pdfjs) return this.pdfjs;

    if (typeof window === "undefined") {
      throw new Error("PDFExtractor can only run in a browser environment.");
    }

    if ((window as any).pdfjsLib) {
      this.pdfjs = (window as any).pdfjsLib;
      return this.pdfjs;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      // Use stable v3.11.174 which works flawlessly in all browsers without ESM/Webpack conflicts
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        this.pdfjs = pdfjsLib;
        resolve(pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN"));
      document.head.appendChild(script);
    });
  }

  /**
   * Load PDF and read metadata (total pages, file info)
   */
  async getMetadata(file: File): Promise<PDFMetadata> {
    const pdfjs = await this.getPdfjs();
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    return {
      name: file.name,
      size: file.size,
      totalPages: pdfDoc.numPages,
      lastModified: file.lastModified,
    };
  }

  /**
   * Extract text content page-by-page with progress reporting.
   */
  async extractText(
    file: File,
    config: PDFParserConfig,
    onProgress?: (progress: number, currentPage: number) => void
  ): Promise<ExtractionResult> {
    const pdfjs = await this.getPdfjs();
    const startTime = performance.now();

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });

    loadingTask.onProgress = (data: { loaded: number; total: number }) => {
      if (data.total > 0 && onProgress) {
        const pct = Math.round((data.loaded / data.total) * 15);
        onProgress(pct, 0);
      }
    };

    const pdfDoc = await loadingTask.promise;
    const totalPages = pdfDoc.numPages;
    const pages: PageExtraction[] = [];
    let fullText = "";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      let pageText = "";

      if (config.preserveLayout) {
        let lastY: number | null = null;
        for (const item of textContent.items as any[]) {
          const currentY = item.transform[5];
          if (lastY !== null && Math.abs(currentY - lastY) > 5) {
            pageText += "\n";
          } else if (pageText !== "" && !pageText.endsWith(" ")) {
            pageText += " ";
          }
          pageText += item.str;
          lastY = currentY;
        }
      } else {
        pageText = textContent.items.map((item: any) => item.str).join(" ");
      }

      if (config.addPageMarkers) {
        pageText = `--- PAGE ${pageNum} ---\n${pageText}\n`;
      }

      if (config.cleanWhitespace) {
        pageText = pageText
          .replace(/[ \t]+/g, " ")
          .replace(/\n\s*\n/g, "\n\n")
          .trim() + "\n";
      }

      const wordCount = pageText.split(/\s+/).filter(Boolean).length;
      const charCount = pageText.length;

      pages.push({ pageNumber: pageNum, text: pageText, wordCount, charCount });
      fullText += pageText;

      if (onProgress) {
        onProgress(15 + Math.round((pageNum / totalPages) * 85), pageNum);
      }
    }

    const durationMs = Math.round(performance.now() - startTime);
    const totalWords = pages.reduce((s, p) => s + p.wordCount, 0);
    const totalChars = pages.reduce((s, p) => s + p.charCount, 0);

    return { rawText: fullText, pages, totalWords, totalChars, durationMs };
  }
}
