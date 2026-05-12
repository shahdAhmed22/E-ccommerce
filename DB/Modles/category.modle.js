import { required, string } from "joi";
import mongoose  from "mongoose";
// import { Schema,model } from "mongoose";


const CategorySchema= new mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true
},
slug:{
    type:String,
    required:true,
    unique:true
},
image:
 {
    public_id:{
        type:String,
        required:true,
        unique:true
    },
   secure_url:{
        type:String,
        required:true,
        
    }
 }
,
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
   ref: "User"
}
},{timestamps:true})

