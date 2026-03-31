import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pkg = searchParams.get('package') || '';
  
  const response = await fetch(`http://api.modapks.org/api/app/${pkg}`);
  const data = await response.json();
  
  return NextResponse.json(data);
}
