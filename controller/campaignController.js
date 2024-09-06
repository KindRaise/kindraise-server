const campaignModel = require("../model/campaignModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")
const cloudinary=require("../utilis/cloudinary")
const sendmail=require("../helpers/html")

exports.createCampaignByNpo = async (req, res) => {
    try {
        const { title, subtitle, story, Goal, raised } = req.body;
        const {npoId} = req.params;

        if (!title || !subtitle || !story || !Goal ||!raised ) {  
            return res.status(400).json({ info: 'All fields are required' });
        }
        const user=await npoModel.findById(npoId)
        if(!user){
            return res.status(404).json({info:`user not found`})
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
            subtitle,
            story,
            Photo:profilePicUrl,
            Goal,

            
            campaignCreator: {
                type: 'npo',
                id: npoId,
           },

        });
        if(newCampaign.Goal === newCampaign.raised){
            newCampaign.status="inactive"
        }
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

        return res.status(201).json({message:`campaign created by ${user.firstName}`,data:savedCampaign});
    } catch (error) {
        console.error('Error creating NPO campaign:', error);
        return res.status(500).json({ error: `An error occurred while creating the NPO campaign because ${error}` });
    }
};


exports.createCampaignByIndividual = async (req, res) => {
    try {
        const { title, subtitle, story, Goal,raised  } = req.body;
        const {individualId} = req.params;

        if (!title || !subtitle || !story || !Goal||!raised ) {  
            return res.status(400).json({ info: 'All fields are required' });
        }
        const user=await individualModel.findById(individualId)
        if(!user){
            return res.status(404).json({info:`user not found`})
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
            subtitle,
            story,
            Photo:profilePicUrl,
            Goal,
            raised,
            campaignCreator: {
                type: 'individual',
                id: individualId,
           },
        });
      
        if(newCampaign.Goal === newCampaign.raised){
            newCampaign.status="inactive"
        }
        const savedCampaign = await newCampaign.save();
        // const userEmail= npoId.email
        // const messageSubject = " your campaign has been created"

        // const mailHtml = ``

        // await sendmail({
        //     email:userEmail,
        //     subject:messageSubject,
        //     html:mailHtml
        // })

        return res.status(201).json({message:`campaign created by ${user.firstName}`,data:savedCampaign});
    } catch (error) {
        console.error('Error creating NPO campaign:', error);
        return res.status(500).json({ error: `An error occurred while creating the individual campaign because ${error}` });
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
        const { story, subtitle } = req.body;
        const { campaignId, individualId } = req.params;

        
        const campaign = await campaignModel.findById(campaignId);
        if (!campaign) {
            return res.status(400).json({ info: `Invalid campaign ID` });
        }

      
        const user = await individualModel.findById(individualId);
        if (!user) {
            return res.status(400).json({ info: `Invalid user ID` });
        }

        
        if (user.role !== 'individual') {
            return res.status(403).json({ info: `Unauthorized: Only individual can update campaigns` });
        }

        // Optionally, ensure that the campaign belongs to the user updating it
        if (campaign.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({ info: `Unauthorized: You can only update campaigns you created` });
        }

        
        campaign.story = story || campaign.story; 
        campaign.subtitle = subtitle || campaign.subtitle;
        await campaign.save();

        return res.status(200).json({ message: `Campaign updated successfully` });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


