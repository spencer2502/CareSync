// routes/audit.js
import express from "express";
import { fetchAllAccessLogs } from "../utils/readLogs.js";

const auditRouter = express.Router();

auditRouter.get("/logs", async (req, res) => {
  const logs = await fetchAllAccessLogs();
  res.status(200).json(logs);
});

export default auditRouter;
