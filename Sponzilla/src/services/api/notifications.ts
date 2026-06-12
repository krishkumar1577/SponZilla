import { apiRequest } from './base';

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'sponsorship_bid' | 'sponsorship_update' | 'system';
  link?: string;
  read: boolean;
  createdAt: string;
}

export const notificationsAPI = {
  // Get all notifications for user
  getNotifications: () => 
    apiRequest<{ success: boolean; notifications: Notification[]; unreadCount: number }>('/notifications'),

  // Mark single notification as read
  markAsRead: (id: string) => 
    apiRequest<{ success: boolean; notification: Notification }>(`/notifications/${id}/read`, { method: 'PUT' }),

  // Mark all notifications as read
  markAllAsRead: () => 
    apiRequest<{ success: boolean; message: string }>('/notifications/read-all', { method: 'PUT' })
};
