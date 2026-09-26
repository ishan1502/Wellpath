import React, { useState, useEffect } from 'react';
import { Send, Search, Phone, Video, MoreVertical, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { messageService } from '../../services/messageService';

const Messages = () => {
  const { user } = useAuth();
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    loadConversations();

    const subscription = messageService.subscribeToMessages((payload) => {
      const newMsg = payload.new;
      if (activeConv && newMsg.conversation_id === activeConv.id) {
        setMessages((prev) => [...prev, newMsg]);
      } else {
        // Optionally update conversation list for unread count
        loadConversations();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, activeConv]);

  const loadConversations = async () => {
    if (!user) return;
    try {
      const data = await messageService.getConversations(user.id, 'patient');
      const formattedConvs = data.map((conv: any) => {
        const msgs = conv.messages || [];
        const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
        return {
          id: conv.id,
          name: 'Professional User', // Placeholder since we don't have profile join
          avatar: 'P',
          lastMessage: lastMsg ? lastMsg.content : 'No messages yet',
          time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          unread: 0, // Placeholder
        };
      });
      setConversations(formattedConvs);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const loadMessages = async (convId: string) => {
    try {
      const data = await messageService.getMessages(convId);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleConvSelect = (conv: any) => {
    setActiveConv(conv);
    loadMessages(conv.id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConv || !user) return;

    try {
      await messageService.sendMessage(activeConv.id, user.id, newMessage);
      // The real-time subscription will append the message to the list
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] md:h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex overflow-hidden border-0 font-sans text-emerald-900 animate-fade-in">
      
      {/* Sidebar / Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col flex-shrink-0 bg-gray-50/30">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h2 className="text-2xl font-extrabold mb-5">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600/50 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium text-sm outline-none"
            />
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-emerald-700/60 text-sm font-medium">
              No active conversations.
            </div>
          ) : conversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => handleConvSelect(conv)}
              className={`p-5 border-b border-gray-100 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                activeConv?.id === conv.id ? 'bg-emerald-50' : 'hover:bg-gray-50 bg-white'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold text-xl flex-shrink-0 shadow-sm">
                {conv.avatar}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold truncate">{conv.name}</h3>
                  <span className="text-[11px] font-bold text-emerald-600/60 flex-shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`text-sm truncate font-medium ${conv.unread > 0 ? 'text-emerald-900' : 'text-emerald-700/60'}`}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-sm">
                  {conv.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col bg-white">
        {!activeConv ? (
          <div className="flex-1 flex flex-col items-center justify-center text-emerald-900/40">
            <MessageSquare className="w-16 h-16 mb-6 opacity-30" />
            <p className="font-bold text-lg">Select a conversation to start messaging</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-5 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold text-lg shadow-sm">
                  {activeConv.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{activeConv.name}</h3>
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Online
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-3 text-gray-400 hover:bg-gray-100 rounded-2xl transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {messages.map(msg => {
                const isMine = msg.sender_id === user?.id;
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] px-5 py-3.5 shadow-sm font-medium text-sm ${
                        isMine 
                          ? 'bg-emerald-600 text-white rounded-2xl rounded-tr-sm' 
                          : 'bg-white border border-gray-100 text-emerald-900 rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.content || msg.text}</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600/50 mt-1.5 px-1">
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default Messages;
