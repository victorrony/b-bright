import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Users } from "lucide-react";
import type { StrapiCourse } from "@/lib/strapi";
import SplitTitle from "../ui/SplitTitle";

export interface CourseWithImageUrl extends Omit<StrapiCourse, "image"> {
  imageUrl: string;
}

interface CoursesSectionProps {
  courses: CourseWithImageUrl[];
  label?: string;
  title?: string;
  linkLabel?: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  aberto:    { label: "Inscrições abertas", color: "bg-green-100 text-green-700" },
  em_breve:  { label: "Em breve",           color: "bg-yellow-100 text-yellow-700" },
  encerrado: { label: "Encerrado",          color: "bg-gray-100 text-gray-500" },
};

function CourseHighlightCard({ course, imageUrl }: { course: StrapiCourse; imageUrl: string }) {
  const st = STATUS_LABELS[course.courseStatus ?? "aberto"] ?? STATUS_LABELS.aberto;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow">
      {/* Imagem */}
      <div className="relative w-full h-52 shrink-0">
        {imageUrl ? (
          <Image src={imageUrl} alt={course.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${st.color}`}>
          {st.label}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-proxima font-[250] text-[22px] leading-tight uppercase text-primary line-clamp-2">
          {course.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-gray-500">
          {course.startDate && (
            <span className="flex items-center gap-2">
              <Calendar size={14} className="shrink-0" />
              {new Date(course.startDate).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          )}
          {course.duration && (
            <span className="flex items-center gap-2">
              <Clock size={14} className="shrink-0" />
              {course.duration}
            </span>
          )}
          {course.spots != null && (
            <span className="flex items-center gap-2">
              <Users size={14} className="shrink-0" />
              {course.spots > 0 ? `${course.spots} vagas disponíveis` : "Sem vagas disponíveis"}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{course.description}</p>

        <Link
          href={`/cursos/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold tracking-wider text-primary mt-auto hover:underline"
        >
          Saber mais <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function CoursesSection({ courses, label = "Formação", title = "Cursos da Geração", linkLabel = "Ver todos os cursos" }: Readonly<CoursesSectionProps>) {
  const featured = courses.filter((c) => c.featured);
  const displayed = featured.length > 0 ? featured : courses;

  if (displayed.length === 0) return null;

  return (
    <section id="cursos" className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-12">
            {/* <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
                {label}
              </p>
              <h2
                className="font-proxima font-[250] text-[36px] md:text-[48px] leading-tight uppercase"
                style={{ color: "var(--color-primary-dark)" }}
              >
                {title}
              </h2>
            </div> */}
            <SplitTitle title={title} subtitle={label} direction="row" centered />
          {/* <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-dark text-primary-dark text-sm font-bold tracking-wider hover:bg-primary-dark hover:text-white transition-colors shrink-0"
          >
            {linkLabel} <ArrowRight size={16} />
          </Link> */}
        </div>

        {/* Scroll horizontal de cursos */}
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {displayed.map((course) => (
            <div key={course.documentId} className="shrink-0 w-72">
              <CourseHighlightCard
                course={course}
                imageUrl={course.imageUrl}
              />
            </div>
          ))}
        </div>

        {/* Botão ver todos — mobile repeat */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-dark text-white text-sm font-bold tracking-wider"
          >
            Ver todos os cursos <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
