import UserRecord from '../models/recordModel.js';
import crypto from 'crypto';
import QRCode from 'qrcode';

/**
 * Get count of emergency-accessible records for a patient
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getEmergencyRecordsCount = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Ensure requesting user is the patient or has permission
    if (req.user.id !== patientId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this resource',
      });
    }

    const count = await UserRecord.countDocuments({
      uploadedBy: patientId,
      isEmergencyAccessible: true,
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('Error getting emergency records count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get emergency records count',
      error: error.message,
    });
  }
};

/**
 * Generate a QR code image from the emergency data
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const generateEmergencyQrCode = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Ensure requesting user is the patient or has permission
    if (req.user.id !== patientId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this resource',
      });
    }

    // Check if patient has emergency records
    const count = await UserRecord.countDocuments({
      uploadedBy: patientId,
      isEmergencyAccessible: true,
    });

    if (count === 0) {
      return res.status(404).json({
        success: false,
        message: 'No emergency-accessible records found for this patient',
      });
    }

    // Generate a secure access token
    const accessToken = generateSecureToken(patientId);

    // Get frontend URL from environment variables or use a default for development
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8000';

    // Create a URL for emergency access
    const emergencyUrl = `${frontendUrl}/emergency-access/${patientId}?token=${accessToken}`;

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(emergencyUrl);

    // Store the token in database (optional)
    // await EmergencyToken.create({ patientId, token: accessToken, expiresAt: ... });

    res.status(200).json({
      success: true,
      patientId,
      qrCodeImage: qrCodeDataUrl,
      emergencyUrl,
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate QR code',
      error: error.message,
    });
  }
};

/**
 * Generate a secure token for emergency access
 */
function generateSecureToken(patientId) {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now();
  return `${patientId}_${timestamp}_${randomBytes}`;
}

/**
 * Middleware to verify emergency access token
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const verifyEmergencyAccess = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { token } = req.query;

    if (!token || !patientId) {
      return res.status(400).json({
        success: false,
        message: 'Missing token or patient ID',
      });
    }

    // Verify the token format (basic validation)
    if (!token.startsWith(patientId)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token',
      });
    }

    // In a production app, you should validate against stored tokens in database
    // const validToken = await EmergencyToken.findOne({
    //   patientId,
    //   token,
    //   expiresAt: { $gt: new Date() }
    // });
    //
    // if (!validToken) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid or expired token"
    //   });
    // }

    // Log this access (optional)
    // await AccessLog.create({
    //   patientId,
    //   tokenId: validToken._id,
    //   accessedAt: new Date(),
    //   ipAddress: req.ip
    // });

    // All checks passed, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error verifying emergency access:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying emergency access',
      error: error.message,
    });
  }
};

/**
 * Get emergency records for a patient (accessed via QR code)
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getEmergencyRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find emergency-accessible records
    const emergencyRecords = await UserRecord.find({
      uploadedBy: patientId,
      isEmergencyAccessible: true,
    }).select('recordType title description attachments createdAt updatedAt');

    if (emergencyRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No emergency-accessible records found for this patient',
      });
    }

    res.status(200).json({
      success: true,
      patientId,
      accessedAt: new Date().toISOString(),
      recordCount: emergencyRecords.length,
      records: emergencyRecords,
    });
  } catch (error) {
    console.error('Error getting emergency records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get emergency records',
      error: error.message,
    });
  }
};

/**
 * Get emergency-accessible records data (for use in QR code generation)
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getEmergencyQrData = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Ensure requesting user is the patient or has permission
    if (req.user.id !== patientId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this resource',
      });
    }

    // Find all records for this patient that are marked as emergency accessible
    const emergencyRecords = await UserRecord.find({
      uploadedBy: patientId,
      isEmergencyAccessible: true,
    }).select('recordType title description attachments createdAt');

    if (emergencyRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No emergency-accessible records found for this patient',
      });
    }

    // Format records for QR data
    const formattedRecords = emergencyRecords.map((record) => ({
      recordId: record._id,
      recordType: record.recordType,
      title: record.title,
      description: record.description,
      date: record.createdAt,
      attachments: record.attachments.map((attachment) => ({
        url: attachment.fileUrl,
        name: attachment.fileName,
      })),
    }));

    // Create a QR data object
    const qrData = {
      patientId,
      timestamp: new Date().toISOString(),
      emergencyRecordCount: formattedRecords.length,
      records: formattedRecords,
    };

    // Generate a secure access token for the QR
    const accessToken = generateSecureToken(patientId);

    // Create the final response with the data and access token
    const response = {
      success: true,
      accessToken,
      qrData: JSON.stringify(qrData),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error generating emergency QR data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate emergency QR data',
      error: error.message,
    });
  }
};
