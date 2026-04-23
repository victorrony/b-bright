import { fetchAPI, type StrapiImage, type StrapiSingleResponse } from './client';

export interface GalleryPageData {
  heroLabel: string;
  heroTitle: string;
  heroImage?: StrapiImage | StrapiImage[];
}

export async function getGalleryPage(): Promise<GalleryPageData> {
  const res = await fetchAPI<StrapiSingleResponse<GalleryPageData>>(
    '/gallery-page?populate[0]=heroImage'
  );
  return res.data;
}
