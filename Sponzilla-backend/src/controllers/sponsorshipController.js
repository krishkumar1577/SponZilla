const SponsorshipRequest = require('../models/SponsorshipRequest');
const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

class SponsorshipController {
  // Submit a new sponsorship request
  createRequest = async (req, res) => {
    try {
      const { eventId, tierName, amount, message } = req.body;
      
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });
      if (!brandProfile) {
        return res.status(403).json({ error: 'Only brands can submit sponsorship requests' });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Check if the tier exists
      const tier = event.sponsorshipTiers.find(t => t.name === tierName);
      if (!tier) {
        return res.status(400).json({ error: 'Selected sponsorship tier does not exist' });
      }

      // Check availability
      if (tier.spotsTaken >= tier.spotsAvailable) {
        return res.status(400).json({ error: 'This tier is already fully booked' });
      }

      const request = await SponsorshipRequest.create({
        eventId,
        clubId: event.clubId,
        brandId: brandProfile._id,
        tierName,
        amount,
        message,
        status: 'pending'
      });

      // Automatically start a conversation / send a message about the bid
      let conversation = await Conversation.findOne({
        participants: { $all: [req.userId, event.clubId.userId] },
        eventId
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [req.userId, event.clubId.userId],
          eventId
        });
      }

      await Message.create({
        conversationId: conversation._id,
        senderId: req.userId,
        content: `System: I have submitted a formal bid for the ${tierName} tier (₹${amount.toLocaleString()}). Message: ${message}`
      });

      res.status(201).json({ success: true, request });
    } catch (error) {
      console.error('Sponsorship request error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get requests for a club (incoming)
  getClubRequests = async (req, res) => {
    try {
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      if (!clubProfile) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const requests = await SponsorshipRequest.find({ clubId: clubProfile._id })
        .populate('eventId', 'title eventDate')
        .populate('brandId', 'brandName logo')
        .sort({ createdAt: -1 });

      res.json({ success: true, requests });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get requests for a brand (outgoing)
  getBrandRequests = async (req, res) => {
    try {
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });
      if (!brandProfile) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const requests = await SponsorshipRequest.find({ brandId: brandProfile._id })
        .populate('eventId', 'title eventDate')
        .populate('clubId', 'clubName logo')
        .sort({ createdAt: -1 });

      res.json({ success: true, requests });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update request status (Accept/Reject)
  updateRequestStatus = async (req, res) => {
    try {
      const { requestId } = req.params;
      const { status } = req.body; // 'accepted' or 'rejected'

      const request = await SponsorshipRequest.findById(requestId).populate('eventId');
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }

      // Verify club ownership
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      if (!clubProfile || request.clubId.toString() !== clubProfile._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
      }

      request.status = status;
      await request.save();

      // If accepted, update the event's tier spotsTaken
      if (status === 'accepted') {
        const event = await Event.findById(request.eventId);
        const tierIndex = event.sponsorshipTiers.findIndex(t => t.name === request.tierName);
        if (tierIndex !== -1) {
          event.sponsorshipTiers[tierIndex].spotsTaken = (event.sponsorshipTiers[tierIndex].spotsTaken || 0) + 1;
          await event.save();
        }
      }

      // Notify via message
      const brandProfile = await BrandProfile.findById(request.brandId);
      let conversation = await Conversation.findOne({
        participants: { $all: [req.userId, brandProfile.userId] },
        eventId: request.eventId
      });

      if (conversation) {
        await Message.create({
          conversationId: conversation._id,
          senderId: req.userId,
          content: `System: Your sponsorship request for ${request.tierName} has been ${status}.`
        });
      }

      res.json({ success: true, request });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SponsorshipController();
