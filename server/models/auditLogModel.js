import { timeStamp } from "console";
import mongoose  from "mongoose";
import { type } from "os";
const crypto = require("crypto");

const auditLogSchema = new mongoose.Schema({
    actorId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    actorRole:{
        type:String,
        enum:[
            "user","doctor","admin"
        ],
        required: true
    },
    action:{
        type:String, // view , modify , delete 
        required: true
    },
    recordId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "record"
    },
    timeStamp:{
        type:Date,
        default: Date.now
    },
    ipAddress:{
        type:String
    },
    hash:{
        type:String
    },
    previousHash:{
        type:String
    }
})

const auditLogModel = mongoose.models.auditLog || mongoose.model("auditLog", auditLogSchema);

export default auditLogModel;