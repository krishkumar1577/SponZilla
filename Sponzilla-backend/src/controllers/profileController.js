const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');


class ProfileController {
  
  // ===== CREATE CLUB PROFILE =====
  async createClubProfile(req, res) {
    try {
      // Check if profile already exists
      const existingProfile = await ClubProfile.findOne({ userId: req.userId });
      if (existingProfile) {
        return res.status(400).json({ 
          error: 'Profile already exists. Use update instead.' 
        });
      }
      
      // Create profile
      const profile = await ClubProfile.create({
        userId: req.userId,
        ...req.body
      });
      
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
      // Check if profile already exists
      const existingProfile = await BrandProfile.findOne({ userId: req.userId });
      if (existingProfile) {
        return res.status(400).json({ 
          error: 'Profile already exists. Use update instead.' 
        });
      }
      
      // Create profile
      const profile = await BrandProfile.create({
        userId: req.userId,
        ...req.body
      });
      
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
        return res.status(404).json({ 
          error: 'Profile not found. Please create one first.' 
        });
      }
      
      res.json({ profile });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // ===== UPDATE CLUB PROFILE =====
  async updateClubProfile(req, res) {
    try {
      const profile = await ClubProfile.findOneAndUpdate(
        { userId: req.userId },
        req.body,
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
      const profile = await BrandProfile.findOneAndUpdate(
        { userId: req.userId },
        req.body,
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
      if (university) filter.university = new RegExp(university, 'i');
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
        filter.$text = { $search: search };
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