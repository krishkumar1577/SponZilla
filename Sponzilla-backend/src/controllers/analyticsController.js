const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const User = require('../models/user');
const SponsorshipRequest = require('../models/SponsorshipRequest');
const ProofOfWork = require('../models/ProofOfWork');

class AnalyticsController {
  // ===== CLUB ANALYTICS =====
  getClubAnalytics = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      
      let clubProfile;
      if (user.role === 'admin') {
        const clubId = req.query.clubId;
        if (!clubId) {
          return this.getAggregatedClubAnalytics(req, res);
        }
        clubProfile = await ClubProfile.findById(clubId);
        if (!clubProfile) {
          return res.status(404).json({ error: 'Club profile not found' });
        }
      } else {
        clubProfile = await ClubProfile.findOne({ userId: req.userId });
        if (!clubProfile) {
          return res.json({
            success: true,
            profileExists: false,
            data: this.getZeroedClubData()
          });
        }
      }

      // Get all club events
      const events = await Event.find({ clubId: clubProfile._id });
      
      // Calculate metrics
      const totalEvents = events.length;
      const publishedEvents = events.filter(e => e.status === 'published').length;
      const completedEvents = events.filter(e => e.status === 'completed').length;
      
      const totalSponsorshipGoal = events.reduce((sum, event) => 
        sum + (event.budget?.sponsorshipNeeded || 0), 0
      );
      
      // Get all accepted sponsorship requests to calculate real funds
      const acceptedRequests = await SponsorshipRequest.find({
        clubId: clubProfile._id,
        status: 'accepted'
      });

      const totalSponsorshipsSecured = acceptedRequests.length;
      const totalFundsRaised = acceptedRequests.reduce((sum, req) => sum + req.amount, 0);

      const averageSponsorshipValue = totalSponsorshipsSecured > 0 
        ? Math.round(totalFundsRaised / totalSponsorshipsSecured) 
        : 0;

      // Real Analytics based on Proof Of Work
      const powReports = await ProofOfWork.find({ clubId: clubProfile._id });
      
      const totalAttendance = powReports.reduce((sum, pow) => sum + pow.actualAttendees, 0) 
                            || events.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0);

      const totalViews = events.reduce((sum, event) => sum + (event.analytics?.views || 0), 0);
      const totalImpressions = powReports.reduce((sum, pow) => sum + pow.socialImpressions, 0)
                            || events.reduce((sum, event) => sum + (event.analytics?.impressions || 0), 0);
      const totalApplications = events.reduce((sum, event) => sum + (event.analytics?.applications || 0), 0);

      const upcomingOpportunities = events.filter(e => 
        e.status === 'published' && new Date(e.eventDate) > new Date()
      ).length;

      res.json({
        success: true,
        data: {
          overview: {
            totalSponsorshipsSecured,
            totalFundsRaised,
            averageSponsorshipValue,
            totalAttendance
          },
          events: {
            totalEvents,
            publishedEvents,
            completedEvents,
            upcomingOpportunities
          },
          analytics: {
            totalViews,
            totalImpressions,
            totalApplications,
            reach: totalViews + totalImpressions
          },
          growth: {
            sponsorshipGrowth: 0,
            fundsGrowth: 0,
            attendanceGrowth: 0
          },
          goals: {
            totalSponsorshipGoal,
            achievementPercentage: totalSponsorshipGoal > 0 
              ? Math.round((totalFundsRaised / totalSponsorshipGoal) * 100) 
              : 0
          }
        }
      });

    } catch (error) {
      console.error('Club analytics error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ===== BRAND ANALYTICS =====
  getBrandAnalytics = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      
      let brandProfile;
      if (user.role === 'admin') {
        const brandId = req.query.brandId;
        if (!brandId) {
          return this.getAggregatedBrandAnalytics(req, res);
        }
        brandProfile = await BrandProfile.findById(brandId);
        if (!brandProfile) {
          return res.status(404).json({ error: 'Brand profile not found' });
        }
      } else {
        brandProfile = await BrandProfile.findOne({ userId: req.userId });
        if (!brandProfile) {
          return res.json({
            success: true,
            profileExists: false,
            data: this.getZeroedBrandData()
          });
        }
      }

      // Real Brand Analytics based on SponsorshipRequests and ProofOfWork
      const allRequests = await SponsorshipRequest.find({ brandId: brandProfile._id });
      const acceptedRequests = allRequests.filter(req => req.status === 'accepted');
      
      const totalInvestment = acceptedRequests.reduce((sum, req) => sum + req.amount, 0);
      const totalSponsored = acceptedRequests.length;
      const averageInvestment = totalSponsored > 0 ? Math.round(totalInvestment / totalSponsored) : 0;
      
      const activeCampaigns = allRequests.filter(req => req.status === 'accepted').length; // Simplify for now
      const pendingProposals = allRequests.filter(req => req.status === 'pending').length;

      // Fetch Proof of Work for accepted requests to calculate reach and ROI
      const eventIds = acceptedRequests.map(req => req.eventId);
      const powReports = await ProofOfWork.find({ eventId: { $in: eventIds } });

      const totalReach = powReports.reduce((sum, pow) => sum + pow.actualAttendees, 0);
      const impressions = powReports.reduce((sum, pow) => sum + pow.socialImpressions, 0);
      const clickThroughs = powReports.reduce((sum, pow) => sum + pow.clickThroughs, 0);
      
      const engagementRate = totalReach > 0 ? ((clickThroughs / totalReach) * 100).toFixed(1) : 0;
      
      // Extremely basic ROI calculation (just for demonstration, clickThroughs * $1 value)
      const revenue = clickThroughs * 1; 
      const roi = totalInvestment > 0 ? Math.round(((revenue - totalInvestment) / totalInvestment) * 100) : 0;

      const topCategories = [
        { name: brandProfile.industry || 'Technology', performance: 85 }
      ];

      res.json({
        success: true,
        data: {
          investment: {
            totalInvestment,
            totalSponsored,
            averageInvestment,
            activeCampaigns,
            pendingProposals
          },
          performance: {
            totalReach,
            impressions,
            engagementRate: parseFloat(engagementRate),
            roi
          },
          growth: { reachGrowth: 0, engagementGrowth: 0, roiGrowth: 0 },
          categories: topCategories,
          demographics: {
            primaryAudience: brandProfile.targetAudience || ['students'],
            ageGroups: [
              { range: '18-22', percentage: 100 }
            ]
          }
        }
      });

    } catch (error) {
      console.error('Brand analytics error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ===== EVENT SPECIFIC ANALYTICS =====
  getEventAnalytics = async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId).populate('clubId');
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const analytics = {
        views: event.analytics?.views || 0,
        impressions: event.analytics?.impressions || 0,
        applications: event.analytics?.applications || 0,
        conversionRate: event.analytics?.views > 0 
          ? ((event.analytics?.applications || 0) / event.analytics.views * 100).toFixed(1)
          : '0.0'
      };

      const sponsorshipStatus = {
        totalTiers: event.sponsorshipTiers.length,
        totalSpots: event.sponsorshipTiers.reduce((sum, tier) => sum + tier.spotsAvailable, 0),
        spotsTaken: event.sponsorshipTiers.reduce((sum, tier) => sum + (tier.spotsTaken || 0), 0),
        potentialRevenue: event.sponsorshipTiers.reduce((sum, tier) => sum + (tier.amount * tier.spotsAvailable), 0),
        confirmedRevenue: event.sponsorshipTiers.reduce((sum, tier) => sum + (tier.amount * (tier.spotsTaken || 0)), 0)
      };

      // Add Proof of Work data if exists
      const pow = await ProofOfWork.findOne({ eventId });

      res.json({
        success: true,
        data: {
          eventId: event._id,
          eventTitle: event.title,
          status: event.status,
          analytics,
          sponsorshipStatus,
          proofOfWork: pow || null,
          timeline: {
            created: event.createdAt,
            eventDate: event.eventDate,
            daysUntilEvent: Math.ceil((new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24))
          }
        }
      });

    } catch (error) {
      console.error('Event analytics error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ===== PLATFORM OVERVIEW ANALYTICS =====
  getPlatformAnalytics = async (req, res) => {
    try {
      const totalEvents = await Event.countDocuments();
      const totalClubs = await ClubProfile.countDocuments();
      const totalBrands = await BrandProfile.countDocuments();
      const totalUsers = await User.countDocuments();

      const publishedEvents = await Event.countDocuments({ status: 'published' });
      const completedEvents = await Event.countDocuments({ status: 'completed' });

      res.json({
        success: true,
        data: {
          overview: { totalEvents, totalClubs, totalBrands, totalUsers },
          events: {
            published: publishedEvents,
            completed: completedEvents,
            draft: totalEvents - publishedEvents - completedEvents
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== AGGREGATED CLUB ANALYTICS (ADMIN ONLY) =====
  getAggregatedClubAnalytics = async (req, res) => {
    try {
      const allEvents = await Event.find({}).populate('clubId');
      const allClubs = await ClubProfile.find({});
      
      const totalEvents = allEvents.length;
      const totalClubs = allClubs.length;
      
      const acceptedRequests = await SponsorshipRequest.find({ status: 'accepted' });
      const totalFundsRaised = acceptedRequests.reduce((sum, req) => sum + req.amount, 0);
      const totalSponsorships = acceptedRequests.length;

      const totalSponsorshipGoal = allEvents.reduce((sum, event) => sum + (event.budget?.sponsorshipNeeded || 0), 0);

      res.json({
        success: true,
        data: {
          overview: {
            totalClubs,
            totalEvents,
            totalSponsorships,
            totalFundsRaised,
            averageFundsPerClub: totalClubs > 0 ? Math.round(totalFundsRaised / totalClubs) : 0
          },
          platform: {
            totalSponsorshipGoal,
            achievementPercentage: totalSponsorshipGoal > 0 ? Math.round((totalFundsRaised / totalSponsorshipGoal) * 100) : 0
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ===== AGGREGATED BRAND ANALYTICS (ADMIN ONLY) =====
  getAggregatedBrandAnalytics = async (req, res) => {
    try {
      const allBrands = await BrandProfile.find({});
      const acceptedRequests = await SponsorshipRequest.find({ status: 'accepted' });
      
      const totalBrands = allBrands.length;
      const totalInvestment = acceptedRequests.reduce((sum, req) => sum + req.amount, 0);
      
      res.json({
        success: true,
        data: {
          overview: {
            totalBrands,
            totalInvestment,
            averageInvestment: totalBrands > 0 ? Math.round(totalInvestment / totalBrands) : 0,
            averageROI: 0
          },
          industries: [],
          growth: { brandsGrowth: 0, investmentGrowth: 0 }
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Helper to return zeroed club data
  getZeroedClubData = () => {
    return {
      overview: { totalSponsorshipsSecured: 0, totalFundsRaised: 0, averageSponsorshipValue: 0, totalAttendance: 0 },
      events: { totalEvents: 0, publishedEvents: 0, completedEvents: 0, upcomingOpportunities: 0 },
      analytics: { totalViews: 0, totalImpressions: 0, totalApplications: 0, reach: 0 },
      growth: { sponsorshipGrowth: 0, fundsGrowth: 0, attendanceGrowth: 0 },
      goals: { totalSponsorshipGoal: 0, achievementPercentage: 0 }
    };
  }

  // Helper to return zeroed brand data
  getZeroedBrandData = () => {
    return {
      investment: { totalInvestment: 0, totalSponsored: 0, averageInvestment: 0, activeCampaigns: 0, pendingProposals: 0 },
      performance: { totalReach: 0, impressions: 0, engagementRate: 0, roi: 0 },
      growth: { reachGrowth: 0, engagementGrowth: 0, roiGrowth: 0 },
      categories: [],
      demographics: { primaryAudience: [], ageGroups: [] }
    };
  }
}

module.exports = new AnalyticsController();