const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  payoutAmount: { type: Number, required: true, min: 0 },
  evidenceType: { type: String, enum: ['image', 'link', 'receipt', 'text'], default: 'image' },
  status: { type: String, enum: ['pending', 'submitted', 'verified', 'rejected'], default: 'pending' },
  evidenceData: { type: String }, // URL or text
  brandFeedback: { type: String },
  submittedAt: { type: Date },
  verifiedAt: { type: Date }
});

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
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BrandProfile',
    required: true
  },
  sponsorshipRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SponsorshipRequest',
    required: true
  },
  escrowAmount: {
    type: Number,
    required: true,
    min: 0
  },
  escrowStatus: {
    type: String,
    enum: ['pending_signatures', 'unfunded', 'funded', 'partially_released', 'fully_released', 'disputed'],
    default: 'pending_signatures'
  },
  // Digital Agreement Sign-off Fields
  clubSignatory: { type: String, default: '' },
  clubSignedAt: { type: Date },
  clubTaxId: { type: String, default: '' },
  
  brandSignatory: { type: String, default: '' },
  brandSignedAt: { type: Date },
  brandTaxId: { type: String, default: '' },
  
  agreementSigned: { type: Boolean, default: false },
  agreementText: { type: String, default: '' },
  
  milestones: [milestoneSchema]
}, { timestamps: true });

// Ensure one proof of work (escrow) per sponsorship request
proofOfWorkSchema.index({ sponsorshipRequestId: 1 }, { unique: true });
proofOfWorkSchema.index({ clubId: 1, escrowStatus: 1 });
proofOfWorkSchema.index({ brandId: 1, escrowStatus: 1 });

module.exports = mongoose.model('ProofOfWork', proofOfWorkSchema);
