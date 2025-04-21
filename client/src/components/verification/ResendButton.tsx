
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface ResendButtonProps {
  disabled: boolean;
  countdown: number;
  onResend: () => void;
}

const ResendButton = ({ disabled, countdown, onResend }: ResendButtonProps) => {
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => {
    // Get the current OTP from sessionStorage
    const currentOTP = sessionStorage.getItem('patientOTP');
    
    if (showCode) {
      setShowCode(false);
    } else {
      setShowCode(true);
      if (currentOTP) {
        toast({
          title: "Your verification code",
          description: `Your current verification code is: ${currentOTP}`,
        });
      } else {
        toast({
          title: "No code available",
          description: "Please request a new verification code",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="text-center">
      <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
      <div className="flex flex-col items-center space-y-2">
        <Button 
          variant="link" 
          onClick={onResend}
          disabled={disabled}
          className="text-primary font-medium p-0 h-auto"
        >
          {disabled 
            ? `Resend code in ${countdown}s` 
            : "Resend verification code"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={toggleShowCode}
          className="flex items-center text-xs px-2 py-1 h-8"
        >
          {showCode ? (
            <>
              <EyeOff className="h-3 w-3 mr-1" /> Hide code
            </>
          ) : (
            <>
              <Eye className="h-3 w-3 mr-1" /> View current code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResendButton;
