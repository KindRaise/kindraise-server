const mongoose = require('mongoose');
// Individual Schema
const individualSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  blackList: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['individual', 'admin'],default: 'individual' }
}, { timestamps: true });

const individualModel = mongoose.model('individual', individualSchema);
module.exports = individualModel;