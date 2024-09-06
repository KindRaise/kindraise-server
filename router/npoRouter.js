const express = require("express");
const router = express.Router();
const uploads=require("../utilis/multer")

const { NposignUp, NpologIn, deleteAllNpo, getAllNpo,updateNpo,deleteOneNpo,NpoverifyEmail,NporesendVerificationEmail,NpoforgetPassword,NporesetPassword, NpochangePassword,NpologOut,getOneNpo,makeAdmin}=require("../controller/npoController")

const staffEntryValidator=require("../middleware/validator") 

const{authenticate,authenticateAdmin}=require("../middleware/auth")
   //onboarding
router.post("/Nposign-up",uploads.single ('profilepics'),staffEntryValidator(true),NposignUp)  
router.post("/Npolog-in",NpologIn)
router.post("/Npolog-out",NpologOut)
//roles
router.delete("/delete-allNpo",authenticate,authenticateAdmin,deleteAllNpo)  
router.get("/get-allNpo",authenticate,authenticateAdmin,getAllNpo)
router.put("/update-Npo/:userId",updateNpo)
router.delete("/delete-oneNpo/:id",authenticate,authenticateAdmin,deleteOneNpo)
router.get("/get-oneNpo/:id",getOneNpo)  
router.get(`/make-admin/:userId`, authenticateAdmin, makeAdmin)
//security
router.get("/Npoverify-email/:token",NpoverifyEmail)
router.post("/NporesendVerificationEmail",NporesendVerificationEmail)
router.post("/NpoforgetPassword",NpoforgetPassword)
router.get("/Nporeset-Password/:token",NporesetPassword)
router.put("/Npochange-Password/:token",NpochangePassword)
//exports
module.exports=router 
 