import type { Metadata } from "next";
import { getAlbums, getAlbumImageUrl } from "@/lib/strapi";
import GalleryGrid from "@/components/sections/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeria | Geração B-Bright",
  description: "Fotografias e vídeos dos eventos, cursos, retiros e atividades da Geração B-Bright.",
};

export const revalidate = 300;

export default async function GaleriaPage() {
  const albums = await getAlbums().catch(() => []);

  const albumsWithUrls = albums.map((a) => ({
    ...a,
    coverUrl: getAlbumImageUrl(a.cover),
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="py-20 px-6 text-white text-center"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase opacity-75 mb-3">
            Comunidade
          </p>
          <h1 className="text-4xl md:text-5xl font-proxima font-[250] leading-tight mb-4 uppercase">
            Galeria de Eventos
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Momentos e memórias dos cursos, retiros e eventos da Geração B-Bright.
          </p>
        </div>
      </section>

      {/* Grelha */}
      <section className="py-16 px-6">
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
