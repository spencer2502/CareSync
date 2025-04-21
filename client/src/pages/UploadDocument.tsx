import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, File, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UploadDocument = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [documentType, setDocumentType] = useState("General");

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        
        // Auto-fill document name from filename
        if (!documentName) {
          setDocumentName(droppedFile.name.replace(".pdf", ""));
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF document",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        
        // Auto-fill document name from filename
        if (!documentName) {
          setDocumentName(selectedFile.name.replace(".pdf", ""));
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF document",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload API call
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Document uploaded successfully",
        description: `${documentName} has been uploaded to your account`,
      });
      
      // Reset form
      setFile(null);
      setDocumentName("");
      setDescription("");
      setTags("");
      setDocumentType("General");
    }, 2000);
  };

  return (
    <DashboardLayout title="Upload Document">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-primary hover:bg-gray-50"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <File className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drag and drop your PDF file here
                      </p>
                      <p className="text-gray-500 mt-1">
                        or click to browse from your computer
                      </p>
                    </div>
                    <div>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name
                  </label>
                  <Input
                    id="document-name"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    placeholder="e.g., Blood Test Results"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <Select
                    value={documentType}
                    onValueChange={setDocumentType}
                  >
                    <SelectTrigger id="document-type" className="w-full">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                      <SelectItem value="LabReport">Lab Report</SelectItem>
                      <SelectItem value="Imaging">Imaging</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details about this document"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (Optional)
                  </label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., lab-results, cardiology, annual-checkup"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate tags with commas
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" disabled={!file || isUploading} className="w-full">
                  {isUploading ? (
                    <>Uploading...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Upload Document
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadDocument;
