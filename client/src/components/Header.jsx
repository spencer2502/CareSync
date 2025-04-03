import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  // Log userData to check its structure
  useEffect(() => {
    console.log("UserData from Context:", userData);
  }, [userData]);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-1 "
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
      Smart & Secure Medical Records
      </h2>

      <p className="mb-8 max-w-md">
      CareSync revolutionizes healthcare by providing a secure, seamless, and 
  centralized platform for managing medical records. Instantly access, store, 
  and share patient data with advanced security, ensuring privacy and efficiency 
  for hospitals, doctors, and patients alike.
      </p>

      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all" 
       onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
};

export default Header;
