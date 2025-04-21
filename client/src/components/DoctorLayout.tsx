
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Users, Hospital, HelpCircle, LogOut, History, FilePlus } from "lucide-react";
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
          ? "bg-secondary text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface DoctorLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
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
          <Link to="/doctor/dashboard">
            <Logo variant="sidebar" />
          </Link>
          <div className="text-xs font-medium px-2 py-1 bg-secondary text-white rounded-full">
            Doctor
          </div>
        </div>
        
        <nav className="space-y-2">
          <NavItem
            to="/doctor/dashboard"
            label="Dashboard"
            icon={<Hospital size={20} />}
            active={location.pathname === "/doctor/dashboard"}
          />
          <NavItem
            to="/doctor/patients"
            label="Patient Records"
            icon={<Users size={20} />}
            active={location.pathname === "/doctor/patients" || location.pathname.startsWith("/doctor/patients/")}
          />
          <NavItem
            to="/doctor/document-history"
            label="Document History"
            icon={<History size={20} />}
            active={location.pathname === "/doctor/document-history"}
          />
          <NavItem
            to="/doctor/request-document"
            label="Request Document"
            icon={<FilePlus size={20} />}
            active={location.pathname === "/doctor/request-document"}
          />
          <NavItem
            to="/doctor/help"
            label="Help Center"
            icon={<HelpCircle size={20} />}
            active={location.pathname === "/doctor/help"}
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

export default DoctorLayout;
