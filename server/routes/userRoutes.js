import express from "express";
import userAuth from "../middleware/userAuth.js";

import { getUserData,getAllRequests,acceptRequest, getUserRecords, rejectRequest, revokeAccess } from "../controller/userController.js";

import { upload } from "../middleware/multerMiddleware.js";

import { createRecord, getRecord , updateRecord , deleteRecord } from "../controller/recordController.js";

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

userRouter.get("/getUserRecords", userAuth,
  getUserRecords
)

userRouter.get("/getRecord/:id", userAuth, getRecord); // get record by id

userRouter.put('/updateRecord/:id', userAuth, updateRecord); // update record by id
userRouter.delete('/deleteRecord/:id', userAuth, deleteRecord);

userRouter.post('/rejectRequest',userAuth, rejectRequest)
userRouter.post('/revokeAccess',userAuth, revokeAccess)

export default userRouter;
