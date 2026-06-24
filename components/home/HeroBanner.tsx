"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronRight as ChevronIcon } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Summer Tech Deals",
    subtitle: "Up to 40% off smartphones, laptops & accessories",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=500&fit=crop",
    link: "/deals",
    cta: "Shop Now",
    color: "from-[#023E8A] to-[#0077B6]",
  },
  {
    id: 2,
    title: "Home Makeover",
    subtitle: "Transform your space with modern furniture & decor",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=500&fit=crop",
    link: "/category/home-living",
    cta: "Shop Now",
    color: "from-[#03045E] to-[#023E8A]",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "Trending styles for him & her — new arrivals daily",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=500&fit=crop",
    link: "/category/fashion",
    cta: "Explore",
    color: "from-[#0077B6] to-[#0096C7]",
  },
  {
    id: 4,
    title: "Healthy Living",
    subtitle: "Fresh produce, supplements & wellness essentials",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=500&fit=crop",
    link: "/category/groceries",
    cta: "Shop Now",
    color: "from-[#0096C7] to-[#00B4D8]",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      if (index < 0) return heroSlides.length - 1;
      if (index >= heroSlides.length) return 0;
      return index;
    });
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
      setProgress(0);
    }, 5000);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, current]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  const slide = heroSlides[current];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image with overlay */}
      <div className="relative aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5]">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-80`} />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-market">
            <div className="max-w-lg">
              {heroSlides.map((s, i) => (
                <div
                  key={s.id}
                  className={`transition-all duration-500 ${
                    i === current
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute"
                  }`}
                >
                  {i === current && (
                    <>
                      <span className="inline-block mb-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white border border-white/20">
                        Limited Time
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2 drop-shadow-lg">
                        {s.title}
                      </h2>
                      <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-xs sm:max-w-sm drop-shadow">
                        {s.subtitle}
                      </p>
                      <Link
                        href={s.link}
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#03045E] shadow-xl border border-white/20 transition-all duration-300 hover:bg-frosted-blue hover:scale-105 active:scale-95 sm:px-6 sm:py-3 sm:text-base"
                      >
                        {s.cta}
                        <ChevronIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Progress bars */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1.5 p-3 sm:p-4">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className="h-full rounded-full bg-white transition-all duration-100"
              style={{
                width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}