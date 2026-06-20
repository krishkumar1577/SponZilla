const ProofOfWork = require('../models/ProofOfWork');
const SponsorshipRequest = require('../models/SponsorshipRequest');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');

class ProofOfWorkController {
  
  // Directly called by sponsorshipController when a request is accepted
  async initializeEscrow(eventId, clubId, brandId, sponsorshipRequestId, amount) {
    try {
      const defaultMilestones = [
        {
          title: "Pre-Event Promotion",
          description: "Upload a screenshot or link of the brand's promotion on your social media.",
          payoutAmount: amount * 0.2, // 20% upfront
        },
        {
          title: "Event Day Execution",
          description: "Upload geotagged photos of the brand's banners/assets at the actual event.",
          payoutAmount: amount * 0.6, // 60% upon execution
        },
        {
          title: "Post-Event Analytics",
          description: "Upload final attendee counts, receipts, and social reach screenshots.",
          payoutAmount: amount * 0.2, // 20% on completion
        }
      ];

      const escrow = await ProofOfWork.create({
        eventId,
        clubId,
        brandId,
        sponsorshipRequestId,
        escrowAmount: amount,
        escrowStatus: 'funded', // Mocking instant funding for MVP
        milestones: defaultMilestones
      });

      return escrow;
    } catch (error) {
      console.error('Error initializing escrow:', error);
      throw error;
    }
  }

  // Get Escrow details by Sponsorship ID
  getEscrowBySponsorship = async (req, res) => {
    try {
      const { sponsorshipId } = req.params;
      const escrow = await ProofOfWork.findOne({ sponsorshipRequestId: sponsorshipId })
        .populate('clubId', 'clubName logo')
        .populate('brandId', 'companyName logo');
      
      if (!escrow) {
        return res.status(404).json({ error: 'Escrow not found for this sponsorship' });
      }

      res.json({ success: true, escrow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Club submits evidence for a milestone
  submitMilestoneEvidence = async (req, res) => {
    try {
      const { id, milestoneId } = req.params;
      const { evidenceData, evidenceType } = req.body;

      const escrow = await ProofOfWork.findById(id);
      if (!escrow) return res.status(404).json({ error: 'Escrow not found' });

      // Find the milestone
      const milestone = escrow.milestones.id(milestoneId);
      if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

      // Update milestone
      milestone.evidenceData = evidenceData;
      if (evidenceType) milestone.evidenceType = evidenceType;
      milestone.status = 'submitted';
      milestone.submittedAt = new Date();

      await escrow.save();

      res.json({ success: true, escrow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Brand verifies or rejects a milestone
  verifyMilestone = async (req, res) => {
    try {
      const { id, milestoneId } = req.params;
      const { status, brandFeedback } = req.body; // status must be 'verified' or 'rejected'

      if (!['verified', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Status must be verified or rejected' });
      }

      const escrow = await ProofOfWork.findById(id);
      if (!escrow) return res.status(404).json({ error: 'Escrow not found' });

      // Find the milestone
      const milestone = escrow.milestones.id(milestoneId);
      if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

      // Update milestone
      milestone.status = status;
      milestone.brandFeedback = brandFeedback;
      if (status === 'verified') milestone.verifiedAt = new Date();

      // Check if all milestones are verified to update escrow status
      const allVerified = escrow.milestones.every(m => m.status === 'verified');
      const anyVerified = escrow.milestones.some(m => m.status === 'verified');
      
      if (allVerified) {
        escrow.escrowStatus = 'fully_released';
      } else if (anyVerified) {
        escrow.escrowStatus = 'partially_released';
      }

      await escrow.save();

      res.json({ success: true, escrow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all active escrows for a club or brand
  getMyEscrows = async (req, res) => {
    try {
      // Find whether user is club or brand
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });

      let escrows = [];
      if (clubProfile) {
        escrows = await ProofOfWork.find({ clubId: clubProfile._id })
          .populate('brandId', 'companyName logo')
          .populate('eventId', 'title date');
      } else if (brandProfile) {
        escrows = await ProofOfWork.find({ brandId: brandProfile._id })
          .populate('clubId', 'clubName logo')
          .populate('eventId', 'title date');
      }

      res.json({ success: true, escrows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProofOfWorkController();
