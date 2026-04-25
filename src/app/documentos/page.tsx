import type { Metadata } from "next";
import Image from "next/image";
import { getDocuments, getDocumentsPage, getCourseImageUrl } from "@/lib/strapi";
import DocumentsFilter from "@/components/sections/DocumentsFilter";
import SplitTitle from "@/components/ui/SplitTitle";

export const metadata: Metadata = {
  title: "Documentos e Transparência | Geração B-Bright",
  description:
    "Consulta os relatórios anuais, prestações de contas, atas de reunião e outros documentos oficiais da Geração B-Bright.",
};

export const revalidate = 300;

export default async function DocumentosPage() {
  const [documents, dp] = await Promise.all([
    getDocuments().catch(() => []),
    getDocumentsPage().catch(() => ({ heroLabel: "Transparência", heroTitle: "Documentos", heroImage: undefined, documentsTitle: undefined })),
  ]);

  const heroImage = dp.heroImage
    ? getCourseImageUrl(Array.isArray(dp.heroImage) ? dp.heroImage[0] : dp.heroImage)
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: "400px" }}
      >
        {heroImage && (
          <Image
            src={heroImage}
            alt="Documentos hero"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 1440px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[28px] leading-[100%] uppercase mb-3">
            {dp.heroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[40px] leading-[100%] uppercase">
            {dp.heroTitle}
          </h1>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 px-6">
        <div className="flex flex-col sm:flex-row sm:items-end m-auto lg:w-6/12 justify-center gap-4 mb-12">
          <SplitTitle title={dp.documentsTitle ?? "Documentos"} direction="row" centered />
        </div>
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
