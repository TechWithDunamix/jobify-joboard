import { SECRET_KEY } from "../configs/config.js";
import jwt from "jsonwebtoken"


const makeToken = (payload) =>{
    const token = jwt.sign(payload,SECRET_KEY)
    return token 
}

const verifyToken = (token) => {

}

export {makeToken}