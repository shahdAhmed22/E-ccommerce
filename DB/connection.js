
import mongoose from 'mongoose';

export const Connection_db= async ()=>{

  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connecting to DB successfully!!")
  }catch(error ){
  console.log("Error connecting to db",error)
  }
   
}

export default Connection_db