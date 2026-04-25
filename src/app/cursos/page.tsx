import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import CoursesFilter from "@/components/sections/CoursesFilter";
import { getCourses, getCourseImageUrl, getCoursesPage, getGlobal, getHomepage } from "@/lib/strapi";

export default async function CursosPage() {
  const [courses, cp, global, hp] = await Promise.all([
    getCourses(),
    getCoursesPage(),
    getGlobal(),
    getHomepage(),
  ]);

  // Filtrar cursos encerrados
  const activeCourses = courses.filter(c => c.courseStatus && c.courseStatus !== 'encerrado');

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
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[28px] leading-[100%] uppercase mb-3">
            {cp.heroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[40px] leading-[100%] uppercase">
            {cp.heroTitle}
          </h1>
        </div>
      </section>

      {/* Listagem com filtros */}
      <section className="w-full mx-auto bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <CoursesFilter
            courses={activeCourses.map((c) => ({ ...c, imageUrl: getCourseImageUrl(c.image) }))}
            labelOrganizer={global.courseLabelOrganizer ?? 'Organizado por'}
            labelTrainer={global.courseLabelTrainer ?? 'Formador'}
            labelEnroll={global.courseLabelEnroll ?? 'INSCREVER'}
          />
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
