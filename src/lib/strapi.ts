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

export interface StrapiCourse {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  organizer: string;
  trainer: string;
  credentials: string[];
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
    '/courses?populate=image&sort=createdAt:asc'
  );
  return res.data;
}

export async function getCourseBySlug(slug: string): Promise<StrapiCourse | null> {
  const params = new URLSearchParams({ 'filters[slug][$eq]': slug, populate: 'image' });
  const res = await fetchAPI<StrapiListResponse<StrapiCourse>>(`/courses?${params}`);
  return res.data[0] ?? null;
}

export function getCourseImageUrl(image?: StrapiImage): string {
  if (!image) return '';
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
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
  heroImage?: StrapiImage;
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
  resultsBackground?: StrapiImage;
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

  coursesOtherTitle: string;
  coursesOtherSubtitle: string;

  coursesHeroLabel: string;
  coursesHeroTitle: string;
  coursesHeroImage?: StrapiImage;

  courseLabelOrganizer: string | null;
  courseLabelTrainer: string | null;
  courseLabelEnroll: string | null;
}

export async function getHomepage(): Promise<HomepageData> {
  const res = await fetchAPI<StrapiSingleResponse<HomepageData>>(
    '/homepage?populate[0]=heroImage&populate[1]=aboutPhotos&populate[2]=resultsBackground&populate[3]=coursesHeroImage'
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
}

const GLOBAL_FALLBACK: GlobalData = {
  siteName: 'B-Bright',
  siteDescription: null,
  phone: '+238 000 00 00',
  email: null,
  navLinks: [
    { label: 'ABOUT', href: '/#about' },
    { label: 'JOURNEY', href: '/#journey' },
    { label: 'TRAINING', href: '/#training' },
    { label: 'IMPACT GLOBAL', href: '/#impact' },
    { label: 'VISION', href: '/#vision' },
    { label: 'CURSOS', href: '/cursos' },
  ],
  ctaLabel: 'JOIN US',
  ctaHref: '/#join',
  footerDescription: 'Establishing B-Bright chapters across all islands and in the diaspora.',
  footerColumns: [],
  socialLinks: [],
};

export async function getGlobal(): Promise<GlobalData> {
  try {
    const res = await fetchAPI<StrapiSingleResponse<GlobalData>>(
      '/global?populate[0]=navLinks&populate[1]=socialLinks&populate[2]=footerColumns&populate[3]=footerColumns.links'
    );
    return { ...GLOBAL_FALLBACK, ...res.data };
  } catch (err) {
    console.error('[strapi] getGlobal failed — using fallback:', err);
    return GLOBAL_FALLBACK;
  }
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
  course?: number; // course documentId relation
}

export async function submitRegistration(payload: RegistrationPayload): Promise<void> {
  await fetchAPI<StrapiSingleResponse<unknown>>('/registrations', {
    method: 'POST',
    body: JSON.stringify({ data: payload }),
    next: undefined,
  });
}
