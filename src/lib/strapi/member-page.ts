import { fetchAPI, type StrapiImage, type StrapiSingleResponse } from './client';

export interface MemberPageData {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: StrapiImage | StrapiImage[];
}

export async function getMemberPage(): Promise<MemberPageData> {
  const res = await fetchAPI<StrapiSingleResponse<MemberPageData>>(
    '/member-page?populate[0]=heroImage'
  );
  return res.data;
}
