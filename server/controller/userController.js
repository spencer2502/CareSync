import accessControlModel from "../models/accessModel.js";
import recordModel from "../models/recordModel.js";
import userModel from "../models/userModel.js";
import { logAccess } from "../utils/auditLogger.js";
import { logAccessEvent } from "../utils/blockchainLogger.js"; 

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; // from the JWT token
    console.log("Decoded user ID:", userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified.toString(),
        id: user._id.toString(),
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};


export const getAllRequests = async (req, res) => {
  try {
    const userId = req.user.id; // corrected userId assignment;
    const requests = await accessControlModel.find({ patient: userId });
    if (!requests.length) {
      return res.json({ success: false, message: "No records found" });
    }

    res.json({
      success: true,
      records: requests,
    });
  } catch (error) {
    console.error("Error updating record access:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await accessControlModel.findById(requestId);
    if (!request) {
      return res.json({ success: false, message: "Request not found" });
    }
    request.request = true;
    await request.save();
    res.json({
      success: true,
      message: "Request accepted",
    });
  } catch (error) {
    console.error("Error updating record access:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// export const getUserRecords = async (req, res) => {
//   try {
//     const userId = req.user.id; // pulled from JWT
//         console.log("Decoded user ID:", userId);
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const records = await recordModel.find({ uploadedBy: userId });
//     if (!records.length) {
//       return res.json({ success: false, message: "No records found" });
//     }

//     await logAccess({
//       actorId: userId,
//       actorRole: 'user',
//       action: 'view',
//       recordId,
//       ipAddress: req.ip,
//     })

//     res.json({
//       success: true,
//       records: records,
//     });
//   } catch (error) {
//     console.error("Error fetching user records:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


export const getUserRecords = async (req, res) => {
  try {
    const userId = req.user.id; // pulled from JWT
    console.log("Decoded user ID:", userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const records = await recordModel.find({ uploadedBy: userId });
    if (!records.length) {
      return res.json({ success: false, message: "No records found" });
    }

    // Log access for each record viewed in the blockchain
    for (const record of records) {
      await logAccessEvent("user", userId, record._id.toString(), "view");
    }

    res.json({
      success: true,
      records: records,
    });
  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};