import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorEmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer for resend OTP cooldown
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming doctor-specific OTP validation
      const { data } = await axios.post("/api/doctor/verify-otp", { otp });
      if (data.success) {
        toast.success("OTP Verified successfully!");
        navigate("/doctor-dashboard");
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate API call to resend OTP
      const { data } = await axios.post("/api/doctor/resend-otp", { email: "doctor_email" });
      if (data.success) {
        toast.success("OTP sent successfully!");
        setResendTimer(30); // Set cooldown timer for resend OTP
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP.");
    }
  };

  // Countdown for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [resendTimer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative overflow-hidden">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-4 top-4 sm:left-20 sm:top-6 w-24 sm:w-32 cursor-pointer"
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/80 border border-indigo-200 shadow-2xl rounded-3xl px-8 py-10"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">Doctor Email Verification</h2>
          <p className="text-sm text-gray-500">Please enter the OTP sent to your email address.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">OTP</label>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
              <img src={assets.mail_icon} alt="mail" className="w-5 h-5" />
              <input
                type="text"
                placeholder="Enter OTP"
                className="bg-transparent outline-none w-full text-sm"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-transform transform hover:scale-105 duration-200"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {loading && (
          <motion.div
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 1 }}
          >
            Loading...
          </motion.div>
        )}

        {resendTimer === 0 ? (
          <div
            className="mt-4 text-sm text-indigo-700 cursor-pointer hover:underline"
            onClick={handleResendOtp}
          >
            Resend OTP
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-500">
            Please wait {resendTimer}s before resending OTP.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorEmailVerify;
