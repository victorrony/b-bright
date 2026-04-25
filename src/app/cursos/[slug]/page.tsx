import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Calendar, Clock } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import RegistrationForm from "@/components/ui/RegistrationForm";
import CoursePreviewCard from "@/components/ui/CoursePreviewCard";
import ShareButtons from "@/components/ui/ShareButtons";
import { getCourses, getCourseBySlug, getCourseImageUrl, getCoursesPage, getGlobal, getHomepage } from "@/lib/strapi";
import SplitTitle from "@/components/ui/SplitTitle";
import AlbumGallery from "@/components/sections/AlbumGallery";

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
        <div className="relative flex flex-col justify-end p-8 md:p-10" style={{ minHeight: "816px" }}>
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

              {/* Detalhes: data, duração, vagas */}
              <div className="flex flex-wrap gap-4 mt-5">
                {course.startDate && (
                  <span className="flex items-center gap-1.5 text-white/80 text-sm">
                    <Calendar size={14} className="shrink-0" />
                    {new Date(course.startDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                )}
                {course.duration && (
                  <span className="flex items-center gap-1.5 text-white/80 text-sm">
                    <Clock size={14} className="shrink-0" />
                    {course.duration}
                  </span>
                )}
                {course.spots != null && (
                  <span className={`flex items-center gap-1.5 text-sm font-semibold ${course.spots === 0 ? "text-red-300" : course.spots <= 5 ? "text-yellow-300" : "text-green-300"}`}>
                    <Users size={14} className="shrink-0" />
                    {course.spots === 0 ? "Sem vagas disponíveis" : `${course.spots} vagas disponíveis`}
                  </span>
                )}
              </div>

              {/* Partilha */}
              <div className="mt-5">
                <ShareButtons title={course.title} />
              </div>
            </div>

            <div className="relative w-131.5">
              <RegistrationForm courseDocumentId={course.documentId} formFields={course.formFields} />
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de imagens */}
      {(course.gallery ?? []).length > 0 && (
        <section className="w-full bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-6">
              Galeria <span className="text-gray-400 font-normal">({course.gallery!.length})</span>
            </h2>
            <AlbumGallery
              images={(course.gallery ?? []).map((img) => ({
                url: getCourseImageUrl(img),
                alt: img.alternativeText ?? course.title,
              }))}
            />
          </div>
        </section>
      )}

      {/* Other courses */}
      <section className="w-full bg-white py-8 lg:py-20">
        <div className="max-w-272.5 mx-auto">
          <div className="text-center mx-3.5 mb-12">
            <SplitTitle title={cp.otherTitle} subtitle={cp.otherSubtitle} centered />
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap w-full h-full mx-3.5 md:mx-4 gap-y-6 justify-between">
            {otherCourses.map((c) => (
              <CoursePreviewCard
                key={c.documentId}
                slug={c.slug}
                image={getCourseImageUrl(c.image)}
                title={c.title}
                details={[
                  ...(c.startDate ? [{ label: "Início", value: new Date(c.startDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }) }] : []),
                  ...(c.duration ? [{ label: "Duração", value: c.duration }] : []),
                ]}
                status={c.courseStatus}
                labelEnroll={global.courseLabelEnroll ?? undefined}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Ver todos os cursos
            </Link>
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
