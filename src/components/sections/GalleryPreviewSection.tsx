import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StrapiAlbum } from "@/lib/strapi";
import { getAlbumImageUrl, ALBUM_CATEGORY_LABELS } from "@/lib/strapi";

interface GalleryPreviewSectionProps {
  albums: StrapiAlbum[];
}

export default function GalleryPreviewSection({ albums }: Readonly<GalleryPreviewSectionProps>) {
  const recent = albums.slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">
              Galeria
            </p>
            <h2
              className="font-proxima font-[250] text-[36px] md:text-[48px] leading-tight uppercase"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Momentos GBB
            </h2>
          </div>
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary-dark text-primary-dark text-sm font-bold tracking-wider hover:bg-primary-dark hover:text-white transition-colors shrink-0"
          >
            Ver galeria completa <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grelha de 3 álbuns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recent.map((album, idx) => {
            const coverUrl = getAlbumImageUrl(album.cover);
            const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
              month: "long", year: "numeric",
            });
            // Primeiro álbum maior
            const isMain = idx === 0;

            return (
              <Link
                key={album.documentId}
                href={`/galeria/${album.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gray-200 ${isMain ? "sm:row-span-2" : ""}`}
                style={{ minHeight: isMain ? "480px" : "220px" }}
              >
                {coverUrl && (
                  <Image
                    src={coverUrl}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
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
