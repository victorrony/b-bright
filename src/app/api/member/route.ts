import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 15 * 60 * 1000;

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

  // Se houver foto, o upload é feito separadamente — aqui só enviamos os dados textuais
  const res = await fetch(`${strapiUrl}/api/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[member] Strapi error:', res.status, errBody);

    // Email duplicado — dar feedback claro ao utilizador
    if (res.status === 400 && errBody.includes('unique')) {
      return NextResponse.json(
        { error: 'Este email já está registado como membro.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao processar registo.' },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
