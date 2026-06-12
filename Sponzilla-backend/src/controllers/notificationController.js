const Notification = require('../models/Notification');

class NotificationController {
  // Get all notifications for the logged-in user
  async getNotifications(req, res) {
    try {
      const notifications = await Notification.find({ userId: req.userId })
        .sort({ createdAt: -1 })
        .limit(50); // Fetch latest 50 notifications
        
      const unreadCount = await Notification.countDocuments({ userId: req.userId, read: false });
        
      res.json({ success: true, notifications, unreadCount });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  }

  // Mark a single notification as read
  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId: req.userId },
        { read: true },
        { new: true }
      );
      
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      
      res.json({ success: true, notification });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  }

  // Mark all notifications as read for the user
  async markAllAsRead(req, res) {
    try {
      await Notification.updateMany(
        { userId: req.userId, read: false },
        { read: true }
      );
      
      res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      res.status(500).json({ error: 'Failed to mark all notifications as read' });
    }
  }
}

module.exports = new NotificationController();
