"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((item, idx) => (
          <button
            key={idx}
            onClick={() => open(idx)}
            className="relative aspect-square overflow-hidden rounded-xl bg-gray-200 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Ver ${isVideo(item) ? "vídeo" : "foto"} ${idx + 1}`}
          >
            {isVideo(item) ? (
              <>
                <video
                  src={item.url}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  preload="metadata"
                  tabIndex={-1}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="text-white drop-shadow-lg" size={40} fill="white" />
                </div>
              </>
            ) : (
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
