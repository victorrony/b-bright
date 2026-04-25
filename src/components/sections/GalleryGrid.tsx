"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { Search, Images, Play } from "lucide-react";
import type { StrapiAlbum, AlbumCategory } from "@/lib/strapi";
import { ALBUM_CATEGORY_LABELS, getAlbumImageUrl } from "@/lib/strapi";

type CategoryFilter = "todas" | AlbumCategory;

interface AlbumWithCoverUrl extends Omit<StrapiAlbum, "cover"> {
  coverUrl: string;
}

interface GalleryGridProps {
  albums: AlbumWithCoverUrl[];
}

function getYoutubeThumb(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}

const VIDEO_EXTS = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function isVideoUrl(url: string) {
  return VIDEO_EXTS.test(url);
}

function AlbumCard({ album }: { album: AlbumWithCoverUrl }) {
  const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const photos = album.photos ?? [];
  const youtubeThumb = album.youtubeUrl ? getYoutubeThumb(album.youtubeUrl) : null;
  const hasExternalVideo = !!(album.youtubeUrl || album.vimeoUrl);

  // Separar fotos de vídeos no campo photos
  const photoItems = photos.filter((p) => !isVideoUrl(getAlbumImageUrl(p)));
  const videoItems = photos.filter((p) => isVideoUrl(getAlbumImageUrl(p)));
  const hasUploadedVideo = videoItems.length > 0;
  const hasVideo = hasExternalVideo || hasUploadedVideo;

  const totalPhotos = photoItems.length;

  // Imagem principal: capa se for imagem, senão thumbnail YouTube, senão primeira foto
  const coverIsVideo = album.coverUrl ? isVideoUrl(album.coverUrl) : false;
  const mainImage = coverIsVideo
    ? (youtubeThumb ?? (photoItems[0] ? getAlbumImageUrl(photoItems[0]) : null))
    : (album.coverUrl || youtubeThumb || (photoItems[0] ? getAlbumImageUrl(photoItems[0]) : null));

  // Grelha 2x2: fotos + slot de vídeo externo (se houver), sempre 4 slots
  type GridSlot = { kind: "photo" | "video" | "empty"; src?: string };
  const gridSlots: GridSlot[] = [];
  photoItems.slice(0, hasExternalVideo ? 5 : 6).forEach((p) =>
    gridSlots.push({ kind: "photo", src: getAlbumImageUrl(p) })
  );
  if (hasExternalVideo) gridSlots.push({ kind: "video", src: youtubeThumb ?? undefined });
  while (gridSlots.length < 6) gridSlots.push({ kind: "empty" });

  return (
    <Link
      href={`/galeria/${album.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Cabeçalho */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="font-proxima font-[250] text-[18px] uppercase text-primary leading-tight">
          {album.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1">{dateFormatted}</p>
      </div>

      {/* Imagens */}
      <div className="flex gap-2 px-5 pb-5">
        {/* Imagem principal */}
        <div className="relative flex-1 rounded-lg overflow-hidden h-64 aspect-[3/4]">
          {coverIsVideo && album.coverUrl ? (
            <>
              <video
                src={album.coverUrl}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play size={32} className="text-white drop-shadow-lg" fill="white" />
              </div>
            </>
          ) : mainImage ? (
            <Image
              src={mainImage}
              alt={album.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Images size={24} className="text-gray-400" />
            </div>
          )}
          {/* Badge vídeo: YouTube/Vimeo ou vídeo carregado no Strapi */}
          {hasVideo && (
            <div className="absolute bottom-2 left-2 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Play size={10} fill="white" />
              {hasUploadedVideo ? `${videoItems.length} vídeo${videoItems.length > 1 ? "s" : ""}` : "Vídeo"}
            </div>
          )}
        </div>

        {/* Grelha 2x2 de miniaturas */}
        <div className="grid grid-cols-2 gap-1.5 w-38 shrink-0">
          {gridSlots.map((slot, i) => {
            const isLast = i === gridSlots.length - 1;
            return (
              <div key={i} className="relative rounded-md overflow-hidden aspect-square bg-gray-100">
                {slot.kind === "photo" && slot.src ? (
                  <Image src={slot.src} alt="" fill className="object-cover" sizes="80px" />
                ) : slot.kind === "video" && slot.src ? (
                  <>
                    <Image src={slot.src} alt="" fill className="object-cover" sizes="80px" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play size={14} className="text-white" fill="white" />
                    </div>
                  </>
                ) : slot.kind === "video" ? (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <Play size={14} className="text-primary" fill="currentColor" />
                  </div>
                ) : null}
                {isLast && totalPhotos > gridSlots.length && (
                  <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center gap-0.5">
                    <Images size={14} className="text-white" />
                    <span className="text-white text-xs font-bold">{totalPhotos}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

const PAGE_SIZE = 4;

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
        <div className="relative flex-1 max-w-base">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
