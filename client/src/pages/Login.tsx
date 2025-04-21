
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const otp = generateOTP();
    
    // Simulate sending OTP to email
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OTP Sent Successfully",
        description: `A verification code has been sent to ${email}`,
      });
      
      // Store OTP in sessionStorage (in real app this would be handled server-side)
      sessionStorage.setItem('patientOTP', otp);
      
      // Navigate to OTP verification page
      navigate("/verify", { 
        state: { 
          email, 
          isNewUser: false 
        } 
      });
    }, 1500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your CareSync account"
    >
      <Alert className="mt-4 mb-2 bg-yellow-50 border-yellow-100">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-yellow-700">
          <span className="font-medium">Demo Mode:</span> You can use any email/password and will receive a demo OTP (123456)
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-6 animate-fade-in-up">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary/80">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;

