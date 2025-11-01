import { NextResponse } from 'next/server';
import { env } from '@/env';

export async function GET() {
  return NextResponse.json({
    clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
    siteId: env.NEXT_PUBLIC_WIX_SITE_ID,
    baseUrl: env.NEXT_PUBLIC_BASE_URL,
    apiKeyExists: !!env.WIX_API_KEY,
    timestamp: new Date().toISOString(),
  });
}