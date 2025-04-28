import doctorModel from '../models/doctorModel.js';
import accessControlModel from '../models/accessModel.js';
import userModel from '../models/userModel.js';
import recordModel from '../models/recordModel.js';
import { logAccess } from '../utils/auditLogger.js';
import { logAccessEvent } from '../utils/blockchainLogger.js';

export const getDoctorData = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: 'Doctor not found' });
    }
    return res.json({
      success: true,
      doctorData: {
        name: doctor.name,
        email: doctor.email,
        isVerified: doctor.isVerified.toString(),
        id: doctor._id.toString(),
        specialization: doctor.specialization,
        experience: doctor.experience,
        hospitalName: doctor.hospitalName,
        hospitalAddress: doctor.hospitalAddress,
        phoneNumber: doctor.phoneNumber,

        // or else entire doctor object can be returned
        // doctor: doctor
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};

//   try {
//     const  doctorId  = req.doctor.body;
//     const { userId } = req.body; // patientId

//     if (!doctorId || !userId || typeof userId !== "string" || !userId.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Doctor ID and valid User ID are required",
//       });
//     }

//     const doctor = await doctorModel.findById(doctorId);
//     if (!doctor) {
//       return res.json({ success: false, message: "Doctor not found" });
//     }

//     const patient = await userModel.findOne({ patientId: userId.trim() });
//     if (!patient) {
//       return res.json({ success: false, message: "Patient not found" });
//     }

//     const newRequest = new accessControlModel({
//       doctor: doctor._id,
//       patient: patient._id,
//       expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
//     });

//     await newRequest.save();
//     return res.json({ success: true, message: "Request sent successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

export const sendRequest = async (req, res) => {
  try {
    console.log('--- Incoming request body ---', req.body);
    const doctorId = req.doctor?.id;
    const { userId, documentType, urgency, reason } = req.body;

    if (!doctorId || !userId || typeof userId !== 'string' || !userId.trim()) {
      console.log('Missing doctorId or invalid userId');
      return res.status(400).json({
        success: false,
        message: 'Doctor ID and valid User ID are required',
      });
    }

    const doctor = await doctorModel.findById(doctorId);
    console.log('Doctor fetched:', doctor);

    if (!doctor) {
      return res.json({ success: false, message: 'Doctor not found' });
    }

    const patient = await userModel.findOne({ patientId: userId.trim() });
    console.log('Patient fetched:', patient);

    if (!patient) {
      return res.json({ success: false, message: 'Patient not found' });
    }

    const newRequest = new accessControlModel({
      doctor: doctor._id,
      patient: patient._id,
      documentType: documentType || 'General',
      urgency: urgency || 'Normal',
      reason: reason || '',
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Changed to 1 hour
    });

    await newRequest.save();
    console.log('New request saved successfully');

    return res.json({ success: true, message: 'Request sent successfully' });
  } catch (error) {
    console.error('Server error occurred:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};

// export const getAllRecords = async (req, res) => {
//   try {
//     const doctorId = req.doctor.id; // pulled from JWT

//     // Validate doctor
//     const doctor = await doctorModel.findById(doctorId);
//     if (!doctor) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     // Get all valid access grants
//     const accessList = await accessControlModel
//       .find({
//         doctor: doctorId,
//         request: true,
//         expiresAt: { $gt: new Date() }, // not expired
//       })
//       .populate("patient", "name email _id");

//     if (accessList.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No valid access requests found",
//       });
//     }

//     // Fetch records for each patient
//     const data = await Promise.all(
//       accessList.map(async (access) => {
//         const patientRecords = await recordModel.find({
//           uploadedBy: access.patient._id,
//         });
//         for (const patientRecord of patientRecords) {
//           await logAccess({
//             actorId: doctorId,
//             actorRole: "doctor",
//             action: "view",
//             recordId: patientRecord._id,
//             ipAddress: req.ip,
//           });
//         }

//         // Log access for each record viewed in the blockchain
//         for (const record of patientRecords) {
//           await logAccessEvent("doctor", doctorId, record._id.toString(), "view");
//         }

//         res.json({
//           success: true,
//           records: patientRecords,
//         });

//         return {
//           patient: {
//             id: access.patient._id,
//             name: access.patient.name,
//             email: access.patient.email,
//           },
//           records: patientRecords,
//         };
//       })
//     );

//     return res.status(200).json({ success: true, data });
//   } catch (error) {
//     console.error("Error fetching records:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

export const getAllRecords = async (req, res) => {
  try {
    const doctorId = req.doctor.id;

    // Validate doctor
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor not found' });
    }

    // Get valid access grants
    const accessList = await accessControlModel
      .find({
        doctor: doctorId,
        request: true,
        expiresAt: { $gt: new Date() },
      })
      .populate('patient', 'name email _id');

    if (accessList.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No valid access requests found',
      });
    }

    // Build response data
    const data = await Promise.all(
      accessList.map(async (access) => {
        const patientRecords = await recordModel.find({
          uploadedBy: access.patient._id,
        });

        // Log access for each record
        for (const record of patientRecords) {
          await logAccess({
            actorId: doctorId,
            actorRole: 'doctor',
            action: 'view',
            recordId: record._id,
            ipAddress: req.ip,
          });

          await logAccessEvent(
            'doctor',
            doctorId,
            record._id.toString(),
            'view'
          );
        }

        return {
          patient: {
            id: access.patient._id,
            name: access.patient.name,
            email: access.patient.email,
          },
          records: patientRecords,
        };
      })
    );

    // ✅ Send only one response
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching records:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id; // patientId from URL
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required',
      });
    }
    const patient = await userModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }
};

// Controller function to get all documents for a specific patient
export const getPatientDocuments = async (req, res) => {
  try {
    const doctorId = req.user?.id; // Doctor ID from JWT
    const patientId = req.params.id; // Patient ID from URL parameter
    
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required'
      });
    }

    // Verify the patient exists
    const patient = await userModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Get all records uploaded by this patient
    const records = await recordModel.find({ uploadedBy: patientId });
    
    // Log access for audit purposes
    for (const record of records) {
      await logAccessEvent("doctor", doctorId, record._id.toString(), "list_view");
    }

    return res.status(200).json({
      success: true,
      documents: records,
      message: `Retrieved ${records.length} documents for patient`
    });
  } catch (error) {
    console.error('Error fetching patient documents:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};