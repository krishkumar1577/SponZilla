const express = require('express');
const router = express.Router();
const proofOfWorkController = require('../controllers/proofOfWorkController');
const { verifyToken, isClub, isBrand } = require('../middleware/auth');

// Get all active escrows for the logged-in user (club or brand)
router.get('/my-escrows', verifyToken, proofOfWorkController.getMyEscrows);

// Get escrow details by sponsorship request ID
router.get('/sponsorship/:sponsorshipId', verifyToken, proofOfWorkController.getEscrowBySponsorship);

// Submit evidence for a milestone (Club only)
router.post('/:id/milestones/:milestoneId/submit', verifyToken, isClub, proofOfWorkController.submitMilestoneEvidence);

// Verify or reject evidence for a milestone (Brand only)
router.post('/:id/milestones/:milestoneId/verify', verifyToken, isBrand, proofOfWorkController.verifyMilestone);

module.exports = router;
