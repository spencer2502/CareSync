import doctorModel from "../models/doctorModel.js";
import accessControlModel from "../models/accessModel.js";
import userModel from "../models/userModel.js";

export const getDoctorData = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
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
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// export const sendRequest = async (req, res) => {
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
    const doctorId = req.doctor.id; // Access the doctorId from the req.doctor object
    const { userId } = req.body; // patientId

    if (!doctorId || !userId || typeof userId !== "string" || !userId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and valid User ID are required",
      });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const patient = await userModel.findOne({ patientId: userId.trim() });
    if (!patient) {
      return res.json({ success: false, message: "Patient not found" });
    }

    const newRequest = new accessControlModel({
      doctor: doctor._id,
      patient: patient._id,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    });

    await newRequest.save();
    return res.json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllRecords = async (req, res) => {
  try {
    const doctorId = req.doctor.id; // pulled from JWT

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const records = await accessControlModel
      .find({
        doctor: doctorId,
        request: true,
        expiresAt: { $gt: new Date() }, // not expired
      })
      .populate("patient", "name email");

    if (records.length === 0) {
      return res.json({
        success: false,
        message: "No valid access requests found",
      });
    }

    return res.json({ success: true, records });
  } catch (error) {
    console.error("Error fetching records:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
