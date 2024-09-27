import { db } from "../configs/config.js";
import { DataTypes } from "sequelize";
export const Company_Profile =  db.define("Company_Profile",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false,
        
    },
    website:{
        type:DataTypes.TEXT
    },


})

