
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import { Check } from "lucide-react";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if we came from a doctor route to determine where to redirect
    const isDoctor = location.pathname.includes("doctor") || 
                    location.state?.userType === "doctor" ||
                    document.referrer.includes("doctor");
    
    const timer = setTimeout(() => {
      navigate(isDoctor ? "/doctor/dashboard" : "/dashboard");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Logo size="lg" className="text-white inline-block mb-6" />
        
        <div className="relative mb-8 mx-auto">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center animate-fade-in">
            <Check className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-light"></div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
          Authentication Successful!
        </h1>
        
        <p className="text-lg text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Redirecting you to your dashboard...
        </p>
        
        <div className="w-16 h-1 bg-white/50 rounded-full mx-auto">
          <div className="h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
