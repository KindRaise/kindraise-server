const donationSchema = new mongoose.Schema({
    amount: { 
      type: Number, 
      required: true 
    },
    donor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Individual', 
        required: true 
    },
    campaign: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaign', 
        required: true 
    },
    paymentMethod: { 
      type: String, 
      enum: ['credit_card', 'paypal', 'bank_transfer'], 
      required: true 
    },
    transactionId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    status: { 
      type: String, 
      enum: ['successful', 'failed', 'pending'], 
      default: 'pending' 
    },
   
  },{timestamps: true});
  
  const DonationModel = mongoose.mod('Donation', donationSchema);
  module.exports = DonationModel