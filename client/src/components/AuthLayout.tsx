
import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Stethoscope, Shield, Heart, FileText, User, Lock } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-secondary p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-[40%] left-[20%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-md mx-auto py-12 px-4 z-10">
          <Link to="/">
            <Logo size="lg" className="text-white mb-8" />
          </Link>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Your health documents, always accessible.
            </h1>
            <p className="text-lg opacity-90">
              Securely manage your medical records and get instant access during emergencies.
            </p>
          </div>
          
          <div className="caresync-3d-element w-full h-[320px] mb-8">
            <div className="relative w-full h-full mx-auto">
              {/* Layered cards with shadow effect */}
              <div className="absolute inset-0 bg-white/10 rounded-2xl rotate-6 animate-float"></div>
              <div className="absolute inset-0 bg-white/20 rounded-2xl -rotate-6 animate-float" style={{ animationDelay: "1s" }}></div>
              <div className="absolute inset-0 bg-white/30 rounded-2xl rotate-3 animate-float" style={{ animationDelay: "2s" }}></div>
              
              {/* Main content area */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white/30 h-8 w-24 rounded-md"></div>
                  <Lock className="h-6 w-6 text-white/70" />
                </div>
                
                {/* Center emblem */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute w-48 h-48 rounded-full border-2 border-white/20 animate-spin-slow" style={{ animationDuration: "30s" }}></div>
                    <div className="bg-white/20 p-8 rounded-full">
                      <div className="relative">
                        <Shield className="h-28 w-28 text-white/30" strokeWidth={1} />
                        <Stethoscope className="h-16 w-16 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Document-like elements */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="bg-white/30 h-4 rounded"></div>
                  <div className="bg-white/20 h-4 rounded col-span-2"></div>
                  <div className="bg-white/30 h-4 rounded"></div>
                  <div className="bg-white/20 h-4 rounded col-span-3"></div>
                  <div className="bg-white/30 h-4 rounded"></div>
                </div>
              </div>
              
              {/* Floating icons */}
              <div className="absolute top-6 left-6 animate-float" style={{ animationDelay: "0.5s" }}>
                <Heart className="w-8 h-8 text-white/70" />
              </div>
              <div className="absolute bottom-10 right-8 animate-float" style={{ animationDelay: "1.5s" }}>
                <FileText className="w-10 h-10 text-white/70" />
              </div>
              <div className="absolute top-1/4 right-10 animate-float" style={{ animationDelay: "2s" }}>
                <User className="w-9 h-9 text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
