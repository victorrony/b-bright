import { NextRequest, NextResponse } from 'next/server';

// Rate limiting simples em memória — máx 5 submissões por IP por 10 minutos
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= LIMIT) return true;

  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas tentativas. Tente novamente mais tarde.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const strapiUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';
  const token = process.env.STRAPI_API_TOKEN;

  // Transforma course: "documentId" → { connect: [{ documentId }] } para o Strapi v5
  if (
    body &&
    typeof body === 'object' &&
    'data' in body &&
    body.data &&
    typeof body.data === 'object' &&
    'course' in body.data &&
    typeof (body.data as Record<string, unknown>).course === 'string'
  ) {
    const courseId = (body.data as Record<string, unknown>).course as string;
    (body as { data: Record<string, unknown> }).data.course = {
      connect: [{ documentId: courseId }],
    };
  }

  const res = await fetch(`${strapiUrl}/api/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[register] Strapi error:', res.status, errBody);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição.', detail: errBody },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
