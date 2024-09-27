import { db } from "../configs/config.js";
import { DataTypes } from "sequelize";
import { Company_Profile } from "./profileSchema.js";
const User = db.define("Users",
    {"id":{
        "type":DataTypes.UUID,
        "defaultValue":DataTypes.UUIDV4,
        "primaryKey":true
    },
    "email":{
        "type":DataTypes.STRING,
        "allowNull":false,
        "unique":true
    },
    "firstname":{
        "type":DataTypes.STRING,
        "allowNull":false
    },
    "lastname":{
        "type":DataTypes.STRING,
        "allowNull":false
    },
    "created_at":{
        "type":DataTypes.DATE,
        "defaultValue":DataTypes.NOW
    },
    "country":{
        "allowNull":false,
        "type":DataTypes.STRING
    },
    "role":{
        type:DataTypes.STRING,
        defaultValue:"job_seeker"
    }
}
)

User.hasOne(Company_Profile,{
    foreignKey:"userId",
    onDelete:"CASCADE"
})
export {User}