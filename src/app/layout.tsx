import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDFExtract Pro - Advanced In-Browser PDF to Text Converter",
  description: "Extract text from PDFs securely inside your browser. No server uploads, zero data leaks, instant parsing. Features layout preservation, search, and JSON export.",
  keywords: ["pdf to text", "pdf converter", "secure pdf parsing", "in-browser pdf extractor", "pdf.js", "nextjs pdf", "pdf to json", "offline pdf converter"],
  authors: [{ name: "PDFExtract Pro Team" }],
  creator: "PDFExtract Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdfextractpro.com",
    title: "PDFExtract Pro - Secure PDF to Text Converter",
    description: "Extract text from PDFs securely inside your browser. No server uploads, zero data leaks.",
    siteName: "PDFExtract Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFExtract Pro - Secure PDF to Text Converter",
    description: "Extract text from PDFs securely inside your browser. No server uploads, zero data leaks.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-primary/20">
        {children}
        <Toaster position="bottom-right" closeButton richColors theme="dark" />
      </body>
    </html>
  );
}
