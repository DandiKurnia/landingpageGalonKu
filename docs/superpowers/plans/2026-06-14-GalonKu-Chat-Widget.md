# GalonKu Chat Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate an AI Chat Assistant into the GalonKu Next.js landing page with a proxy API route, rate limiting, and a Modern Premium UI.

**Architecture:** A client-side React component (`ChatWidget.tsx`) communicates with a Next.js API route (`/api/chat/route.ts`). The API route performs rate limiting via Upstash Redis and securely proxies the request to a FastAPI backend, injecting the secret `FASTAPI_API_KEY`.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4, `@upstash/redis`, `@upstash/ratelimit`, `lucide-react`.

---

### Task 1: Setup Dependencies and Environment Variables

**Files:**
- Modify: `package.json`
- Modify: `.env.local` (or create if missing)

- [ ] **Step 1: Install Dependencies**

```bash
npm install @upstash/redis @upstash/ratelimit lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Add Environment Variables**

Add to `.env.local`:

```env
FASTAPI_BASE_URL=http://localhost:8000
FASTAPI_API_KEY=super_secret_key_galonku_2026
UPSTASH_REDIS_REST_URL="YOUR_UPSTASH_REDIS_REST_URL"
UPSTASH_REDIS_REST_TOKEN="YOUR_UPSTASH_REDIS_REST_TOKEN"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json .env.local
git commit -m "chore: install chat widget dependencies and add env vars"
```

---

### Task 2: Implement Next.js API Proxy Route

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: Create the API Route with Rate Limiting**

Create `app/api/chat/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Only initialize Ratelimit if UPSTASH vars are present to prevent crashes during local dev if missing
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = (redisUrl && redisToken) 
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 m'),
    })
  : null;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') || 'anonymous';
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json({ error: 'Terlalu banyak request. Coba lagi nanti.' }, { status: 429 });
      }
    }

    // 2. Parse request body
    const body = await req.json();
    const { message, session_id } = body;

    // 3. Validation
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'Pesan terlalu panjang (max 500 karakter)' }, { status: 400 });
    }

    // 4. Forward to FastAPI
    const fastApiUrl = process.env.FASTAPI_BASE_URL;
    const fastApiKey = process.env.FASTAPI_API_KEY;

    if (!fastApiUrl || !fastApiKey) {
      console.error('Missing FASTAPI env vars');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${fastApiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': fastApiKey, 
      },
      body: JSON.stringify({
        message: message,
        session_id: session_id
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Gagal menghubungi AI Assistant.' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 5. Return response
    return NextResponse.json(data);

  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/chat/route.ts
git commit -m "feat: add api/chat proxy route with upstash rate limiting"
```

---

### Task 3: Implement ChatWidget UI Component

**Files:**
- Create: `components/ChatWidget.tsx`

- [ ] **Step 1: Create the Client Component**

Create `components/ChatWidget.tsx`:

```tsx
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
          {/* Header */}
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

          {/* Messages Area */}
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

          {/* Input Form */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ChatWidget.tsx
git commit -m "feat: create ChatWidget UI component with Lucide icons"
```

---

### Task 4: Integrate ChatWidget into Landing Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add Component to Root Page**

Update `app/page.tsx` to include the `ChatWidget`:

```tsx
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Navbar from "@/components/layout/Navbar";
import Payments from "@/components/sections/Payments";
import Testimonials from "@/components/sections/Testimonials";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Payments />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: integrate ChatWidget into landing page"
```