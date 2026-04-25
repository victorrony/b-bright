import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN;

const headers: Record<string, string> = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

// GET /api/member-profile?email=xxx
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: 'Email obrigatório.' }, { status: 400 });
  }

  const url = `${STRAPI_URL}/api/members?filters[email][$eqi]=${encodeURIComponent(email)}&populate=photo`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao procurar membro.' }, { status: res.status });
  }

  const json = await res.json();
  const member = json?.data?.[0] ?? null;

  if (!member) {
    return NextResponse.json({ error: 'Nenhum registo encontrado com esse email.' }, { status: 404 });
  }

  return NextResponse.json({ data: member });
}

// PUT /api/member-profile — update member fields
export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { documentId, ...fields } = body ?? {};

  if (!documentId) {
    return NextResponse.json({ error: 'documentId obrigatório.' }, { status: 400 });
  }

  const allowed = ['phone', 'address', 'church'];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in fields) data[key] = fields[key];
  }

  const res = await fetch(`${STRAPI_URL}/api/members/${documentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao atualizar dados.' }, { status: res.status });
  }

  const json = await res.json();
  return NextResponse.json({ data: json.data });
}
