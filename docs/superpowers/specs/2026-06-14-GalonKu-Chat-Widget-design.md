# Design Spec: GalonKu Chat Widget Integration

**Date**: 2026-06-14
**Topic**: AI Chat Assistant Integration
**Status**: Draft

## 1. Overview
Integrating an AI Chat Assistant into the GalonKu landing page (`galonku.my.id`) using a Next.js API route as a proxy to a FastAPI backend. The widget will provide an interactive way for users to ask questions about the service.

## 2. Architecture & Data Flow
- **Client**: `ChatWidget.tsx` (React Client Component)
  - Fixed positioning (bottom-right).
  - Maintains local state for messages, input, loading status, and `session_id`.
  - Sends POST requests to Next.js API route `/api/chat`.
- **Proxy**: Next.js App Router (`app/api/chat/route.ts`)
  - Validates request (empty check, length limit).
  - Applies Rate Limiting (Upstash Redis).
  - Injects `FASTAPI_API_KEY` securely.
  - Forwards request to FastAPI backend.
  - Returns response to client.
- **Backend**: FastAPI (Hermes LLM) - Exists independently.

## 3. UI/UX Approach
- **Toggle Button**: Floating action button with a Lucide React chat icon (`MessageCircle`).
- **Chat Window**: 
  - Glassmorphism/Modern Premium styling to match the rest of the landing page.
  - Uses `lucide-react` for icons (Close, Send, etc.).
  - Auto-scrolls to the newest message.
  - Typing indicator (bouncing dots).
- **Styling**: Tailwind CSS classes matching the existing palette (`--color-primary`).

## 4. Security & Constraints
- **Rate Limiting**: Upstash Redis (10 requests / minute / IP).
- **Validation**: Client and Server-side message length limit (max 500 chars).
- **Secrets**: `FASTAPI_API_KEY` never exposed to the client. Error handling sanitizes backend errors.

## 5. Implementation Steps
1. **Dependencies**: Install `@upstash/redis`, `@upstash/ratelimit`, and `lucide-react`.
2. **Environment Variables**: Add `FASTAPI_BASE_URL`, `FASTAPI_API_KEY`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` to `.env.local`.
3. **API Route**: Create `app/api/chat/route.ts` implementing validation, Upstash rate limiting, and the secure proxy fetch.
4. **UI Component**: Create `components/ChatWidget.tsx` using Tailwind and Lucide icons.
5. **Integration**: Add `<ChatWidget />` to `app/page.tsx`.
