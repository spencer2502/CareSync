import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const doctorRegister = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.json({ success: false, message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (phone.length < 10) {
    return res
      .status(400)
      .json({ message: "Phone number must be at least 10 digits long" });
  }

  try {
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({ success: false, message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const generateDoctorId = (name, phone, hashedPassword) => {
      const randomSeed = uuidv4();
      const combined = `${name}${phone}${hashedPassword}${randomSeed}`;

      const hash = crypto.createHash("sha256").update(combined).digest("hex");
      const base36Code = BigInt("0x" + hash)
        .toString(36)
        .slice(0, 8);

      return base36Code.toUpperCase();
    };

    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      doctorId: generateDoctorId(name, phone, hashedPassword),
    });

    await doctor.save();

    const token = jwt.sign(
      { id: doctor._id, role: "Doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const doctorCookie = {
      token: token,
      doctorId: doctor._id,
    };
    console.log("Doctor registration details:", doctorCookie);

    return res.status(200).json({
      success: true,
      message: "Doctor registered successfully",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Check if email is verified
    if (!doctor.isVerified) {
      return res.json({
        success: false,
        message: "Email not verified. Please verify your email first.",
      });
    }
    if (!doctor.doctorVerified) {
      return res.json({
        success: false,
        message:
          "Doctor not verified. Please verify while we verify your account.",
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "Doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const doctorLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const doctorSendVerifyOtp = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (doctor.isVerified) {
      return res.status(400).json({ message: "Doctor email already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    doctor.verifyOtp = otp;

    doctor.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await doctor.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: doctor.email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOption);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error during sendVerifyOtp:", err);
    res.status(500).json({ message: err.message });
  }
};

export const doctorVerifyEmail = async (req, res) => {
  const { doctorId, otp } = req.body;

  if (!doctorId || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({ message: "User not found" });
    }
    if (doctor.verifyOtp === "" || doctor.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (doctor.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    doctor.isVerified = true;
    doctor.verifyOtp = "";
    doctor.verifyOtpExpireAt = 0;

    await doctor.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error during verifyEmail:", err);
    res.status(500).json({ message: err.message });
  }
};
