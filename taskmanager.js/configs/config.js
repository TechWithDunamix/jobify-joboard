import { Sequelize } from "sequelize";
export const PORT = 2600;
export const SECRET_KEY = " s8bpy9iewdsp98ie^wof$dcnhxklsn'dihysabd-32slduy*"
export const callBack = () => {
    console.log(`Sever started running on port ${PORT}`)
}




export const db = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.sqlite'
});


db.sync()

.then(() => {
    console.log("SUccess")
})

.catch((e) => {
    console.log("Error",e)
})