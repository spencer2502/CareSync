
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Clock } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Example patient document history data
const patientDocuments = [
  {
    id: "1",
    documentName: "Blood Test Report.pdf",
    uploadedOn: "2023-04-14",
    lastAccessed: "2023-04-18",
    status: "available",
  },
  {
    id: "2",
    documentName: "X-Ray Results.pdf",
    uploadedOn: "2023-04-09",
    lastAccessed: "2023-04-10",
    status: "available",
  },
  {
    id: "3",
    documentName: "Prescription.pdf",
    uploadedOn: "2023-03-21",
    lastAccessed: "2023-03-21",
    status: "available",
  }
];

const PatientDocumentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDocuments = patientDocuments.filter(doc => {
    const matchesSearch =
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || doc.status === statusFilter;
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
    <DashboardLayout title="Document History">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                placeholder="Search by document name..."
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
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    {/* More statuses can be added here */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Document History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Uploaded On</TableHead>
                <TableHead>Last Accessed</TableHead>
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
                    <TableCell>{formatDate(doc.uploadedOn)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {formatDate(doc.lastAccessed)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
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
    </DashboardLayout>
  );
};

export default PatientDocumentHistory;

