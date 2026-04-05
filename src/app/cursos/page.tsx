import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import CourseCard from "@/components/ui/CourseCard";
import { getCourses, getCourseImageUrl, getCoursesPage, getGlobal, getHomepage } from "@/lib/strapi";

export default async function CursosPage() {
  const [courses, cp, global, hp] = await Promise.all([
    getCourses(),
    getCoursesPage(),
    getGlobal(),
    getHomepage(),
  ]);
  const heroImage = cp.heroImage ? getCourseImageUrl(cp.heroImage) : null;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: "400px" }}
      >
        {heroImage && (
          <Image
            src={heroImage}
            alt="Courses hero"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 1440px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[32px] leading-[100%] uppercase mb-3">
            {cp.heroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[36px] leading-[100%] uppercase">
            {cp.heroTitle}
          </h1>
        </div>
      </section>

      {/* Course listings */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {courses.map((course, idx) => (
            <CourseCard
              key={course.documentId}
              slug={course.slug}
              image={getCourseImageUrl(course.image)}
              title={course.title}
              organizer={course.organizer}
              trainer={course.trainer}
              credentials={course.credentials ?? []}
              description={course.description}
              extraText={course.extraText}
              details={course.details ?? []}
              reverse={idx % 2 === 1}
              labelOrganizer={global.courseLabelOrganizer ?? 'Organizado por'}
              labelTrainer={global.courseLabelTrainer ?? 'Formador'}
              labelEnroll={global.courseLabelEnroll ?? 'INSCREVER'}
            />
          ))}
        </div>
      </section>

      <CTASection
        heading1={hp.ctaHeading1}
        heading2={hp.ctaHeading2}
        body={hp.ctaBody}
        buttons={hp.ctaButtons ?? []}
      />
    </>
  );
}
