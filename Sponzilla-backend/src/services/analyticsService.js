const Event = require('./Event');
const ClubProfile = require('./ClubProfile');
const BrandProfile = require('./BrandProfile');

class AnalyticsService {
  
  // Update event view count
  static async incrementEventView(eventId) {
    try {
      await Event.findByIdAndUpdate(
        eventId, 
        { $inc: { 'analytics.views': 1 } },
        { new: true }
      );
    } catch (error) {
      console.error('Error incrementing event view:', error);
    }
  }

  // Update event impression count
  static async incrementEventImpression(eventId, count = 1) {
    try {
      await Event.findByIdAndUpdate(
        eventId,
        { $inc: { 'analytics.impressions': count } },
        { new: true }
      );
    } catch (error) {
      console.error('Error incrementing event impression:', error);
    }
  }

  // Record sponsorship application
  static async recordSponsorshipApplication(eventId) {
    try {
      await Event.findByIdAndUpdate(
        eventId,
        { $inc: { 'analytics.applications': 1 } },
        { new: true }
      );
    } catch (error) {
      console.error('Error recording sponsorship application:', error);
    }
  }

  // Update club profile stats when event is published
  static async updateClubStatsOnEventPublish(clubId, eventBudget) {
    try {
      await ClubProfile.findByIdAndUpdate(
        clubId,
        { 
          $inc: { 
            'stats.totalEvents': 1,
            'stats.totalSponsorship': eventBudget?.sponsorshipNeeded || 0
          }
        },
        { new: true }
      );
    } catch (error) {
      console.error('Error updating club stats:', error);
    }
  }

  // Update club stats when sponsorship is secured
  static async updateClubStatsOnSponsorship(clubId, sponsorshipAmount) {
    try {
      await ClubProfile.findByIdAndUpdate(
        clubId,
        { 
          $inc: { 
            'stats.activeSponsors': 1,
            'stats.totalSponsorship': sponsorshipAmount
          }
        },
        { new: true }
      );
    } catch (error) {
      console.error('Error updating club sponsorship stats:', error);
    }
  }

  // Simulate random analytics data for testing
  static async simulateEventAnalytics(eventId) {
    try {
      const views = Math.floor(Math.random() * 1000) + 100;
      const impressions = Math.floor(views * 1.5);
      const applications = Math.floor(views * 0.1);

      await Event.findByIdAndUpdate(
        eventId,
        {
          'analytics.views': views,
          'analytics.impressions': impressions,
          'analytics.applications': applications
        },
        { new: true }
      );
      
      console.log(`Simulated analytics for event ${eventId}:`, {
        views, impressions, applications
      });
    } catch (error) {
      console.error('Error simulating event analytics:', error);
    }
  }

  // Calculate trend data (for growth percentages)
  static calculateTrend(currentValue, previousValue) {
    if (previousValue === 0) return currentValue > 0 ? 100 : 0;
    return Math.round(((currentValue - previousValue) / previousValue) * 100);
  }

  // Format currency for display
  static formatCurrency(amount, currency = 'INR') {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    } else if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US')}`;
    }
    return `${amount.toLocaleString()}`;
  }

  // Calculate conversion rate
  static calculateConversionRate(conversions, totalViews) {
    if (totalViews === 0) return 0;
    return ((conversions / totalViews) * 100).toFixed(1);
  }

  // Generate random time series data for charts
  static generateTimeSeriesData(months = 6) {
    const data = [];
    const now = new Date();
    
    for (let i = months; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = Math.floor(Math.random() * 10000) + 1000;
      
      data.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        value: value,
        growth: i === months ? 0 : Math.floor(Math.random() * 30) - 10 // -10 to +20
      });
    }
    
    return data;
  }

  // Calculate ROI
  static calculateROI(investment, revenue) {
    if (investment === 0) return 0;
    return Math.round(((revenue - investment) / investment) * 100);
  }

  // Generate mock demographic data
  static generateDemographics() {
    return {
      ageGroups: [
        { range: '18-22', percentage: Math.floor(Math.random() * 30) + 35 }, // 35-65%
        { range: '23-25', percentage: Math.floor(Math.random() * 20) + 25 }, // 25-45%
        { range: '26+', percentage: Math.floor(Math.random() * 15) + 10 }     // 10-25%
      ],
      interests: [
        { name: 'Technology', percentage: Math.floor(Math.random() * 20) + 30 },
        { name: 'Sports', percentage: Math.floor(Math.random() * 15) + 20 },
        { name: 'Arts & Culture', percentage: Math.floor(Math.random() * 15) + 15 },
        { name: 'Business', percentage: Math.floor(Math.random() * 10) + 15 },
        { name: 'Environment', percentage: Math.floor(Math.random() * 10) + 10 }
      ]
    };
  }
}

module.exports = AnalyticsService;