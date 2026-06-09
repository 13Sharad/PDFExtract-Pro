import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <Loader2 className="absolute w-6 h-6 text-primary animate-pulse" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground font-medium animate-pulse">
        Loading PDFExtract Pro...
      </p>
    </div>
  );
}
