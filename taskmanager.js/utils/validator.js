import {check} from "express-validator"
const validateUserSignin = [
    check("email").isEmail().notEmpty().withMessage("CAJSJ"),
    check("password").isString().notEmpty(),
    check("firstname").isString().notEmpty(),
    check("lastname").isString().notEmpty(),
    check("role").isString().notEmpty().isIn(["company","job_seeker"])
    .withMessage("Role most be 'Company','job_seeker' "),

    check("country").isString().notEmpty()

]


const validateUserLogin = [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty()
]

const validateCompany = [
    check("name").notEmpty().isString(),
    check("description").notEmpty().isString(),
    check("website").optional()
]

export {validateUserSignin,validateUserLogin,validateCompany}