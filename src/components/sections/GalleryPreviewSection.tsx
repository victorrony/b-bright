import Image from "next/image";
import Link from "next/link";
import type { StrapiAlbum } from "@/lib/strapi";
import { getAlbumImageUrl, ALBUM_CATEGORY_LABELS } from "@/lib/strapi";
import SplitTitle from "../ui/SplitTitle";

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
          {recent.map((album) => {
            const coverUrl = getAlbumImageUrl(album.cover);
            const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
              month: "long", year: "numeric",
            });

            return (
              <Link
                key={album.documentId}
                href={`/galeria/${album.slug}`}
                className="group relative shrink-0 w-72 h-64 overflow-hidden rounded-2xl bg-gray-200"
              >
                {coverUrl && (
                  <Image
                    src={coverUrl}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="288px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    {ALBUM_CATEGORY_LABELS[album.category]} · {dateFormatted}
                  </span>
                  <h3 className="text-white font-proxima font-semibold text-base leading-tight mt-1 line-clamp-2">
                    {album.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
