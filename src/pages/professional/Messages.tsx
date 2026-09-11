import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, Send, User, MessageSquare } from 'lucide-react';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Thank you for the session.', time: '10:30 AM', unread: 0 },
    { id: 2, name: 'Alice Smith', lastMessage: 'See you next week!', time: 'Yesterday', unread: 2 },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
      </div>

      <Card className="flex-1 flex overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 border-r border-border flex flex-col bg-white">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                className={`flex items-center p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === chat.id ? 'bg-primary/5' : ''}`}
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-3 relative">
                  <User className="h-5 w-5" />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-[10px] text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedChat ? (
            <>
              <div className="p-4 bg-white border-b border-border flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </h3>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white border border-border p-3 rounded-lg rounded-tl-none max-w-[75%] shadow-sm">
                    <p className="text-sm text-gray-800">Hello, I have a question regarding our last session.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">10:25 AM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none max-w-[75%] shadow-sm">
                    <p className="text-sm">Of course! What would you like to know?</p>
                    <span className="text-[10px] text-primary-light mt-1 block text-right">10:28 AM</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-border">
                <form 
                  onSubmit={(e) => { e.preventDefault(); if(message.trim()) setMessage(''); }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex-shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MessageSquare className="h-12 w-12 mb-2 text-gray-300" />
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
