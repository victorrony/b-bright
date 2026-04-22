import { fetchAPI, STRAPI_URL, type StrapiListResponse } from './client';

export type DocumentCategory =
  | 'relatorios_anuais'
  | 'prestacoes_de_contas'
  | 'atas_de_reuniao'
  | 'outros';

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  relatorios_anuais:    'Relatórios Anuais',
  prestacoes_de_contas: 'Prestações de Contas',
  atas_de_reuniao:      'Atas de Reunião',
  outros:               'Outros Documentos',
};

export interface StrapiFile {
  url: string;
  name: string;
  ext: string;
  size: number;
  mime: string;
}

export interface StrapiDocument {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  category: DocumentCategory;
  publishDate: string;
  file: StrapiFile;
}

export function getDocumentFileUrl(file: StrapiFile): string {
  if (!file?.url) return '';
  if (file.url.startsWith('http')) return file.url;
  return `${STRAPI_URL}${file.url}`;
}

export async function getDocuments(): Promise<StrapiDocument[]> {
  const res = await fetchAPI<StrapiListResponse<StrapiDocument>>(
    '/documents?populate[0]=file&sort=publishDate:desc&pagination[pageSize]=100'
  );
  return res.data;
}
