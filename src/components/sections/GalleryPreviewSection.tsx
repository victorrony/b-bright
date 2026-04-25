import Image from "next/image";
import Link from "next/link";
import { Album, ArrowRight, Play } from "lucide-react";
import type { StrapiAlbum } from "@/lib/strapi";
import { getAlbumImageUrl, ALBUM_CATEGORY_LABELS } from "@/lib/strapi";
import SplitTitle from "../ui/SplitTitle";
import { AlbumCard } from "./GalleryGrid";

const VIDEO_EXTS = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

interface GalleryPreviewSectionProps {
  albums: StrapiAlbum[];
  label?: string;
  title?: string;
  linkLabel?: string;
}

export default function GalleryPreviewSection({ albums, label = "Galeria", title = "Momentos GBB", linkLabel = "Ver galeria completa" }: Readonly<GalleryPreviewSectionProps>) {
  const recent = albums;
  if (recent.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-12">    
          <SplitTitle title={title} subtitle={label} direction="row" centered />
          {/* <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-dark text-primary-dark text-sm font-bold tracking-wider hover:bg-primary-dark hover:text-white transition-colors shrink-0"
          >
            {linkLabel} <ArrowRight size={16} />
          </Link> */}
        </div>

        {/* Scroll horizontal de álbuns */}
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar" style={{ scrollbarWidth: "none" as const }}>
          {recent.slice(0, 3).map((album) => {
            const coverUrl = getAlbumImageUrl(album.cover);
            const coverIsVideo = coverUrl ? VIDEO_EXTS.test(coverUrl) : false;
            const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
              month: "long", year: "numeric",
            });

            return (
              <AlbumCard key={album.id} album={{ ...album, coverUrl }} />
            );
          })}
        </div>

        {/* Botao ver mais */}
        <div className="mt-5 flex justify-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-dark text-white text-sm font-bold tracking-wider hover:opacity-90 transition-opacity"
          >
            {linkLabel} <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
