import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  
  const response = await fetch(`http://api.modapks.org/api/top?limit=${limit}`);
  const data = await response.json();
  return NextResponse.json(data);
}
