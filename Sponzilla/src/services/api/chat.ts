import { apiRequest } from './base';

export interface Message {
  _id: string;
  sender: string;
  senderId?: string;
  recipient: string;
  recipientId?: string;
  content: string;
  read: boolean;
  eventId?: any;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  participants: any[];
  lastMessage: Message;
  updatedAt: string;
  eventId?: string;
  otherParticipant: {
    _id: string;
    name: string;
    role: string;
    profileImage?: string;
  };
  unreadCount: number;
}

export const chatAPI = {
  getConversations: (): Promise<{ success: boolean; conversations: Conversation[] }> =>
    apiRequest('/chat/conversations'),

  getMessages: (conversationId: string): Promise<{ success: boolean; messages: Message[] }> =>
    apiRequest(`/chat/messages/${conversationId}`),

  sendMessage: (data: { recipientId: string; content: string; eventId?: string }): Promise<{ success: boolean; message: Message }> =>
    apiRequest('/chat/send', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  markAsRead: (conversationId: string): Promise<{ success: boolean }> =>
    apiRequest(`/chat/read/${conversationId}`, {
      method: 'PUT',
    }),
};
