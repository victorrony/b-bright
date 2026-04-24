"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/components/sections/AlbumGallery";

interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const VIDEO_EXTS = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

function isVideo(item: GalleryItem) {
  return item.type === "video" || VIDEO_EXTS.test(item.url);
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: Readonly<LightboxProps>) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Fechar */}
      <button
        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X size={28} />
      </button>

      {/* Contador */}
      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </span>

      {/* Anterior */}
      {images.length > 1 && (
        <button
          className="absolute left-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Conteúdo */}
      <div
        className="relative max-w-5xl w-full mx-16 h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(current) ? (
          <video
            key={current.url}
            src={current.url}
            controls
            autoPlay
            className="max-h-full max-w-full rounded-lg"
          />
        ) : (
          <Image
            src={current.url}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        )}
      </div>

      {/* Seguinte */}
      {images.length > 1 && (
        <button
          className="absolute right-4 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Seguinte"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
