// utils/createStream.js
import multichain from "./blockchain.js";

const initStream = async () => {
  try {
    await multichain.create({
      type: "stream",
      name: "record-access",
      open: true,
    });
    console.log("✅ Stream created: record-access");

    await multichain.subscribe({
      stream: "record-access",
    });
    console.log("📡 Subscribed to stream: record-access");
  } catch (err) {
    console.error("❌ Stream init failed:", err.message);
  }
};

initStream();
