import multer from 'multer'
import fs from "fs"
import path from "path"
import { DateTime } from 'luxon'
import {nanoid} from "nanoid"
export const multerMiddleware=({filename="general", allowedExtensions}={})=>{
	
	const uploadPath = path.resolve(`./SRC/uploads/${filename}`)
	console.log(uploadPath)
	if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
  }
 const storage = multer.diskStorage({
	

  destination: function (req, file, cb) {
    cb(null,uploadPath)
  }
 ,
   filename: function (req, file, cb) {
    const uniqueName = DateTime.now().toFormat('yyyy-MM-dd') + '__' + nanoid(4) + "__" + file.originalname
     cb(null,  uniqueName)
   },


//   fileFilterConfig : function(req, file, cb) {
// 	if (file.mimetype === "image/jpeg"
// 		|| file.mimetype === "image/png") {
// 		// calling callback with true
// 		// as mimetype of file is image
// 		cb(null, true);
// 	} else {
// 		// false to indicate not to store the file
// 		cb(null, false);
// 	}


})


 const fileFilter = function (req, file, cb) {
  if(allowedExtensions?.includes(file.mimetype)){
     cb(null, true); 
  }else{
    cb(new Error("File type not allowed"), false)
    
  }
}

const upload = multer({ fileFilter, storage: storage })
return upload
}

export const multerCloudinaryMiddleware=()=>{
    // i deleted every thing here to prevent save in hard
  const storage = multer.diskStorage({})

const upload = multer({ storage: storage })
return upload
}

