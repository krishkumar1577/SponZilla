const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const User = require('../models/user');

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
      
      const totalSponsorshipsSecured = events.reduce((sum, event) => {
        return sum + event.sponsorshipTiers.reduce((tierSum, tier) => 
          tierSum + (tier.spotsTaken || 0), 0
        );
      }, 0);

      const totalFundsRaised = events.reduce((sum, event) => {
        return sum + event.sponsorshipTiers.reduce((tierSum, tier) => 
          tierSum + ((tier.spotsTaken || 0) * (tier.amount || 0)), 0
        );
      }, 0);

      const averageSponsorshipValue = totalSponsorshipsSecured > 0 
        ? Math.round(totalFundsRaised / totalSponsorshipsSecured) 
        : 0;

      const totalAttendance = events.reduce((sum, event) => 
        sum + (event.expectedAttendees || 0), 0
      );

      const totalViews = events.reduce((sum, event) => 
        sum + (event.analytics?.views || 0), 0
      );
      
      const totalImpressions = events.reduce((sum, event) => 
        sum + (event.analytics?.impressions || 0), 0
      );

      const totalApplications = events.reduce((sum, event) => 
        sum + (event.analytics?.applications || 0), 0
      );

      const sponsorshipGrowth = Math.floor(Math.random() * 20) + 5;
      const fundsGrowth = Math.floor(Math.random() * 15) + 8;
      const attendanceGrowth = Math.floor(Math.random() * 12) + 3;

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
            sponsorshipGrowth,
            fundsGrowth,
            attendanceGrowth
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

      const totalInvestment = Math.floor(Math.random() * 500000) + 100000;
      const totalSponsored = Math.floor(Math.random() * 25) + 5;
      const averageInvestment = Math.round(totalInvestment / totalSponsored);
      const totalReach = Math.floor(Math.random() * 200000) + 50000;
      const engagementRate = (Math.random() * 15 + 2).toFixed(1);
      const impressions = Math.floor(totalReach * 1.5);
      const revenue = Math.floor(totalInvestment * (1 + Math.random() * 0.8));
      const roi = Math.round(((revenue - totalInvestment) / totalInvestment) * 100);
      const reachGrowth = Math.floor(Math.random() * 20) - 5;
      const engagementGrowth = Math.floor(Math.random() * 16) - 3;
      const roiGrowth = Math.floor(Math.random() * 25) + 5;
      const activeCampaigns = Math.floor(Math.random() * 8) + 2;
      const pendingProposals = Math.floor(Math.random() * 15) + 3;

      const topCategories = [
        { name: brandProfile.industry || 'Technology', performance: 85 },
        { name: 'Business', performance: 72 },
        { name: 'Sports', performance: 68 },
        { name: 'Cultural', performance: 45 }
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
          growth: {
            reachGrowth,
            engagementGrowth,
            roiGrowth
          },
          categories: topCategories,
          demographics: {
            primaryAudience: brandProfile.targetAudience || ['students'],
            ageGroups: [
              { range: '18-22', percentage: 45 },
              { range: '23-25', percentage: 35 },
              { range: '26+', percentage: 20 }
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

      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });
      
      if (!clubProfile && !brandProfile) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (clubProfile && event.clubId._id.toString() !== clubProfile._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
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
        potentialRevenue: event.sponsorshipTiers.reduce((sum, tier) => 
          sum + (tier.amount * tier.spotsAvailable), 0
        ),
        confirmedRevenue: event.sponsorshipTiers.reduce((sum, tier) => 
          sum + (tier.amount * (tier.spotsTaken || 0)), 0
        )
      };

      res.json({
        success: true,
        data: {
          eventId: event._id,
          eventTitle: event.title,
          status: event.status,
          analytics,
          sponsorshipStatus,
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
      const user = await User.findById(req.userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const totalEvents = await Event.countDocuments();
      const totalClubs = await ClubProfile.countDocuments();
      const totalBrands = await BrandProfile.countDocuments();
      const totalUsers = await User.countDocuments();

      const publishedEvents = await Event.countDocuments({ status: 'published' });
      const completedEvents = await Event.countDocuments({ status: 'completed' });

      res.json({
        success: true,
        data: {
          overview: {
            totalEvents,
            totalClubs,
            totalBrands,
            totalUsers
          },
          events: {
            published: publishedEvents,
            completed: completedEvents,
            draft: totalEvents - publishedEvents - completedEvents
          }
        }
      });

    } catch (error) {
      console.error('Platform analytics error:', error);
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
      
      const totalSponsorshipGoal = allEvents.reduce((sum, event) => 
        sum + (event.budget?.sponsorshipNeeded || 0), 0
      );
      
      const totalFundsRaised = allEvents.reduce((sum, event) => {
        return sum + event.sponsorshipTiers.reduce((tierSum, tier) => 
          tierSum + ((tier.spotsTaken || 0) * (tier.amount || 0)), 0
        );
      }, 0);

      const totalSponsorships = allEvents.reduce((sum, event) => {
        return sum + event.sponsorshipTiers.reduce((tierSum, tier) => 
          tierSum + (tier.spotsTaken || 0), 0
        );
      }, 0);

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
            achievementPercentage: totalSponsorshipGoal > 0 
              ? Math.round((totalFundsRaised / totalSponsorshipGoal) * 100) 
              : 0
          }
        }
      });
    } catch (error) {
      console.error('Aggregated club analytics error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // ===== AGGREGATED BRAND ANALYTICS (ADMIN ONLY) =====
  getAggregatedBrandAnalytics = async (req, res) => {
    try {
      const allBrands = await BrandProfile.find({});
      
      const totalBrands = allBrands.length;
      const totalInvestment = allBrands.length * 200000;
      const averageROI = 75;
      
      const industriesData = {};
      allBrands.forEach(brand => {
        const industry = brand.industry || 'Unknown';
        industriesData[industry] = (industriesData[industry] || 0) + 1;
      });

      const topIndustries = Object.entries(industriesData)
        .map(([industry, count]) => ({ industry, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      res.json({
        success: true,
        data: {
          overview: {
            totalBrands,
            totalInvestment,
            averageInvestment: totalBrands > 0 ? Math.round(totalInvestment / totalBrands) : 0,
            averageROI
          },
          industries: topIndustries,
          growth: {
            brandsGrowth: 15,
            investmentGrowth: 22
          }
        }
      });
    } catch (error) {
      console.error('Aggregated brand analytics error:', error);
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