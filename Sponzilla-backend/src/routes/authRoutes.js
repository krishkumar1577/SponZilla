const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Public routes (no login required)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (login required)
router.get('/me', verifyToken, authController.getProfile);

module.exports = router;