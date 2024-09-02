const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  subtitle: { 
    type: String, 
    required: true 
  },
  story: { 
    type: String, 
    required: true 
  },
  uploadPhoto: { 
    type: String, 
    required: true 
  },
  Goal: { 
    type: String, 
    required: true 
  },
  endDate: { 
    type: Date, 
    
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'creatorModel',
  }, // Reference to NPO or Individual who created the campaign
  creatorModel: { 
    type: String, 
    required: true, 
    enum: ['npo', 'Individual'] 
  }, 
  approvedByAdmin: { 
    type: Boolean, 
    default: false 
  }, 
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'], 
  default: 'Pending' 
},
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
 
}, {timestamps: true});

const CampaignModel = mongoose.model('Campaign', campaignSchema);
module.exports = CampaignModel