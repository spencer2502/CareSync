
import React from "react";
import { Stethoscope, Shield } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "sidebar";
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md", 
  variant = "default" 
}) => {
  const sizeClasses = {
    sm: {
      text: "text-xl",
      icon: "h-4 w-4",
      shield: "h-8 w-8",
    },
    md: {
      text: "text-2xl",
      icon: "h-5 w-5",
      shield: "h-10 w-10",
    },
    lg: {
      text: "text-4xl",
      icon: "h-6 w-6",
      shield: "h-12 w-12",
    },
  };

  // Different background styles based on variant
  const bgStyles = {
    default: "bg-white/20 backdrop-blur-md",
    sidebar: "bg-primary/20 backdrop-blur-md"
  };

  // Different text styles based on variant
  const textStyles = {
    default: {
      first: "text-white",
      second: "text-blue-200",
      icon: "text-blue-200"
    },
    sidebar: {
      first: "text-primary-foreground",
      second: "text-secondary",
      icon: "text-primary"
    }
  };

  return (
    <div className={`font-bold ${sizeClasses[size].text} flex items-center gap-2 ${className}`}>
      <div className={`caresync-3d-element relative flex items-center ${bgStyles[variant]} px-4 py-2 rounded-lg`}>
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
          <Shield 
            className={`${sizeClasses[size].shield} ${textStyles[variant].icon} opacity-20`} 
            strokeWidth={1.5} 
          />
        </div>
        <div className="z-10 flex flex-col items-start">
          <div className="flex items-center gap-1">
            <span className={`${textStyles[variant].first} font-extrabold`}>Care</span>
            <span className={`${textStyles[variant].second} font-extrabold`}>Sync</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-normal">
            <Stethoscope className={`${sizeClasses[size].icon} ${textStyles[variant].icon}`} />
            <span className={`${textStyles[variant].second} text-xs`}>Health Records</span>
          </div>
        </div>
      </div>
      <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-300 to-white animate-pulse-light shadow-lg"></div>
    </div>
  );
};

export default Logo;
