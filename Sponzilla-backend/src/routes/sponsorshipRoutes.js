const express = require('express');
const router = express.Router();
const sponsorshipController = require('../controllers/sponsorshipController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.post('/apply', sponsorshipController.createRequest);
router.get('/club-requests', sponsorshipController.getClubRequests);
router.get('/brand-requests', sponsorshipController.getBrandRequests);
router.put('/status/:requestId', sponsorshipController.updateRequestStatus);

module.exports = router;
