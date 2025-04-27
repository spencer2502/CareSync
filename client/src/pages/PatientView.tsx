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
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { AppContext } from '../context/appContext'; // Adjust path as needed

// Set axios to always send credentials (cookies)
axios.defaults.withCredentials = true;

// Helper function to check if a document's viewing period is still active
const isDocumentViewable = (expiresAt) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  return now < expiry;
};

// Helper to format the remaining time
const formatRemainingTime = (expiresAt) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expired';

  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor((diffMs % 60000) / 1000);

  return `${diffMins}m ${diffSecs}s remaining`;
};

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approvedDocuments, setApprovedDocuments] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const { backendUrl } = useContext(AppContext);

  // For updating the time remaining display
  const [refreshCounter, setRefreshCounter] = useState(0);

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
    if (isDocumentViewable(doc.expiresAt)) {
      try {
        // Record document view
        const baseUrl = backendUrl?.endsWith('/')
          ? backendUrl
          : `${backendUrl}/`;
        await axios.post(`${baseUrl}api/doctor/documents/${doc.id}/view`);

        // In a real app, navigate to document view page or open a modal
        window.open(doc.fileUrl, '_blank');

        toast({
          title: 'Document Accessed',
          description: `You are viewing ${
            doc.fileName || doc.name
          }. This access expires in 30 minutes.`,
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to access document. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Access Expired',
        description: "This document's viewing period has expired.",
        variant: 'destructive',
      });
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
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {(patient.bloodType || patient.height || patient.weight) && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Medical Information</h3>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    {patient.bloodType && (
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="font-medium">{patient.bloodType}</p>
                      </div>
                    )}
                    {patient.height && (
                      <div>
                        <p className="text-sm text-gray-500">Height</p>
                        <p>{patient.height}</p>
                      </div>
                    )}
                    {patient.weight && (
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p>{patient.weight}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="approved">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Patient Records</CardTitle>
                <TabsList>
                  <TabsTrigger value="approved">Approved Documents</TabsTrigger>
                  <TabsTrigger value="documents">All Documents</TabsTrigger>
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
              <TabsContent value="approved" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Approved Documents</h3>
                  <Link to="/doctor/document-history">
                    <Button variant="outline" size="sm">
                      <History className="mr-2 h-4 w-4" /> View History
                    </Button>
                  </Link>
                </div>

                <div className="divide-y">
                  {approvedDocuments.length > 0 ? (
                    approvedDocuments.map((doc) => {
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
                                {doc.fileName || doc.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {doc.recordType || doc.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isViewable ? (
                              <>
                                <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatRemainingTime(doc.expiresAt)}
                                </div>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleViewDocument(doc)}
                                >
                                  <Eye className="h-4 w-4 mr-1" /> View
                                </Button>
                              </>
                            ) : (
                              <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                Expired
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">
                        No approved documents available
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Medical Documents</h3>
                  <Link to={`/doctor/patients/${id}/documents`}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="divide-y">
                  {allDocuments.length > 0 ? (
                    allDocuments.map((doc) => (
                      <div
                        key={doc.id || doc._id}
                        className="py-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {doc.title || doc.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doc.title || doc.type} •{' '}
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/doctor/reviews/${doc.id || doc._id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    ))
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
    </DoctorLayout>
  );
};

export default PatientView;
