"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { Search } from "lucide-react";
import { Images, Video } from "lucide-react";
import type { StrapiAlbum, AlbumCategory } from "@/lib/strapi";
import { ALBUM_CATEGORY_LABELS, getAlbumImageUrl } from "@/lib/strapi";

type CategoryFilter = "todas" | AlbumCategory;

interface AlbumWithCoverUrl extends Omit<StrapiAlbum, "cover"> {
  coverUrl: string;
}

interface GalleryGridProps {
  albums: AlbumWithCoverUrl[];
}


function AlbumCard({ album }: { album: AlbumWithCoverUrl }) {
  const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
    day: "numeric", month: "long", year: "numeric",
  });
  const hasVideo = !!(album.youtubeUrl || album.vimeoUrl);

  return (
    <Link
      href={`/galeria/${album.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Capa */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        {album.coverUrl ? (
          <Image
            src={album.coverUrl}
            alt={album.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Images size={32} className="text-gray-400" />
          </div>
        )}
        {/* Categoria badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {ALBUM_CATEGORY_LABELS[album.category]}
        </span>
        {/* Badge de vídeo */}
        {hasVideo && (
          <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Video size={11} /> Vídeo
          </span>
        )}
      </div>

      {/* Conteúdo */}
     
    </Link>
  );
}

const PAGE_SIZE = 9;

export default function GalleryGrid({ albums }: Readonly<GalleryGridProps>) {
  const [category, setCategory] = useState<CategoryFilter>("todas");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const categoryOptions = useMemo(() => {
    const cats = [...new Set(albums.map((a) => a.category))];
    return [
      { value: "todas" as CategoryFilter, label: "Todos" },
      ...cats.map((c) => ({ value: c as CategoryFilter, label: ALBUM_CATEGORY_LABELS[c] ?? c })),
    ];
  }, [albums]);

  const filtered = useMemo(() =>
    albums.filter((a) => {
      const matchesCategory = category === "todas" || a.category === category;
      const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase()) ||
        (a.description ?? "").toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    }),
    [albums, category, query]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-col mx-auto sm:flex-row gap-4 mb-10">
        {/* Pesquisa */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Pesquisar álbuns..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtros */}
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
          {filtered.length} álbum{filtered.length !== 1 ? "ns" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Grelha */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <Images size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">Nenhum álbum encontrado.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((album) => (
              <AlbumCard key={album.documentId} album={album} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </>
  );
}
