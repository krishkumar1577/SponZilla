// ============================================
// EVENT ROUTES - src/routes/eventRoutes.js
// ============================================

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, isClub } = require('../middleware/auth');

// Public routes (no login required)
router.get('/featured', eventController.getFeaturedEvents);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/category/:category', eventController.getEventsByCategory);

// Protected routes (club only) - MUST come before /:id route
router.get('/my/events', verifyToken, isClub, eventController.getMyEvents);
router.post('/', verifyToken, isClub, eventController.createEvent);
router.put('/:id', verifyToken, isClub, eventController.updateEvent);
router.delete('/:id', verifyToken, isClub, eventController.deleteEvent);
router.put('/:id/publish', verifyToken, isClub, eventController.publishEvent);
router.get('/:id/stats', verifyToken, isClub, eventController.getEventStats);

// Public routes with :id parameter (MUST come last)
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;