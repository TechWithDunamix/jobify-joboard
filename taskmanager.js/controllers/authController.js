import express from "express";
import { validateUserSignin,validateUserLogin } from "../utils/validator.js";
import {validationResult} from "express-validator"
import { SECRET_KEY } from "../configs/config.js";
import { makeToken } from "../utils/jwtUtils.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import { where } from "sequelize";
const usersRouter = express.Router()

usersRouter.post("/signup",validateUserSignin,async (req,res) => {
      const errors  = validationResult(req)
      if (!errors.isEmpty()){
            console.log("Error")
            return res.status(400).json({"error":errors.array()})

      }
      const {email,password,firstname,lastname,role,country} = req.body
      const hashed_password = bcrypt.hash(password,15)
      const  check_user = await User.findOne({where:{email:email}})
      if (check_user){
            return res.status(400).json({"error":"email already exists"})
      }
      User.create({
            email:email,
            password:hashed_password,
            firstname:firstname,
            lastname:lastname,
            role:role,
            country:country})
      res.status(201).json({"success":"SIgned"})
   
    

})

usersRouter.post("/login",validateUserLogin,async (req,res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()){
            return res.status(404).json({"error":errors.array()})
      }

      const {email,password} = req.body 

      const checkUser = await User.findOne({where:{email:email}})

      if (!checkUser){
            return res.status(400).json({"error":"Invalid logn credentials"})
      }

      const checkPassword = bcrypt.compare(email,checkUser.email)

      if (!checkPassword){
            return res.status(400).json({"error":"Invalid logn credentials"})

      }

      const token = makeToken({"email":checkUser.email,"id":checkPassword.id})
      const response = {
            "success":true,
            "data":{
                  "token":token,
                  "email":checkUser.email,
                  "id":checkUser.id
            }
      }
      return res.status(200).json(response)
})
export default usersRouter