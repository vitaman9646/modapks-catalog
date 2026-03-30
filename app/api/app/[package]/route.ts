import { NextResponse } from 'next/server';

const API_BASE = 'http://138.124.93.89:8000';

export async function GET(
  request: Request,
  context: { params: Promise<{ package: string }> }
) {
  const params = await context.params;
  const packageName = params.package;
  const url = `${API_BASE}/api/app/${packageName}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
