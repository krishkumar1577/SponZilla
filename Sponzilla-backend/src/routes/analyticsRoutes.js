const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken } = require('../middleware/auth');

// All analytics routes require authentication
router.use(verifyToken);

// Club analytics (for club dashboard)
// Query params: ?clubId=xxx (admin only - to view specific club)
router.get('/club', analyticsController.getClubAnalytics);

// Brand analytics (for brand dashboard)
// Query params: ?brandId=xxx (admin only - to view specific brand)  
router.get('/brand', analyticsController.getBrandAnalytics);

// Event specific analytics
router.get('/event/:eventId', analyticsController.getEventAnalytics);

// Platform overview (admin only)
router.get('/platform', analyticsController.getPlatformAnalytics);

module.exports = router;