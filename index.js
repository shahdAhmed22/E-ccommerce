import express from "express"
import { Connection_db} from "./DB/connection.js"
// import { UserRouter } from "./SRC/modules/user/user.router.js"
import * as router from './SRC/modules/index.js'

import dotenv from "dotenv";
dotenv.config();

const app=express()

const port=process.env.PORT
app.use(express.json())
Connection_db()
app.use("/user",router.UserRouter)
app.use("/Category",router.CategoryRouter)


// app.use("*",(req,res)=>{
//     res.status(404).json({message:"api not found"})
// })

app.listen(port,()=>{
    console.log("the sever is working well")
})

