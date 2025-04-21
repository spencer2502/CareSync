
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Home, Upload, QrCode, History, Hospital, LogOut, HelpCircle, FileCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simple logout for now, would implement proper auth later
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center justify-between mb-8 px-2">
          <Link to="/dashboard">
            <Logo />
          </Link>
          <div className="text-xs font-medium px-2 py-1 bg-primary text-white rounded-full">
            Patient
          </div>
        </div>
        
        <nav className="space-y-2">
          <NavItem
            to="/dashboard"
            label="Dashboard"
            icon={<Home size={20} />}
            active={location.pathname === "/dashboard"}
          />
          <NavItem
            to="/upload"
            label="Upload Documents"
            icon={<Upload size={20} />}
            active={location.pathname === "/upload"}
          />
          <NavItem
            to="/approval-requests"
            label="Approval Requests"
            icon={<FileCheck size={20} />}
            active={location.pathname === "/approval-requests"}
          />
          <NavItem
            to="/qr-code"
            label="Emergency QR"
            icon={<QrCode size={20} />}
            active={location.pathname === "/qr-code"}
          />
          <NavItem
            to="/history"
            label="Document History"
            icon={<History size={20} />}
            active={location.pathname === "/history" || location.pathname.startsWith("/document/")}
          />
          <NavItem
            to="/hospitals"
            label="Hospitals"
            icon={<Hospital size={20} />}
            active={location.pathname === "/hospitals"}
          />
          <NavItem
            to="/help"
            label="Help Center"
            icon={<HelpCircle size={20} />}
            active={location.pathname === "/help"}
          />
        </nav>
        
        <div className="mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </header>
        <div className="caresync-page-transition">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
