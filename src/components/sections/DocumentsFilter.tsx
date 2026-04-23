"use client";

import { useState, useMemo } from "react";
import { Search, FileText, Download, Calendar } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import type { StrapiDocument, DocumentCategory } from "@/lib/strapi";
import { CATEGORY_LABELS, getDocumentFileUrl } from "@/lib/strapi";

type CategoryFilter = "todas" | DocumentCategory;

interface DocumentsFilterProps {
  documents: StrapiDocument[];
}

const EXT_ICONS: Record<string, string> = {
  ".pdf": "PDF",
  ".doc": "DOC",
  ".docx": "DOC",
  ".xls": "XLS",
  ".xlsx": "XLS",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentCard({ doc }: { doc: StrapiDocument }) {
  const year = new Date(doc.publishDate).getFullYear();
  const dateFormatted = new Date(doc.publishDate).toLocaleDateString("pt-PT", {
    day: "numeric", month: "long", year: "numeric",
  });
  const ext = doc.file?.ext?.toLowerCase() ?? ".pdf";
  const extLabel = EXT_ICONS[ext] ?? ext.replace(".", "").toUpperCase();
  const fileUrl = getDocumentFileUrl(doc.file);
  const fileSizeLabel = doc.file?.size ? formatFileSize(doc.file.size * 1024) : "";

  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
      {/* Ícone do tipo de ficheiro */}
      <div
        className="shrink-0 w-12 h-14 rounded-lg flex flex-col items-center justify-center text-white text-[10px] font-bold tracking-wider gap-0.5"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <FileText size={18} />
        <span>{extLabel}</span>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold tracking-wider uppercase text-primary mb-1">
          {CATEGORY_LABELS[doc.category]}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1 truncate">
          {doc.title}
        </h3>
        {doc.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{doc.description}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {dateFormatted}
          </span>
          {fileSizeLabel && <span>{fileSizeLabel}</span>}
        </div>
      </div>

      {/* Botão download */}
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
        aria-label={`Descarregar ${doc.title}`}
      >
        <Download size={13} /> Descarregar
      </a>
    </div>
  );
}

const PAGE_SIZE = 10;

export default function DocumentsFilter({ documents }: Readonly<DocumentsFilterProps>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("todas");
  const [year, setYear] = useState<string>("todos");
  const [page, setPage] = useState(1);

  const years = useMemo(() => {
    const ys = [...new Set(documents.map((d) => new Date(d.publishDate).getFullYear()))].sort((a, b) => b - a);
    return ys;
  }, [documents]);

  const categoryOptions = useMemo(() => {
    const cats = [...new Set(documents.map((d) => d.category))];
    return [
      { value: "todas" as CategoryFilter, label: "Todas" },
      ...cats.map((c) => ({ value: c as CategoryFilter, label: CATEGORY_LABELS[c] ?? c })),
    ];
  }, [documents]);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchesQuery = d.title.toLowerCase().includes(query.toLowerCase()) ||
        (d.description ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "todas" || d.category === category;
      const matchesYear = year === "todos" || new Date(d.publishDate).getFullYear().toString() === year;
      return matchesQuery && matchesCategory && matchesYear;
    });
  }, [documents, query, category, year]);

  return (
    <>
      {/* Barra de filtros */}

      <div className="flex flex-col mx-auto sm:flex-row gap-4 mb-12">
        {/* Pesquisa */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Pesquisar documentos..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtro de estado */}
        <div className="flex gap-2 flex-wrap">
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setCategory(opt.value); setPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-colors ${category === opt.value
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
          {filtered.length} documento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">Nenhum documento encontrado.</p>
          <p className="text-sm mt-1">Tenta ajustar a pesquisa ou os filtros.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((doc) => (
              <DocumentCard key={doc.documentId} doc={doc} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
