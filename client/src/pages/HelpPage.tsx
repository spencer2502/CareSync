import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageSquare, File, Upload, QrCode, History, Hospital, Info } from "lucide-react";

const HelpPage = () => {
  return (
    <DashboardLayout title="Help Center">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="bg-primary/10 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Welcome to the CareSync Help Center
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600 mb-4">
              Find answers to common questions or reach out to our support team for assistance.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button asChild>
                <a href="mailto:support@caresync.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Support
                </a>
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" /> Call: +91 98765 43210
              </Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-medium">
              How do I upload a medical document?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>To upload a medical document:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Navigate to the "Upload Document" page from your dashboard</li>
                  <li>Click the "Select File" button or drag and drop your file</li>
                  <li>Enter document details like name and description</li>
                  <li>Click "Upload" to save your document</li>
                </ol>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/upload">
                    <Upload className="mr-2 h-4 w-4" /> Go to Upload Page
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-medium">
              What is the Emergency QR code for?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>
                  The Emergency QR code provides quick access to your critical medical information during emergencies. 
                  Medical professionals can scan this code to view your essential health data, allergies, and emergency contacts.
                </p>
                <p>
                  Generate your QR code, save it on your phone, or print it to keep in your wallet for emergencies.
                </p>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/qr-code">
                    <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-medium">
              How can I view my document history?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>
                  Your document history contains all the medical documents you've uploaded to CareSync. To access it:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Go to the "Document History" page from your dashboard</li>
                  <li>Browse through the list of documents</li>
                  <li>Click "View" on any document to open and review it</li>
                </ol>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/history">
                    <History className="mr-2 h-4 w-4" /> View History
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-medium">
              How do I find nearby hospitals?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <div className="space-y-4">
                <p>
                  CareSync provides information about nearby medical facilities. To find them:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Navigate to the "Hospitals" page from your dashboard</li>
                  <li>View the list of nearby medical facilities</li>
                  <li>Access contact information and directions</li>
                </ol>
                <Button asChild size="sm" className="mt-2">
                  <Link to="/hospitals">
                    <Hospital className="mr-2 h-4 w-4" /> Find Hospitals
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-medium">
              Is my data secure on CareSync?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <p>
                Yes, CareSync takes data security seriously. We implement industry-standard encryption, secure storage, and strict access controls to protect your sensitive medical information. Your data is only accessible to you and the healthcare providers you authorize.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-2xl font-bold mb-4">Video Tutorials</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <File className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-medium">How to Upload Documents</h3>
              <p className="text-sm text-gray-500">3:24 minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <QrCode className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-medium">Setting Up Your Emergency QR</h3>
              <p className="text-sm text-gray-500">2:45 minutes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
