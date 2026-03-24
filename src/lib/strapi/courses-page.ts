import { fetchAPI, type StrapiImage, type StrapiSingleResponse } from './client';

export interface CoursesPageData {
  heroLabel: string;
  heroTitle: string;
  heroImage?: StrapiImage | StrapiImage[];
  otherTitle: string;
  otherSubtitle: string;
}

export async function getCoursesPage(): Promise<CoursesPageData> {
  const res = await fetchAPI<StrapiSingleResponse<CoursesPageData>>(
    '/courses-page?populate[0]=heroImage'
  );
  return res.data;
}
