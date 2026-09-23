import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// Mock data for messages
const mockConversations = [
  { id: '1', name: 'Dr. Sarah Jenkins', lastMessage: 'See you next Tuesday!', time: '10:30 AM', unread: 2, avatar: 'S' },
  { id: '2', name: 'Dr. Michael Chen', lastMessage: 'Please complete the assessment form.', time: 'Yesterday', unread: 0, avatar: 'M' },
];

const initialMessages = [
  { id: 1, text: 'Hello! I would like to schedule a follow-up.', sender: 'patient', time: '10:00 AM' },
  { id: 2, text: 'Hi! Of course. Does next Tuesday work for you?', sender: 'professional', time: '10:15 AM' },
  { id: 3, text: 'Yes, that works perfectly. What time?', sender: 'patient', time: '10:20 AM' },
  { id: 4, text: 'How about 2:00 PM?', sender: 'professional', time: '10:25 AM' },
  { id: 5, text: 'See you next Tuesday!', sender: 'professional', time: '10:30 AM' },
];

const Messages = () => {
  const { user } = useAuth();
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConv) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'patient',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] md:h-screen bg-gray-50 flex flex-col">
      <div className="bg-white flex h-full overflow-hidden w-full border-r border-gray-200">
        
        {/* Sidebar / Conversations List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto bg-white">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No active conversations.
              </div>
            ) : conversations.map(conv => (
              <div 
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={`p-4 border-b border-gray-50 flex items-center gap-3 cursor-pointer transition-colors ${
                  activeConv?.id === conv.id ? 'bg-emerald-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col bg-gray-50/50">
          {!activeConv ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
              <p>Select a conversation to start messaging</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {activeConv.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{activeConv.name}</h3>
                    <span className="text-xs text-emerald-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'patient' 
                          ? 'bg-emerald-600 text-white rounded-br-none' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Messages;
