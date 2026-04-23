import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

function emailConfirmacaoMembro(nome: string): string {
  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
            <!-- Header -->
            <tr>
              <td style="background:#0769B9;padding:36px 40px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;letter-spacing:1px;">GERAÇÃO B-BRIGHT</h1>
                <p style="color:#00C4FF;margin:8px 0 0;font-size:14px;letter-spacing:2px;text-transform:uppercase;">Bem-vindo à família</p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <h2 style="color:#0769B9;font-size:22px;margin:0 0 16px;">Olá, ${nome}!</h2>
                <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 16px;">
                  Recebemos o teu pedido de adesão à <strong>Geração B-Bright</strong>. Estamos muito felizes por teres dado este passo!
                </p>
                <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 24px;">
                  A nossa equipa irá rever o teu registo e entrar em contacto contigo brevemente. Após aprovação, receberás um link de acesso à comunidade.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:#f0f7ff;border-left:4px solid #0769B9;border-radius:4px;padding:16px 20px;">
                      <p style="margin:0;color:#0769B9;font-size:14px;font-weight:600;">O que acontece a seguir?</p>
                      <ul style="margin:8px 0 0;padding-left:18px;color:#555;font-size:14px;line-height:1.8;">
                        <li>A equipa GBB revê o teu pedido</li>
                        <li>Recebes um email de aprovação ou pedido de informação adicional</li>
                        <li>Após aprovação, ganhas acesso à comunidade</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background:#f5f7fa;padding:24px 40px;text-align:center;border-top:1px solid #e8edf3;">
                <p style="color:#999;font-size:12px;margin:0;">Geração B-Bright · Cabo Verde</p>
                <p style="color:#bbb;font-size:11px;margin:6px 0 0;">Este email foi enviado automaticamente. Por favor não respondas diretamente.</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

function emailNotificacaoAdmin(dados: Record<string, string>): string {
  const rows = Object.entries(dados)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #f0f0f0;font-weight:600;width:40%;">${k}</td><td style="padding:8px 12px;color:#333;font-size:13px;border-bottom:1px solid #f0f0f0;">${v}</td></tr>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head><meta charset="UTF-8" /></head>
    <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
            <tr>
              <td style="background:#003755;padding:28px 40px;">
                <h1 style="color:#ffffff;margin:0;font-size:20px;">Novo pedido de membro</h1>
                <p style="color:#00C4FF;margin:6px 0 0;font-size:13px;">Geração B-Bright · Notificação interna</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;">
                <p style="color:#444;font-size:14px;margin:0 0 20px;">Um novo utilizador submeteu um pedido de adesão. Acede ao painel Strapi para aprovar ou rejeitar.</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf3;border-radius:8px;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#f5f7fa;padding:20px 40px;text-align:center;border-top:1px solid #e8edf3;">
                <p style="color:#999;font-size:12px;margin:0;">Geração B-Bright · Notificação automática</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas tentativas. Tente novamente mais tarde.' },
      { status: 429 }
    );
  }

  let body: { data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const strapiUrl = process.env.STRAPI_URL ?? 'http://localhost:1337';
  const token = process.env.STRAPI_API_TOKEN;
  const adminEmail = process.env.CONTACT_EMAIL ?? '';

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

  // Enviar emails em paralelo (sem bloquear a resposta em caso de falha)
  const data = body.data ?? {};
  const nome = String(data.fullName ?? '');
  const membroEmail = String(data.email ?? '');

  const dadosAdmin: Record<string, string> = {
    'Nome': nome,
    'Email': membroEmail,
    'Telemóvel': String(data.phone ?? '-'),
    'Data de nascimento': String(data.birthDate ?? '-'),
    'Género': String(data.gender ?? '-'),
    'Morada': String(data.address ?? '-'),
    'Igreja': String(data.church ?? '-'),
    'Como soube': String(data.howHeard ?? '-'),
  };

  try {
    await Promise.all([
      // Email de confirmação ao membro
      membroEmail && resend.emails.send({
        from: 'Geração B-Bright <onboarding@resend.dev>',
        to: membroEmail,
        subject: 'Pedido de adesão recebido — Geração B-Bright',
        html: emailConfirmacaoMembro(nome),
      }),
      // Notificação ao admin
      adminEmail && resend.emails.send({
        from: 'Geração B-Bright <onboarding@resend.dev>',
        to: adminEmail,
        subject: `Novo membro: ${nome}`,
        html: emailNotificacaoAdmin(dadosAdmin),
      }),
    ]);
  } catch (emailErr) {
    // Registo já guardado no Strapi — não falhamos a resposta por causa do email
    console.error('[member] Erro ao enviar email:', emailErr);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
