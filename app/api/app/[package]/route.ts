import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ package: string }> }
) {
  const params = await context.params;
  const packageName = params.package;
  
  const response = await fetch(`http://api.modapks.org/api/app/${packageName}`);
  const data = await response.json();
  return NextResponse.json(data);
}
