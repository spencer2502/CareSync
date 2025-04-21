import React from "react";
import DoctorLayout from "@/components/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock patient data
const patients = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john.doe@example.com", 
    age: 45, 
    activeApprovedDocs: 1,
    lastApproval: "10 minutes ago"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    age: 32, 
    activeApprovedDocs: 0,
    lastApproval: "-"
  },
  { 
    id: "3", 
    name: "Robert Johnson", 
    email: "robert.j@example.com", 
    age: 58, 
    activeApprovedDocs: 2,
    lastApproval: "5 minutes ago"
  },
  { 
    id: "4", 
    name: "Emily Clark", 
    email: "emily.c@example.com", 
    age: 29, 
    activeApprovedDocs: 0,
    lastApproval: "-"
  },
];

const PatientList = () => {
  return (
    <DoctorLayout title="Patient Records">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-gray-700 mb-4 md:mb-0">
              Showing <span className="font-bold">{patients.length}</span> patients
            </p>
            <div className="flex gap-2">
              <Link to="/doctor/document-history">
                <Button variant="outline" className="flex items-center gap-2">
                  <Clock size={16} />
                  Document History
                </Button>
              </Link>
              <Button variant="outline">
                Export List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Active Approved Documents</TableHead>
                <TableHead>Last Approval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    {patient.activeApprovedDocs > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {patient.activeApprovedDocs} active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        None
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{patient.lastApproval}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/doctor/patients/${patient.id}`}>
                          <Eye size={16} className="mr-1" /> View
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DoctorLayout>
  );
};

export default PatientList;
