import { fetchAPI, type StrapiSingleResponse } from './client';

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
