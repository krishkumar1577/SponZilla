const User = require('../models/user');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const Event = require('../models/Event');
const SponsorshipRequest = require('../models/SponsorshipRequest');
const ProofOfWork = require('../models/ProofOfWork');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const Notification = require('../models/Notification');

class AdminController {
  buildActivityFeed({
    users = [],
    clubs = [],
    brands = [],
    events = [],
    sponsorships = [],
    proofOfWork = []
  }) {
    return [
      ...users.map((user) => ({
        id: `user-${user._id}`,
        type: 'user',
        title: `${user.name} joined the platform`,
        subtitle: `${user.email} signed up as a ${user.role}`,
        occurredAt: user.createdAt,
        status: user.verified ? 'verified' : 'new'
      })),
      ...clubs.map((club) => ({
        id: `club-${club._id}`,
        type: 'club',
        title: `${club.clubName} created a club profile`,
        subtitle: club.university || 'Club profile awaiting details',
        occurredAt: club.createdAt,
        status: club.verified ? 'verified' : 'pending'
      })),
      ...brands.map((brand) => ({
        id: `brand-${brand._id}`,
        type: 'brand',
        title: `${brand.brandName} created a brand profile`,
        subtitle: brand.industry || 'Brand profile awaiting details',
        occurredAt: brand.createdAt,
        status: brand.verified ? 'verified' : 'pending'
      })),
      ...events.map((event) => ({
        id: `event-${event._id}`,
        type: 'event',
        title: event.title,
        subtitle: `Event ${event.status}${event.clubId?.clubName ? ` by ${event.clubId.clubName}` : ''}`,
        occurredAt: event.createdAt,
        status: event.status
      })),
      ...sponsorships.map((request) => ({
        id: `sponsorship-${request._id}`,
        type: 'sponsorship',
        title: `${request.brandId?.brandName || 'Brand'} offered ${request.tierName}`,
        subtitle: `${request.eventId?.title || 'Event'}${request.clubId?.clubName ? ` for ${request.clubId.clubName}` : ''}`,
        occurredAt: request.createdAt,
        status: request.status,
        amount: request.amount
      })),
      ...proofOfWork.map((escrow) => ({
        id: `pow-${escrow._id}`,
        type: 'proof-of-work',
        title: `${escrow.eventId?.title || 'Event'} escrow updated`,
        subtitle: `${escrow.brandId?.brandName || 'Brand'} and ${escrow.clubId?.clubName || 'Club'} agreement`,
        occurredAt: escrow.updatedAt || escrow.createdAt,
        status: escrow.escrowStatus,
        amount: escrow.escrowAmount
      }))
    ]
      .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt))
      .slice(0, 12);
  }
  
  // ===== GET DASHBOARD STATS =====
  async getDashboardStats(req, res) {
    try {
      const [
        totalUsers,
        totalClubs,
        totalBrands,
        totalEvents,
        publishedEvents,
        verifiedClubs,
        verifiedBrands,
        sponsorshipTotals,
        acceptedSponsorshipCount,
        pendingSponsorshipCount,
        proofOfWorkCount,
        fundedEscrowCount,
        disputedEscrowCount,
        recentUsers,
        recentClubs,
        recentBrands,
        recentEvents,
        recentSponsorships,
        recentProofOfWork
      ] = await Promise.all([
        User.countDocuments(),
        ClubProfile.countDocuments(),
        BrandProfile.countDocuments(),
        Event.countDocuments(),
        Event.countDocuments({ status: 'published' }),
        ClubProfile.countDocuments({ verified: true }),
        BrandProfile.countDocuments({ verified: true }),
        SponsorshipRequest.aggregate([
          {
            $group: {
              _id: null,
              totalSponsorshipValue: { $sum: '$amount' },
              acceptedSponsorshipValue: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'accepted'] }, '$amount', 0]
                }
              }
            }
          }
        ]),
        SponsorshipRequest.countDocuments({ status: 'accepted' }),
        SponsorshipRequest.countDocuments({ status: 'pending' }),
        ProofOfWork.countDocuments(),
        ProofOfWork.countDocuments({ escrowStatus: 'funded' }),
        ProofOfWork.countDocuments({ escrowStatus: 'disputed' }),
        User.find().select('name email role verified createdAt').sort({ createdAt: -1 }).limit(5).lean(),
        ClubProfile.find().select('clubName university verified createdAt').sort({ createdAt: -1 }).limit(5).lean(),
        BrandProfile.find().select('brandName industry verified createdAt').sort({ createdAt: -1 }).limit(5).lean(),
        Event.find().select('title status createdAt').populate('clubId', 'clubName').sort({ createdAt: -1 }).limit(5).lean(),
        SponsorshipRequest.find()
          .select('tierName amount status createdAt')
          .populate('eventId', 'title')
          .populate('brandId', 'brandName')
          .populate('clubId', 'clubName')
          .sort({ createdAt: -1 })
          .limit(5)
          .lean(),
        ProofOfWork.find()
          .select('escrowAmount escrowStatus createdAt updatedAt')
          .populate('eventId', 'title')
          .populate('brandId', 'brandName')
          .populate('clubId', 'clubName')
          .sort({ updatedAt: -1 })
          .limit(5)
          .lean()
      ]);

      const totals = sponsorshipTotals[0] || {
        totalSponsorshipValue: 0,
        acceptedSponsorshipValue: 0
      };
      const recentActivity = this.buildActivityFeed({
        users: recentUsers,
        clubs: recentClubs,
        brands: recentBrands,
        events: recentEvents,
        sponsorships: recentSponsorships,
        proofOfWork: recentProofOfWork
      });

      res.json({
        success: true,
        stats: {
          totalUsers,
          totalClubs,
          totalBrands,
          totalEvents,
          publishedEvents,
          verifiedClubs,
          verifiedBrands,
          totalSponsorshipValue: totals.totalSponsorshipValue || 0,
          acceptedSponsorshipValue: totals.acceptedSponsorshipValue || 0,
          acceptedSponsorshipCount,
          pendingSponsorshipCount,
          proofOfWorkCount,
          fundedEscrowCount,
          disputedEscrowCount,
          recentActivity
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

  // ===== GET ALL PROOF OF WORK / ESCROW RECORDS =====
  async getProofOfWork(req, res) {
    try {
      const proofOfWork = await ProofOfWork.find()
        .populate('clubId', 'clubName')
        .populate('brandId', 'brandName')
        .populate('eventId', 'title eventDate')
        .populate('sponsorshipRequestId', 'status amount')
        .sort({ updatedAt: -1 })
        .lean();

      res.json({ success: true, proofOfWork });
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

  // ===== TOGGLE USER VERIFICATION =====
  async toggleUserVerification(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.verified = !user.verified;
      await user.save();

      // Also toggle the corresponding profile's verified status for consistency
      if (user.role === 'club') {
        await ClubProfile.findOneAndUpdate({ userId: id }, { verified: user.verified });
      } else if (user.role === 'brand') {
        await BrandProfile.findOneAndUpdate({ userId: id }, { verified: user.verified });
      }

      res.json({ success: true, verified: user.verified, user });
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
  async cleanupUserAccount(userId) {
    await Message.deleteMany({ senderId: userId });
    await Conversation.deleteMany({ participants: userId });
    await Notification.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
  }

  async deleteClubData(clubId) {
    await Event.deleteMany({ clubId });
    await SponsorshipRequest.deleteMany({ clubId });
    await ProofOfWork.deleteMany({ clubId });
  }

  async deleteBrandData(brandId) {
    await SponsorshipRequest.deleteMany({ brandId });
    await ProofOfWork.deleteMany({ brandId });
  }

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

      if (user.role === 'admin') {
        return res.status(400).json({ error: 'Admin accounts cannot be deleted from this panel.' });
      }

      // Delete all associated data based on role
      if (user.role === 'club') {
        const clubProfile = await ClubProfile.findOne({ userId: id });
        if (clubProfile) {
          await this.deleteClubData(clubProfile._id);
        }
        await ClubProfile.deleteOne({ userId: id });
      } else if (user.role === 'brand') {
        const brandProfile = await BrandProfile.findOne({ userId: id });
        if (brandProfile) {
          await this.deleteBrandData(brandProfile._id);
        }
        await BrandProfile.deleteOne({ userId: id });
      }

      await this.cleanupUserAccount(id);

      res.json({ success: true, message: 'User and all associated data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== DELETE CLUB =====
  async deleteClub(req, res) {
    try {
      const { id } = req.params;
      const club = await ClubProfile.findById(id);

      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }

      if (club.userId?.toString() === req.userId) {
        return res.status(400).json({ error: 'You cannot delete your own account from the admin panel.' });
      }

      await this.deleteClubData(club._id);
      await ClubProfile.deleteOne({ _id: club._id });
      await this.cleanupUserAccount(club.userId);

      res.json({ success: true, message: 'Club account and all associated data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== DELETE BRAND =====
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await BrandProfile.findById(id);

      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }

      if (brand.userId?.toString() === req.userId) {
        return res.status(400).json({ error: 'You cannot delete your own account from the admin panel.' });
      }

      await this.deleteBrandData(brand._id);
      await BrandProfile.deleteOne({ _id: brand._id });
      await this.cleanupUserAccount(brand.userId);

      res.json({ success: true, message: 'Brand account and all associated data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const adminController = new AdminController();

for (const methodName of Object.getOwnPropertyNames(AdminController.prototype)) {
  if (methodName === 'constructor') continue;

  const method = adminController[methodName];
  if (typeof method === 'function') {
    adminController[methodName] = method.bind(adminController);
  }
}

module.exports = adminController;
