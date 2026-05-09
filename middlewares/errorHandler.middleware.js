export const asyncHandler = (api) => {
  return async (req, res, next) => {
    
      await api(req, res, next).catch((error) => {
        res.status(500).json({

             message: "Internal Server Error",
             error: error.message ,
             stack:error.stack
        });
      })
   
  }
}
