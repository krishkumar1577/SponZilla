
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false // Optional, if the chat is about a specific event
  }
}, {
  timestamps: true
});

// Ensure we don't have duplicate conversations between the same users for the same event
conversationSchema.index({ participants: 1, eventId: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
