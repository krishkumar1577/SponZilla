const authService = require('../services/authService');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided. Please login.'
      });
    }
    const token = authHeader.split(' ')[1];

    const decoded = authService.verifyToken(token);

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token. Please login again.'
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

// Export middleware
module.exports = {
  verifyToken,
  isClub,
  isBrand
};
