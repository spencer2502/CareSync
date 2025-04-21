
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "@/components/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Demo patients data
const patients = [
  { id: "P001", name: "John Doe", email: "john@example.com" },
  { id: "P002", name: "Jane Smith", email: "jane@example.com" },
  { id: "P003", name: "Mike Johnson", email: "mike@example.com" },
];

const RequestDocument = () => {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [documentType, setDocumentType] = useState("General");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPatientDialog, setShowPatientDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [urgency, setUrgency] = useState("Normal");

  const filteredPatients = patients.filter((patient) => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectPatient = (patient: typeof patients[0]) => {
    setPatientId(patient.id);
    setShowPatientDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId) {
      toast({
        title: "Missing patient",
        description: "Please select a patient to request documents from",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Document requested successfully",
        description: `Request sent to patient ${patientId}`,
      });
      
      // Reset form
      setPatientId("");
      setDocumentType("General");
      setReason("");
      setUrgency("Normal");
      
      // Navigate back to document reviews
      navigate("/doctor/reviews");
    }, 1500);
  };

  return (
    <DoctorLayout title="Request Document from Patient">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="patient-id" className="block text-sm font-medium text-gray-700">
                  Patient ID
                </label>
                <div className="flex gap-2">
                  <Input
                    id="patient-id"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter patient ID"
                    className="flex-1"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowPatientDialog(true)}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="document-type" className="block text-sm font-medium text-gray-700">
                  Document Type
                </label>
                <Select
                  value={documentType}
                  onValueChange={setDocumentType}
                >
                  <SelectTrigger id="document-type" className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prescription">Prescription</SelectItem>
                    <SelectItem value="Diagnosis">Diagnosis</SelectItem>
                    <SelectItem value="LabReport">Lab Report</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                  Urgency Level
                </label>
                <Select
                  value={urgency}
                  onValueChange={setUrgency}
                >
                  <SelectTrigger id="urgency" className="w-full">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Request
                </label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please explain why you need this document"
                  rows={4}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <FilePlus className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Send Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Patient search dialog */}
      <Dialog open={showPatientDialog} onOpenChange={setShowPatientDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Find Patient</DialogTitle>
            <DialogDescription>
              Search for a patient by name or ID
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="max-h-60 overflow-auto border rounded-md">
              {filteredPatients.length > 0 ? (
                <div className="divide-y">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectPatient(patient)}
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-500">ID: {patient.id}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center text-gray-500">
                  No patients found
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPatientDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DoctorLayout>
  );
};

export default RequestDocument;
