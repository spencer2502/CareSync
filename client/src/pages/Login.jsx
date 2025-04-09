import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

 
  const formTypeFromState = location.state?.formType || "Login";
  const [state, setState] = useState(formTypeFromState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.state?.formType) {
      setState(location.state.formType);
    }
  }, [location.state]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
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
        className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/80 border border-indigo-200 shadow-2xl rounded-3xl px-8 py-10"
        style={{
          boxShadow:
            "0 20px 30px rgba(99, 102, 241, 0.25), 0 8px 10px rgba(0,0,0,0.05)",
        }}
      >
       
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-700">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500">
            {state === "Sign Up"
              ? "Sign up to get started"
              : "Login to continue"}
          </p>
        </div>

      
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="text-sm text-gray-700 block mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
                <img src={assets.person_icon} alt="person" className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-transparent outline-none w-full text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
              <img src={assets.mail_icon} alt="mail" className="w-5 h-5" />
              <input
                type="email"
                placeholder="Enter email"
                className="bg-transparent outline-none w-full text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-100 hover:shadow-inner transition-all">
              <img src={assets.lock_icon} alt="lock" className="w-5 h-5" />
              <input
                type="password"
                placeholder="Enter password"
                className="bg-transparent outline-none w-full text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {state === "Login" && (
            <div className="text-right text-indigo-600 text-sm mb-4 hover:underline cursor-pointer">
              Forgot Password?
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-transform transform hover:scale-105 duration-200"
          >
            {state}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-indigo-700 font-semibold cursor-pointer hover:underline"
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Login Here" : "Register Here"}
          </span>
        </p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[400px] h-[400px] bg-indigo-700 opacity-20 rounded-full blur-3xl"
      />
    </div>
  );
};

export default Login;
