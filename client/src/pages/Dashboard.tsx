
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Upload, QrCode, History, Hospital, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Demo user data
const user = {
  name: "John Doe",
  documents: 4,
  recentDocument: "Blood Test Results.pdf",
  lastUpload: "2 days ago",
  pendingRequests: 2,
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

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}</h2>
                <p className="text-gray-600">
                  You have {user.documents} documents stored. Your most recent upload was {user.lastUpload}.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button asChild>
                  <Link to="/upload">
                    <Upload className="mr-2 h-4 w-4" /> Upload New Document
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          title="Upload Documents"
          description="Securely store your medical records"
          icon={<Upload className="h-6 w-6 text-white" />}
          to="/upload"
          color="bg-primary"
        />
        <FeatureCard
          title="Emergency QR"
          description="Quick access during emergencies"
          icon={<QrCode className="h-6 w-6 text-white" />}
          to="/qr-code"
          color="bg-secondary"
        />
        <FeatureCard
          title="Document History"
          description="View and manage your documents"
          icon={<History className="h-6 w-6 text-white" />}
          to="/history"
          color="bg-indigo-500"
        />
        <FeatureCard
          title="Hospitals"
          description="Find nearby medical facilities"
          icon={<Hospital className="h-6 w-6 text-white" />}
          to="/hospitals"
          color="bg-emerald-500"
        />
      </div>

      {/* New section for pending approval requests */}
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-bold mb-4">Pending Approval Requests</h3>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
                  <FileCheck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">You have {user.pendingRequests} pending document requests</h4>
                  <p className="text-sm text-amber-700">Doctors are waiting for your approval</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-4 md:mt-0 border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                asChild
              >
                <Link to="/approval-requests">
                  Review Requests
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Uploaded {user.recentDocument}</p>
                  <p className="text-sm text-gray-500">{user.lastUpload}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <QrCode className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Generated Emergency QR Code</p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
