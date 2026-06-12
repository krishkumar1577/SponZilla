const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['message', 'sponsorship_bid', 'sponsorship_update', 'system'],
    default: 'system'
  },
  link: {
    type: String,
    default: ''
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 // Optional: automatically delete after 30 days
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
