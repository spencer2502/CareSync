import express from "express";
import doctorAuth from "../middleware/doctorAuth.js";
import { getAllRecords, getDoctorData, sendRequest } from "../controller/doctorController.js";
import { getRecord } from "../controller/recordController.js";

const doctorRouter = express.Router();

doctorRouter.get("/data", doctorAuth, getDoctorData);

doctorRouter.post("/sendRequest", doctorAuth, sendRequest);

doctorRouter.get("/getAllRecords", doctorAuth, getAllRecords);

doctorRouter.get("/getRecord/:id",doctorAuth,getRecord) // get record by id

export default doctorRouter;