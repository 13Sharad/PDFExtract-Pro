/**
 * Format bytes into readable file size (e.g. 1.24 MB)
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format milliseconds into human-readable duration (e.g. 1.2s or 850ms)
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Clean whitespace and lines from extracted text
 */
export function cleanExtractedText(text: string): string {
  return text
    .replace(/[ \t]+/g, " ") // replace multiple spaces/tabs with single space
    .replace(/\n\s*\n/g, "\n\n") // replace multiple empty lines with a single empty line
    .trim();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength = 200): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
