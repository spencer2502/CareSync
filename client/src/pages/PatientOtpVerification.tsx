
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import VerificationHeader from "@/components/verification/VerificationHeader";
import OtpInput from "@/components/verification/OtpInput";
import VerifyButton from "@/components/verification/VerifyButton";
import ResendButton from "@/components/verification/ResendButton";

const PatientOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  
  const email = location.state?.email || "user@example.com";
  const isNewUser = location.state?.isNewUser || false;
  
  useEffect(() => {
    if (!sessionStorage.getItem('patientOTP')) {
      const newOTP = generateOTP();
      sessionStorage.setItem('patientOTP', newOTP);
      toast({
        title: "Verification Code Generated",
        description: "For testing purposes, you can view the code with the 'View current code' button below",
      });
    }
  }, []);
  
  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleVerify = () => {
    if (value.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    setIsVerifying(true);
    const storedOTP = sessionStorage.getItem('patientOTP');
    setTimeout(() => {
      if (value === storedOTP) {
        toast({
          title: "Verification Successful",
          description: isNewUser 
            ? "Your account has been created successfully" 
            : "Welcome back to CareSync",
        });
        sessionStorage.removeItem('patientOTP');
        navigate("/dashboard");
      } else {
        toast({
          title: "Verification Failed",
          description: "The OTP you entered is incorrect",
          variant: "destructive",
        });
        setIsVerifying(false);
      }
    }, 1500);
  };
  
  const handleResendOTP = () => {
    setResendDisabled(true);
    setCountdown(30);
    setValue("");
    const newOTP = generateOTP();
    sessionStorage.setItem('patientOTP', newOTP);
    toast({
      title: "New Verification Code Generated",
      description: `In a real app, a new code would be sent to ${email}. For testing, use the 'View current code' button.`,
    });
  };

  // Handle form submit (Enter key)
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <VerificationHeader isNewUser={isNewUser} email={email} />
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-1">Enter the 6-digit code sent to</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <OtpInput value={value} onChange={setValue} />
            <VerifyButton 
              isVerifying={isVerifying}
              disabled={isVerifying || value.length !== 6}
              // The button type is now submit, so Enter works
              onClick={handleVerify}
            />
          </form>
          <ResendButton 
            disabled={resendDisabled}
            countdown={countdown}
            onResend={handleResendOTP}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientOtpVerification;
