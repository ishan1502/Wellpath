import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../../services/aiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi! I'm Wellpath's AI Assistant. How can I help you today? You can ask me about finding a professional, booking a session, pricing, or jobs.",
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
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userText = inputText.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    try {
      let botResponse = '';
      
      if (aiService.isConfigured()) {
        const history = messages
          .filter(m => m.id !== 'welcome')
          .map(m => ({
            role: m.sender === 'user' ? ('user' as const) : ('model' as const),
            parts: [{ text: m.text }]
          }));
          
        botResponse = await aiService.getChatResponse(userText, history);
      } else {
        // Fallback rule-based response
        botResponse = "I'm sorry, I'm currently running in limited mode. Could you try asking about finding a professional, booking, pricing, or jobs?";
        const lowerInput = userText.toLowerCase();

        if (lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('appointment')) {
          botResponse = "To book a session, please sign up or log in, then browse our professionals. You can select a time slot on their profile page.";
        } else if (lowerInput.includes('find') || lowerInput.includes('search') || lowerInput.includes('professional')) {
          botResponse = "You can find professionals by browsing our directory. Use filters for specialty, language, and availability to find the right match.";
        } else if (lowerInput.includes('price') || lowerInput.includes('pricing') || lowerInput.includes('cost')) {
          botResponse = "Pricing varies by professional. Each professional lists their session rates on their profile page.";
        } else if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('internship')) {
          botResponse = "Check out our Jobs & Internships board for mental health opportunities! Visit the 'Jobs' link in the navigation.";
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
          botResponse = "Hello there! How can I assist you with Wellpath today?";
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error?.message || 'Unknown error occurred'}`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-surface rounded-xl shadow-lg border border-border w-80 sm:w-96 mb-4 overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right" style={{ height: '450px' }}>
          {/* Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Wellpath Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-primary-muted hover:text-white transition-colors p-1 hover:bg-primary-hover rounded-md"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-background flex flex-col space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${msg.sender === 'user' ? 'bg-primary-muted ml-2' : 'bg-surface shadow-sm mr-2'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-primary-hover" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div 
                    className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-surface text-foreground shadow-sm border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap flex flex-col space-y-2">
                      {msg.sender === 'user' ? (
                        <p>{msg.text}</p>
                      ) : (
                        <ReactMarkdown 
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-primary underline" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      )}
                    </div>
                    <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-primary-muted' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] flex-row">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-surface shadow-sm mr-2">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-3 rounded-lg bg-surface text-foreground shadow-sm border border-gray-100 rounded-tl-none flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface border-t border-border">
            <div className="flex items-center bg-surface-hover rounded-full pr-1 pl-4 py-1 border border-border focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 bg-transparent border-none focus:outline-none py-2 text-sm text-gray-700 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isTyping}
                className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                  inputText.trim() && !isTyping
                    ? 'bg-primary text-white hover:bg-primary-hover shadow-sm' 
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
        className={`${isOpen ? 'scale-0 opacity-0 hidden' : 'scale-100 opacity-100'} transition-all duration-300 bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-md hover:shadow-lg flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-ring/50`}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

export default ChatBot;
