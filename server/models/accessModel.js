import mongoose from "mongoose";

const accessControlSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  documentType:{
    type: String,
    enum: ["Prescription", "Diagnosis", "LabReport", "Imaging", "General"],
    default: "General",
  },
  urgency:{
    type: String,
    enum: ["High", "Normal", "Low"],
    default: "Normal",
  },
  reason:{
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  request: {
    type: Boolean,
    default: false,
  },
});

accessControlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const accessControlModel =
  mongoose.models.AccessControl ||
  mongoose.model("AccessControl", accessControlSchema);

export default accessControlModel;
