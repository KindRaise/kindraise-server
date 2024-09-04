const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Individual', // Use correct model name with proper case
        required: true
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        required: true
    }
}, { timestamps: true });

const TrackingModel = mongoose.model('Tracking', trackingSchema);

module.exports = TrackingModel;
