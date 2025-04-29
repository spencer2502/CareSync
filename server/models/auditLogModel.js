import mongoose from "mongoose";
import crypto from "crypto";

const auditLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  actorRole: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    required: true,
  },
  action: {
    type: String, // e.g., view, modify, delete
    required: true,
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "record",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  hash: {
    type: String,
  },
  previousHash: {
    type: String,
  },
});

const AuditLogModel =
  mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);

export default AuditLogModel;
