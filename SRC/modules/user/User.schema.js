// all api in this file we will make validation for it
import User from "../../../DB/Modles/user.model.js";
import joi from "joi";

export const signUpSchema={
    body:joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().min(6).required()
    })
}

export const signInSchema={
    body:joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(6).required()
    })
}