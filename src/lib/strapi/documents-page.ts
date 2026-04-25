import { fetchAPI, type StrapiImage, type StrapiSingleResponse } from './client';

export interface DocumentsPageData {
  heroLabel: string;
  heroTitle: string;
  heroImage?: StrapiImage | StrapiImage[];
  documentsTitle?: string;
}

export async function getDocumentsPage(): Promise<DocumentsPageData> {
  const res = await fetchAPI<StrapiSingleResponse<DocumentsPageData>>(
    '/documents-page?populate[0]=heroImage'
  );
  return res.data;
}
