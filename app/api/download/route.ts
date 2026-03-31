import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get('package') || '';
  const version = searchParams.get('version') || '';
  
  // Прокси редирект на реальный download
  const downloadUrl = `http://api.modapks.org/api/download?package=${packageName}&version=${version}`;
  return NextResponse.redirect(downloadUrl);
}
