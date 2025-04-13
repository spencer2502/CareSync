import express from "express";
import doctorAuth from "../middleware/doctorAuth.js";
import { getAllRecords, getDoctorData, sendRequest } from "../controller/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/data", doctorAuth, getDoctorData);

doctorRouter.post("/sendRequest", doctorAuth, sendRequest);

doctorRouter.get("/getAllRecords", doctorAuth, getAllRecords);

export default doctorRouter;