const campaignModel=require("../model/campaignModel")



// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign({
      ...req.body,
      createdBy: req.user._id, // Assuming user info is attached to req.user
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all campaigns

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await campaignModel.find({ status: 'APPROVED' }); // Adjust as needed
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
      const updatedCampaign = await campaignModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedCampaign) return res.status(404).json({ message: 'Campaign not found' });
      res.status(200).json(updatedCampaign);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a campaign
  exports.deleteCampaign = async (req, res) => {
    try {
      const deletedCampaign = await campaignModel.findByIdAndDelete(
        req.params.id,
        { status: 'DELETED' },
        { new: true }
      );
  
      if (!deletedCampaign) return res.status(404).json({ message: 'Campaign not found' });
      res.status(200).json(deletedCampaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };