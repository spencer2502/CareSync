import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
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
  Trash,
  Edit,
  Loader2,
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
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
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
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { backendUrl } = useContext(AppContext);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    recordType: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, [backendUrl]);

  const fetchRecords = async () => {
    try {
      setLoading(true);

      // Ensure backendUrl has a trailing slash if needed
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

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

  const handleEditRecord = (record: Record) => {
    setSelectedRecord(record);
    setEditFormData({
      title: record.title,
      description: record.description,
      recordType: record.recordType,
    });
    setShowEditDialog(true);
  };

  const handleDeleteRecord = (record: Record) => {
    setSelectedRecord(record);
    setShowDeleteDialog(true);
  };

  const submitEditRecord = async () => {
    if (!selectedRecord) return;

    try {
      setActionLoading(true);
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

      const { data } = await axios.put(
        `${baseUrl}api/user/updateRecord/${selectedRecord._id}`,
        editFormData
      );

      if (data.success) {
        // Update the record in the local state
        const updatedRecords = records.map((record) =>
          record._id === selectedRecord._id
            ? { ...record, ...editFormData }
            : record
        );

        setRecords(updatedRecords);
        setShowEditDialog(false);

        toast({
          title: 'Record updated',
          description: 'Your medical record has been updated successfully',
        });
      } else {
        throw new Error(data.message || 'Failed to update record');
      }
    } catch (err: any) {
      console.error('Error updating record:', err);

      toast({
        title: 'Update failed',
        description:
          err.response?.data?.message ||
          err.message ||
          'Failed to update record',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDeleteRecord = async () => {
    if (!selectedRecord) return;

    try {
      setActionLoading(true);
      const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;

      const { data } = await axios.delete(
        `${baseUrl}api/user/deleteRecord/${selectedRecord._id}`
      );

      if (data.success) {
        // Remove the record from the local state
        const updatedRecords = records.filter(
          (record) => record._id !== selectedRecord._id
        );

        setRecords(updatedRecords);
        setShowDeleteDialog(false);

        toast({
          title: 'Record deleted',
          description: 'Your medical record has been deleted successfully',
        });
      } else {
        throw new Error(data.message || 'Failed to delete record');
      }
    } catch (err: any) {
      console.error('Error deleting record:', err);

      toast({
        title: 'Deletion failed',
        description:
          err.response?.data?.message ||
          err.message ||
          'Failed to delete record',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
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
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
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
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewRecord(record)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditRecord(record)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteRecord(record)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
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

      {/* View Record Dialog */}
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

          <DialogFooter className="flex justify-between mt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDialog(false);
                  handleEditRecord(selectedRecord!);
                }}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => {
                  setShowDialog(false);
                  handleDeleteRecord(selectedRecord!);
                }}
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </Button>
            </div>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medical Record</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Record Title</Label>
              <Input
                id="title"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recordType">Record Type</Label>
              <Select
                value={editFormData.recordType}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, recordType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitEditRecord} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the medical record "
              {selectedRecord?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDeleteRecord}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default MedicalRecordsViewer;
