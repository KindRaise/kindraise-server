const mongoose = require('mongoose');

const npoSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: 
    String 
  },
  organizationName: { 
    type: String, 
    required: true 
  },
  // Non-profit registration number
  registrationNumber: { 
    type: String, 
    required: true,
    unique: true 
  },
 
  // Admin approval status
  approved: { 
    type: Boolean, 
    default: false 
  }, 
  // Reference to campaigns created
  campaigns: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign' 
  }],
  donors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  totalRaised: {
    type: Number,
    default: 0
  }, 

  profilePicture:{
    pictureUrl:String, 
    pictureId:String
  },
  profilePicture: {
      pictureId: { 
        type: String 
      },
      pictureUrl: {
         type: String
        },
      formerImages: [
           {
              pictureId: { type: String },
              pictureUrl: { type: String }
            }
        ]
    }

}, {timestamps: true});

const NPOModel = mongoose.model('NPO', npoSchema);
module.exports = NPOModel