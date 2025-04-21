
import React from "react";
import { Shield, Stethoscope } from "lucide-react";

interface VerificationHeaderProps {
  isNewUser: boolean;
  email: string;
}

const VerificationHeader = ({ isNewUser, email }: VerificationHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
      <div className="mb-4 relative inline-block">
        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        <div className="relative z-10 p-4">
          <Shield className="h-12 w-12 mx-auto mb-2 opacity-90" />
          <Stethoscope className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <h1 className="text-2xl font-bold">Verify Your Account</h1>
      <p className="opacity-90 mt-2">
        {isNewUser 
          ? "We've sent a verification code to your email" 
          : "Confirm your identity to access your account"}
      </p>
    </div>
  );
};

export default VerificationHeader;
