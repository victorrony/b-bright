import { fetchAPI, STRAPI_URL, type StrapiImage, type StrapiListResponse } from './client';

export type AlbumCategory = 'cursos' | 'eventos' | 'retiros' | 'conivios' | 'outros';

export const ALBUM_CATEGORY_LABELS: Record<AlbumCategory, string> = {
  cursos:   'Cursos',
  eventos:  'Eventos',
  retiros:  'Retiros',
  conivios: 'Convívios',
  outros:   'Outros',
};

export interface StrapiAlbum {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description?: string;
  category: AlbumCategory;
  eventDate: string;
  cover: StrapiImage;
  photos?: StrapiImage[];
  youtubeUrl?: string;
  vimeoUrl?: string;
}

export function getAlbumImageUrl(image?: StrapiImage): string {
  if (!image?.url) return '';
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export function getVimeoEmbedUrl(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

export async function getAlbums(): Promise<StrapiAlbum[]> {
  const res = await fetchAPI<StrapiListResponse<StrapiAlbum>>(
    '/albums?populate[0]=cover&populate[1]=photos&sort=eventDate:desc&pagination[pageSize]=100'
  );
  return res.data;
}

export async function getAlbumBySlug(slug: string): Promise<StrapiAlbum | null> {
  const params = new URLSearchParams({ 'filters[slug][$eq]': slug });
  params.append('populate[0]', 'cover');
  params.append('populate[1]', 'photos');
  const res = await fetchAPI<StrapiListResponse<StrapiAlbum>>(`/albums?${params}`);
  return res.data[0] ?? null;
}
