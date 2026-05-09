
const reqKeys=['body','query','params','headers'];
export const validationMiddleware=(schema)=>{
    return (req,res,next)=>{
       const validationError=[]
        for(const key of reqKeys){
            console.log("key",key)
                const validResult=schema[key]?.validate(req[key],{abortEarly:false})
            
                if(validResult?.error){
                    validationError.push(validResult.error.details.map(detail=>detail.message))
                }
            }
        if(validationError.length>0){
            return res.status(400).json({message:"validation error",error:validationError})
        }
            next()
        }
     
        
    }
