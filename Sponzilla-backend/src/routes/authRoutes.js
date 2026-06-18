const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per windowMs
  message: 'Too many login attempts, try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes (no login required)
router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/verify-email/:token', authController.verifyEmail);

// Google OAuth Routes
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);
router.post('/oauth/complete-signup', authController.completeOAuthSignup);

// GitHub OAuth Routes
router.get('/github', authController.githubLogin);
router.get('/github/callback', authController.githubCallback);

// Protected routes (login required)
router.get('/me', verifyToken, authController.getProfile);
router.put('/change-password', verifyToken, authController.changePassword);
router.put('/update-account', verifyToken, authController.updateAccount);
router.get('/settings', verifyToken, authController.getSettings);
router.put('/update-settings', verifyToken, authController.updateSettings);

module.exports = router;
