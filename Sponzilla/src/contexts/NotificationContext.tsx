import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useUser } from './UserContext';
import { chatAPI } from '../services/api';

interface NotificationContextType {
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useUser();
  const [unreadCount, setUnreadCount] = useState(0);
  const prevCountRef = useRef(0);

  const refreshUnreadCount = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await chatAPI.getUnreadCount();
      if (response.success) {
        if (response.count > prevCountRef.current) {
          // New message received!
          toast.success('New message received!', {
            icon: '💬',
            duration: 4000,
            position: 'bottom-right',
          });
        }
        setUnreadCount(response.count);
        prevCountRef.current = response.count;
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  // Poll for new messages every 15 seconds
  useEffect(() => {
    let interval: any;

    if (isAuthenticated) {
      refreshUnreadCount();
      interval = setInterval(refreshUnreadCount, 15000);
    } else {
      setUnreadCount(0);
      prevCountRef.current = 0;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated, user?.id]);

  return (
    <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount }}>
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
