
import React from "react";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OtpInput = ({ value, onChange }: OtpInputProps) => {
  return (
    <div className="mb-8">
      <InputOTP 
        maxLength={6}
        value={value} 
        onChange={onChange}
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
  );
};

export default OtpInput;
