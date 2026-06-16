const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');
const DOMPurify = require('isomorphic-dompurify');
const Joi = require('joi');

// Utility function to escape regex special characters
const escapeRegex = (string) => {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// Validation schemas
const clubProfileSchema = Joi.object({
  clubName: Joi.string().required().min(3).max(100),
  university: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(1000),
  category: Joi.string().valid('technical', 'cultural', 'sports', 'social', 'entrepreneurship', 'other').required(),
  memberCount: Joi.number().min(0).default(0),
  contactPerson: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  }).required()
});

const brandProfileSchema = Joi.object({
  brandName: Joi.string().required().min(3).max(100),
  industry: Joi.string().required(),
  description: Joi.string().required().min(10).max(1000),
  website: Joi.string().uri().required(),
  companySize: Joi.string().valid('startup', 'small', 'medium', 'large', 'enterprise').required(),
  contactPerson: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
  }).required()
});


class ProfileController {
  
  // ===== CREATE CLUB PROFILE =====
  async createClubProfile(req, res) {
    try {
      // Validate input
      const { error, value } = clubProfileSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if profile already exists
      const existingProfile = await ClubProfile.findOne({ userId: req.userId });
      if (existingProfile) {
        return res.status(400).json({
          error: 'Profile already exists. Use update instead.'
        });
      }

      // Sanitize user inputs
      const sanitizedData = {
        userId: req.userId,
        clubName: DOMPurify.sanitize(value.clubName),
        description: DOMPurify.sanitize(value.description),
        achievements: value.achievements ? value.achievements.map(a => DOMPurify.sanitize(a)) : [],
        ...value
      };

      // Create profile
      const profile = await ClubProfile.create(sanitizedData);

      res.status(201).json({
        message: 'Club profile created successfully',
        profile
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // ===== CREATE BRAND PROFILE =====
  async createBrandProfile(req, res) {
    try {
      // Validate input
      const { error, value } = brandProfileSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if profile already exists
      const existingProfile = await BrandProfile.findOne({ userId: req.userId });
      if (existingProfile) {
        return res.status(400).json({
          error: 'Profile already exists. Use update instead.'
        });
      }

      // Sanitize user inputs
      const sanitizedData = {
        userId: req.userId,
        brandName: DOMPurify.sanitize(value.brandName),
        description: DOMPurify.sanitize(value.description),
        ...value
      };

      // Create profile
      const profile = await BrandProfile.create(sanitizedData);

      res.status(201).json({
        message: 'Brand profile created successfully',
        profile
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // ===== GET MY PROFILE =====
  async getMyProfile(req, res) {
    try {
      let profile;
      
      // Check user role to determine which profile to fetch
      if (req.userRole === 'club') {
        profile = await ClubProfile.findOne({ userId: req.userId })
          .populate('userId', 'name email');
      } else if (req.userRole === 'brand') {
        profile = await BrandProfile.findOne({ userId: req.userId })
          .populate('userId', 'name email');
      }
      
      if (!profile) {
        return res.json({ 
          success: true,
          profileExists: false,
          profile: null
        });
      }
      
      res.json({ success: true, profileExists: true, profile });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // ===== UPDATE CLUB PROFILE =====
  async updateClubProfile(req, res) {
    try {
      // Sanitize user inputs
      const sanitizedData = {
        ...req.body
      };
      if (req.body.clubName) sanitizedData.clubName = DOMPurify.sanitize(req.body.clubName);
      if (req.body.description) sanitizedData.description = DOMPurify.sanitize(req.body.description);
      if (req.body.achievements) sanitizedData.achievements = req.body.achievements.map(a => DOMPurify.sanitize(a));

      const profile = await ClubProfile.findOneAndUpdate(
        { userId: req.userId },
        sanitizedData,
        { new: true, runValidators: true }
      );

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        profile
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // ===== UPDATE BRAND PROFILE =====
  async updateBrandProfile(req, res) {
    try {
      // Sanitize user inputs
      const sanitizedData = {
        ...req.body
      };
      if (req.body.brandName) sanitizedData.brandName = DOMPurify.sanitize(req.body.brandName);
      if (req.body.description) sanitizedData.description = DOMPurify.sanitize(req.body.description);

      const profile = await BrandProfile.findOneAndUpdate(
        { userId: req.userId },
        sanitizedData,
        { new: true, runValidators: true }
      );

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        profile
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // ===== GET ALL CLUBS (PUBLIC) =====
  async getAllClubs(req, res) {
    try {
      const { category, university, search, page = 1, limit = 10 } = req.query;

      // Build filter
      const filter = {};
      if (category) filter.category = category;
      if (university) filter.university = new RegExp(escapeRegex(university), 'i');
      if (search) {
        filter.$text = { $search: search };
      }
      
      // Pagination
      const skip = (page - 1) * limit;
      
      const clubs = await ClubProfile.find(filter)
        .populate('userId', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      
      const total = await ClubProfile.countDocuments(filter);
      
      res.json({
        clubs,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // ===== GET ALL BRANDS (PUBLIC) =====
  async getAllBrands(req, res) {
    try {
      const { industry, search, page = 1, limit = 10 } = req.query;

      // Build filter
      const filter = {};
      if (industry) filter.industry = industry;
      if (search) {
        filter.$or = [
          { brandName: new RegExp(escapeRegex(search), 'i') },
          { industry: new RegExp(escapeRegex(search), 'i') }
        ];
      }
      
      // Pagination
      const skip = (page - 1) * limit;
      
      const brands = await BrandProfile.find(filter)
        .populate('userId', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      
      const total = await BrandProfile.countDocuments(filter);
      
      res.json({
        brands,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // ===== GET CLUB BY ID (PUBLIC) =====
  async getClubById(req, res) {
    try {
      const profile = await ClubProfile.findById(req.params.id)
        .populate('userId', 'name email');
      
      if (!profile) {
        return res.status(404).json({ error: 'Club not found' });
      }
      
      res.json({ profile });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // ===== GET BRAND BY ID (PUBLIC) =====
  async getBrandById(req, res) {
    try {
      const profile = await BrandProfile.findById(req.params.id)
        .populate('userId', 'name email');
      
      if (!profile) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      
      res.json({ profile });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProfileController();