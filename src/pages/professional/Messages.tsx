import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, Send, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { messageService } from '../../services/messageService';

export default function Messages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    loadConversations();

    const subscription = messageService.subscribeToMessages((payload) => {
      const newMsg = payload.new;
      if (selectedChat && newMsg.conversation_id === selectedChat.id) {
        setMessages((prev) => [...prev, newMsg]);
      } else {
        loadConversations();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, selectedChat]);

  const loadConversations = async () => {
    if (!user) return;
    try {
      const data = await messageService.getConversations(user.id, 'professional');
      const formattedConvs = data.map((conv: any) => {
        const msgs = conv.messages || [];
        const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
        return {
          id: conv.id,
          name: 'Patient User', 
          lastMessage: lastMsg ? lastMsg.content : 'No messages yet',
          time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          unread: 0,
        };
      });
      setChats(formattedConvs);
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

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
    loadMessages(chat.id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat || !user) return;

    try {
      await messageService.sendMessage(selectedChat.id, user.id, message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-950 tracking-tight">Messages</h1>
        <p className="text-emerald-700/80 mt-1 font-medium">Communicate securely with your patients.</p>
      </div>

      <Card className="flex-1 flex overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-0 bg-white">
        {/* Chat List */}
        <div className="w-1/3 border-r border-emerald-100 flex flex-col bg-white">
          <div className="p-5 border-b border-emerald-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-600" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-11 pr-4 py-3 border-0 bg-emerald-50/50 rounded-2xl text-sm text-emerald-950 placeholder:text-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => handleChatSelect(chat)}
                className={`flex items-center p-5 border-b border-emerald-50 cursor-pointer transition-all duration-300 ${selectedChat?.id === chat.id ? 'bg-emerald-50/50 border-l-4 border-l-emerald-600' : 'hover:bg-emerald-50/30 border-l-4 border-l-transparent'}`}
              >
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mr-4 relative shadow-sm">
                  <User className="h-6 w-6" />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <h3 className={`text-sm font-bold truncate ${selectedChat?.id === chat.id ? 'text-emerald-950' : 'text-emerald-900'}`}>{chat.name}</h3>
                    <span className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-wider">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate font-medium ${selectedChat?.id === chat.id ? 'text-emerald-800/80' : 'text-emerald-700/60'}`}>{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-emerald-50/30">
          {selectedChat ? (
            <>
              <div className="p-5 bg-white border-b border-emerald-100 flex items-center shadow-sm z-10">
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mr-4 shadow-sm">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    {selectedChat.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-xs font-bold text-emerald-600">Online</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map(msg => {
                  const isMine = msg.sender_id === user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${isMine ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' : 'bg-white border border-emerald-100 text-emerald-950 rounded-tl-none shadow-sm'} p-4 rounded-2xl max-w-[75%]`}>
                        <p className="text-sm font-medium">{msg.content || msg.text}</p>
                        <span className={`text-[10px] font-bold ${isMine ? 'text-emerald-200' : 'text-emerald-600/60'} mt-2 block ${isMine ? 'text-right' : ''} uppercase tracking-wider`}>
                          {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 bg-white border-t border-emerald-100">
                <form 
                  onSubmit={handleSend}
                  className="flex gap-3"
                >
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 px-5 py-3 border-0 bg-emerald-50/50 rounded-2xl text-sm text-emerald-950 placeholder:text-emerald-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                  <button 
                    type="submit"
                    className="p-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md active:scale-95"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-emerald-600/50">
              <div className="p-6 bg-emerald-100/50 rounded-full mb-4">
                <MessageSquare className="h-12 w-12 text-emerald-300" />
              </div>
              <p className="font-bold text-emerald-800/60">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
