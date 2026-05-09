import jwt from "jsonwebtoken"
import User from "../DB/Modles/user.model.js"
export const authMiddleware=()=>{
  return async(req,res,next)=>{

    const {token}=req.headers
    if(!token){
      return res.status(401).json({message:"token is required"})
    }
    if(!token.startsWith("Bearer ")){
      return res.status(401).json({message:"token is invalid"})
    }


const tokenWithoutBearer = token.split(" ")[1]
    // const tokenWithoutBearer=token.split(" ")[1]

    const decodedData=jwt.verify(tokenWithoutBearer,process.env.JWT_SECRET)
    const user = await User.findById(decodedData.id)
    // const user=await User.findById(decodedData.id).select("-password")
    if(!user){
      return res.status(401).json({message:"user not found"})
    }
// should i write return next to req.authUser=user

    req.authUser=user
 
    next()

  }
}



