const mongoose = require('mongoose');

const userInCampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['participant', 'contributor'], default: 'participant' },
});

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
        type: Number, 
        required: true 
    },
    Goal: { 
        type: String, 
        required: true 
    },
    endDate: { 
        type: Date,    
    },
    ev: { 
        type:String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'creatorModel',
    },
   
    approvedByAdmin: { 
        type: Boolean, 
        default: false 
    }, 
    itsstatus: { 
        type: String, 
        enum: ['active', 'inactive',],
        default:"inactive" ,
        required: true 
    },
    isSponsored:{type:Boolean,
      default:false
    },
    sponsoredAt:{type:Date,
      default:null
    },
    raised: { 
        type: Number 
        
    },
    npo:{type: mongoose.Schema.Types.ObjectId,
      ref:"NPO"
    },
    individual:{type: mongoose.Schema.Types.ObjectId,
      ref:"Individual"
    },
    donations:{type: mongoose.Schema.Types.ObjectId,
      ref:"donations"
    },
    supporters:{type:Number} 
}, {timestamps: true});

const CampaignModel = mongoose.model('Campaign', campaignSchema);
module.exports = CampaignModel;
 