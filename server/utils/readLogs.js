// utils/readLogs.js
import multichain from "./blockchain.js";

export const fetchAllAccessLogs = async () => {
  try {
    const items = await multichain.listStreamItems({
      stream: "record-access",
      verbose: true,
    });

    return items.map((item) => {
      const decoded = Buffer.from(item.data, "hex").toString();
      return JSON.parse(decoded);
    });
  } catch (err) {
    console.error("❌ Error reading logs:", err.message);
    return [];
  }
};
