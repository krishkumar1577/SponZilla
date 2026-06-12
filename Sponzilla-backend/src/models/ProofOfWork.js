const mongoose = require('mongoose');

const proofOfWorkSchema = new mongoose.Schema({
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
  actualAttendees: {
    type: Number,
    required: true,
    min: 0
  },
  socialImpressions: {
    type: Number,
    required: true,
    min: 0
  },
  clickThroughs: {
    type: Number,
    required: true,
    min: 0
  },
  postEventNotes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

// Ensure one proof of work per event
proofOfWorkSchema.index({ eventId: 1 }, { unique: true });

module.exports = mongoose.model('ProofOfWork', proofOfWorkSchema);
