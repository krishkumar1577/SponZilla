const ProofOfWork = require('../models/ProofOfWork');
const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');

class ProofOfWorkController {
  // Submit a new Proof of Work report
  submitReport = async (req, res) => {
    try {
      const { eventId, actualAttendees, socialImpressions, clickThroughs, postEventNotes } = req.body;
      
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      if (!clubProfile) {
        return res.status(403).json({ error: 'Only clubs can submit Proof of Work reports' });
      }

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      if (event.clubId.toString() !== clubProfile._id.toString()) {
        return res.status(403).json({ error: 'You can only submit reports for your own events' });
      }

      // Check if report already exists
      let report = await ProofOfWork.findOne({ eventId });
      if (report) {
        return res.status(400).json({ error: 'A Proof of Work report has already been submitted for this event' });
      }

      report = await ProofOfWork.create({
        eventId,
        clubId: clubProfile._id,
        actualAttendees,
        socialImpressions,
        clickThroughs,
        postEventNotes
      });

      // Update event status to completed if it isn't already
      if (event.status !== 'completed') {
        event.status = 'completed';
        await event.save();
      }

      res.status(201).json({ success: true, report });
    } catch (error) {
      console.error('Proof of Work submission error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get report for a specific event
  getReportByEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const report = await ProofOfWork.findOne({ eventId }).populate('clubId', 'clubName logo');
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      res.json({ success: true, report });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProofOfWorkController();
