const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if (file.mimetype.startsWith('image/')) {
        cb(null,true)
    }else{
        cb(new Error ('image only'),false)
    }
}  
const fileSize={
    limits:1024*1024*10
}
const uploads=multer({
    storage,
    fileFilter,
    limits:fileSize
})
// .fields([
//     { name: 'image', maxCount: 1 }, // Adjust the field name 'image' to match your file input name
//     { name: 'firstName', maxCount: 1 },
//     { name: 'lastName', maxCount: 1 },
//     { name: 'email', maxCount: 1 },
//     { name: 'password', maxCount: 1 },
//     { name: 'role', maxCount: 1 },
//     { name: 'organizationName', maxCount: 1 },
//     { name: 'organizationDetails', maxCount: 1 },
//   ]);
  
module.exports=uploads



