const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(verifyToken);
router.use(isAdmin);

// Overview Stats
router.get('/stats', adminController.getDashboardStats);

// Get Lists
router.get('/users', adminController.getUsers);
router.get('/clubs', adminController.getClubs);
router.get('/brands', adminController.getBrands);
router.get('/events', adminController.getEvents);
router.get('/sponsorships', adminController.getSponsorships);
router.get('/proof-of-work', adminController.getProofOfWork);

// Verification and Featuring
router.put('/clubs/:id/verify', adminController.toggleClubVerification);
router.put('/brands/:id/verify', adminController.toggleBrandVerification);
router.put('/events/:id/feature', adminController.toggleEventFeatured);

// Deletion
router.delete('/users/:id', adminController.deleteUser);
router.delete('/clubs/:id', adminController.deleteClub);
router.delete('/brands/:id', adminController.deleteBrand);

module.exports = router;
