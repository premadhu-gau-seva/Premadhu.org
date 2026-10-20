"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Images } from "lucide-react";
import { AboutPhoto, DEFAULT_ABOUT_PHOTOS } from "@/lib/db";

interface AboutImageCarouselProps {
  initialPhotos?: AboutPhoto[];
  autoPlayInterval?: number; // In milliseconds, default 4500ms
  className?: string;
}

export default function AboutImageCarousel({
  initialPhotos = [],
  autoPlayInterval = 4500,
  className = "",
}: AboutImageCarouselProps) {
  const [photos, setPhotos] = useState<AboutPhoto[]>(
    initialPhotos.length > 0 ? initialPhotos : DEFAULT_ABOUT_PHOTOS
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Optionally fetch fresh photos on mount to ensure live updates
  useEffect(() => {
    let ignore = false;
    async function loadLatestPhotos() {
      try {
        const res = await fetch("/api/about-photos");
        if (res.ok) {
          const data: AboutPhoto[] = await res.json();
          if (!ignore && Array.isArray(data) && data.length > 0) {
            setPhotos(data);
          }
        }
      } catch (err) {
        // Silently keep current photos if network error
        console.warn("Could not fetch latest about photos:", err);
      }
    }
    loadLatestPhotos();
    return () => {
      ignore = true;
    };
  }, []);

  const total = photos.length;

  // Safe navigation functions
  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setCurrentIndex(index);
      }
    },
    [total]
  );

  // Auto-play timer
  useEffect(() => {
    if (total <= 1 || isHovered || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isHovered, isPaused, autoPlayInterval, goToNext, currentIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe distance threshold of 45px
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStartX(null);
  };

  const currentPhoto = photos[currentIndex] || photos[0] || DEFAULT_ABOUT_PHOTOS[0];

  return (
    <div
      className={`relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100 select-none bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="About Us Photo Gallery"
    >
      {/* Photo Images with smooth crossfade */}
      {photos.map((photo, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={photo.id || index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={photo.url}
              alt={photo.caption || "Premadhu Gau Seva Samiti Gaushala"}
              fill
              priority={index === 0}
              unoptimized={photo.url.startsWith("data:")}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </div>
        );
      })}

      {/* Top Controls: Photo Count & Auto-play Pause/Play Toggle */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused((p) => !p);
            }}
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            title={isPaused ? "Resume slideshow" : "Pause slideshow"}
            className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/65 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        )}

        {total > 1 && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/45 backdrop-blur-md text-white/95 shadow-md">
            <Images className="w-3.5 h-3.5 text-primary-light" />
            <span>
              {currentIndex + 1} / {total}
            </span>
          </span>
        )}
      </div>

      {/* Navigation Arrow Buttons */}
      {total > 1 && (
        <>
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ChevronRight className="w-6 h-6 -mr-0.5" />
          </button>
        </>
      )}

      {/* Bottom Gradient Overlay with Caption and Slide Indicators */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-12 pb-5 px-5 sm:px-6 pointer-events-none">
        {/* Caption */}
        <p className="text-white text-xs sm:text-sm font-medium leading-relaxed drop-shadow-md line-clamp-2 mb-3">
          {currentPhoto.caption || "Cows being cared for with love at Premadhu Gau Seva Samiti"}
        </p>

        {/* Slide Indicator Dots */}
        {total > 1 && (
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {photos.map((_, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToIndex(idx);
                  }}
                  aria-label={`Go to photo ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    active
                      ? "w-7 bg-primary shadow-sm"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
