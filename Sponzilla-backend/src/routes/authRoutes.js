const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes (no login required)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (login required)
router.get('/me', verifyToken, authController.getProfile);
router.put('/change-password', verifyToken, authController.changePassword);
router.put('/update-account', verifyToken, authController.updateAccount);
router.get('/settings', verifyToken, authController.getSettings);
router.put('/update-settings', verifyToken, authController.updateSettings);

module.exports = router;