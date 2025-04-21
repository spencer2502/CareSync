
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const demoPdfPath = "/demo_report.pdf"; // File should be placed in /public/demo_report.pdf

const PatientDocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <DashboardLayout title="View Document">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={demoPdfPath}
          title="Demo Report PDF"
          className="w-full h-full rounded-lg bg-white border"
        />
      </div>
      <div className="text-center text-sm text-gray-400 mt-2">
        This is a demo PDF shown for every patient document.
      </div>
    </DashboardLayout>
  );
};

export default PatientDocumentView;
