
const mongoose = require('mongoose');

const sponsorshipRequestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClubProfile',
    required: true
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrandProfile',
    required: true
  },
  tierName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'negotiating'],
    default: 'pending'
  },
  negotiationHistory: [{
    amount: Number,
    message: String,
    senderRole: {
      type: String,
      enum: ['club', 'brand']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
sponsorshipRequestSchema.index({ clubId: 1, status: 1 });
sponsorshipRequestSchema.index({ brandId: 1, status: 1 });
sponsorshipRequestSchema.index({ eventId: 1, brandId: 1 }, { unique: true });
sponsorshipRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('SponsorshipRequest', sponsorshipRequestSchema);
