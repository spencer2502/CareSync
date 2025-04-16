// utils/blockchainLogger.js
import multichain from "./blockchain.js";

export const logAccessEvent = async (
  userType,
  userId,
  recordId,
  actionType
) => {
  const payload = {
    time: new Date().toISOString(),
    userType,
    userId,
    recordId,
    action: actionType,
  };

  const key = `${userType}_${userId}_${recordId}`;

  try {
    await multichain.publish({
      stream: "record-access",
      key,
      data: Buffer.from(JSON.stringify(payload)).toString("hex"),
    });
    console.log("✅ Access event logged to blockchain");
  } catch (err) {
    console.error("❌ Blockchain log failed:", err.message);
  }
};
