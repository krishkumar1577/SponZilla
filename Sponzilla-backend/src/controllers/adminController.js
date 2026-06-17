const User = require('../models/user');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const Event = require('../models/Event');
const SponsorshipRequest = require('../models/SponsorshipRequest');

class AdminController {
  
  // ===== GET DASHBOARD STATS =====
  async getDashboardStats(req, res) {
    try {
      const totalUsers = await User.countDocuments();
      const totalClubs = await ClubProfile.countDocuments();
      const totalBrands = await BrandProfile.countDocuments();
      const totalEvents = await Event.countDocuments();
      
      const publishedEvents = await Event.countDocuments({ status: 'published' });
      const verifiedClubs = await ClubProfile.countDocuments({ verified: true });
      const verifiedBrands = await BrandProfile.countDocuments({ verified: true });

      res.json({
        success: true,
        stats: {
          totalUsers,
          totalClubs,
          totalBrands,
          totalEvents,
          publishedEvents,
          verifiedClubs,
          verifiedBrands
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GET ALL USERS =====
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      res.json({ success: true, users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GET ALL CLUBS =====
  async getClubs(req, res) {
    try {
      const clubs = await ClubProfile.find().populate('userId', 'name email').sort({ createdAt: -1 });
      res.json({ success: true, clubs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GET ALL BRANDS =====
  async getBrands(req, res) {
    try {
      const brands = await BrandProfile.find().populate('userId', 'name email').sort({ createdAt: -1 });
      res.json({ success: true, brands });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GET ALL EVENTS =====
  async getEvents(req, res) {
    try {
      const events = await Event.find().populate('clubId', 'clubName').sort({ createdAt: -1 });
      res.json({ success: true, events });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== GET ALL SPONSORSHIP REQUESTS =====
  async getSponsorships(req, res) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const skip = (page - 1) * limit;

      const filter = {};
      if (status) {
        filter.status = status;
      }

      const sponsorships = await SponsorshipRequest.find(filter)
        .populate({
          path: 'eventId',
          select: 'title eventDate clubId',
          populate: {
            path: 'clubId',
            select: 'clubName'
          }
        })
        .populate({
          path: 'brandId',
          select: 'brandName industry'
        })
        .populate({
          path: 'clubId',
          select: 'clubName university'
        })
        .lean()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await SponsorshipRequest.countDocuments(filter);

      res.json({
        success: true,
        sponsorships,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== TOGGLE CLUB VERIFICATION =====
  async toggleClubVerification(req, res) {
    try {
      const { id } = req.params;
      const club = await ClubProfile.findById(id);
      
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }

      club.verified = !club.verified;
      await club.save();

      // Also update the User's verified status for UI consistency
      await User.findByIdAndUpdate(club.userId, { verified: club.verified });

      res.json({ success: true, verified: club.verified, club });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== TOGGLE BRAND VERIFICATION =====
  async toggleBrandVerification(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandProfile.findById(id);
      
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      brand.verified = !brand.verified;
      await brand.save();

      // Also update the User's verified status
      await User.findByIdAndUpdate(brand.userId, { verified: brand.verified });

      res.json({ success: true, verified: brand.verified, brand });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== TOGGLE EVENT FEATURED STATUS =====
  async toggleEventFeatured(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      event.featured = !event.featured;
      await event.save();

      res.json({ success: true, featured: event.featured, event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== DELETE USER =====
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Prevent deleting the currently logged-in admin
      if (id === req.userId) {
        return res.status(400).json({ error: 'You cannot delete your own admin account.' });
      }

      // Get user first to find associated data
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete all associated data based on role
      if (user.role === 'club') {
        const clubProfile = await ClubProfile.findOne({ userId: id });
        if (clubProfile) {
          await Event.deleteMany({ clubId: clubProfile._id });
          await SponsorshipRequest.deleteMany({ clubId: clubProfile._id });
        }
        await ClubProfile.deleteOne({ userId: id });
      } else if (user.role === 'brand') {
        const brandProfile = await BrandProfile.findOne({ userId: id });
        if (brandProfile) {
          await SponsorshipRequest.deleteMany({ brandId: brandProfile._id });
        }
        await BrandProfile.deleteOne({ userId: id });
      }

      // Clean up messages and notifications
      await Message.deleteMany({ senderId: id });
      await Conversation.deleteMany({ participants: id });
      await Notification.deleteMany({ userId: id });

      // Finally delete user
      await User.findByIdAndDelete(id);

      res.json({ success: true, message: 'User and all associated data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
