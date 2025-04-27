import express from "express";
import doctorAuth from "../middleware/doctorAuth.js";
import { getAllRecords, getDoctorData, getPatientDocuments, sendRequest } from "../controller/doctorController.js";
import { getRecord } from "../controller/recordController.js";
import { getPatientById } from "../controller/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/data", doctorAuth, getDoctorData);

doctorRouter.post("/sendRequest", doctorAuth, sendRequest);

doctorRouter.get("/getAllRecords", doctorAuth, getAllRecords);

doctorRouter.get("/getRecord/:id",doctorAuth,getRecord) // get record by id

doctorRouter.get('/getPatientById/:id', doctorAuth, getPatientById); // get patient by id

doctorRouter.get("/patient/:id/documents", doctorAuth, getPatientDocuments)

export default doctorRouter;