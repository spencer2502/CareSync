
import React from "react";
import { Link } from "react-router-dom";
import DoctorLayout from "@/components/DoctorLayout";
import { Users, FilePlus, HelpCircle, History, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Demo doctor data
const doctor = {
  name: "Dr. Sarah Johnson",
  patients: 12,
  pendingReviews: 4,
  recentPatient: "John Doe",
  lastReview: "2 days ago",
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  to,
  color,
}) => {
  return (
    <Link to={to} className="block">
      <Card className="caresync-3d-card h-full">
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} mb-4`}>
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

const DoctorDashboard = () => {
  return (
    <DoctorLayout title="Doctor Dashboard">
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {doctor.name}</h2>
                <p className="text-gray-600">
                  You have {doctor.patients} patients and {doctor.pendingReviews} pending document reviews.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button asChild>
                  <Link to="/doctor/patients">
                    <Users className="mr-2 h-4 w-4" /> View Patients
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/doctor/request-document">
                    <FilePlus className="mr-2 h-4 w-4" /> Request Document
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          title="Patient Records"
          description="View and manage patient records"
          icon={<Users className="h-6 w-6 text-white" />}
          to="/doctor/patients"
          color="bg-primary"
        />
        <FeatureCard
          title="Document History"
          description="View document access and requests"
          icon={<History className="h-6 w-6 text-white" />}
          to="/doctor/document-history"
          color="bg-secondary"
        />
        <FeatureCard
          title="Request Document"
          description="Request documents from patients"
          icon={<FilePlus className="h-6 w-6 text-white" />}
          to="/doctor/request-document"
          color="bg-indigo-500"
        />
        <FeatureCard
          title="Help Center"
          description="Get assistance and resources"
          icon={<HelpCircle className="h-6 w-6 text-white" />}
          to="/doctor/help"
          color="bg-emerald-500"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Reviewed documents for {doctor.recentPatient}</p>
                  <p className="text-sm text-gray-500">{doctor.lastReview}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Hospital className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">New patient assigned</p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
