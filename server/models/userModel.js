import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpireAt: {
      type: Number,
      default: 0,
    },
    dob: {
      type: Date,
    },
    patientId: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    records: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "record",
      },
    ],
    emergencyQrCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "emergencyQrCode",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // Adds createdAt & updatedAt fields

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
