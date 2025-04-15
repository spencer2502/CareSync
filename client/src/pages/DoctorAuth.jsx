import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { assets } from "../assets/assets"; // Assuming you are using assets like icons, images

const DoctorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    doctorSpeciality: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/doctor/login" : "/api/doctor/register";
      const { data } = await axios.post(endpoint, formData);
      alert(data.message || (isLogin ? "Login successful" : "Signup successful"));
      navigate("/doctor-dashboard");
    } catch (error) {
      console.error(error);
      alert("Authentication failed. Please try again.");
    }
  };

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
        className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/80 border border-indigo-200 shadow-2xl rounded-3xl px-8 py-6 sm:px-10 sm:py-12 max-h-[80vh] overflow-auto"
        style={{
          boxShadow:
            "0 20px 30px rgba(99, 102, 241, 0.25), 0 8px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700 sm:text-4xl">
            {isLogin ? "Doctor Login" : "Doctor Sign Up"}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
                  <img src={assets.person_icon} alt="person" className="w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="bg-transparent outline-none w-full text-sm"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    className="bg-transparent outline-none w-full text-sm"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1">
                  Date of Birth
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
                  <input
                    type="date"
                    name="dob"
                    className="bg-transparent outline-none w-full text-sm"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1">
                  Speciality
                </label>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
                  <input
                    type="text"
                    name="doctorSpeciality"
                    placeholder="Doctor's Speciality"
                    className="bg-transparent outline-none w-full text-sm"
                    value={formData.doctorSpeciality}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="bg-transparent outline-none w-full text-sm"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full text-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-transform transform hover:scale-105 duration-200 sm:py-3"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-700 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[400px] h-[400px] bg-indigo-700 opacity-20 rounded-full blur-3xl sm:w-[500px] sm:h-[500px]"
      />

      <style>
        {`
          /* Hide the scrollbar completely */
          ::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
          ::-webkit-scrollbar-thumb {
            background: transparent;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Make sure content is scrollable */
          .overflow-auto {
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
};

export default DoctorAuth;
