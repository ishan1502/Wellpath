import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi! I'm Wellpath Bot. How can I help you today? You can ask me about finding a professional, booking a session, pricing, or jobs.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Process rule-based response
    setTimeout(() => {
      let botResponse = "I'm sorry, I didn't understand that. Could you try asking about finding a professional, booking, pricing, or jobs?";
      const lowerInput = userMessage.text.toLowerCase();

      if (lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('appointment')) {
        botResponse = "To book a session, please sign up or log in, then browse our professionals. You can select a time slot on their profile page.";
      } else if (lowerInput.includes('find') || lowerInput.includes('search') || lowerInput.includes('professional')) {
        botResponse = "You can find professionals by browsing our directory. Use filters for specialty, language, and availability to find the right match.";
      } else if (lowerInput.includes('price') || lowerInput.includes('pricing') || lowerInput.includes('cost')) {
        botResponse = "Pricing varies by professional. Each professional lists their session rates on their profile page.";
      } else if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('internship') || lowerInput.includes('work') || lowerInput.includes('opportunity')) {
        botResponse = "Check out our Jobs & Internships board for mental health opportunities! You can also post your own openings if you're a professional. Visit the 'Jobs & Internships' link in the navigation.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello there! How can I assist you with Wellpath today?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right" style={{ height: '450px' }}>
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Wellpath Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white transition-colors p-1 hover:bg-emerald-700 rounded-md"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${msg.sender === 'user' ? 'bg-emerald-100 ml-2' : 'bg-white shadow-sm mr-2'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-emerald-700" /> : <Bot className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div 
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-full pr-1 pl-4 py-1 border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:outline-none py-2 text-sm text-gray-700"
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  inputText.trim() 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0 opacity-0 hidden' : 'scale-100 opacity-100'} transition-all duration-300 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-emerald-500/50`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

export default ChatBot;
