const express=require("express")
const campaignrouter=express.Router()
const{ createCampaignByNpo, createCampaignByIndividual, getAllCampaigns, getCampaignById, updateCampaign }=require("../controller/campaignController")
const { authenticate }=require("../middleware/auth")

campaignrouter.post("/create-campaignByNpo/:npoId",createCampaignByNpo)
campaignrouter.post("/create-campaignByIndividual/:individualId",createCampaignByIndividual)

campaignrouter.get("/get-allCampaign",getAllCampaigns)
campaignrouter.get("/get-oneCampaign",getCampaignById)
campaignrouter.put("/update-campaign/:campaignId",authenticate,updateCampaign)

module.exports=campaignrouter
