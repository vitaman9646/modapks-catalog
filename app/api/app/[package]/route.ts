import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { package: string } }
) {
  const packageName = params.package;
  
  const response = await fetch(`http://api.modapks.org/api/app/${packageName}`);
  const data = await response.json();
  return NextResponse.json(data);
}
