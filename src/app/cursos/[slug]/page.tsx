import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTASection from "@/components/sections/CTASection";
import RegistrationForm from "@/components/ui/RegistrationForm";
import CoursePreviewCard from "@/components/ui/CoursePreviewCard";
import { getCourses, getCourseBySlug, getCourseImageUrl, getCoursesPage, getGlobal, getHomepage } from "@/lib/strapi";
import SplitTitle from "@/components/ui/SplitTitle";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Curso não encontrado" };

  const image = course.image ? getCourseImageUrl(course.image) : undefined;

  return {
    title: course.title,
    description: course.description.slice(0, 160),
    openGraph: {
      title: course.title,
      description: course.description.slice(0, 160),
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function CourseRegistrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, allCourses, cp, global, hp] = await Promise.all([
    getCourseBySlug(slug),
    getCourses(),
    getCoursesPage(),
    getGlobal(),
    getHomepage(),
  ]);

  if (!course) notFound();

  const otherCourses = allCourses
    .filter((c) => c.slug !== slug)
    .slice(0, 2);

  const courseImage = getCourseImageUrl(course.image);

  return (
    <>
      {/* Hero split */}
      <section className="w-full">
        <div className="relative flex flex-col justify-end p-10" style={{ minHeight: "816px" }}>
          {courseImage && (
            <Image
              src={courseImage}
              alt={course.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 1440px"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-brand opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)",
            }}
          />
          <div className="flex flex-row flex-wrap justify-center items-center gap-10">
            <div className="relative z-10 max-w-xl">
              <h1 className="text-white font-proxima font-[250] text-[36px] leading-[150%] uppercase mb-4">
                {course.title}
              </h1>
              <p className="text-white font-proxima font-normal text-[18px] leading-[160%] mb-2">
                <span className="font-semibold">{global.courseLabelOrganizer ?? 'Organizado por'}:</span> {course.organizer}
              </p>
              <p className="text-white font-proxima font-normal text-[18px] leading-[160%] mb-4">
                <span className="font-semibold">{global.courseLabelTrainer ?? 'Formador'}:</span> {course.trainer}
              </p>
              {(course.credentials ?? []).map((c) => (
                <p key={c.label} className="text-white/90 font-proxima font-normal text-[16px] leading-[160%] mb-1 flex items-start gap-2">
                  <span>•</span>
                  <span>{c.label}</span>
                </p>
              ))}
            </div>

            <div className="relative w-131.5">
              <RegistrationForm courseDocumentId={course.documentId} formFields={course.formFields} />
            </div>
          </div>
        </div>
      </section>

      {/* Other courses */}
      <section className="w-full bg-white py-20">
        <div className="max-w-272.5 mx-auto">
          <div className="text-center mb-12">
            {/* <h2 className="font-proxima font-[250] text-[48px] leading-[100%] text-primary uppercase text-center mb-6">
              {cp.otherTitle}
            </h2>
            <p className="mt-4 text-gray-500 text-sm max-w-xl mx-auto">
              {cp.otherSubtitle}
            </p> */}

            <SplitTitle title={cp.otherTitle} subtitle={cp.otherSubtitle} centered />
          </div>

          <div className="flex flex-row flex-wrap w-full gap- justify-between">
            {otherCourses.map((c) => (
              <CoursePreviewCard
                key={c.documentId}
                slug={c.slug}
                image={getCourseImageUrl(c.image)}
                title={c.title}
                details={c.details ?? []}
                labelEnroll={global.courseLabelEnroll ?? undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading1={hp.ctaHeading1}
        heading2={hp.ctaHeading2}
        body={hp.ctaBody}
        buttons={hp.ctaButtons}
      />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    return courses.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}
