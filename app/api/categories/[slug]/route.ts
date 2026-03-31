import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const per_page = searchParams.get('per_page') || '50';
  
  const response = await fetch(
    `http://api.modapks.org/api/categories/${params.slug}?page=${page}&per_page=${per_page}`
  );
  const data = await response.json();
  return NextResponse.json(data);
}
