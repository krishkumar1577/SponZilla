const mongoose = require('mongoose');
const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const AnalyticsService = require('../services/analyticsService');

async function seedAnalyticsData() {
  try {
    console.log('🌱 Seeding analytics data...');

    // Get all events
    const events = await Event.find({});
    console.log(`Found ${events.length} events to update with analytics`);

    // Update each event with random analytics data
    for (const event of events) {
      await AnalyticsService.simulateEventAnalytics(event._id);
    }

    // Update club profiles with sample statistics
    const clubs = await ClubProfile.find({});
    console.log(`Found ${clubs.length} clubs to update with stats`);

    for (const club of clubs) {
      const clubEvents = await Event.find({ clubId: club._id });
      const totalSponsorshipNeeded = clubEvents.reduce((sum, event) => 
        sum + (event.budget?.sponsorshipNeeded || 0), 0
      );
      
      // Update club stats
      await ClubProfile.findByIdAndUpdate(club._id, {
        'stats.totalEvents': clubEvents.length,
        'stats.totalSponsorship': totalSponsorshipNeeded,
        'stats.activeSponsors': Math.floor(Math.random() * 5) + 2 // 2-7 sponsors
      });
    }

    console.log('✅ Analytics data seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding analytics data:', error);
  }
}

module.exports = { seedAnalyticsData };