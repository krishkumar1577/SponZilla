const User = require('../models/user');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const Event = require('../models/Event');

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

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // We should also delete their associated profiles and events to clean up the DB
      if (user.role === 'club') {
        const club = await ClubProfile.findOneAndDelete({ userId: id });
        if (club) {
          await Event.deleteMany({ clubId: club._id });
        }
      } else if (user.role === 'brand') {
        await BrandProfile.findOneAndDelete({ userId: id });
      }

      res.json({ success: true, message: 'User and associated data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
