"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setZoomed(false);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomed(false);
  }, []);

  const prev = useCallback(() => {
    setZoomed(false);
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setZoomed(false);
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* Main large image */}
        <div
          className="col-span-2 row-span-2 relative h-72 md:h-96 cursor-pointer overflow-hidden group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} - foto 1`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300 flex items-center justify-center">
            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
          </div>
        </div>

        {/* Thumbnail images */}
        {images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="relative h-36 md:h-[11.5rem] cursor-pointer overflow-hidden group"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              alt={`${title} - foto ${i + 2}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Show +N on last thumbnail if more images */}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-navy-900/60 flex items-center justify-center">
                <span className="text-cream-50 font-body font-semibold text-lg">
                  +{images.length - 5}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300 flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
            </div>
          </div>
        ))}

        {/* View all button if gallery > 1 */}
        {images.length > 1 && (
          <button
            onClick={() => openLightbox(0)}
            className="col-span-2 md:col-span-4 mt-1 text-xs font-medium text-navy-500 hover:text-gold-500 transition-colors duration-200 flex items-center justify-center gap-2 py-2"
          >
            <Maximize2 size={14} />
            Ver todas as {images.length} fotos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setZoomed(!zoomed)}
                className="w-10 h-10 flex items-center justify-center bg-navy-900/60 hover:bg-gold-500 text-white transition-colors duration-200 rounded-sm"
                title={zoomed ? "Diminuir zoom" : "Aumentar zoom"}
              >
                {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 flex items-center justify-center bg-navy-900/60 hover:bg-gold-500 text-white transition-colors duration-200 rounded-sm"
                title="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 bg-navy-900/60 text-cream-50 text-xs font-medium px-3 py-2">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <div className="relative overflow-auto max-w-[90vw] max-h-[85vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[currentIndex]}
                alt={`${title} - foto ${currentIndex + 1}`}
                className={`lightbox-img select-none transition-transform duration-300 ${
                  zoomed ? "zoomed max-w-none" : ""
                }`}
                onClick={() => setZoomed(!zoomed)}
                draggable={false}
              />
            </div>

            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-navy-900/60 hover:bg-gold-500 text-white transition-colors duration-200"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-navy-900/60 hover:bg-gold-500 text-white transition-colors duration-200"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setZoomed(false);
                  }}
                  className={`shrink-0 w-14 h-10 relative overflow-hidden transition-all duration-200 ${
                    i === currentIndex
                      ? "ring-2 ring-gold-400 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
