import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Finley's AI assistant. Ask me anything about their work, skills, or experience." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);
      
      const stream = sendMessageStream(userMessage);
      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model' && lastMsg.isStreaming) {
            lastMsg.text = fullResponse;
          }
          return newMessages;
        });
      }

      // Finalize message
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg) {
            lastMsg.isStreaming = false;
        }
        return newMessages;
      });

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl border border-stone-100 overflow-hidden animate-fade-in-up origin-bottom-right">
          <div className="bg-stone-900 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-white font-medium text-sm">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-stone-50 space-y-4 no-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-stone-900 text-white rounded-br-none' 
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-stone-400 animate-pulse"/>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my design process..."
              className="flex-1 bg-stone-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-stone-900 text-white p-2 rounded-md hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-lg transition-all duration-300 flex items-center justify-center w-14 h-14 rounded-full ${isOpen ? 'bg-stone-200 text-stone-600 rotate-90' : 'bg-stone-900 text-white hover:scale-110'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;