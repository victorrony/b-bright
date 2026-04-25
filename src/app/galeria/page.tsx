import type { Metadata } from "next";
import Image from "next/image";
import { getAlbums, getAlbumImageUrl, getGalleryPage, getCourseImageUrl } from "@/lib/strapi";
import GalleryGrid from "@/components/sections/GalleryGrid";
import SplitTitle from "@/components/ui/SplitTitle";

export const metadata: Metadata = {
  title: "Galeria | Geração B-Bright",
  description: "Fotografias e vídeos dos eventos, cursos, retiros e atividades da Geração B-Bright.",
};

export const revalidate = 300;

export default async function GaleriaPage() {
  const [albums, gp] = await Promise.all([
    getAlbums().catch(() => []),
    getGalleryPage().catch(() => ({ heroLabel: "Comunidade", heroTitle: "Galeria de Eventos", heroImage: undefined, galeriaTitulo: undefined })),
  ]);

  const heroImage = gp.heroImage
    ? getCourseImageUrl(Array.isArray(gp.heroImage) ? gp.heroImage[0] : gp.heroImage)
    : null;

  const albumsWithUrls = albums.map((a) => ({
    ...a,
    coverUrl: getAlbumImageUrl(a.cover),
  }));

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
            alt="Galeria hero"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 1440px"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 pt-24 w-full">
          <p className="text-white font-proxima font-normal text-[28px] leading-[100%] uppercase mb-3">
            {gp.heroLabel}
          </p>
          <h1 className="text-white font-proxima font-normal text-[40px] leading-[100%] uppercase">
            {gp.heroTitle}
          </h1>
        </div>
      </section>

      {/* Grelha */}
      <section className="py-16 px-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-4 mb-12">
          <SplitTitle title={gp.galeriaTitulo ?? "Galeria"} direction="row" centered />
        </div>
        <div className="max-w-6xl mx-auto">
          {albumsWithUrls.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow-sm">
              <p className="text-lg font-medium">Nenhum álbum publicado ainda.</p>
              <p className="text-sm mt-1">Volta mais tarde para ver as fotos dos nossos eventos.</p>
            </div>
          ) : (
            <GalleryGrid albums={albumsWithUrls} />
          )}
        </div>
      </section>
    </main>
  );
}
