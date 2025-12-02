const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const User = require('../models/user');

class AnalyticsController {

  // ===== CLUB ANALYTICS =====
  async getClubAnalytics(req, res) {
    try {
      // Check if user is admin
      const user = await User.findById(req.userId);
      
      if (user.role === 'admin') {
        // Admin can view any club's analytics or overall club analytics
        const clubId = req.query.clubId;
        const clubProfile = clubId 
          ? await ClubProfile.findById(clubId)
          : null;
        
        if (clubId && !clubProfile) {
          return res.status(404).json({ error: 'Club profile not found' });
        }
        
        // If no specific clubId, return aggregated analytics for all clubs
        if (!clubId) {
          return this.getAggregatedClubAnalytics(req, res);
        }
      } else {
        // Regular club user - can only view their own analytics
        const clubProfile = await ClubProfile.findOne({ userId: req.userId });
        if (!clubProfile) {
          return res.status(404).json({ error: 'Club profile not found' });
        }
      }
      
      const clubProfile = user.role === 'admin' 
        ? await ClubProfile.findById(req.query.clubId)
        : await ClubProfile.findOne({ userId: req.userId });

      // Get all club events
      const events = await Event.find({ clubId: clubProfile._id });
      
      // Calculate metrics
      const totalEvents = events.length;
      const publishedEvents = events.filter(e => e.status === 'published').length;
      const completedEvents = events.filter(e => e.status === 'completed').length;
      
      // Calculate total sponsorship goals and secured funding
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

      // Calculate total expected attendance
      const totalAttendance = events.reduce((sum, event) => 
        sum + (event.expectedAttendees || 0), 0
      );

      // Calculate analytics metrics
      const totalViews = events.reduce((sum, event) => 
        sum + (event.analytics?.views || 0), 0
      );
      
      const totalImpressions = events.reduce((sum, event) => 
        sum + (event.analytics?.impressions || 0), 0
      );

      const totalApplications = events.reduce((sum, event) => 
        sum + (event.analytics?.applications || 0), 0
      );

      // Growth calculations (mock for now - in real app, compare with previous periods)
      const sponsorshipGrowth = Math.floor(Math.random() * 20) + 5; // 5-25%
      const fundsGrowth = Math.floor(Math.random() * 15) + 8; // 8-23%
      const attendanceGrowth = Math.floor(Math.random() * 12) + 3; // 3-15%

      // Upcoming sponsorship opportunities
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
  async getBrandAnalytics(req, res) {
    try {
      // Check if user is admin
      const user = await User.findById(req.userId);
      
      if (user.role === 'admin') {
        // Admin can view any brand's analytics or overall brand analytics
        const brandId = req.query.brandId;
        const brandProfile = brandId 
          ? await BrandProfile.findById(brandId)
          : null;
        
        if (brandId && !brandProfile) {
          return res.status(404).json({ error: 'Brand profile not found' });
        }
        
        // If no specific brandId, return aggregated analytics for all brands
        if (!brandId) {
          return this.getAggregatedBrandAnalytics(req, res);
        }
      } else {
        // Regular brand user - can only view their own analytics
        const brandProfile = await BrandProfile.findOne({ userId: req.userId });
        if (!brandProfile) {
          return res.status(404).json({ error: 'Brand profile not found' });
        }
      }
      
      const brandProfile = user.role === 'admin' 
        ? await BrandProfile.findById(req.query.brandId)
        : await BrandProfile.findOne({ userId: req.userId });

      // For now, we'll calculate based on brand's interests and mock some data
      // In a real app, you'd track actual sponsorship transactions
      
      // Mock sponsorship data based on brand profile
      const totalInvestment = Math.floor(Math.random() * 500000) + 100000; // 100k-600k
      const totalSponsored = Math.floor(Math.random() * 25) + 5; // 5-30 events
      const averageInvestment = Math.round(totalInvestment / totalSponsored);

      // Calculate reach and engagement (mock realistic numbers)
      const totalReach = Math.floor(Math.random() * 200000) + 50000; // 50k-250k
      const engagementRate = (Math.random() * 15 + 2).toFixed(1); // 2-17%
      const impressions = Math.floor(totalReach * 1.5); // Impressions > reach

      // ROI calculation (mock)
      const revenue = Math.floor(totalInvestment * (1 + Math.random() * 0.8)); // 100-180% return
      const roi = Math.round(((revenue - totalInvestment) / totalInvestment) * 100);

      // Growth metrics (mock)
      const reachGrowth = Math.floor(Math.random() * 20) - 5; // -5% to +15%
      const engagementGrowth = Math.floor(Math.random() * 16) - 3; // -3% to +13%
      const roiGrowth = Math.floor(Math.random() * 25) + 5; // +5% to +30%

      // Active campaigns (based on brand's target audience preferences)
      const activeCampaigns = Math.floor(Math.random() * 8) + 2; // 2-10 campaigns
      const pendingProposals = Math.floor(Math.random() * 15) + 3; // 3-18 proposals

      // Top performing categories based on brand's industry
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
  async getEventAnalytics(req, res) {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId).populate('clubId');
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Check if user has permission to view analytics
      const clubProfile = await ClubProfile.findOne({ userId: req.userId });
      const brandProfile = await BrandProfile.findOne({ userId: req.userId });
      
      if (!clubProfile && !brandProfile) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // If club user, check ownership
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
  async getPlatformAnalytics(req, res) {
    try {
      // Admin only endpoint
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
  async getAggregatedClubAnalytics(req, res) {
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
  async getAggregatedBrandAnalytics(req, res) {
    try {
      const allBrands = await BrandProfile.find({});
      
      // Mock aggregated brand data
      const totalBrands = allBrands.length;
      const totalInvestment = allBrands.length * 200000; // Mock average investment
      const averageROI = 75; // Mock average ROI
      
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
            brandsGrowth: 15, // Mock
            investmentGrowth: 22 // Mock
          }
        }
      });
    } catch (error) {
      console.error('Aggregated brand analytics error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnalyticsController();