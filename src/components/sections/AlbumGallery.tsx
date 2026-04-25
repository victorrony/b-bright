"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

export interface GalleryItem {
  url: string;
  alt: string;
  type?: "image" | "video";
}

interface AlbumGalleryProps {
  images: GalleryItem[];
}

const VIDEO_EXTS = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function isVideo(item: GalleryItem) {
  return item.type === "video" || VIDEO_EXTS.test(item.url);
}

export default function AlbumGallery({ images }: Readonly<AlbumGalleryProps>) {
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  const active = images[current];

  return (
    <>
      {/* Imagem principal */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 mb-4">
        {isVideo(active) ? (
          <video
            src={active.url}
            className="absolute inset-0 w-full h-full object-cover"
            controls
          />
        ) : (
          <button
            className="absolute inset-0 w-full h-full focus:outline-none"
            onClick={() => setLightboxIndex(current)}
            aria-label="Ampliar foto"
          >
            <Image
              src={active.url}
              alt={active.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </button>
        )}

        {/* Seta esquerda */}
        {images.length > 1 && (
          <button
            onClick={prev}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary text-primary bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Seta direita */}
        {images.length > 1 && (
          <button
            onClick={next}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-primary text-primary bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Ver foto ${idx + 1}`}
              className={`relative shrink-0 w-45 h-30 rounded-lg overflow-hidden bg-gray-200 transition-opacity focus:outline-none ${
                idx === current ? "ring-2 ring-primary opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {isVideo(item) ? (
                <>
                  <video src={item.url} className="absolute inset-0 w-full h-full object-cover" muted preload="metadata" tabIndex={-1} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="text-white" size={24} fill="white" />
                  </div>
                </>
              ) : (
                <Image src={item.url} alt={item.alt} fill className="object-cover" sizes="180px" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))}
        />
      )}
    </>
  );
}
