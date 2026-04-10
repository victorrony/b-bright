import { fetchAPI, STRAPI_URL, type StrapiImage, type StrapiListResponse } from './client';

export interface CourseDetail {
  label: string;
  value: string;
}

export interface CourseCredential {
  label: string;
}

export type FormFieldType = 'text' | 'url' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';

export interface CourseFormField {
  id: number;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string; // comma-separated string stored in Strapi
}

export interface StrapiCourse {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  organizer: string;
  trainer: string;
  credentials: CourseCredential[];
  description: string;
  extraText?: string;
  details: CourseDetail[];
  image?: StrapiImage | StrapiImage[];
  formFields?: CourseFormField[];
}

export async function getCourses(): Promise<StrapiCourse[]> {
  const res = await fetchAPI<StrapiListResponse<StrapiCourse>>(
    '/courses?populate[0]=image&populate[1]=credentials&populate[2]=details&populate[3]=formFields&sort=createdAt:asc'
  );
  return res.data;
}

export async function getCourseBySlug(slug: string): Promise<StrapiCourse | null> {
  const params = new URLSearchParams({ 'filters[slug][$eq]': slug });
  params.append('populate[0]', 'image');
  params.append('populate[1]', 'credentials');
  params.append('populate[2]', 'details');
  params.append('populate[3]', 'formFields');
  const res = await fetchAPI<StrapiListResponse<StrapiCourse>>(`/courses?${params}`);
  return res.data[0] ?? null;
}

export function getCourseImageUrl(image?: StrapiImage | StrapiImage[]): string {
  const img = Array.isArray(image) ? image[0] : image;
  if (!img?.url) return '';
  if (img.url.startsWith('http')) return img.url;
  return `${STRAPI_URL}${img.url}`;
}
