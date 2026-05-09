import mongoose from 'mongoose'

const {Schema ,model} =mongoose


const UserSchema=new Schema({

  name:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  },
  image:{type:String},
  role: {
    type: String,
    enum: ['user', 'admin', 'manager'], // Enum defining allowed values for the 'role' field
    default: 'user' // Default value for the 'role' field
  },
  isVerified:{
    type:Boolean,
    default:false
  }

},{timestamps:true})


 const User=mongoose.models.User||model("User",UserSchema)
 export default User