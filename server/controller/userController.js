import accessControlModel from "../models/accessModel.js";
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

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
    const { userId } = req.body;
    const request = await accessControlModel.find({ userId });
    if (!request) {
      return res.json({ success: false, message: "No records found" });
    }

    res.json({
      success: true,
      records: request,
    });

  } catch (error) {
    console.error("Error updating record access:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const acceptRequest = async (req,res) => {
  try {
    const {requestId} = req.body;
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

  }catch (error) {
    console.error("Error updating record access:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
