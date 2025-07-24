const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  serviceType: { type: String, required: true },
  problem: { type: String, required: true },
  urgency: { type: String, enum: ['Normal', 'Urgent', 'Emergency'], required: true },
  bookingFor: { type: String, enum: ['self', 'other'], default: 'self' },
  serviceLocation: {
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Booking', bookingSchema);
