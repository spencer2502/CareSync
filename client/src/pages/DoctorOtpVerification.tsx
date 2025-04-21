
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stethoscope, Shield, CheckCircle2, RefreshCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DoctorOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  
  const email = location.state?.email || "doctor@example.com";
  const isNewUser = location.state?.isNewUser || false;
  
  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  useEffect(() => {
    toast({
      title: "Demo Mode",
      description: "For demo purposes, use code 123456",
    });
  }, []);

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
    setTimeout(() => {
      if (value === "123456") {
        toast({
          title: "Verification Successful",
          description: isNewUser 
            ? "Your doctor account has been verified" 
            : "Welcome back, Doctor",
        });
        navigate("/doctor/dashboard");
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
    toast({
      title: "OTP Resent",
      description: `For demo purposes, use 123456 as your verification code`,
    });
  };
  
  const handleFillDemoCode = () => {
    setValue("123456");
  };

  // Add form submit to allow Enter key submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleVerify();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
          <div className="mb-4 relative inline-block">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            <div className="relative z-10 p-4">
              <Shield className="h-12 w-12 mx-auto mb-2 opacity-90" />
              <Stethoscope className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Doctor Verification</h1>
          <p className="opacity-90 mt-2">
            {isNewUser 
              ? "Verify your medical credentials to continue" 
              : "Additional security for medical professionals"}
          </p>
        </div>
        
        <div className="p-8">
          <Alert className="mb-6 bg-yellow-50 border-yellow-100">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700">
              <span className="font-medium">Demo Mode:</span> For testing purposes, use the code <span className="font-bold">123456</span>
            </AlertDescription>
          </Alert>
          
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-1">Enter the 6-digit code sent to</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
          
          {isNewUser && (
            <Alert className="mb-6 bg-primary/10 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription>
                After OTP verification, your account will be reviewed by our team before full activation.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-8">
              <InputOTP 
                maxLength={6}
                value={value} 
                onChange={(val) => setValue(val)}
                containerClassName="justify-center gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button 
              type="submit"
              className="w-full mb-4 font-medium"
              disabled={isVerifying || value.length !== 6}
            >
              {isVerifying ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify & Continue
                </>
              )}
            </Button>
          </form>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              onClick={handleFillDemoCode}
              className="text-primary font-medium"
              size="sm"
            >
              Use Demo Code
            </Button>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
            <Button 
              variant="link" 
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="text-primary font-medium p-0 h-auto"
            >
              {resendDisabled 
                ? `Resend code in ${countdown}s` 
                : "Resend verification code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOtpVerification;
