import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'http://138.124.93.89:8000';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const slug = params.slug;
  const searchParams = request.nextUrl.searchParams;
  const url = `${API_BASE}/api/categories/${slug}?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
