
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  
  // Club that created this event
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClubProfile',
    required: true
  },
  
  // Event title
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: 200
  },
  
  // Event description
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 5000
  },
  
  // Event category
  category: {
    type: String,
    enum: ['hackathon', 'cultural-fest', 'sports-event', 'workshop', 'conference', 'competition', 'seminar', 'other'],
    required: true
  },
  
  // When is the event?
  eventDate: {
    type: Date,
    required: [true, 'Event date is required']
  },
  
  // How long is the event? (in days)
  duration: {
    type: Number,
    default: 1,
    min: 1,
    max: 365
  },
  
  // Where is the event?
  venue: {
    type: String,
    required: [true, 'Venue is required']
  },
  
  // Expected number of attendees
  expectedAttendees: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Who will attend? (target audience)
  targetAudience: [{
    type: String,
    enum: ['students', 'professionals', 'tech-enthusiasts', 'entrepreneurs', 'general']
  }],
  
  // Event images
  images: [{
    type: String  // URLs
  }],
  
  // Budget details
  budget: {
    total: {
      type: Number,
      required: true,
      min: 0
    },
    sponsorshipNeeded: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  
  // What do sponsors get?
  benefits: [{
    type: String
  }],
  
  // Event status
  status: {
    type: String,
    enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  
  // Sponsorship requests for this event
  sponsorshipRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SponsorshipRequest'
  }],
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    impressions: {
      type: Number,
      default: 0
    },
    applications: {
      type: Number,
      default: 0
    }
  },
  
  // Tags for better search
  tags: [{
    type: String
  }],
  
  // Pitch deck URL (PDF)
  pitchDeck: {
    type: String,
    default: null
  },
  
  // Social media links for event
  socialMedia: {
    instagram: String,
    twitter: String,
    facebook: String,
    website: String
  },
  
  // Event highlights
  highlights: [{
    type: String
  }],
  
  // Previous event stats (if recurring)
  previousEditions: [{
    year: Number,
    attendees: Number,
    sponsors: Number,
    budget: Number
  }],
  
  // Is event featured? (admin can feature)
  featured: {
    type: Boolean,
    default: false
  },
  
  // Is event verified?
  verified: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

// Indexes for better search performance
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ eventDate: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ category: 1 });

// Virtual field: Is event upcoming?
eventSchema.virtual('isUpcoming').get(function() {
  return this.eventDate > new Date();
});

// Virtual field: Days until event
eventSchema.virtual('daysUntilEvent').get(function() {
  const diff = this.eventDate - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Event', eventSchema);