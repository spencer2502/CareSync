import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({
            success : true,
            userData:{
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            }
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message})
    }
}