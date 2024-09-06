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
        type: Number, 
        //required: true 
    },
    Goal: { 
        type: Number, 
        required: true 
    },
    endDate: { 
        type: Date,    
    }, 
    ev: { 
        type:String
    },
    campaignCreator: {
       // type: mongoose.Schema.Types.ObjectId,
       // required: true,
       // refPath: 'npo',
        type:{type:String,default:'npo'},
        id:String
    },
   
    creator: {
        type: mongoose.Schema.Types.ObjectId,
       // required: true,
        refPath: 'npo',
        type:String,
        id:String
    },
   
    // approvedByAdmin: { 
    //     type: Boolean, 
    //     default: false 
    // }, 
    status: { 
        type: String, 
        enum: ['active', 'inactive',],
        default:"active" ,
        required: true 
    },
    isSponsored:{type:Boolean,
      default:false
    },
    sponsoredAt:{type:Date,
      default:null
    },
    raised: { 
        type: Number,
        required:true
    },
    npo:{type: mongoose.Schema.Types.ObjectId,
      ref:"npo"
    },
    individual:{type: mongoose.Schema.Types.ObjectId,
      ref:"individual"
    },
    donations:{type: mongoose.Schema.Types.ObjectId,
      ref:"donations"
    },
    supporters:{type:Number} 
}, {timestamps: true});

const CampaignModel = mongoose.model('Campaign', campaignSchema);
module.exports = CampaignModel;
 