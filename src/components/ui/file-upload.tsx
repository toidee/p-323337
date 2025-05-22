
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  id: string;
  name: string;
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onFileChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  defaultFile?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 20, // default to 20MB
  onFileChange,
  error,
  helperText,
  className,
  required = false,
  defaultFile = null,
}) => {
  const [file, setFile] = useState<File | null>(defaultFile);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [localError, setLocalError] = useState<string>("");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    validateAndSetFile(selectedFile);
  };
  
  const validateAndSetFile = (selectedFile: File | null) => {
    setLocalError("");
    
    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }
    
    // Check file size
    const fileSizeInMB = selectedFile.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      setLocalError(`File size exceeds ${maxSize}MB limit`);
      return;
    }
    
    // Check file type
    const fileType = selectedFile.type;
    const acceptTypes = accept.split(",").map(type => 
      type.trim().replace(".", "").toLowerCase()
    );
    
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !acceptTypes.some(type => 
      fileType.includes(type) || fileExtension === type
    )) {
      setLocalError(`Invalid file type. Accepted: ${accept}`);
      return;
    }
    
    // Simulate upload progress
    setFile(selectedFile);
    onFileChange(selectedFile);
    simulateUpload();
  };
  
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };
  
  const removeFile = () => {
    setFile(null);
    onFileChange(null);
    setUploadProgress(0);
  };
  
  const displayError = error || localError;
  
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
            isDragging
              ? "border-orange-500 bg-orange-50"
              : displayError
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
          )}
          onClick={() => document.getElementById(id)?.click()}
        >
          <input
            id={id}
            name={name}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="sr-only"
            required={required}
          />
          
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 font-medium">
            Drag & drop or{" "}
            <span className="text-orange-500">browse files</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {accept.split(",").join(", ")} files up to {maxSize}MB
          </p>
        </div>
      ) : (
        <div className="border rounded-md p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <File className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          
          <div className="space-y-1">
            <Progress value={uploadProgress} className="h-1 bg-gray-200" />
            <p className="text-xs text-right text-gray-500">
              {Math.round(file.size / 1024)} KB
            </p>
          </div>
        </div>
      )}
      
      {displayError && (
        <p className="text-sm text-red-500">{displayError}</p>
      )}
      
      {helperText && !displayError && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export { FileUpload };
