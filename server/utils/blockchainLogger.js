import multichain from "./blockchain";

const logAccessEvent = (userType, userId, recordId, actionType) => {
  const data = {
    time: new Date().toISOString(),
    userType,
    userId,
    recordId,
    action: actionType,
  };

  const key = `${userType}_${userId}_${recordId}`;

  multichain.publish(
    {
      stream: "access_logs",
      key,
      data: Buffer.from(JSON.stringify(data)).toString("hex"),
    },
    (err, res) => {
      if (err) {
        console.error("Error publishing to blockchain:", err);
      }
        console.log("Access log published to blockchain:", res);
    }
  );
};

