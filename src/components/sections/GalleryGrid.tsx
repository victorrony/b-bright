"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "todas",    label: "Todos" },
  { value: "cursos",   label: "Cursos" },
  { value: "eventos",  label: "Eventos" },
  { value: "retiros",  label: "Retiros" },
  { value: "conivios", label: "Convívios" },
  { value: "outros",   label: "Outros" },
];

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
      <div className="relative w-full aspect-[4/3] overflow-hidden">
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
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs text-gray-400">{dateFormatted}</p>
        <h3 className="font-proxima font-semibold text-base text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
          {album.title}
        </h3>
        {album.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{album.description}</p>
        )}
        {album.photos && album.photos.length > 0 && (
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Images size={11} /> {album.photos.length} foto{album.photos.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function GalleryGrid({ albums }: Readonly<GalleryGridProps>) {
  const [category, setCategory] = useState<CategoryFilter>("todas");

  const filtered = useMemo(() =>
    albums.filter((a) => category === "todas" || a.category === category),
    [albums, category]
  );

  return (
    <>
      {/* Filtros */}
      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCategory(opt.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider border transition-colors ${
              category === opt.value
                ? "bg-primary-dark text-white border-primary-dark"
                : "bg-white text-gray-600 border-gray-300 hover:border-primary-dark"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grelha */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <Images size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">Nenhum álbum encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((album) => (
            <AlbumCard key={album.documentId} album={album} />
          ))}
        </div>
      )}
    </>
  );
}
