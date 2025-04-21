import React from "react";
import DoctorLayout from "@/components/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare, File, Users, CheckCircle, XCircle, ClipboardList, Info } from "lucide-react";

const DoctorHelpPage = () => {
  return (
    <DoctorLayout title="Doctor Help Center">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="bg-secondary/10 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Doctor Portal Help Center
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-4">
              Find assistance for using the doctor portal, reviewing patient documents, and managing records.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button asChild>
                <a href="mailto:doctor-support@caresync.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Support
                </a>
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" /> Priority Line: +91 98111 22334
              </Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-medium">
              How do I review patient documents?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>To review patient documents:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Navigate to the "Document Reviews" page from your dashboard</li>
                  <li>Select the "Pending Review" tab to see documents awaiting your review</li>
                  <li>Click "View" to open the document for review</li>
                  <li>Use the "Approve" or "Reject" buttons to update the document status</li>
                  <li>Optionally add comments for the patient</li>
                </ol>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/doctor/reviews">
                    <ClipboardList className="mr-2 h-4 w-4" /> Go to Document Reviews
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-medium">
              How do I access patient records?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>
                  You can access all your assigned patients and their complete medical records:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Go to the "Patient Records" page from your dashboard</li>
                  <li>Browse the list of patients assigned to you</li>
                  <li>Click "View" on any patient to access their profile</li>
                  <li>Click "Documents" to access all their medical documents</li>
                </ol>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/doctor/patients">
                    <Users className="mr-2 h-4 w-4" /> View Patient Records
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-medium">
              What does approving or rejecting a document mean?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>
                  <strong>Approving a document:</strong> Indicates that you've reviewed the document and confirmed its accuracy. The document becomes part of the patient's verified medical record. Patients receive a notification that their document has been approved.
                </p>
                <p>
                  <strong>Rejecting a document:</strong> Used when a document has issues that need to be addressed - such as incorrect information, poor scan quality, or if the document isn't relevant to the patient's medical history. Patients receive a notification with your feedback explaining why the document was rejected.
                </p>
                <div className="flex gap-3 mt-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Approve</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Reject</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-medium">
              How are document priorities determined?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <p>
                Document priorities are determined based on several factors:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>High Priority:</strong> Urgent medical results or critical documents that require immediate review. These should be addressed within 24 hours.
                </li>
                <li>
                  <strong>Medium Priority:</strong> Important medical documents that should be reviewed within 48-72 hours.
                </li>
                <li>
                  <strong>Low Priority:</strong> Routine documents or historical records that should be reviewed within one week.
                </li>
              </ul>
              <p className="mt-4">
                Priority can be automatically assigned based on document type or manually adjusted by the system administrator.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-medium">
              What security protocols are in place for patient data?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <p>
                CareSync implements comprehensive security measures to protect patient data:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>End-to-end encryption for all patient data</li>
                <li>Two-factor authentication for doctor accounts</li>
                <li>Detailed access logs tracking all document views</li>
                <li>Regular security audits and compliance with healthcare regulations</li>
                <li>Automatic logout after periods of inactivity</li>
              </ul>
              <p className="mt-4">
                As a doctor, you're responsible for ensuring you follow good security practices, such as not sharing your login credentials and logging out when leaving your workstation.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-2xl font-bold mb-4">Training Resources</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <File className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-medium">Document Review Process</h3>
              <p className="text-sm text-gray-500">5:18 minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-medium">Managing Patient Records</h3>
              <p className="text-sm text-gray-500">4:32 minutes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorHelpPage;
