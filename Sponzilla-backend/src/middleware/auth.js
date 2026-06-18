const authService = require('../services/authService');
const User = require('../models/user');
const ClubProfile = require('../models/ClubProfile');
const BrandProfile = require('../models/BrandProfile');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided. Please login.'
      });
    }
    const token = authHeader.split(' ')[1];

    const decoded = authService.verifyToken(token);
    const user = await User.findById(decoded.userId).select('_id name email role verified isEmailVerified');

    if (!user) {
      return res.status(401).json({
        error: 'User not found. Please login again.'
      });
    }

    req.userId = user._id.toString();
    req.userRole = user.role;
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token. Please login again.'
    });
  }
};

const requireCompletedProfile = async (req, res, next) => {
  try {
    if (!req.user || req.user.role === 'admin') {
      return next();
    }

    const profileExists = req.user.role === 'club'
      ? await ClubProfile.exists({ userId: req.userId })
      : await BrandProfile.exists({ userId: req.userId });

    if (!profileExists) {
      return res.status(403).json({
        error: 'Profile incomplete. Please complete onboarding first.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to verify profile completion'
    });
  }
};

const isClub = (req, res, next) => {
  if (req.userRole !== 'club') {
    return res.status(403).json({ 
      error: 'Access denied. Only clubs can perform this action.' 
    });
  }
  next();
};

// Check if user is a brand
const isBrand = (req, res, next) => {
  if (req.userRole !== 'brand') {
    return res.status(403).json({ 
      error: 'Access denied. Only brands can perform this action.' 
    });
  }
  next();
};

// Check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ 
      error: 'Access denied. Only administrators can perform this action.' 
    });
  }
  next();
};

// Export middleware
module.exports = {
  verifyToken,
  requireCompletedProfile,
  isClub,
  isBrand,
  isAdmin
};
