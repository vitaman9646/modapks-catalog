import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'API Proxy is running',
    backend: 'http://138.124.93.89:8000'
  });
}
