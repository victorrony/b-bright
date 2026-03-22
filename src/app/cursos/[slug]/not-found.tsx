import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-proxima text-[80px] font-bold text-primary leading-none">404</p>
      <h2 className="font-proxima font-[250] text-[32px] text-gray-800 uppercase">
        Curso não encontrado
      </h2>
      <p className="text-gray-500 max-w-md">
        O curso que procura não existe ou foi removido.
      </p>
      <Link
        href="/cursos"
        className="rounded-full px-8 py-3 font-bold text-sm text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Ver todos os cursos
      </Link>
    </div>
  );
}
