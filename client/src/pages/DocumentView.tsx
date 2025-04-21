
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, File, Calendar } from "lucide-react";

// Dummy data for document details
const documentsData = {
  "1": {
    id: "1",
    name: "Blood Test Results",
    description: "Annual blood work from Dr. Smith",
    date: "2023-04-01",
    tags: ["lab-results", "annual-checkup"],
    type: "PDF",
  },
  "2": {
    id: "2",
    name: "COVID-19 Vaccination Card",
    description: "Vaccination record with booster shots",
    date: "2023-02-15",
    tags: ["vaccination", "covid"],
    type: "PDF",
  },
  "3": {
    id: "3",
    name: "Chest X-Ray",
    description: "Chest X-ray from City Hospital",
    date: "2022-11-22",
    tags: ["x-ray", "radiology"],
    type: "PDF",
  },
  "4": {
    id: "4",
    name: "Insurance Card",
    description: "Health insurance documentation",
    date: "2022-09-10",
    tags: ["insurance", "administrative"],
    type: "PDF",
  },
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchDocument = () => {
      setIsLoading(true);
      setTimeout(() => {
        if (id && documentsData[id as keyof typeof documentsData]) {
          setDocument(documentsData[id as keyof typeof documentsData]);
        } else {
          // Handle document not found
          navigate("/history");
        }
        setIsLoading(false);
      }, 1000);
    };

    fetchDocument();
  }, [id, navigate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Document Viewer">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!document) {
    return (
      <DashboardLayout title="Document Not Found">
        <div className="text-center">
          <p className="mb-4">The document you're looking for could not be found.</p>
          <Button asChild>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Document History
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={document.name}>
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/history")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Document History
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <File className="h-8 w-8 text-primary" />
                </div>
                
                <div className="text-center">
                  <h2 className="font-medium">{document.name}</h2>
                  <p className="text-sm text-gray-500">{document.type} Document</p>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(document.date)}
                </div>
                
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600 text-sm">{document.description}</p>
              
              <h3 className="font-medium mt-4 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {document.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">PDF Viewer would be embedded here</p>
                  <p className="text-sm text-gray-400 mt-2">
                    In a production environment, this would display the actual PDF document
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentView;
