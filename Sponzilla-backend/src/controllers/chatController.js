
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/user');

class ChatController {
  // Get all conversations for a user
  async getConversations(req, res) {
    try {
      const conversations = await Conversation.find({
        participants: req.userId
      })
      .populate('participants', 'name email role')
      .populate('lastMessage')
      .populate('eventId', 'title')
      .sort({ updatedAt: -1 });

      res.json({ success: true, conversations });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get messages for a specific conversation
  async getMessages(req, res) {
    try {
      const { conversationId } = req.params;
      
      // Verify user is part of conversation
      const conversation = await Conversation.findById(conversationId);
      if (!conversation || !conversation.participants.includes(req.userId)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const messages = await Message.find({ conversationId })
        .populate('senderId', 'name role')
        .sort({ createdAt: 1 });

      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Send a message (creates conversation if it doesn't exist)
  async sendMessage(req, res) {
    try {
      let { recipientId, content, eventId } = req.body;
      
      if (!recipientId || !content) {
        return res.status(400).json({ error: 'Recipient and content are required' });
      }

      // Check if recipientId is a Profile ID instead of a User ID
      const ClubProfile = require('../models/ClubProfile');
      const BrandProfile = require('../models/BrandProfile');
      
      const clubProfile = await ClubProfile.findById(recipientId);
      if (clubProfile) {
        recipientId = clubProfile.userId;
      } else {
        const brandProfile = await BrandProfile.findById(recipientId);
        if (brandProfile) {
          recipientId = brandProfile.userId;
        }
      }

      // Find or create conversation
      let conversation = await Conversation.findOne({
        participants: { $all: [req.userId, recipientId] },
        ...(eventId && { eventId })
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [req.userId, recipientId],
          eventId: eventId || null
        });
      }

      // Create message
      const message = await Message.create({
        conversationId: conversation._id,
        senderId: req.userId,
        content
      });

      // Update conversation with last message
      conversation.lastMessage = message._id;
      await conversation.save();

      res.status(201).json({ success: true, message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Mark messages as read
  async markAsRead(req, res) {
    try {
      const { conversationId } = req.params;
      await Message.updateMany(
        { conversationId, senderId: { $ne: req.userId }, isRead: false },
        { isRead: true }
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get total unread count for user
  async getUnreadCount(req, res) {
    try {
      // Find all conversations user is part of
      const conversations = await Conversation.find({
        participants: req.userId
      });
      
      const conversationIds = conversations.map(c => c._id);
      
      // Count unread messages in those conversations where user is NOT the sender
      const count = await Message.countDocuments({
        conversationId: { $in: conversationIds },
        senderId: { $ne: req.userId },
        isRead: false
      });
      
      res.json({ success: true, count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ChatController();
