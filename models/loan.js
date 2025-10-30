const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  date: Date,
  amount: Number,
  method: String, // e.g., 'NEFT','Cash','EMI'
  note: String
});

const loanSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  product: String, // e.g., 'Home Loan', 'Personal Loan'
  principal: Number,
  interestRate: Number, // annual %
  termMonths: Number,
  status: { 
    type: String, 
    enum: ['application','verification','underwriting','approved','rejected','disbursed','closed','defaulted'],
    default: 'application'
  },
  appliedAt: { type: Date, default: Date.now },
  approvedAt: Date,
  disbursedAt: Date,
  payments: [paymentSchema],
  schedule: [{ dueDate: Date, dueAmount: Number, paid: Boolean, paidAt: Date }],
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: [{ by: { type: Schema.Types.ObjectId, ref: 'User' }, text: String, createdAt: Date }],
  attachments: [String], // file refs
  audit: [{
    action: String, by: { type: Schema.Types.ObjectId, ref: 'User' }, at: Date, meta: Schema.Types.Mixed
  }]
});
loanSchema.index({ customer: 1, status: 1 });
module.exports = mongoose.model('Loan', loanSchema);
