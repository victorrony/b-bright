export interface MemberPayload {
  fullName: string;
  birthDate: string; // formato YYYY-MM-DD
  gender: 'masculino' | 'feminino' | 'prefiro_nao_dizer';
  email: string;
  phone: string;
  address: string;
  church?: string;
  howHeard?: 'amigo' | 'redes_sociais' | 'evento' | 'outro';
  termsAccepted: boolean;
}

export async function submitMember(payload: MemberPayload): Promise<void> {
  const res = await fetch('/api/member', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? 'Erro ao enviar registo.');
  }
}
