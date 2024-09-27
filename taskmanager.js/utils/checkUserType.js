import { Company_Profile } from "../models/profileSchema.js";
import { User } from "../models/userSchema.js";

const checkUserTypeForProfile = async (req,res,next) => {
        const user = User.findOne({where:{email:req.user.email}}
                
        )   
}