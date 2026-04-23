"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnBase = "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors border";

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={`${btnBase} border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-label={`Página ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`${btnBase} ${
              p === currentPage
                ? "bg-primary border-primary text-white"
                : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className={`${btnBase} border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
