import recordModel from "../models/recordModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// You can move this into a utils file
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to Cloudinary:", response.url);
    fs.unlinkSync(localFilePath); // Clean up local file
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", err);
    return null;
  }
};

export const createRecord = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      recordType,
      title,
      description,
      isEmergencyAccessible,
      sharedWith,
    } = req.body;

    if (!patientId || !doctorId || !title) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Doctor ID, and title are required.",
      });
    }

    // Upload files to Cloudinary
    const attachments = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        if (uploaded) {
          attachments.push({
            fileUrl: uploaded.secure_url,
            fileName: file.originalname,
          });
        }
      }
    }

    // Create and save record
    const newRecord = new recordModel({
      patient: patientId,
      doctor: doctorId,
      recordType,
      title,
      description,
      attachments,
      isEmergencyAccessible,
      sharedWith,
    });

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
