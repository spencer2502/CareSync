
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Lock, Mail, Info, Eye, EyeOff } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface FormData {
  email: string;
  password: string;
}

const DoctorLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials check
      if (data.email === "doctor@example.com" && data.password === "password") {
        toast({
          title: "Authentication successful",
          description: "Please complete verification to continue",
        });
        
        // Navigate to OTP verification page
        navigate("/doctor/verify", { 
          state: { 
            email: data.email, 
            isNewUser: false 
          } 
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try doctor@example.com / password",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Doctor Login" 
      subtitle="Access your doctor portal"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="doctor@example.com"
              className="pl-10"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login to Doctor Portal"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have a doctor account?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto font-medium" 
            onClick={() => setShowAccountInfo(!showAccountInfo)}
          >
            How to get one
          </Button>
        </p>
      </div>
      
      {showAccountInfo && (
        <Card className="mt-4 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-4 w-4" />
              Doctor Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm pt-0">
            <p className="mb-2">
              Doctor accounts must be verified by hospital administrators. To request an account:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Contact your hospital IT department</li>
              <li>Provide your medical license and credentials</li>
              <li>Once verified, you'll receive your login details</li>
            </ol>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Demo credentials:</p>
              <p>Email: doctor@example.com</p>
              <p>Password: password</p>
            </div>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-8 border-t pt-6">
        <p className="text-xs text-center text-gray-500">
          By logging in, you agree to CareSync's Terms of Service and Privacy Policy.
        </p>
      </div>
    </AuthLayout>
  );
};

export default DoctorLogin;

