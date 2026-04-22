import type { Metadata } from "next";
import ExportPanel from "./ExportPanel";
import { getCourses } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Exportação de Dados | Admin GBB",
  robots: "noindex, nofollow",
};

export default async function AdminExportPage() {
  const courses = await getCourses().catch(() => []);

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold uppercase font-proxima"
            style={{ color: "var(--color-primary-dark)" }}
          >
            Exportação de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Área restrita — introduz a palavra-passe de administrador para exportar.
          </p>
        </div>
        <ExportPanel courses={courses.map((c) => ({ documentId: c.documentId, title: c.title }))} />
      </div>
    </main>
  );
}
