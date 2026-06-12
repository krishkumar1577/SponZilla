import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useUser } from './UserContext';
import { chatAPI, notificationsAPI, type Notification } from '../services/api';

interface NotificationContextType {
  unreadMessageCount: number;
  unreadSystemCount: number;
  notifications: Notification[];
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useUser();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [unreadSystemCount, setUnreadSystemCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const prevMessageCountRef = useRef(0);
  const prevSystemCountRef = useRef(0);

  const refreshNotifications = async () => {
    if (!isAuthenticated) return;
    
    try {
      // 1. Fetch chat unread count
      const chatResponse = await chatAPI.getUnreadCount();
      if (chatResponse.success) {
        if (chatResponse.count > prevMessageCountRef.current) {
          toast.success('New message received!', {
            icon: '💬',
            duration: 4000,
            position: 'bottom-right',
          });
        }
        setUnreadMessageCount(chatResponse.count);
        prevMessageCountRef.current = chatResponse.count;
      }

      // 2. Fetch system notifications
      const notifResponse = await notificationsAPI.getNotifications();
      if (notifResponse.success) {
        if (notifResponse.unreadCount > prevSystemCountRef.current) {
          toast.success('New notification!', {
            icon: '🔔',
            duration: 4000,
            position: 'bottom-right',
          });
        }
        setNotifications(notifResponse.notifications);
        setUnreadSystemCount(notifResponse.unreadCount);
        prevSystemCountRef.current = notifResponse.unreadCount;
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await notificationsAPI.markAsRead(id);
      if (res.success) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        setUnreadSystemCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await notificationsAPI.markAllAsRead();
      if (res.success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadSystemCount(0);
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Poll for new messages/notifications every 15 seconds
  useEffect(() => {
    let interval: any;

    if (isAuthenticated) {
      refreshNotifications();
      interval = setInterval(refreshNotifications, 15000);
    } else {
      setUnreadMessageCount(0);
      setUnreadSystemCount(0);
      setNotifications([]);
      prevMessageCountRef.current = 0;
      prevSystemCountRef.current = 0;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated, user?.id]);

  return (
    <NotificationContext.Provider 
      value={{ 
        unreadMessageCount, 
        unreadSystemCount, 
        notifications, 
        refreshNotifications,
        markAsRead,
        markAllAsRead
      }}
    >
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
