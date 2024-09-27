import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import express from "express"
import { validationResult } from "express-validator";
import { validateCompany } from "../utils/validator.js";
import { User } from "../models/userSchema.js";
import { Company_Profile } from "../models/profileSchema.js";
const userProfileRouter = express.Router()
userProfileRouter.use(AuthMiddleware)


userProfileRouter.post("/create",validateCompany,async  (req,res) => {
    const error = validationResult(req)
    
    if (!error.isEmpty()){
        return res.status(400).json({"error":error.array()})
    }
    const userID = await User.findOne({where:{email:req.user.email}})
    const check_company = await Company_Profile.findOne({where:{userId:userID.id}})

    if (check_company){
        return res.status(400).json({"error":"User Already created a company"})
    }
    const {name,description,website} = req.body
    const obj = Company_Profile.create({
        userId:userID.id,
        name:name,
        description:description,
        website:website
    })
    res.json(req.body)
})
export {userProfileRouter}