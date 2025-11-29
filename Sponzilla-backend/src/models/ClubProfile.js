const mongoose = require('mongoose');

const clubProfileSchema = new mongoose.Schema({
  
  // Link to User account
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One profile per user
  },
  
  // Club name
  clubName: {
    type: String,
    required: [true, 'Club name is required'],
    trim: true
  },
  
  // University/College name
  university: {
    type: String,
    required: [true, 'University name is required'],
    trim: true
  },
  
  // About the club
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 1000
  },
  
  // Club category
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'social', 'entrepreneurship', 'other'],
    required: true
  },
  
  // Number of members
  memberCount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Year club was established
  establishedYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  
  // Club logo URL
  logo: {
    type: String,
    default: null
  },
  
  // Social media links
  socialMedia: {
    instagram: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    website: {
      type: String,
      default: null
    }
  },
  
  // Contact person details
  contactPerson: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: 'President'
    }
  },
  
  // Club achievements
  achievements: [{
    title: String,
    description: String,
    year: Number
  }],
  
  // Past events (will link to Event model later)
  pastEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  
  // Is profile verified by admin?
  verified: {
    type: Boolean,
    default: false
  },
  
  // Statistics
  stats: {
    totalEvents: {
      type: Number,
      default: 0
    },
    totalSponsorship: {
      type: Number,
      default: 0
    },
    activeSponsors: {
      type: Number,
      default: 0
    }
  }
  
}, {
  timestamps: true  // createdAt, updatedAt
});

// Create index for faster searches
clubProfileSchema.index({ clubName: 'text', university: 'text', description: 'text' });

module.exports = mongoose.model('ClubProfile', clubProfileSchema);