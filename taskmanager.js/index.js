import express from "express"
import { PORT,callBack } from "./configs/config.js"
import {logError} from "./middlewares/errorMiddleware.js"
import usersRouter  from "./controllers/authController.js"
import { userProfileRouter } from "./controllers/userProfile.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded())
// app.use(logError)
app.use("/api/v1/auth",usersRouter)
app.use("/api/v1/users/profile",userProfileRouter)
app.listen(PORT,callBack)