
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Shield, Heart, User, FileText, Lock, Hospital } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center py-12">
          <Logo size="lg" className="mb-8" />
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Health Records, Simplified
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Store, access, and share your medical documents securely. Be prepared for any emergency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="inline-block bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Patient Login
            </Link>
            <Link 
              to="/doctor/login" 
              className="inline-block bg-secondary text-white hover:bg-secondary/90 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Doctor Login
            </Link>
          </div>
        </header>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Lock className="w-10 h-10 text-primary" />}
              title="Secure Storage"
              description="Your medical records are encrypted and securely stored in the cloud."
            />
            <FeatureCard 
              icon={<FileText className="w-10 h-10 text-primary" />}
              title="Easy Document Management"
              description="Upload, categorize, and access your health documents with ease."
            />
            <FeatureCard 
              icon={<Hospital className="w-10 h-10 text-primary" />}
              title="Doctor Collaboration"
              description="Share your records with healthcare providers for better care coordination."
            />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-white opacity-80" />
              <Heart className="w-8 h-8 text-white ml-4 animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to take control of your health records?
            </h2>
            
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who trust CareSync for their medical record management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="inline-block bg-white text-primary hover:bg-white/90 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Create an Account
              </Link>
              <Link 
                to="/help" 
                className="inline-block bg-transparent border border-white text-white hover:bg-white/10 text-lg px-8 py-3 rounded-full transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all">
      <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </div>
  );
};

export default Index;
