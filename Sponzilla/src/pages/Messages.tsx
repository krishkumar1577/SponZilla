
import React, { useState, useEffect, useRef } from 'react';
import { SmartNavbar } from '../components/layout/Navbar';
import { chatAPI, type Conversation, type Message } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { useNotifications } from '../contexts/NotificationContext';

const Messages: React.FC = () => {
  const { user } = useUser();
  const { refreshUnreadCount } = useNotifications();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations();
      setConversations(response.conversations);
      if (response.conversations.length > 0 && !selectedConversation) {
        setSelectedConversation(response.conversations[0]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setMessagesLoading(true);
      const response = await chatAPI.getMessages(conversationId);
      setMessages(response.messages);
      await chatAPI.markAsRead(conversationId);
      refreshUnreadCount();
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user || isSending) return;

    const recipient = selectedConversation.participants.find(p => p._id !== user.id);
    if (!recipient) return;

    try {
      setIsSending(true);
      const response = await chatAPI.sendMessage({
        recipientId: recipient._id,
        content: newMessage,
        eventId: selectedConversation.eventId?._id
      });
      setMessages([...messages, response.message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const getRecipientName = (conversation: Conversation) => {
    if (!user) return 'User';
    return conversation.participants.find(p => p._id !== user.id)?.name || 'Unknown';
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-[#f0f3f4] flex flex-col">
            <div className="p-4 border-b border-[#f0f3f4]">
              <h2 className="text-[#111518] text-xl font-bold">Messages</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-[#617989]">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-[#617989]">No conversations yet</div>
              ) : (
                conversations.map((conv) => (
                  <div 
                    key={conv._id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors border-b border-[#f0f3f4] ${selectedConversation?._id === conv._id ? 'bg-[#f0f3f4]' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-[#111518]">{getRecipientName(conv)}</span>
                      <span className="text-xs text-[#617989]">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#617989] truncate">
                      {conv.lastMessage?.content || 'No messages yet'}
                    </p>
                    {conv.eventId && (
                      <span className="mt-1 inline-block text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                        Event: {conv.eventId.title}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-[#f0f3f4] flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                      {getRecipientName(selectedConversation).charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111518]">{getRecipientName(selectedConversation)}</h3>
                      {selectedConversation.eventId && (
                        <p className="text-xs text-[#617989]">Topic: {selectedConversation.eventId.title}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messagesLoading ? (
                    <div className="text-center py-4 text-[#617989]">Loading messages...</div>
                  ) : (
                    messages.map((msg) => {
                      // Robust check if message was sent by the current user
                      const isMe = msg.senderId && (typeof msg.senderId === 'string' 
                        ? msg.senderId === user?.id 
                        : msg.senderId._id === user?.id);
                        
                      return (
                        <div 
                          key={msg._id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[75%] p-3 px-4 rounded-2xl shadow-sm ${
                            isMe 
                              ? 'bg-blue-600 text-white rounded-br-none' 
                              : 'bg-white text-[#111518] border border-[#f0f3f4] rounded-bl-none'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            <p className={`text-[10px] mt-1.5 font-medium opacity-70 ${isMe ? 'text-right' : 'text-left'}`}>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#f0f3f4] flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-[#dbe1e6] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                    className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.94-95.89a16,16,0,0,0,0-28ZM56,224l30-88h82a8,8,0,0,0,0-16H86L56,32l168,96Z"></path>
                    </svg>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[#617989]">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM216,192H82.5a16,16,0,0,0-10.25,3.78.69.69,0,0,0-.13.11L40,224V64H216V192Z"></path>
                  </svg>
                </div>
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
