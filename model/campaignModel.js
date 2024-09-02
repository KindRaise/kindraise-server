const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  goalAmount: { 
    type: Number, 
    required: true 
  },
  raisedAmount: { 
    type: Number, 
    default: 0 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
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

const CampaignModel = mongoose.mod('Campaign', campaignSchema);
module.exports = CampaignModel