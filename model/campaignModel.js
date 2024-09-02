const mongoose=require("mongoose")   

const campaignSchema= new mongoose.Schema({
  title:{type:String, 
    required:true},

      description:{type:String,
        required:true},
      
    targetAmount:{type:Number,
      required:true,
      },

    deadline:{type:String, 
      required:true},

    
   npo:{type:mongoose.Schema.Types.ObjectId,
    ref:"npo"}
   
 },{timestamps:true})

 const campaignModel=mongoose.model("campaign",campaignSchema)
 

 module.exports=campaignModel

 const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'DELETED'],
    default: 'PENDING',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
  },
  media: [{
    type: String,
  }],
});

module.exports = mongoose.model('Campaign', CampaignSchema);
