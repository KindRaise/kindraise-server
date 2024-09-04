const campaignModel = require("../model/campaignModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")
const claudinary=require("../utilis/cloudinary")
const sendmail=require("../helpers/html")

exports.createCampaignByNpo = async (req, res) => {
    try {
        const { title, subTile, story, Photo, Goal,  } = req.body;
        const npoId = req.user.id;

        if (!title || !subTile || !story || !Photo || !Goal ) {
            return res.status(400).json({ info: 'All fields are required' });
        }
        let profilePicUrl = null;
        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                profilePicUrl = uploadResult.url;
            } catch (error) {
                return res.status(500).json({ message: `Image upload failed: ${error.message}` });
            }
        }

        const newCampaign = new campaignModel({
            title,
            subTile,
            story,
            Photo:profilePicUrl,
            Goal,

            
            creator: {
                type: 'npo',
                id: npoId,
            },
        });
        newCampaign.status="active"
        const savedCampaign = await newCampaign.save();
        // const userEmail= npoId.email
        // const messageSubject = " your campaign has been created"

        // const mailHtml = ``

        // await sendmail({
        //     email:userEmail,
        //     subject:messageSubject,
        //     html:mailHtml
        // })

        return res.status(201).json(savedCampaign);
    } catch (error) {
        console.error('Error creating NPO campaign:', error);
        return res.status(500).json({ error: `An error occurred while creating the NPO campaign because ${error}` });
    }
};

exports.createCampaignByIndividual = async (req, res) => {
    try {
        const { title, subTile, story, Photo, Goal, status } = req.body;
        const individualId = req.user.id;

        // Validate input fields
        if (!title || !subTile || !story || !Photo || !Goal || !status) {
            return res.status(400).json({ info: 'All fields are required' });
        }

        const newCampaign = new Campaign({
            title,
            subTile,
            story,
            Photo,
            Goal,
            status: status || 'inactive',
            creator: {
                type: 'individual',
                id: individualId,
            },
        });

        const savedCampaign = await newCampaign.save();

        return res.status(201).json(savedCampaign);
    } catch (error) {
        console.error('Error creating Individual campaign:', error);
        return res.status(500).json({ error: 'An error occurred while creating the Individual campaign' });
    }
};



// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignModel.find({ status: 'active' });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await campaignModel.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
    try {
        const {story,subTitle}=req.body
        const campaignId=req.params.id
        
        let campaign=await campaignModel.findById(campaignId)
        if(!campaign){
            return res.status(404).json({message:`campaing not found`})
        }

        campaign.story=story   
        campaign.subTitle=subTitle
        await campaign.save()
        
        return res.status(200).json({message:`campaign updated successfully`})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


