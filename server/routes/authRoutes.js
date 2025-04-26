import express from "express";
import { userLogin, userLogout, userRegister, userSendVerifyOtp, userVerifyEmail } from "../controller/userAuthController.js";
import { doctorLogin, doctorLogout, doctorRegister, doctorSendVerifyOtp, doctorVerifyEmail } from "../controller/doctorAuthController.js";
import userAuth from "../middleware/userAuth.js";
import doctorAuth from "../middleware/doctorAuth.js";
import { getUserData } from "../controller/userController.js";

const authRouter = express.Router();

authRouter.post("/user/register",userRegister);
authRouter.post("/user/login",userLogin);
authRouter.post("/user/logout", userLogout);
authRouter.get("/user/me",userAuth,getUserData)
authRouter.post("/user/send-verify-otp",userAuth,userSendVerifyOtp)
authRouter.post("/user/verify-account",userAuth,userVerifyEmail)

authRouter.post("/doctor/register",doctorRegister);
authRouter.post("/doctor/login", doctorLogin);
authRouter.post("/doctor/logout", doctorLogout);
authRouter.post("/doctor/send-verify-otp", doctorAuth, doctorSendVerifyOtp);
authRouter.post("/doctor/verify-account", doctorAuth, doctorVerifyEmail);


export default authRouter;