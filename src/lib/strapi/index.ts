export type { StrapiImage, StrapiListResponse, StrapiSingleResponse } from './client';

export type { CourseDetail, CourseCredential, StrapiCourse } from './courses';
export { getCourses, getCourseBySlug, getCourseImageUrl } from './courses';

export type { HeroButton, ValueItem, Milestone, TrainingModule, StatItem, ResultCard, Initiative, CtaButton, HomepageData } from './homepage';
export { getHomepage } from './homepage';

export type { CoursesPageData } from './courses-page';
export { getCoursesPage } from './courses-page';

export type { NavLink, FooterLink, FooterColumn, SocialLink, GlobalData } from './global';
export { getGlobal } from './global';

export type { RegistrationPayload } from './registrations';
export { submitRegistration } from './registrations';
