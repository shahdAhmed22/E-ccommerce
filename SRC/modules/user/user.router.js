import { Signup,SignIn,DeleteUser,verifyEmail }from "./user.controller.js"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"
import { Router } from "express"
import { validationMiddleware } from "../../../middlewares/validation.middleware.js"
import { signUpSchema} from "./User.schema.js"
import { multerMiddleware } from "../../../middlewares/multer.middleware.js"
import {extensionFile} from "../../../Utils/file.extention.utils.js"
import {apiTest} from "./user.controller.js"
import { multerCloudinaryMiddleware } from "../../../middlewares/multer.middleware.js"
export const UserRouter=Router()

UserRouter.post('/signup',multerMiddleware({filename:"profile_images", allowedExtensions: extensionFile.image }).single('image'),validationMiddleware(signUpSchema),Signup)
UserRouter.post('/Signin',SignIn)
// UserRouter.patch('/update/:email',updateUser)
UserRouter.delete('/delete',authMiddleware(),DeleteUser)
UserRouter.get('/verification/:token',verifyEmail)
UserRouter.get('/',multerCloudinaryMiddleware().single("image"),apiTest)