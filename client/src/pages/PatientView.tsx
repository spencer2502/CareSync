import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DoctorLayout from '@/components/DoctorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  User,
  Activity,
  ArrowLeft,
  Clock,
  Eye,
  History,
  Loader2,
  AlertTriangle,
  ExternalLink,
  Tag,
  Heart,
  Scale,
  Ruler,
  Bookmark,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { AppContext } from '../context/appContext'; // Adjust path as needed
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

// Set axios to always send credentials (cookies)
axios.defaults.withCredentials = true;

// Helper function to check if a document's viewing period is still active
const isDocumentViewable = (expiresAt) => {
  if (!expiresAt) return false;
  const now = new Date();
  const expiry = new Date(expiresAt);
  return now < expiry;
};

// Helper to format the remaining time
const formatRemainingTime = (expiresAt) => {
  if (!expiresAt) return 'N/A';
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expired';

  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return `${diffMins}m ${diffSecs}s remaining`;
};

// Format date helper function
const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allDocuments, setAllDocuments] = useState([]);
  const { backendUrl } = useContext(AppContext);

  // For updating the time remaining display
  const [refreshCounter, setRefreshCounter] = useState(0);

  // New state for dialog functionality
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCounter((count) => count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchPatientData();
  }, [id, backendUrl]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = backendUrl?.endsWith('/') ? backendUrl : `${backendUrl}/`;

      // Fetch patient details
      const patientResponse = await axios.get(
        `${baseUrl}api/doctor/getPatientById/${id}`
      );

      if (patientResponse.data.success) {
        // FIXED: Use data property instead of patient
        setPatient(patientResponse.data.data);

        // Fetch all patient documents
        const documentsResponse = await axios.get(
          `${baseUrl}api/doctor/patient/${id}/documents`
        );
        if (documentsResponse.data.success) {
          setAllDocuments(documentsResponse.data.documents);
        }
      } else {
        setError(
          patientResponse.data.message || 'Failed to fetch patient data'
        );
      }
    } catch (err) {
      console.error('Error fetching patient data:', err);

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
        setError(`Error: ${err.message || err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = async (doc) => {
    // Set the selected document and show dialog
    setSelectedDocument(doc);
    setShowDialog(true);

    if (isDocumentViewable(doc.expiresAt)) {
      try {
        // Record document view
        const baseUrl = backendUrl?.endsWith('/')
          ? backendUrl
          : `${backendUrl}/`;
        await axios.post(
          `${baseUrl}api/doctor/documents/${doc.id || doc._id}/view`
        );

        toast({
          title: 'Document Accessed',
          description: `You are viewing ${
            doc.fileName || doc.title || doc.name
          }. This access expires in 30 minutes.`,
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to record document access. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  // Function to open document in new tab from the dialog
  const openDocumentInNewTab = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  // Helper function to determine record type color
  const getRecordTypeColor = (type) => {
    switch (type) {
      case 'Diagnosis':
        return 'bg-blue-100 text-blue-800';
      case 'Lab Result':
        return 'bg-purple-100 text-purple-800';
      case 'General':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DoctorLayout title="Patient View">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Loading patient data...</p>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  if (error) {
    return (
      <DoctorLayout title="Patient View">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-red-50 p-6 rounded-lg text-center max-w-md">
            <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Patient
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Button onClick={fetchPatientData}>Retry</Button>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  if (!patient) {
    return (
      <DoctorLayout title="Patient Not Found">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="bg-amber-50 p-6 rounded-lg text-center max-w-md">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-800 mb-2">
              Patient Not Found
            </h3>
            <p className="text-amber-700 mb-4">
              The requested patient could not be found or you don't have access.
            </p>
            <Button asChild>
              <Link to="/doctor/patients">Return to Patient List</Link>
            </Button>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  // Calculate age from date of birth
  const patientAge = calculateAge(patient.dateOfBirth);

  return (
    <DoctorLayout title={`Patient: ${patient.name}`}>
      <div className="mb-4">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/doctor/patients">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                <User className="h-12 w-12 text-gray-500" />
              </div>

              <h2 className="text-xl font-bold text-center">{patient.name}</h2>

              <div className="space-y-3 pt-4">
                {/* Patient ID */}
                <div className="flex items-start gap-3">
                  <Bookmark className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p>{patient.patientId || id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{patient.email}</p>
                  </div>
                </div>

                {patient.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{patient.phone}</p>
                    </div>
                  </div>
                )}

                {patient.dateOfBirth && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p>
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                        {patientAge !== null && ` (${patientAge} years)`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Medical Information</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                  {/* Blood Group */}
                  <div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-gray-500">Blood Type</p>
                    </div>
                    <p className="font-medium">
                      {patient.bloodType ||
                        patient.bloodGroup ||
                        'Not Available'}
                    </p>
                  </div>

                  {/* Height */}
                  <div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Height</p>
                    </div>
                    <p>{patient.height || 'Not Available'}</p>
                  </div>

                  {/* Weight */}
                  <div>
                    <div className="flex items-center gap-1">
                      <Scale className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-500">Weight</p>
                    </div>
                    <p>{patient.weight || 'Not Available'}</p>
                  </div>

                  {/* Age */}
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p>
                      {patientAge !== null
                        ? `${patientAge} years`
                        : 'Not Available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="documents">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Patient Records</CardTitle>
                <TabsList>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  {patient.conditions && patient.conditions.length > 0 && (
                    <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  )}
                  {patient.allergies && patient.allergies.length > 0 && (
                    <TabsTrigger value="allergies">Allergies</TabsTrigger>
                  )}
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Medical Documents</h3>
                  <Link to="/doctor/document-history">
                    <Button variant="outline" size="sm">
                      <History className="mr-2 h-4 w-4" /> View History
                    </Button>
                  </Link>
                </div>

                <div className="divide-y">
                  {allDocuments.length > 0 ? (
                    allDocuments.map((doc) => {
                      const isViewable = isDocumentViewable(doc.expiresAt);
                      return (
                        <div
                          key={doc.id || doc._id}
                          className="py-3 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${
                                isViewable ? 'bg-green-100' : 'bg-gray-100'
                              } flex items-center justify-center`}
                            >
                              <FileText
                                className={`h-5 w-5 ${
                                  isViewable
                                    ? 'text-green-600'
                                    : 'text-gray-500'
                                }`}
                              />
                            </div>
                            <div>
                              <p className="font-medium">
                                {doc.title || doc.fileName || doc.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {doc.recordType || doc.type || 'Document'} •{' '}
                                {formatDate(doc.createdAt)}
                                {isViewable && (
                                  <span className="ml-2 text-xs text-green-600">
                                    {formatRemainingTime(doc.expiresAt)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={isViewable ? 'default' : 'outline'}
                            onClick={() => handleViewDocument(doc)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No documents available</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {patient.conditions && patient.conditions.length > 0 && (
                <TabsContent value="conditions">
                  <div className="space-y-4">
                    <h3 className="font-medium">Chronic Conditions</h3>
                    <div className="space-y-2">
                      {patient.conditions.map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 border rounded-lg"
                        >
                          <Activity className="h-5 w-5 text-primary" />
                          <span>{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              {patient.allergies && patient.allergies.length > 0 && (
                <TabsContent value="allergies">
                  <div className="space-y-4">
                    <h3 className="font-medium">Known Allergies</h3>
                    <div className="space-y-2">
                      {patient.allergies.map((allergy, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 border rounded-lg"
                        >
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>{allergy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Document Viewing Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedDocument?.fileName ||
                selectedDocument?.title ||
                'Document Details'}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className={
                  selectedDocument
                    ? getRecordTypeColor(
                        selectedDocument.recordType ||
                          selectedDocument.type ||
                          'General'
                      )
                    : ''
                }
              >
                <Tag className="h-3 w-3 mr-1" />
                {selectedDocument?.recordType ||
                  selectedDocument?.type ||
                  'General'}
              </Badge>
              <span className="text-sm text-gray-500">
                Created on{' '}
                {selectedDocument ? formatDate(selectedDocument.createdAt) : ''}
              </span>
              {selectedDocument?.isEmergencyAccessible && (
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  Emergency Accessible
                </Badge>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDocument?.patientId && (
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p>{selectedDocument.patientId}</p>
                  </div>
                )}
                {selectedDocument?.doctorId && (
                  <div>
                    <p className="text-sm text-gray-500">Doctor ID</p>
                    <p>{selectedDocument.doctorId}</p>
                  </div>
                )}
                {selectedDocument?.description && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Description</p>
                    <p>{selectedDocument.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* If document has a direct fileUrl */}
            {selectedDocument?.fileUrl && (
              <div>
                <h3 className="font-medium mb-2">Document</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      openDocumentInNewTab(selectedDocument.fileUrl)
                    }
                    className="flex items-center justify-center gap-2"
                  >
                    <FileText className="h-5 w-5" />
                    <span>View Document in New Tab</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* If document has attachments */}
            {selectedDocument?.attachments &&
              selectedDocument.attachments.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Attachments</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDocument.attachments.map((attachment) => (
                      <a
                        key={attachment._id || `attachment-${Math.random()}`}
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 mr-3">
                          {attachment.fileName &&
                          attachment.fileName.endsWith('.pdf') ? (
                            <FileText className="h-5 w-5 text-red-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 truncate">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              {attachment.fileName || 'Document'}
                            </p>
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                          </div>
                          <p className="text-xs text-gray-500">
                            Uploaded:{' '}
                            {formatDate(
                              attachment.uploadedAt || attachment.createdAt
                            )}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </DoctorLayout>
  );
};

export default PatientView;
