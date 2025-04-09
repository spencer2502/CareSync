import { verify } from "crypto";
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        verifyOtp:{
            type:String,
            default:""
        },
        verifyOtpExpireAt:{
            type:Number,
            default:0
        },
        dob:{
            type:Date
        },
        doctorId:{
            type:String,
            default:""
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        doctorVerified:{
            type:Boolean,
            default:false
        },
        doctorSpeciality:{
            type:String,
            default:""
        },
    },
    { timestamps: true }
);

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;