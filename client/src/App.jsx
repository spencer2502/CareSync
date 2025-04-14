import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import HospitalsPage from "./pages/Hospitals";
import Hero from "./components/Hero";
import Reports from "./pages/Reports";
import EmergencyQR from "./pages/EmergencyQR";
import DoctorAuth from "./pages/DoctorAuth";
import DoctorEmailVerify from "./pages/DoctorEmailVerify";

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/hospital" element={<HospitalsPage />} />
        <Route path="/hero" element={<Hero />} />
<<<<<<< HEAD
        <Route path="/Reports" element={<Reports />} />
        <Route path="/EmergencyQR" element={<EmergencyQR />} />
        <Route path="/doctor-auth" element={<DoctorAuth />} />
        <Route path="/doctor-email-verify" element={<DoctorEmailVerify />} />



=======
        <Route path="/reports" element={<Reports />} />
        <Route path="/emergencyQR" element={<EmergencyQR />} />
>>>>>>> 55732bb (Get individual record by id)

      </Routes>
    </div>
  );
};

export default App;
