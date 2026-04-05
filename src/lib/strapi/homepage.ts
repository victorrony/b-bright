import { fetchAPI, type StrapiImage, type StrapiSingleResponse } from './client';

export interface HeroButton { label: string; href: string; variant: 'primary' | 'outline' | 'ghost' }
export interface ValueItem  { icon: string; title: string; description: string }
export interface Milestone  { year: string; title: string; description: string }
export interface TrainingModule { icon: string; title: string; description: string; backgroundImage?: StrapiImage }
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
  missionLabel?: string;
  visionLabel?: string;
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
    'heroButtons', 'values', 'timelineMilestones',
    'trainingModules', 'trainingModules.backgroundImage',
    'stats', 'resultCards', 'visionInitiatives', 'ctaButtons',
  ].map((f, i) => `populate[${i}]=${f}`).join('&');

  const res = await fetchAPI<StrapiSingleResponse<HomepageData>>(`/homepage?${params}`);
  return res.data;
}
