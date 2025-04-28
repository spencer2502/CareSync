import recordModel from '../models/recordModel.js';
import doctorModel from '../models/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import userModel from '../models/userModel.js';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Utility function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'raw',
    });

    console.log('File uploaded to Cloudinary:', response.secure_url);
    fs.unlinkSync(localFilePath); // delete local file after upload
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    console.error('Cloudinary upload error:', err);
    return null;
  }
};

// Controller
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

    // const userId = req.body.userId; // Injected by userAuth middleware
    const userId = req.user?.id;

    if (!doctorId || !title) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID and title are required.',
      });
    }

    // Step 1: Find doctor by doctorId string
    let doctorObjectId = null;
    const doctor = await doctorModel.findOne({ doctorId: doctorId.trim() });
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: 'No doctor found with the provided doctorId',
      });
    }
    doctorObjectId = doctor._id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user found with the provided userId',
      });
    }

    // Step 2: Upload files if any
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

    // Step 3: Save record
    const newRecord = new recordModel({
      uploadedBy: userId,
      patientId: user.patientId,
      doctor: doctorObjectId,
      doctorId: doctorId,
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
      message: 'Record created successfully',
      data: newRecord,
    });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getRecord = async (req, res) => {
  try {
    const recordId = req.params.id;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: 'Record ID is required.',
      });
    }

    const record = await recordModel
      .findById(recordId)
      .populate('doctor', 'name specialty');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
