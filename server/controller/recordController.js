import recordModel from '../models/recordModel.js';
import doctorModel from '../models/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import userModel from '../models/userModel.js';
import { logAccess } from '../utils/auditLogger.js';
import { logAccessEvent } from '../utils/blockchainLogger.js';

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

    // Log the creation action
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'create',
      recordId: newRecord._id,
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent('patient', userId, newRecord._id.toString(), 'create');

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
    const userId = req.user?.id;
    const userRole = req.user?.role || 'patient'; // Default to patient if role not specified

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

    // Log the access
    await logAccess({
      actorId: userId,
      actorRole: userRole,
      action: 'view',
      recordId: record._id,
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent(userRole, userId, record._id.toString(), 'view');

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

export const getAllUserRecords = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required',
      });
    }

    const records = await recordModel
      .find({ uploadedBy: userId })
      .populate('doctor', 'name specialty')
      .sort({ createdAt: -1 });

    // Log the list view access
    for (const record of records) {
      await logAccess({
        actorId: userId,
        actorRole: 'patient',
        action: 'list_view',
        recordId: record._id,
        ipAddress: req.ip,
      });

      // Log to blockchain
      await logAccessEvent(
        'patient',
        userId,
        record._id.toString(),
        'list_view'
      );
    }

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    const userId = req.user?.id;
    const {
      title,
      description,
      recordType,
      isEmergencyAccessible,
      sharedWith,
    } = req.body;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: 'Record ID is required.',
      });
    }

    // Find record and check ownership
    const record = await recordModel.findById(recordId);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    // Check if user owns this record
    if (record.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this record.',
      });
    }

    // Handle file uploads if any
    const attachments = [...record.attachments]; // Start with existing attachments
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

    // Update the record
    const updatedRecord = await recordModel.findByIdAndUpdate(
      recordId,
      {
        title: title || record.title,
        description: description || record.description,
        recordType: recordType || record.recordType,
        attachments,
        isEmergencyAccessible:
          isEmergencyAccessible !== undefined
            ? isEmergencyAccessible
            : record.isEmergencyAccessible,
        sharedWith: sharedWith || record.sharedWith,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    // Log the update action
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'update',
      recordId: record._id,
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent('patient', userId, record._id.toString(), 'update');

    res.status(200).json({
      success: true,
      message: 'Record updated successfully',
      data: updatedRecord,
    });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const recordId = req.params.id;
    const userId = req.user?.id;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: 'Record ID is required.',
      });
    }

    // Find record and check ownership
    const record = await recordModel.findById(recordId);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    // Check if user owns this record
    if (record.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this record.',
      });
    }

    // Log the delete action before actually deleting
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'delete',
      recordId: record._id,
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent('patient', userId, record._id.toString(), 'delete');

    // Delete the record
    await recordModel.findByIdAndDelete(recordId);

    res.status(200).json({
      success: true,
      message: 'Record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
