
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RefreshCcw } from "lucide-react";

interface VerifyButtonProps {
  isVerifying: boolean;
  disabled: boolean;
  onClick: () => void;
}

const VerifyButton = ({ isVerifying, disabled, onClick }: VerifyButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      className="w-full mb-4 font-medium"
      disabled={disabled}
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
  );
};

export default VerifyButton;
