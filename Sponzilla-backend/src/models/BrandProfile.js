
const mongoose = require('mongoose');

const brandProfileSchema = new mongoose.Schema({
  
  // Link to User account
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One profile per user
  },
  
  // Brand/Company name
  brandName: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  
  // Industry sector
  industry: {
    type: String,
    enum: ['technology', 'finance', 'education', 'healthcare', 'retail', 'fmcg', 'automobile', 'entertainment', 'other'],
    required: true
  },
  
  // About the brand
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 1000
  },
  
  // Brand logo URL
  logo: {
    type: String,
    default: null
  },
  
  // Company website
  website: {
    type: String,
    required: [true, 'Website is required']
  },
  
  // Company size
  companySize: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    required: true
  },
  
  // Sponsorship budget range
  budget: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  
  // Target audience
  targetAudience: [{
    type: String,
    enum: ['students', 'tech-enthusiasts', 'entrepreneurs', 'sports-fans', 'artists', 'general']
  }],
  
  // Interests (what they want to sponsor)
  interests: [{
    type: String,
    enum: ['hackathons', 'cultural-fests', 'sports-events', 'workshops', 'conferences', 'competitions', 'seminars']
  }],
  
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
    designation: {
      type: String,
      default: 'Marketing Manager'
    }
  },
  
  // Social media presence
  socialMedia: {
    linkedin: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
    facebook: {
      type: String,
      default: null
    }
  },
  
  // Previous sponsorships (will link later)
  sponsorshipHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SponsorshipRequest'
  }],
  
  // Is profile verified by admin?
  verified: {
    type: Boolean,
    default: false
  },
  
  // Statistics
  stats: {
    totalSponsorships: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    activePartnerships: {
      type: Number,
      default: 0
    }
  }
  
}, {
  timestamps: true
});

// Create index for faster searches
brandProfileSchema.index({ brandName: 'text', industry: 'text', description: 'text' });

module.exports = mongoose.model('BrandProfile', brandProfileSchema);