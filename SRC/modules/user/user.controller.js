import User from "../../../DB/Modles/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmailService } from "../../../Utils/SendEmailService.Utiles.js"
import { cloudinaryConfig } from "../../../Utils/cloudinary.utils.js"


export const Signup=async(req,res,next)=>{

              //   first take a email and anohter data form the body
               console.log("REQ.FILE:",req.file)
    const {name,email,password}=req.body
    const file=req.file
    console.log("file",file)
    // second check if there is an email exist
    const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
          return res.status(409).json({ message: "The email already exists" });
        }
    
        // thirs complete sending the date to databass
    
        const hashedPassword=bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    
        
     
        const newInstance= new User({
            name,email,password:hashedPassword
        })


        const user=await newInstance.save()
        
        //   const Token =jwt.sign({ id: user._id }, process.env.VERIFICATION_TOKEN, { expiresIn: "1h" })
        //   const verificationLink = `${req.protocol}://${req.headers.host}/user/verification/${Token}`
        //   sendEmailService({to:email,subject:"Welcome to our app",text: `Hi! There, You have recently visited 
        //    our website and entered your email.
        //    Please follow the given link to verify your email
        //    Thanks`
        //     ,html:`<a href="${verificationLink}">Verify your email</a>`})

     return  res.json({message:"the user is created sucessfully!",user})
   
    
    
}

export const verifyEmail=async(req,res,next)=>{
 try{

    const {token}=req.params
    const decodedData=jwt.verify(token,process.env.VERIFICATION_TOKENT)
    const user=await User.findOneAndUpdate({email:decodedData.email},{isVerified:true},{new:true})

     if(!user){
        return res.status(404).json({message:"user not found"})
     }
        return res.json({message:"email verified successfully",user})
 }catch(error){
    console.log("there is an error")
    res.status(500).json({message:"theres is error in verification method"})
 }
}

export const SignIn=async(req,res,next)=>{


    
       
        const {email,password}=req.body
        
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Invalid email or password"})
        }
        
        const isPasswordValid=bcrypt.compareSync(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const token = jwt.sign(
            { id: user._id },
           process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
        
        
     return  res.json({message:"Login successful",token,user})
        
   
    


}


// delete user in database

export const DeleteUser=async(req,res,next)=>{
  
    // // get _id from req.authUser and rename it to userID

    const {_id:userID}=req.authUser
    const userDel=await User.findByIdAndDelete(userID)
    if(!userDel){
        return res.status(404).json({message:"user not found"})
    }

    return res.json({message:"delete user successfully"})

 

}

export const apiTest=async(req,res,next)=>{
    try{
        const sourcePath=req.file.path

        console.log(sourcePath)
        //  const data=await cloudinaryConfig().api.ping()
        const Uploadimage=await cloudinaryConfig().uploader.upload(sourcePath,{folder:"cloud/remote",
            use_filename:true
        })
        
        console.log("Uploadimage",Uploadimage)
            res.json({message:"api test is successful",Uploadimage})
    }catch(error){
        console.log("there is an error in api test",error)
        res.status(500).json({message:"there is an error in api test"})
    }    
}































