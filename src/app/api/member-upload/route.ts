import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const strapiUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';
  const token = process.env.STRAPI_API_TOKEN;

  const formData = await req.formData();

  const res = await fetch(`${strapiUrl}/api/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao fazer upload da foto.' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
