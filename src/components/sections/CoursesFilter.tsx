"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CourseCard from "@/components/ui/CourseCard";
import Pagination from "@/components/ui/Pagination";
import type { StrapiCourse } from "@/lib/strapi";

type StatusFilter = "todos" | "aberto" | "em_breve" | "encerrado";
type SortOption = "recente" | "data_inicio" | "alfabetica";

export interface CourseWithImageUrl extends Omit<StrapiCourse, "image"> {
  imageUrl: string;
}

interface CoursesFilterProps {
  courses: CourseWithImageUrl[];
  labelOrganizer: string;
  labelTrainer: string;
  labelEnroll: string;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "aberto", label: "Inscrições abertas" },
  { value: "em_breve", label: "Em breve" },
  { value: "encerrado", label: "encerrados" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recente", label: "Mais recente" },
  { value: "data_inicio", label: "Data de início" },
  { value: "alfabetica", label: "Alfabética" },
];

const PAGE_SIZE = 5;

export default function CoursesFilter({ courses, labelOrganizer, labelTrainer, labelEnroll }: Readonly<CoursesFilterProps>) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("todos");
  const [sort, setSort] = useState<SortOption>("recente");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const result = courses.filter((c) => {
      const matchesQuery =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "todos" || (c.courseStatus ?? "aberto") === status;
      return matchesQuery && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sort === "alfabetica") return a.title.localeCompare(b.title, "pt");
      if (sort === "data_inicio") {
        const da = a.startDate ? new Date(a.startDate).getTime() : 0;
        const db = b.startDate ? new Date(b.startDate).getTime() : 0;
        return da - db;
      }
      // recente — usa a ordem original (createdAt desc vinda do Strapi)
      return 0;
    });
  }, [courses, query, status, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Barra de filtros */}
      <div className="flex flex-col mx-auto sm:flex-row gap-4 mb-6">
        {/* Pesquisa */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Pesquisar cursos..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro de estado */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setStatus(opt.value); setPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-colors ${status === opt.value
                  ? "bg-primary-dark text-white border-primary-dark"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary-dark"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      {filtered.length > 0 && (
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length} curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg font-medium">Nenhum curso encontrado.</p>
          <p className="text-sm mt-1">Tenta ajustar a pesquisa ou os filtros.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-20">
            {paginated.map((course, idx) => (
              <CourseCard
                key={course.documentId}
                slug={course.slug}
                image={course.imageUrl}
                title={course.title}
                organizer={course.organizer}
                trainer={course.trainer}
                credentials={course.credentials ?? []}
                description={course.description}
                extraText={course.extraText}
                details={course.details ?? []}
                courseStatus={course.courseStatus}
                price={course.price}
                reverse={idx % 2 === 1}
                labelOrganizer={labelOrganizer}
                labelTrainer={labelTrainer}
                labelEnroll={labelEnroll}
              />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </>
  );
}
