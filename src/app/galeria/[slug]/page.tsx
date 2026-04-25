import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { getAlbums, getAlbumBySlug, getAlbumImageUrl, getYoutubeEmbedUrl, getVimeoEmbedUrl, ALBUM_CATEGORY_LABELS } from "@/lib/strapi";
import AlbumGallery from "@/components/sections/AlbumGallery";
import ShareButtons from "@/components/ui/ShareButtons";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) return { title: "Álbum não encontrado" };
  return {
    title: `${album.title} | Galeria | Geração B-Bright`,
    description: album.description ?? `Fotografias do evento ${album.title}`,
  };
}

export async function generateStaticParams() {
  try {
    const albums = await getAlbums();
    return albums.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) notFound();

  const coverUrl = getAlbumImageUrl(album.cover);
  const dateFormatted = new Date(album.eventDate).toLocaleDateString("pt-PT", {
    day: "numeric", month: "long", year: "numeric",
  });

  const photos = (album.photos ?? []).map((p) => ({
    url: getAlbumImageUrl(p),
    alt: p.alternativeText ?? album.title,
  }));

  const youtubeEmbed = album.youtubeUrl ? getYoutubeEmbedUrl(album.youtubeUrl) : null;
  const vimeoEmbed = album.vimeoUrl ? getVimeoEmbedUrl(album.vimeoUrl) : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero com capa */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "420px" }}>
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={album.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-brand opacity-40" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 max-w-4xl mx-auto w-full">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-1.5 text-white/80 text-sm font-semibold mb-6 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft size={16} /> Voltar à galeria
          </Link>
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3 w-fit"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {ALBUM_CATEGORY_LABELS[album.category]}
          </span>
          <h1 className="text-white font-proxima font-[250] text-3xl md:text-5xl uppercase leading-tight mb-2">
            {album.title}
          </h1>
          <p className="text-white/70 text-sm flex items-center gap-1.5">
            <Calendar size={14} /> {dateFormatted}
          </p>
          <div className="mt-4">
            <ShareButtons title={album.title} />
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h2 className="font-proxima font-[250] text-[48px] leading-[100%] uppercase text-center text-primary mb-4">{album.title}</h2>

          {/* Descrição */}
          {album.description && (
            <p className="font-proxima font-normal text-[18px] leading-[160%] text-[#003755] text-center m-auto mb-10 max-w-2xl">
              {album.description}
            </p>
          )}

          {/* Vídeos */}
          {(youtubeEmbed || vimeoEmbed) && (
            <div className="mb-12">
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-4">YouTube</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {youtubeEmbed && (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                    <iframe
                      src={youtubeEmbed}
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
                {vimeoEmbed && (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                    <iframe
                      src={vimeoEmbed}
                      title="Vimeo video"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fotos com lightbox */}
          {photos.length > 0 && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-4">
                Fotografias/Vedeos <span className="text-gray-400 font-normal">({photos.length})</span>
              </h2>
              <AlbumGallery images={photos} />
            </div>
          )}

          {photos.length === 0 && !youtubeEmbed && !vimeoEmbed && (
            <p className="text-gray-400 text-center py-12">Nenhum conteúdo disponível neste álbum.</p>
          )}
        </div>
      </section>
    </main>
  );
}
