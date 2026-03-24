const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI<T>(path: string, options: RequestInit = {}): Promise<T> {
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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface CourseDetail {
  label: string;
  value: string;
}

export interface CourseCredential {
  label: string;
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
  image?: StrapiImage;
}

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

interface StrapiSingleResponse<T> {
  data: T;
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<StrapiCourse[]> {
  const res = await fetchAPI<StrapiListResponse<StrapiCourse>>(
    '/courses?populate[0]=image&populate[1]=credentials&populate[2]=details&sort=createdAt:asc'
  );
  return res.data;
}

export async function getCourseBySlug(slug: string): Promise<StrapiCourse | null> {
  const params = new URLSearchParams({ 'filters[slug][$eq]': slug });
  params.append('populate[0]', 'image');
  params.append('populate[1]', 'credentials');
  params.append('populate[2]', 'details');
  const res = await fetchAPI<StrapiListResponse<StrapiCourse>>(`/courses?${params}`);
  return res.data[0] ?? null;
}

export function getCourseImageUrl(image?: StrapiImage | StrapiImage[]): string {
  const img = Array.isArray(image) ? image[0] : image;
  if (!img?.url) return '';
  if (img.url.startsWith('http')) return img.url;
  return `${STRAPI_URL}${img.url}`;
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export interface HeroButton { label: string; href: string; variant: 'primary' | 'outline' | 'ghost' }
export interface ValueItem  { icon: string; title: string; description: string }
export interface Milestone  { year: string; title: string; description: string }
export interface TrainingModule { icon: string; title: string; description: string; backgroundImage?: string }
export interface StatItem   { value: string; label: string; labelHighlight: string }
export interface ResultCard { title: string; description: string; image?: string }
export interface Initiative { title: string; description: string }
export interface CtaButton  { label: string; href: string; variant: 'cta' | 'cta-ghost' }

export interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: StrapiImage | StrapiImage[];
  heroButtons: HeroButton[];

  aboutHeading: string;
  aboutBody: string;
  aboutMission: string;
  aboutVision: string;
  aboutPhotos: StrapiImage[];

  values: ValueItem[];

  timelineTitle: string;
  timelineSubtitle: string;
  timelineMilestones: Milestone[];

  trainingTitle: string;
  trainingSubtitle: string;
  trainingModules: TrainingModule[];

  stats: StatItem[];
  resultCards: ResultCard[];
  resultsBackground?: StrapiImage | StrapiImage[];
  resultsTitleLine1: string;
  resultsTitleLine2: string;
  resultsSubtitle: string;

  visionTitle: string;
  visionSubtitle: string;
  visionInitiatives: Initiative[];

  ctaHeading1: string;
  ctaHeading2: string;
  ctaBody: string;
  ctaButtons: CtaButton[];
}

export async function getHomepage(): Promise<HomepageData> {
  const params = [
    'heroImage', 'aboutPhotos', 'resultsBackground',
    'heroButtons', 'values', 'timelineMilestones', 'trainingModules',
    'stats', 'resultCards', 'visionInitiatives', 'ctaButtons',
  ].map((f, i) => `populate[${i}]=${f}`).join('&');

  const res = await fetchAPI<StrapiSingleResponse<HomepageData>>(`/homepage?${params}`);
  return res.data;
}

// ─── Courses Page ─────────────────────────────────────────────────────────────

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

// ─── Global ───────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface GlobalData {
  siteName: string;
  siteDescription: string | null;
  phone: string | null;
  email: string | null;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  footerDescription: string | null;
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
  courseLabelOrganizer: string | null;
  courseLabelTrainer: string | null;
  courseLabelEnroll: string | null;
}

export async function getGlobal(): Promise<GlobalData> {
  const res = await fetchAPI<StrapiSingleResponse<GlobalData>>(
    '/global?populate[0]=navLinks&populate[1]=socialLinks&populate[2]=footerColumns&populate[3]=footerColumns.links'
  );
  return res.data;
}

// ─── Registrations ────────────────────────────────────────────────────────────

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
