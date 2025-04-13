import express from "express";
import userAuth from "../middleware/userAuth.js";

import { getUserData,getAllRequests,acceptRequest } from "../controller/userController.js";

import { upload } from "../middleware/multerMiddleware.js";

import { createRecord } from "../controller/recordController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

userRouter.post(
  "/createNewRecord",
  userAuth,
  upload.array("files", 5), // Accept up to 5 files
  createRecord
);

userRouter.get("/getAllRequests", userAuth, getAllRequests);

userRouter.post("/acceptRequest", userAuth, acceptRequest);

export default userRouter;
