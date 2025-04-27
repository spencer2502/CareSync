import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  Search,
  Calendar,
  Tag,
  Eye,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { AppContext } from '../context/appContext'; // Adjust path as needed

// Set axios to always send credentials (cookies)
axios.defaults.withCredentials = true;

interface Attachment {
  fileUrl: string;
  fileName: string;
  _id: string;
  uploadedAt: string;
}

interface Record {
  _id: string;
  uploadedBy: string;
  patientId: string;
  doctorId: string;
  doctor: string;
  recordType: string;
  title: string;
  description: string;
  attachments: Attachment[];
  sharedWith: string[];
  isEmergencyAccessible: boolean;
  accessLog: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  records?: Record[];
  message?: string;
}

const MedicalRecordsViewer: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { backendUrl } = useContext(AppContext);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, [backendUrl]);

  const fetchRecords = async () => {
    try {
      setLoading(true);

      // Ensure backendUrl has a trailing slash if needed
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;
      console.log('Fetching from URL:', `${baseUrl}api/user/getUserRecords`);

      const { data } = await axios.get<ApiResponse>(
        `${baseUrl}api/user/getUserRecords`
      );

      if (data.success && data.records) {
        setRecords(data.records);
      } else {
        setError(data.message || 'Failed to fetch records');
      }
    } catch (err: any) {
      console.error('Error fetching records:', err);

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

  const handleViewRecord = (record: Record) => {
    setSelectedRecord(record);  
    setShowDialog(true);
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === 'all' || record.recordType === typeFilter;
    return matchesSearch && matchesType;
  });

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'Diagnosis':
        return 'bg-blue-100 text-blue-800';
      case 'General':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Medical Records">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                placeholder="Search by record title..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {error ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
            <Button onClick={fetchRecords} variant="outline" className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Medical Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-500">Loading records...</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{record.title}</span>
                            <p className="text-xs text-gray-500">
                              Patient ID: {record.patientId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRecordTypeColor(record.recordType)}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {record.recordType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {formatDate(record.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.attachments.length}{' '}
                        {record.attachments.length === 1 ? 'file' : 'files'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewRecord(record)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">No records found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedRecord?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className={
                  selectedRecord
                    ? getRecordTypeColor(selectedRecord.recordType)
                    : ''
                }
              >
                {selectedRecord?.recordType}
              </Badge>
              <span className="text-sm text-gray-500">
                Created on{' '}
                {selectedRecord ? formatDate(selectedRecord.createdAt) : ''}
              </span>
              {selectedRecord?.isEmergencyAccessible && (
                <Badge variant="outline" className="bg-red-100 text-red-800">
                  Emergency Accessible
                </Badge>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p>{selectedRecord?.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor ID</p>
                  <p>{selectedRecord?.doctorId}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p>{selectedRecord?.description}</p>
                </div>
              </div>
            </div>

            {selectedRecord?.attachments.length ? (
              <div>
                <h3 className="font-medium mb-2">Attachments</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRecord.attachments.map((attachment) => (
                    <a
                      key={attachment._id}
                      href={attachment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 mr-3">
                        {attachment.fileName.endsWith('.pdf') ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 truncate">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {attachment.fileName}
                          </p>
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                        </div>
                        <p className="text-xs text-gray-500">
                          Uploaded: {formatDate(attachment.uploadedAt)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MedicalRecordsViewer;
