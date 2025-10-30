// models/Ticket.js (Customer service)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  subject: String,
  description: String,
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['open','in_progress','resolved','closed'], default: 'open' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ by: { type: Schema.Types.ObjectId, ref: 'User' }, text: String, at: Date }],
  createdAt: { type: Date, default: Date.now }
});
ticketSchema.index({ status:1, priority:1, assignedTo:1 });
module.exports = mongoose.model('Ticket', ticketSchema);
