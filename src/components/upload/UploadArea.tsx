/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadArea({ onFileSelect, disabled = false }: UploadAreaProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (disabled) return;

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        const error = rejection.errors[0];

        if (error.code === "file-invalid-type") {
          toast.error("Invalid file type", {
            description: "Only PDF documents are supported.",
          });
        } else if (error.code === "file-too-large") {
          toast.error("File is too large", {
            description: "Maximum file size allowed is 20MB.",
          });
        } else {
          toast.error("Upload failed", {
            description: error.message || "Something went wrong.",
          });
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, disabled]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 20 * 1024 * 1024, // 20 MB
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center focus:outline-none
        ${isDragActive ? "border-primary bg-primary/5 scale-[0.99] glow-primary" : "border-border/60 hover:border-primary/50 bg-secondary/10 hover:bg-secondary/20"}
        ${isDragReject ? "border-error bg-error/5" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <input {...getInputProps()} />

      <motion.div
        animate={{ y: isDragActive ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="p-4 rounded-full bg-background border shadow-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary mb-4"
      >
        {isDragReject ? (
          <AlertCircle className="w-8 h-8 text-error" />
        ) : isDragActive ? (
          <Upload className="w-8 h-8 text-primary animate-bounce" />
        ) : (
          <FileText className="w-8 h-8" />
        )}
      </motion.div>

      <div className="space-y-2 max-w-xs">
        <h3 className="font-semibold text-base text-foreground">
          {isDragActive ? "Drop your PDF here" : "Upload your PDF"}
        </h3>
        <p className="text-sm text-muted-foreground leading-normal">
          Drag and drop your document here, or <span className="text-primary font-medium underline hover:text-primary/95">browse</span> to select a file.
        </p>
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-muted-foreground/85">
          <span className="px-1.5 py-0.5 rounded border bg-background">PDF only</span>
          <span>•</span>
          <span className="px-1.5 py-0.5 rounded border bg-background">Max 20MB</span>
        </div>
      </div>
    </div>
  );
}
