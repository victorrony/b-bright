import type { Metadata } from "next";
import { getDocuments } from "@/lib/strapi";
import DocumentsFilter from "@/components/sections/DocumentsFilter";

export const metadata: Metadata = {
  title: "Documentos e Transparência | Geração B-Bright",
  description:
    "Consulta os relatórios anuais, prestações de contas, atas de reunião e outros documentos oficiais da Geração B-Bright.",
};

export const revalidate = 300;

export default async function DocumentosPage() {
  let documents = await getDocuments().catch(() => []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="py-20 px-6 text-white text-center"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-75 mb-3">
            Transparência
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 uppercase font-proxima font-[250]">
            Documentos
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Relatórios, prestações de contas e documentos oficiais da Geração B-Bright,
            disponíveis para consulta pública.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {documents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow-sm">
              <p className="text-lg font-medium">Nenhum documento publicado ainda.</p>
              <p className="text-sm mt-1">Volta mais tarde para consultar os documentos disponíveis.</p>
            </div>
          ) : (
            <DocumentsFilter documents={documents} />
          )}
        </div>
      </section>
    </main>
  );
}
