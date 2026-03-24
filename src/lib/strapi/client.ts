const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export { STRAPI_URL };

export async function fetchAPI<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
  };

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers ?? {}) },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText} — ${path}`);
  }

  return res.json();
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiSingleResponse<T> {
  data: T;
}

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}
