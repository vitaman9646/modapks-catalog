import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://api.modapks.org/api/stats');
  const data = await response.json();
  return NextResponse.json(data);
}
