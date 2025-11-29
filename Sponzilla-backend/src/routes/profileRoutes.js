
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { verifyToken, isClub, isBrand } = require('../middleware/auth');

// Public routes (no login required)
router.get('/clubs', profileController.getAllClubs);
router.get('/clubs/:id', profileController.getClubById);
router.get('/brands', profileController.getAllBrands);
router.get('/brands/:id', profileController.getBrandById);

// Protected routes (login required)
router.get('/me', verifyToken, profileController.getMyProfile);

// Club-only routes
router.post('/club', verifyToken, isClub, profileController.createClubProfile);
router.put('/club', verifyToken, isClub, profileController.updateClubProfile);

// Brand-only routes
router.post('/brand', verifyToken, isBrand, profileController.createBrandProfile);
router.put('/brand', verifyToken, isBrand, profileController.updateBrandProfile);

module.exports = router;