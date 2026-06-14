'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Ada yang bisa dibantu seputar GalonKu?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Terjadi kesalahan');

      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.response || 'No response' }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-[350px] h-[500px] flex flex-col border border-white/40 overflow-hidden sm:w-[400px]">
          <div className="bg-primary text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-semibold text-lg tracking-tight">GalonKu Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn(
                  "max-w-[85%] p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-primary text-white self-end rounded-br-sm"
                    : "bg-white text-slate-800 border border-slate-100 self-start rounded-bl-sm"
              )}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white text-slate-800 border border-slate-100 p-3.5 rounded-2xl self-start shadow-sm flex gap-1 items-center rounded-bl-sm">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya seputar GalonKu..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-900 transition-all"
              disabled={isLoading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors flex items-center justify-center shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
