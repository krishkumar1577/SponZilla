const express = require('express');
const router = express.Router();
const proofOfWorkController = require('../controllers/proofOfWorkController');
const { verifyToken, isClub } = require('../middleware/auth');

// Submit a new Proof of Work report (Club only)
router.post('/submit', verifyToken, isClub, proofOfWorkController.submitReport);

// Get report for a specific event (Any authenticated user)
router.get('/event/:eventId', verifyToken, proofOfWorkController.getReportByEvent);

module.exports = router;
