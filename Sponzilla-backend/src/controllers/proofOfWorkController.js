const ProofOfWork = require('../models/ProofOfWork');
const SponsorshipRequest = require('../models/SponsorshipRequest');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const User = require('../models/user');
const Event = require('../models/Event');
const notificationService = require('../services/notificationService');

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

      const agreementText = `SPONSORSHIP & ESCROW SERVICES AGREEMENT

This Agreement is made by and between the Brand Partner (hereinafter "Sponsor") and the Student Club/Organization (hereinafter "Club") and is facilitated by SponZilla.

1. SCOPE OF SPONSORSHIP
The Club agrees to coordinate and execute the event. In exchange, the Sponsor agrees to pay the sponsorship amount of ₹${amount.toLocaleString()} through SponZilla's secure escrow vault.

2. PERFORMANCE-BASED MILESTONE DISBURSEMENT
The sponsorship amount is broken down and released on a milestone basis:
- Pre-Event Promotion (20% payout: ₹${(amount * 0.2).toLocaleString()})
- Event Day Execution (60% payout: ₹${(amount * 0.6).toLocaleString()})
- Post-Event Analytics (20% payout: ₹${(amount * 0.2).toLocaleString()})

3. EVIDENCE & VERIFICATION
The Club must upload digital proof of performance (screenshots, receipts, or geotagged photographs) to the SponZilla dashboard. The Sponsor has 14 days to review and either approve the release of funds or request modifications.

4. COMPLIANCE & LEGAL
Both parties certify that the representatives typing their names below are authorized signatories of their respective organizations. Both parties agree that digital signature constitutes binding agreement to these terms.`;

      const escrow = await ProofOfWork.create({
        eventId,
        clubId,
        brandId,
        sponsorshipRequestId,
        escrowAmount: amount,
        escrowStatus: 'pending_signatures',
        milestones: defaultMilestones,
        agreementText
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

      // Trigger notification to Brand
      try {
        const brandProfile = await BrandProfile.findById(escrow.brandId);
        const clubProfile = await ClubProfile.findById(escrow.clubId);
        const event = await Event.findById(escrow.eventId);
        if (brandProfile && brandProfile.userId) {
          const brandUser = await User.findById(brandProfile.userId);
          if (brandUser) {
            await notificationService.sendMilestoneSubmissionEmail(
              brandUser,
              clubProfile?.clubName || 'Student Club',
              event?.title || 'Event',
              milestone.title
            );
          }
        }
      } catch (err) {
        console.error('Failed to send milestone submission email notification:', err);
      }

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

      // Trigger notification to Club
      try {
        const clubProfile = await ClubProfile.findById(escrow.clubId);
        const brandProfile = await BrandProfile.findById(escrow.brandId);
        const event = await Event.findById(escrow.eventId);
        if (clubProfile && clubProfile.userId) {
          const clubUser = await User.findById(clubProfile.userId);
          if (clubUser) {
            await notificationService.sendMilestoneStatusEmail(
              clubUser,
              brandProfile?.companyName || brandProfile?.brandName || 'Brand Partner',
              event?.title || 'Event',
              milestone.title,
              status,
              brandFeedback
            );
          }
        }
      } catch (err) {
        console.error('Failed to send milestone update email notification:', err);
      }

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

  // Sign standard agreement and unlock escrow
  signAgreement = async (req, res) => {
    try {
      const { id } = req.params;
      const { signatoryName, taxId } = req.body;

      if (!signatoryName) {
        return res.status(400).json({ error: 'Representative signatory name is required' });
      }

      const escrow = await ProofOfWork.findById(id);
      if (!escrow) return res.status(404).json({ error: 'Escrow contract not found' });

      // Determine if signer is the club or the brand
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });

      if (clubProfile && escrow.clubId.toString() === clubProfile._id.toString()) {
        escrow.clubSignatory = signatoryName;
        escrow.clubSignedAt = new Date();
        escrow.clubTaxId = taxId || '';
      } else if (brandProfile && escrow.brandId.toString() === brandProfile._id.toString()) {
        escrow.brandSignatory = signatoryName;
        escrow.brandSignedAt = new Date();
        escrow.brandTaxId = taxId || '';
      } else {
        return res.status(403).json({ error: 'Unauthorized to sign this contract' });
      }

      // If both have signed, update status to funded (meaning funds are conceptually locked)
      if (escrow.clubSignatory && escrow.brandSignatory) {
        escrow.agreementSigned = true;
        escrow.escrowStatus = 'funded';
      }

      await escrow.save();
      res.json({ success: true, escrow });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProofOfWorkController();
