import express from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail } from "../controller/authController.js";
import { doctorLogin, doctorLogout, doctorRegister, doctorSendVerifyOtp, doctorVerifyEmail } from "../controller/doctorAuthController.js";
import userAuth from "../middleware/userAuth.js";
import doctorAuth from "../middleware/doctorAuth.js";

const authRouter = express.Router();

authRouter.post("/user/register",register);
authRouter.post("/user/login",login);
authRouter.post("/user/logout", logout);
authRouter.post("/user/send-verify-otp",userAuth,sendVerifyOtp)
authRouter.post("/user/verify-account",userAuth,verifyEmail)

authRouter.post("/doctor/register",doctorRegister);
authRouter.post("/doctor/login", doctorLogin);
authRouter.post("/doctor/logout", doctorLogout);
authRouter.post("/doctor/send-verify-otp", doctorAuth, doctorSendVerifyOtp);
authRouter.post("/doctor/verify-account", doctorAuth, doctorVerifyEmail);


export default authRouter;