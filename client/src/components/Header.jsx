import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  // This function will navigate to the appropriate page based on role (user/doctor)
  const handleNavigation = (role) => {
    if (role === "user") {
      navigate("/login", { state: { formType: "Sign Up", role } }); // Go to Login page with "Sign Up"
    } else if (role === "doctor") {
      navigate("/doctor-auth", { state: { formType: "Sign Up", role } }); // Go to DoctorAuth page with "Sign Up"
    }
  };

  return (
    <div className="w-full bg-indigo-50 py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center pt-12 sm:pt-16">
          <div className="bg-white rounded-full w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shadow-lg mb-6 sm:mb-8">
            <div className="flex items-center">
              <span className="text-3xl sm:text-4xl font-semibold">
                <span className="text-indigo-900">Care</span>
                <span className="text-green-500">Sync</span>
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 mb-4 sm:mb-6">
            Smart & Secure Medical Records
          </h1>

          <p className="text-gray-700 max-w-2xl mb-6 sm:mb-8 text-center leading-relaxed text-sm sm:text-base">
            CareSync revolutionizes healthcare by providing a secure, seamless, and centralized platform for managing medical
            records. Instantly access, store, and share patient data with advanced security, ensuring privacy and efficiency
            for hospitals, doctors, and patients alike.
          </p>

          {!showOptions ? (
            <button
              className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all sm:px-10 sm:py-3"
              onClick={() => setShowOptions(true)}
            >
              Get Started
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8">
              <button
                onClick={() => handleNavigation("user")}
                className="bg-indigo-700 text-white rounded-full px-6 py-2 sm:px-8 sm:py-3 hover:bg-indigo-800 transition"
              >
                I'm a User
              </button>
              <button
                onClick={() => handleNavigation("doctor")}
                className="bg-white border border-indigo-700 text-indigo-700 rounded-full px-6 py-2 sm:px-8 sm:py-3 hover:bg-indigo-100 transition"
              >
                I'm a Doctor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
