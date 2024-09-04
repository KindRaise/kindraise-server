const campaignModel = require("../model/campaignModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")
const claudinary=require("../utilis/cloudinary")
const sendmail=require("../helpers/html")
const donationModel=require("../model/donationModel")

exports.donate=async(req,res)=>{
    try{
        const campaignId=req.params.id
const {amount,state,name,message}=req.body
if(!amount||amount<1){
    return res.status(400).json({message:`please input a valid amount`})
}

const campaignToDonate= await campaignModel.findById(campaignId)
if(!campaignToDonate){
    return res.status(400).json({message:`campaign no longer exist`})
}
 
 const donations=await donationModel.create({
    amount,
    state,
    name,
    message})
    
    campaignToDonate.raised += donations.amount


    campaignToDonate.donations.push(donate._id)
    campaignToDonate.supporters=(campaignToDonate.supporters || 0)+1
    await campaignToDonate.save()
       // const userEmail= npoId.email
        // const messageSubject = " your campaign has been created"

        // const mailHtml = ``

        // await sendmail({
        //     email:userEmail,
        //     subject:messageSubject,
        //     html:mailHtml
        // })

    return res.status(201).json({message:`${amount} has been deposited to ${campaignToDonate}, campaign`})
    }catch(error)
    {
res.status(500).json({error:error.message})
    }
}

exports.getAllDonationsByUser = async (req, res) => {
    try {
        const id=req.params.id
        const donations=await donationModel.find({individualId:id}).lean()
       
        const allDonations=[...donations]
        return res.status(200).json({
            info: `successfully fetch all`,
            users: allDonations
        });
    } catch (error) {
        return res.status(500).json({
            message: `Cannot get all users because ${error}`
        });
    }
};