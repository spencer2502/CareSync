import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages - User
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthSuccess from "./pages/AuthSuccess";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import QrCode from "./pages/QrCode";
import DocumentHistory from "./pages/DocumentHistory";
import DocumentView from "./pages/DocumentView";
import Hospitals from "./pages/Hospitals";
import HelpPage from "./pages/HelpPage";
import PatientOtpVerification from "./pages/PatientOtpVerification";
import ApprovalRequests from "./pages/ApprovalRequests";
import PatientDocumentHistory from "./pages/PatientDocumentHistory";

// Pages - Doctor
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientList from "./pages/PatientList";
import PatientView from "./pages/PatientView";
import DoctorHelpPage from "./pages/DoctorHelpPage";
import DoctorOtpVerification from "./pages/DoctorOtpVerification";
import RequestDocument from "./pages/RequestDocument";
import DoctorDocumentHistory from "./pages/DocumentHistory";

// Common Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          
          {/* Patient/User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<PatientOtpVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/qr-code" element={<QrCode />} />
          <Route path="/history" element={<PatientDocumentHistory />} />
          <Route path="/document/:id" element={<DocumentView />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/approval-requests" element={<ApprovalRequests />} />
          
          {/* Doctor Routes */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/verify" element={<DoctorOtpVerification />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<PatientList />} />
          <Route path="/doctor/patients/:id" element={<PatientView />} />
          <Route path="/doctor/help" element={<DoctorHelpPage />} />
          <Route path="/doctor/request-document" element={<RequestDocument />} />
          <Route path="/doctor/document-history" element={<DoctorDocumentHistory />} />
          
          {/* Redirects */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
