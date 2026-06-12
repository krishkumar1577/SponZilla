const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/auth');

// All notification routes require authentication
router.use(verifyToken);

router.get('/', notificationController.getNotifications);
router.put('/read-all', notificationController.markAllAsRead);
router.put('/:notificationId/read', notificationController.markAsRead);

module.exports = router;
