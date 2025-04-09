import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UserData from Context:", userData);
  }, [userData]);

  return (
    <div className="w-full bg-blue-50 py-42">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center shadow-lg mb-8">
            <div className="flex items-center">
              <span className="text-4xl font-semibold">
                <span className="text-blue-900">Care</span>
                <span className="text-green-500">Sync</span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Smart & Secure Medical Records
          </h1>

          <p className="text-gray-700 max-w-2xl mb-8 text-center leading-relaxed">
            CareSync revolutionizes healthcare by providing a secure, seamless, and centralized platform for managing medical
            records. Instantly access, store, and share patient data with advanced security, ensuring privacy and efficiency
            for hospitals, doctors, and patients alike.
          </p>

          <button
            className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
            onClick={() => navigate("/login", { state: { formType: "Sign Up" } })}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
