import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'http://138.124.93.89:8000';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = `${API_BASE}/api/download?${searchParams.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Download failed');
    }
    
    const blob = await response.blob();
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
