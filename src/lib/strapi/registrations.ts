export interface RegistrationPayload {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  sex?: 'masculino' | 'feminino' | 'outro';
  occupation?: 'estudante' | 'empregado' | 'desempregado' | 'empreendedor' | 'outro';
  message?: string;
  course?: string;
}

export async function submitRegistration(payload: RegistrationPayload): Promise<void> {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? 'Erro ao enviar inscrição.');
  }
}
