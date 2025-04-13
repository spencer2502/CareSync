import mongoose from "mongoose";

const { Schema } = mongoose;

const recordSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    patientId: {
      // type: Schema.Types.ObjectId,
      // ref: "user",
      type: String,
      
    },
    doctorId: {
      // type: Schema.Types.ObjectId,
      // ref: "doctor",
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },
    recordType: {
      type: String,
      enum: ["Prescription", "Diagnosis", "LabReport", "Imaging", "General"],
      default: "General",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    attachments: [
      {
        fileUrl: String,
        fileName: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    accessLog: [
      {
        accessedBy: {
          type: Schema.Types.ObjectId,
          refPath: "accessLog.role",
        },
        role: {
          type: String,
          enum: ["User", "Doctor", "Admin"],
        },
        accessedAt: {
          type: Date,
          default: Date.now,
        },
        action: {
          type: String,
          enum: ["viewed", "updated", "shared"],
        },
      },
    ],
    sharedWith: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isEmergencyAccessible: {
      type: Boolean,
      default: false,
    },
    blockchainHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const recordModel =
  mongoose.models.record || mongoose.model("record", recordSchema);
export default recordModel;
