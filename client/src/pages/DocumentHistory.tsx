
import React, { useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Clock, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock document history data
const documentHistory = [
  {
    id: "101",
    patientName: "John Doe",
    patientId: "1",
    documentName: "Blood Test Report.pdf",
    requestDate: "2023-04-14",
    responseDate: "2023-04-15",
    status: "approved",
    viewedOn: "2023-04-15",
    expiryDate: "2023-04-15"
  },
  {
    id: "102",
    patientName: "John Doe",
    patientId: "1",
    documentName: "X-Ray Results.pdf",
    requestDate: "2023-04-09",
    responseDate: "2023-04-10",
    status: "approved",
    viewedOn: "2023-04-10",
    expiryDate: "2023-04-10"
  },
  {
    id: "103",
    patientName: "John Doe",
    patientId: "1",
    documentName: "Allergy Test.pdf",
    requestDate: "2023-03-21",
    responseDate: "2023-03-22",
    status: "approved",
    viewedOn: "2023-03-22",
    expiryDate: "2023-03-22"
  },
  {
    id: "104",
    patientName: "Jane Smith",
    patientId: "2",
    documentName: "Medical History.pdf",
    requestDate: "2023-04-18",
    responseDate: "2023-04-19",
    status: "rejected",
    viewedOn: "",
    expiryDate: ""
  },
  {
    id: "105",
    patientName: "Emily Clark",
    patientId: "4",
    documentName: "Prescription Records.pdf",
    requestDate: "2023-04-01",
    responseDate: "2023-04-02",
    status: "approved",
    viewedOn: "2023-04-02",
    expiryDate: "2023-04-02"
  }
];

const DocumentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter documents based on search query and status filter
  const filteredDocuments = documentHistory.filter(doc => {
    const matchesSearch = 
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <DoctorLayout title="Document History">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                placeholder="Search by document name or patient..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Access History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Response Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Viewed On</TableHead>
                <TableHead>Expiry Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{doc.documentName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.patientName}</TableCell>
                    <TableCell>{formatDate(doc.requestDate)}</TableCell>
                    <TableCell>{formatDate(doc.responseDate)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {doc.status === "approved" ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Approved</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">Rejected</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {doc.viewedOn ? (
                        formatDate(doc.viewedOn)
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.expiryDate ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          {formatDate(doc.expiryDate)}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-gray-500">No documents found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DoctorLayout>
  );
};

export default DocumentHistory;
