const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');
const { verifyToken, isBrand, isClub } = require('../middleware/auth');

router.post('/apply', verifyToken, isBrand, sponsorshipController.createRequest);
router.get('/club-requests', verifyToken, isClub, sponsorshipController.getClubRequests);
router.get('/brand-requests', verifyToken, isBrand, sponsorshipController.getBrandRequests);
router.put('/status/:requestId', verifyToken, isClub, sponsorshipController.updateRequestStatus);
router.delete('/:requestId', verifyToken, isBrand, sponsorshipController.withdrawRequest);

module.exports = router;
