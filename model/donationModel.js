const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true 
    },
    name:{type:String},

    message:{type:String},

    month: { 
        type: Date, 
        
    },
    state: { 
        type: String, 
        required: true 
    },
    campaign:{type: mongoose.Schema.Types.ObjectId,
        ref:"Campaign"
      },
      individual:{type: mongoose.Schema.Types.ObjectId,
        ref:"individual"
      },
      npo:{type: mongoose.Schema.Types.ObjectId,
        ref:"npo"
      },
   
}, { timestamps: true });

const donationModel = mongoose.model('donation', donationSchema);
module.exports = donationModel;
