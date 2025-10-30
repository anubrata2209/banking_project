const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  email: { type: String, index: true },
  phone: { type: String, index: true },
  address: {
    line1: String, line2: String, city: String, state: String, pincode: String
  },
  kyc: {
    idType: String, idNumber: String, documents: [String] // store file refs
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Customer', customerSchema);
