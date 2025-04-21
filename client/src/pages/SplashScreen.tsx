
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Stethoscope, Heart, Shield, FileText, BadgeHelp } from "lucide-react";

const SplashScreen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[60%] right-[5%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="text-center max-w-xl z-10">
        <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl inline-block mb-8">
            <Logo size="lg" className="text-white inline-block" />
          </div>
          
          <div className="caresync-3d-element mb-12">
            <div className="relative mx-auto w-64 h-64">
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse-light"></div>
              <div className="absolute inset-0 rounded-full bg-white/5 animate-rotate-3d"></div>
              
              {/* Larger floating elements */}
              <div className="absolute w-48 h-48 rounded-full border-2 border-white/20 animate-spin-slow" style={{ animationDuration: "30s" }}></div>
              <div className="absolute w-64 h-64 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: "40s", animationDirection: "reverse" }}></div>
              
              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl animate-float flex items-center justify-center">
                <div className="relative">
                  <Shield className="w-24 h-24 text-white/20" strokeWidth={1} />
                  <Stethoscope className="w-14 h-14 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              
              {/* Floating icons */}
              <div className="absolute top-0 left-[20%] animate-float" style={{ animationDelay: "0.5s" }}>
                <Heart className="w-8 h-8 text-white/70" />
              </div>
              <div className="absolute bottom-[10%] right-[15%] animate-float" style={{ animationDelay: "1.5s" }}>
                <FileText className="w-10 h-10 text-white/70" />
              </div>
              <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: "2s" }}>
                <BadgeHelp className="w-9 h-9 text-white/70" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Your Health Records, Simplified
          </h1>
          
          <p className="text-xl text-white/90 mb-10 max-w-lg mx-auto drop-shadow">
            Store, access, and share your medical documents securely. Be prepared for any emergency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="inline-block caresync-btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              Patient Login
            </Link>
            <Link 
              to="/doctor/login" 
              className="inline-block caresync-btn bg-secondary text-white hover:bg-secondary/90 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              Doctor Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
