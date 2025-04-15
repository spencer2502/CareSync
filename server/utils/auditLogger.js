import crypto from "crypto";
import AuditLogModel from "../models/auditLogModel";

const calculateHash = ({
  actorId,
  actorRole,
  action,
  recordId,
  timestamp,
  ipAddress,
  previousHash,
}) => {
  const logString = `${actorId}-${actorRole}-${action}-${recordId}-${timestamp}-${ipAddress}-${previousHash}`;
  return crypto.createHash("sha256").update(logString).digest("hex");
};

const getLastLog = async () => {
  return await AuditLogModel.findOne().sort({ timestamp: -1 });
};

export const logAccess = async ({
  actorId,
  actorRole,
  action,
  recordId,
  ipAddress,
}) => {
  const previousLog = await getLastLog();
  const previousHash = previousLog ? previousLog.hash : "GENESIS";

  const timestamp = new Date();

  const hash = calculateHash({
    actorId,
    actorRole,
    action,
    recordId,
    timestamp,
    ipAddress,
    previousHash,
  });

  const newLog = new AuditLogModel({
    actorId,
    actorRole,
    action,
    recordId,
    timestamp,
    ipAddress,
    previousHash,
    hash,
  });

  await newLog.save();
};
