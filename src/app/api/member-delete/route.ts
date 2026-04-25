import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.STRAPI_API_TOKEN;

const authHeaders: Record<string, string> = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

// DELETE /api/member-delete  body: { documentId, email }
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { documentId, email } = body ?? {};

  if (!documentId || !email) {
    return NextResponse.json({ error: 'documentId e email obrigatórios.' }, { status: 400 });
  }

  // Verify that the documentId matches the email before deleting
  const verifyUrl = `${STRAPI_URL}/api/members?filters[email][$eqi]=${encodeURIComponent(email)}&filters[documentId][$eq]=${documentId}`;
  const verifyRes = await fetch(verifyUrl, { headers: authHeaders });

  if (!verifyRes.ok) {
    return NextResponse.json({ error: 'Erro de verificação.' }, { status: 500 });
  }

  const verifyJson = await verifyRes.json();
  if (!verifyJson?.data?.length) {
    return NextResponse.json({ error: 'Registo não encontrado ou email incorreto.' }, { status: 404 });
  }

  const res = await fetch(`${STRAPI_URL}/api/members/${documentId}`, {
    method: 'DELETE',
    headers: authHeaders,
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao eliminar dados.' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
