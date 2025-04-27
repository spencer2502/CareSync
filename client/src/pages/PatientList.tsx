import React, { useState, useEffect, useContext } from 'react';
import DoctorLayout from '@/components/DoctorLayout';
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
import { Eye, Clock, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { AppContext } from '../context/appContext'; // Adjust path as needed

// Set axios to always send credentials (cookies)
axios.defaults.withCredentials = true;

// Define interface for patient data
interface Patient {
  id: string;
  name: string;
  email: string;
  activeApprovedDocs: number;
  lastApproval: string;
}

interface ApiResponse {
  success: boolean;
  data?: Array<{
    patient: {
      id: string;
      name: string;
      email: string;
      _id: string;
    };
    records: Array<any>;
  }>;
  message?: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    fetchPatients();
  }, [backendUrl]);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      // Ensure backendUrl has a trailing slash if needed
      const baseUrl = backendUrl?.endsWith('/') ? backendUrl : `${backendUrl}/`;

      const { data } = await axios.get<ApiResponse>(
        `${baseUrl}api/doctor/getAllRecords`
      );

      if (data.success && data.data) {
        // Transform the data to match our component needs
        const formattedData = data.data.map((item) => {
          const lastRecordDate =
            item.records.length > 0
              ? new Date(
                  Math.max(
                    ...item.records.map((r) => new Date(r.createdAt).getTime())
                  )
                )
              : null;

          return {
            id: item.patient.id || item.patient._id,
            name: item.patient.name,
            email: item.patient.email,
            activeApprovedDocs: item.records.length,
            lastApproval: lastRecordDate
              ? `${formatTimeAgo(lastRecordDate)}`
              : '-',
          };
        });

        setPatients(formattedData);
      } else {
        setError(data.message || 'Failed to fetch patient data');
      }
    } catch (err: any) {
      console.error('Error fetching patient records:', err);

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

  // Helper function to format time ago
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;

    return new Date(date).toLocaleDateString();
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DoctorLayout title="Patient Records">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-gray-700 mb-4 md:mb-0">
              Showing{' '}
              <span className="font-bold">{filteredPatients.length}</span>{' '}
              patients
            </p>
            <div className="flex gap-2">
              <Link to="/doctor/document-history">
                <Button variant="outline" className="flex items-center gap-2">
                  <Clock size={16} />
                  Document History
                </Button>
              </Link>
              <Button variant="outline">Export List</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            <Button onClick={fetchPatients} variant="outline" className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Patient Access List</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Active Approved Documents</TableHead>
                  <TableHead>Last Approval</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-500">
                          Loading patient data...
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.name}
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>
                        {patient.activeApprovedDocs > 0 ? (
                          <Badge className="bg-green-100 text-green-800">
                            {patient.activeApprovedDocs} active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800"
                          >
                            None
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{patient.lastApproval}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/doctor/patients/${patient.id}`}>
                            <Eye size={16} className="mr-1" /> View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">No patients found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </DoctorLayout>
  );
};

export default PatientList;
