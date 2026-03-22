import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import CourseCard from "@/components/ui/CourseCard";
import { getCourses, getCourseImageUrl, getHomepage } from "@/lib/strapi";
import { FALLBACK_IMAGE } from "@/lib/constants";

export default async function CursosPage() {
  const [courses, hp] = await Promise.all([getCourses(), getHomepage()]);
  const heroImage = hp.coursesHeroImage ? getCourseImageUrl(hp.coursesHeroImage) : FALLBACK_IMAGE;

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: "400px" }}
      >
        <Image
          src={heroImage}
          alt="Courses hero"
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 1440px"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #007599 0%, #00C4FF 192.93%)", opacity: 0.4 }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[32px] leading-[100%] uppercase mb-3">
            {hp.coursesHeroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[36px] leading-[100%] uppercase">
            {hp.coursesHeroTitle}
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
              image={course.image ? getCourseImageUrl(course.image) : FALLBACK_IMAGE}
              title={course.title}
              organizer={course.organizer}
              trainer={course.trainer}
              credentials={course.credentials ?? []}
              description={course.description}
              extraText={course.extraText}
              details={course.details ?? []}
              reverse={idx % 2 === 1}
              labelOrganizer={hp.courseLabelOrganizer ?? 'Organizado por'}
              labelTrainer={hp.courseLabelTrainer ?? 'Formador'}
              labelEnroll={hp.courseLabelEnroll ?? 'INSCREVER'}
            />
          ))}
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
