import { fetchAPI, type StrapiSingleResponse } from './client';

export interface RegistrationPayload {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  sex?: 'masculino' | 'feminino' | 'outro';
  occupation?: 'estudante' | 'empregado' | 'desempregado' | 'empreendedor' | 'outro';
  message?: string;
  course?: string; // course documentId
}

export async function submitRegistration(payload: RegistrationPayload): Promise<void> {
  await fetchAPI<StrapiSingleResponse<unknown>>('/registrations', {
    method: 'POST',
    body: JSON.stringify({ data: payload }),
    next: undefined,
  });
}
