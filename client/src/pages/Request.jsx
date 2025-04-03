import React from "react";
import { assets } from "../assets/assets";

const Request = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
              <img
                onClick={() => navigate("/")}
                src={assets.logo}
                alt="logo"
                className="absolute left -5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
              />
              <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm"></div>
        </div>
    )
};

export default Request;
