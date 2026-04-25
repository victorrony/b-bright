import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StrapiCourse } from "@/lib/strapi";
import SplitTitle from "../ui/SplitTitle";
import CoursePreviewCard from "../ui/CoursePreviewCard";

export interface CourseWithImageUrl extends Omit<StrapiCourse, "image"> {
  imageUrl: string;
}

interface CoursesSectionProps {
  courses: CourseWithImageUrl[];
  label?: string;
  title?: string;
  linkLabel?: string;
}

function buildDetails(course: StrapiCourse) {
  const details: { label: string; value: string }[] = [];
  if (course.startDate)
    details.push({ label: "Início", value: new Date(course.startDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }) });
  if (course.duration)
    details.push({ label: "Duração", value: course.duration });
  if (course.spots != null)
    details.push({ label: "Vagas", value: course.spots > 0 ? `${course.spots} disponíveis` : "Sem vagas" });
  return details;
}

export default function CoursesSection({ courses, label = "Formação", title = "Cursos da Geração", linkLabel = "Ver todos os cursos" }: Readonly<CoursesSectionProps>) {
  const featured = courses.filter((c) => c.featured);
  const displayed = featured.length > 0 ? featured : courses;

  if (displayed.length === 0) return null;

  return (
    <section id="cursos" className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-12">          
            <SplitTitle title={title} subtitle={label} direction="row" centered />
          {/* <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-dark text-primary-dark text-sm font-bold tracking-wider hover:bg-primary-dark hover:text-white transition-colors shrink-0"
          >
            {linkLabel} <ArrowRight size={16} />
          </Link> */}
        </div>

        {/* Scroll horizontal de cursos */}
        <div className="flex gap-6 lg:gap-0 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {displayed.slice(0, 3).map((course) => (
            <div key={course.documentId} className="shrink-0 w-">
              <CoursePreviewCard
                slug={course.slug}
                image={course.imageUrl}
                title={course.title}
                details={buildDetails(course)}
                status={course.courseStatus}
              />
            </div>
          ))}
        </div>

        {/* Botão ver todos */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-dark text-white text-sm font-bold tracking-wider hover:opacity-90 transition-opacity"
          >
            {linkLabel} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
