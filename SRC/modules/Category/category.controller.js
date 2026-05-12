import { multerCloudinaryMiddleware } from "../../../middlewares/multer.middleware";

/*
@api /category/create
*/ 
const createCategory=async(req,res,next)=>{
    // first name
    const {name}=req.body;
    // second slug
    const slug=slugify('some string', {
         lower: true,
          replacement: '_'
    })

    // third image
  

}