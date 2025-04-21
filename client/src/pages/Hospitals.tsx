
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, Phone, MapPin, Search } from "lucide-react";

// Dummy data for hospitals
const hospitalsData = [
  {
    id: "1",
    name: "City General Hospital",
    address: "123 Main Street, Downtown, City",
    phone: "(555) 123-4567",
    distance: "2.3 miles",
    services: ["Emergency Care", "Surgery", "Radiology", "Laboratory"],
  },
  {
    id: "2",
    name: "Westside Medical Center",
    address: "456 Park Avenue, Westside, City",
    phone: "(555) 987-6543",
    distance: "4.8 miles",
    services: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
  },
  {
    id: "3",
    name: "County Memorial Hospital",
    address: "789 County Road, Northside, City",
    phone: "(555) 456-7890",
    distance: "7.1 miles",
    services: ["Trauma Center", "Cancer Care", "Women's Health", "Mental Health"],
  },
  {
    id: "4",
    name: "Children's Medical Center",
    address: "321 Sunshine Blvd, Eastside, City",
    phone: "(555) 234-5678",
    distance: "5.5 miles",
    services: ["Pediatric Emergency", "Neonatal Care", "Child Development", "Pediatric Surgery"],
  },
  {
    id: "5",
    name: "University Hospital",
    address: "987 College Drive, University District, City",
    phone: "(555) 876-5432",
    distance: "3.7 miles",
    services: ["Research", "Teaching Hospital", "Specialized Care", "Clinical Trials"],
  },
];

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter hospitals based on search query
  const filteredHospitals = hospitalsData.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout title="Nearby Hospitals">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            placeholder="Search hospitals by name, address or services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="caresync-3d-card">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Hospital className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{hospital.name}</CardTitle>
              <CardDescription>{hospital.distance} away</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{hospital.phone}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {hospital.services.map((service) => (
                    <span 
                      key={service} 
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">No hospitals found</h3>
          <p className="text-gray-500">
            No hospitals match "{searchQuery}". Try a different search term.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Hospitals;
