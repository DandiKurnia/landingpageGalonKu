import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let ratelimit: Ratelimit | null = null;

try {
  const redis = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
  });
  ratelimit = new Ratelimit({
    redis: redis as any,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    analytics: false,
  });
} catch (err) {
  console.warn('Redis connection failed, rate limiting disabled:', err);
}

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
