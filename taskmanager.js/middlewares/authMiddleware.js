import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../configs/config.js"
import { User } from "../models/userSchema.js"
import { where } from "sequelize"
export const AuthMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if (!authHeader){
        return res.status(401).json({"error":"No Token provided"})
    }

    const token = authHeader.split(' ')[1] ; 
    jwt.verify(token,SECRET_KEY,async (err,user) => {
        if (err){
           return res.status(403).json({"error":"Invalid Token"})
        }

        const checkUser = await User.findOne({where:{email:user.email}})
        if (!checkUser){
           return res.status(403).json({"error":"Invalid Token"})

        }
        req.user  = user
        next()

    })

    

}