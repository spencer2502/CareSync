import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  FilePlus,
  FileCheck,
  FileX,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { AppContext } from '../context/appContext'; // Adjust path as needed

// Ensure axios always sends credentials
axios.defaults.withCredentials = true;

// Define interfaces for your data types
interface Doctor {
  _id: string;
  name: string;
}

interface RequestData {
  _id: string;
  doctor: string;
  doctorName: string;
  documentType: string;
  patient: string;
  reason: string;
  urgency: 'High' | 'Normal' | 'Low';
  access: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  records?: RequestData[];
  message?: string;
}

interface ActionResponse {
  success: boolean;
  message: string;
}

// Frontend representation of request
interface Request {
  id: string;
  doctorName: string;
  doctorId: string;
  documentType: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  urgency: 'High' | 'Normal' | 'Low';
}

const ApprovalRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchRequests();
  }, [backendUrl]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ensure backendUrl has a trailing slash if needed
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

      const { data } = await axios.get<ApiResponse>(
        `${baseUrl}api/user/getAllRequests`
      );

      if (data.success && data.records) {
        // Transform backend data to frontend format
        const formattedRequests: Request[] = data.records.map((record) => ({
          id: record._id,
          doctorName: record.doctorName || 'Unknown Doctor',
          doctorId: record.doctor,
          documentType: record.documentType || 'General Document',
          requestDate: formatDate(record.createdAt),
          reason: record.reason || 'No reason provided',
          status: record.access ? 'approved' : 'pending',
          urgency: record.urgency || 'Normal',
        }));

        setRequests(formattedRequests);
      } else {
        setRequests([]);
        if (data.message) {
          setError(data.message);
        }
      }
    } catch (err: any) {
      console.error('Error fetching requests:', err);

      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || 'Unknown error'
          }`
        );
      } else if (err.request) {
        setError(
          'No response received from server. Please check your network connection.'
        );
      } else {
        setError(`Error: ${err.message}`);
      }

      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const viewRequest = (request: Request) => {
    setSelectedRequest(request);
    setSheetOpen(true);
  };

  const handleAction = async (
    requestId: string,
    action: 'approve' | 'deny'
  ) => {
    setActionLoading(true);

    try {
      // Ensure backendUrl has a trailing slash if needed
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

      if (action === 'approve') {
        // Call the acceptRequest endpoint
        const { data } = await axios.post<ActionResponse>(
          `${baseUrl}api/user/acceptRequest`,
          { requestId }
        );

        if (data.success) {
          // Update local state
          const updatedRequests = requests.map((req) => {
            if (req.id === requestId) {
              return {
                ...req,
                status: 'approved',
              };
            }
            return req;
          });

          setRequests(updatedRequests);
          setSheetOpen(false);

          toast({
            title: 'Request approved',
            description:
              'The doctor has been notified and can now access the document',
          });
        } else {
          throw new Error(data.message || 'Failed to approve request');
        }
      } else if (action === 'deny') {
        // We'll assume you'll create a denyRequest endpoint
        // For now, we'll just update the UI
        const updatedRequests = requests.map((req) => {
          if (req.id === requestId) {
            return {
              ...req,
              status: 'denied',
            };
          }
          return req;
        });

        setRequests(updatedRequests);
        setSheetOpen(false);

        toast({
          title: 'Request denied',
          description:
            "The doctor has been notified that you've denied this request",
        });
      }
    } catch (err: any) {
      console.error(
        `Error ${action === 'approve' ? 'approving' : 'denying'} request:`,
        err
      );

      let errorMessage = `Failed to ${action} request`;
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            High
          </span>
        );
      case 'Normal':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Normal
          </span>
        );
      case 'Low':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case 'denied':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Denied
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
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
          {error ? (
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
              <Button
                onClick={fetchRequests}
                variant="outline"
                className="ml-auto"
                size="sm"
              >
                Retry
              </Button>
            </div>
          ) : null}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span>Loading requests...</span>
            </div>
          ) : requests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <div>
                          <span>{request.doctorName}</span>
                          <p className="text-xs text-gray-500">
                            Doctor ID: {request.doctorId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{request.documentType}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No document requests
              </h3>
              <p className="text-gray-500">
                When doctors request documents from you, they will appear here.
              </p>
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
                {selectedRequest.urgency === 'High' && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm text-red-800">
                      This is a high-priority request
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    From
                  </h4>
                  <p className="font-medium">{selectedRequest.doctorName}</p>
                  <p className="text-sm text-gray-500">
                    Doctor ID: {selectedRequest.doctorId}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Request Date
                  </h4>
                  <p>{selectedRequest.requestDate}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Document Type
                  </h4>
                  <p>{selectedRequest.documentType}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Reason for Request
                  </h4>
                  <p className="text-sm">{selectedRequest.reason}</p>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    onClick={() => handleAction(selectedRequest.id, 'approve')}
                    className="w-full"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileCheck className="mr-2 h-4 w-4" />
                    )}
                    Approve Request
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleAction(selectedRequest.id, 'deny')}
                    className="w-full"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileX className="mr-2 h-4 w-4" />
                    )}
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
