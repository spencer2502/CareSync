import multichain from './blockchain.js';

export const fetchAllAccessLogs = async () => {
  try {
    const items = await multichain.listStreamItems({
      stream: 'record-access',
      verbose: true,
      count: 999999, // 🔥 Fetch as many logs as you want
      start: -999999, // 🔥 Start from the oldest
    });

    return items.map((item) => {
      const decoded = Buffer.from(item.data, 'hex').toString();
      return JSON.parse(decoded);
    });
  } catch (err) {
    console.error('❌ Error reading logs:', err.message);
    return [];
  }
};
