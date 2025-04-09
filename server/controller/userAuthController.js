import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const userRegister = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validate input fields
  if (!name || !email || !password|| !phone) {
    return res.json({success:false, message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (phone.length <10) {
    return res.status(400).json({ message: "Phone number must be at least 10 digits long" });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({success:false , message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique patient ID
    const generatePatientId = (name,phone, hashedPassword) => {
      const randomSeed = uuidv4(); // Generate a random UUID
      const combined = `${name}${phone}${hashedPassword}${randomSeed}`; 

      const hash = crypto.createHash("sha256").update(combined).digest("hex");
      const base36Code = BigInt('0x'+hash).toString(36).slice(0, 8); // Convert to base 36 and take the first 8 characters

      return base36Code.toUpperCase(); 

    }

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      patientId: generatePatientId(name,phone, hashedPassword),
      
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Extract token and user ID from cookie
    const userCookie = {
        token: token,
        userId: user._id
    };
    console.log('User registration details:', userCookie);

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .json({
          success: false,
          message: "Email not verified. Please verify your email first.",
        });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({success:true, message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const userLogout = async (req, res) => {
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

export const userSendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;

    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
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

export const userVerifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error during verifyEmail:", err);
    res.status(500).json({ message: err.message });
  }
};
