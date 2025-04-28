import express from 'express';
import {
  getEmergencyQrData,
  generateEmergencyQrCode,
  getEmergencyRecords,
  verifyEmergencyAccess,
  getEmergencyRecordsCount,
} from '../controller/emergencyQrController.js';
import userAuth from '../middleware/userAuth.js';

const emergencyRouter = express.Router();

// Routes that require patient authentication
emergencyRouter.get(
  '/records/:patientId/emergency-count',
  userAuth,
  getEmergencyRecordsCount
);
emergencyRouter.get(
  '/patients/:patientId/emergency-qr',
  userAuth,
  generateEmergencyQrCode
);

// Public route that uses token verification instead of auth middleware
emergencyRouter.get(
  '/access/:patientId',
  verifyEmergencyAccess,
  getEmergencyRecords
);

// Admin/debug routes (optional, with appropriate auth)
// emergencyRouter.get("/qr-data/:patientId", adminAuth, getEmergencyQrData);

export default emergencyRouter;
