import { NextRequest, NextResponse } from 'next/server';

// Palavra-passe simples de admin — configurar em .env.local
// ADMIN_EXPORT_PASSWORD=<senha>
const ADMIN_PASSWORD = process.env.ADMIN_EXPORT_PASSWORD ?? '';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type'); // 'registrations' | 'members'
  const password = searchParams.get('password') ?? '';
  const courseId = searchParams.get('courseId') ?? '';
  const status = searchParams.get('status') ?? '';

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  if (type !== 'registrations' && type !== 'members') {
    return NextResponse.json({ error: 'Tipo inválido.' }, { status: 400 });
  }

  const strapiUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';
  const token = process.env.STRAPI_API_TOKEN;

  const params = new URLSearchParams();
  if (type === 'registrations' && courseId) params.set('courseId', courseId);
  if (type === 'members' && status) params.set('status', status);

  const endpoint = type === 'registrations'
    ? `/api/registrations/export`
    : `/api/members/export`;

  const query = params.toString();
  const res = await fetch(`${strapiUrl}${endpoint}${query ? `?${query}` : ''}`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao gerar ficheiro.' }, { status: res.status });
  }

  const buffer = await res.arrayBuffer();
  const date = new Date().toISOString().slice(0, 10);
  const filename = type === 'registrations' ? `inscritos_${date}.xlsx` : `membros_${date}.xlsx`;

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
