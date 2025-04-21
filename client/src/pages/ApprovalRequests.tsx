
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilePlus, FileCheck, FileX, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Demo data for document requests
const demoRequests = [
  {
    id: "REQ001",
    doctorName: "Dr. Sarah Johnson",
    doctorId: "D001",
    documentType: "LabReport",
    requestDate: "2025-04-15",
    reason: "Need to review your recent blood work results from last month's visit.",
    status: "pending",
    urgency: "High",
  },
  {
    id: "REQ002",
    doctorName: "Dr. Michael Chen",
    doctorId: "D005",
    documentType: "Imaging",
    requestDate: "2025-04-12",
    reason: "Follow-up on your recent x-ray results to evaluate treatment progress.",
    status: "pending",
    urgency: "Normal",
  },
  {
    id: "REQ003",
    doctorName: "Dr. Emily Wilson",
    doctorId: "D003",
    documentType: "Prescription",
    requestDate: "2025-04-10",
    reason: "Need to check your current medication history.",
    status: "pending",
    urgency: "Low",
  },
];

const ApprovalRequests = () => {
  const [requests, setRequests] = useState(demoRequests);
  const [selectedRequest, setSelectedRequest] = useState<typeof demoRequests[0] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const viewRequest = (request: typeof demoRequests[0]) => {
    setSelectedRequest(request);
    setSheetOpen(true);
  };
  
  const handleAction = (requestId: string, action: 'approve' | 'deny') => {
    // Update the local state
    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: action === 'approve' ? 'approved' : 'denied'
        };
      }
      return req;
    });
    
    setRequests(updatedRequests);
    setSheetOpen(false);
    
    toast({
      title: action === 'approve' ? "Request approved" : "Request denied",
      description: action === 'approve' 
        ? "The doctor has been notified and can now access the document" 
        : "The doctor has been notified that you've denied this request",
    });
  };
  
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "High":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High</span>;
      case "Normal":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Normal</span>;
      case "Low":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Low</span>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Approved</span>;
      case "denied":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Denied</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Document Approval Requests">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePlus className="mr-2 h-5 w-5 text-primary" />
            Document Requests from Doctors
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.doctorName}</TableCell>
                      <TableCell>{request.documentType}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => viewRequest(request)}
                          disabled={request.status !== 'pending'}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FilePlus className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No document requests</h3>
              <p className="text-gray-500">When doctors request documents from you, they will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Request details sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md">
          {selectedRequest && (
            <>
              <SheetHeader>
                <SheetTitle>Document Request</SheetTitle>
                <SheetDescription>
                  Review this document request from your doctor
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                {selectedRequest.urgency === "High" && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-red-800">This is a high-priority request</span>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">From</h4>
                  <p className="font-medium">{selectedRequest.doctorName}</p>
                  <p className="text-sm text-gray-500">Doctor ID: {selectedRequest.doctorId}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Request Date</h4>
                  <p>{selectedRequest.requestDate}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Document Type</h4>
                  <p>{selectedRequest.documentType}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Reason for Request</h4>
                  <p className="text-sm">{selectedRequest.reason}</p>
                </div>
                
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    onClick={() => handleAction(selectedRequest.id, 'approve')}
                    className="w-full"
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Approve Request
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleAction(selectedRequest.id, 'deny')}
                    className="w-full"
                  >
                    <FileX className="mr-2 h-4 w-4" />
                    Deny Request
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default ApprovalRequests;
