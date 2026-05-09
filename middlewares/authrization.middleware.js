export const authrizationMiddleware=(requiredRole)=>{
    return (req,res,next)=>{

        const UserRole=req.authUser.role

        if(!requiredRole.includes(UserRole)){
           res.status(403).json({message:"You are not authorized to access this route"})
        }
        next()
    }
}