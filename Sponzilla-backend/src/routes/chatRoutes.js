
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../middleware/auth');

// All chat routes require authentication
router.use(verifyToken);

router.get('/conversations', chatController.getConversations);
router.get('/messages/:conversationId', chatController.getMessages);
router.get('/unread-count', chatController.getUnreadCount);
router.post('/send', chatController.sendMessage);
router.put('/read/:conversationId', chatController.markAsRead);

module.exports = router;
