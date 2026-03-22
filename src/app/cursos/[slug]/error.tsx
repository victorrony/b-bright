"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Course detail error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="font-proxima font-bold text-[32px] text-primary uppercase">
        Erro ao carregar curso
      </h2>
      <p className="text-gray-500 max-w-md">
        Não foi possível carregar os detalhes deste curso. Por favor tente novamente.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-full px-8 py-3 font-bold text-sm text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Tentar novamente
        </button>
        <Link
          href="/cursos"
          className="rounded-full px-8 py-3 font-bold text-sm border border-gray-300 text-gray-700"
        >
          Ver todos os cursos
        </Link>
      </div>
    </div>
  );
}
