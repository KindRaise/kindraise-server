const express = require("express");
const router = express.Router();
const uploads=require("../utilis/multer")

const { signUp, logIn, deleteAll, getAll,updatedUser,deleteOne,verifyEmail,resendVerificationEmail,forgetPassword,resetPassword, changePassword,logOut,getOne,makeAdmin}=require("../controller/individualController"); 

const staffEntryValidator=require("../middleware/validator") 

const{authenticate,authenticateAdmin}=require("../middleware/auth")
   //onboarding
router.post("/sign-up",uploads.single ('profilepics'),staffEntryValidator(true),signUp)  
router.post("/log-in",logIn)
router.post("/log-out",logOut)
//roles
router.delete("/delete-all",authenticate,authenticateAdmin,deleteAll)  
router.get("/get-all",authenticate,authenticateAdmin,getAll)
router.put("/update-user/:userId",updatedUser)
router.delete("/delete-one/:id",authenticate,authenticateAdmin,deleteOne)
router.get("/get-one/:id",getOne) 
router.post(`/make-admin/:userId`,authenticateAdmin, makeAdmin)
//security
router.get("/verify-email/:token",verifyEmail)
router.post("/resendVerificationEmail",resendVerificationEmail)
router.post("/forgetPassword",forgetPassword)
router.get("/reset-Password/:token",resetPassword)
router.put("/change-Password/:token",changePassword)

module.exports=router 
 