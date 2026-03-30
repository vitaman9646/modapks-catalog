import { NextResponse } from 'next/server';

const API_BASE = 'http://138.124.93.89:8000';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/api/categories`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
