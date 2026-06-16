"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";

type Review = {
  name: string;
  generation: string;
  rating: number;
  quote: string;
};

export function TestimonialsCarousel({
  reviews,
  reviewFormUrl,
}: {
  reviews: Review[];
  reviewFormUrl: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "previous" | "next") => {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>("[data-review-card]");
    const distance = firstCard ? firstCard.offsetWidth + 24 : rail.clientWidth;

    rail.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || reviews.length < 2) return;

    const interval = window.setInterval(() => {
      const nearEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;

      if (nearEnd) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scrollReviews("next");
    }, 7000);

    return () => window.clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="reveal">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Reseñas de alumnos</p>
          <h2 className="font-display text-[clamp(2.35rem,6vw,4.6rem)] leading-[1.08] text-[#F5F7FA] md:leading-[1.02]">
            Lo que dice la primera generación.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A0A6B0] md:text-lg md:leading-9">
            Reseñas autorizadas por alumnos que participaron en la Mentoría
            Percentil1 y compartieron su experiencia al finalizar el proceso.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:items-center">
          <div className="inline-flex min-h-14 w-full min-w-72 items-center justify-center gap-3 rounded-full border border-[#36D9FF]/16 bg-[#36D9FF]/[0.045] px-6 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#F5F7FA] sm:w-auto">
            <span className="flex shrink-0 gap-0.5 text-[#F5B642]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="whitespace-nowrap">Reseñas reales destacadas</span>
          </div>
          <a
            href={reviewFormUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !min-h-14 w-full !min-w-64 !px-7 !py-3 text-[0.72rem] sm:w-auto"
          >
            <span className="whitespace-nowrap">Déjanos tu reseña</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between gap-5">
        <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-[#36D9FF]">
          Desliza las opiniones destacadas
        </p>
        {reviews.length > 1 ? (
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scrollReviews("previous")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:border-[#36D9FF]/60 hover:bg-[#36D9FF]/10"
              aria-label="Ver reseña anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollReviews("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#36D9FF]/35 bg-[#36D9FF]/10 text-white transition hover:border-[#36D9FF]/70 hover:bg-[#36D9FF]/18"
              aria-label="Ver reseña siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={railRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={review.name}
            data-review-card
            className="premium-card min-h-[280px] min-w-[86%] snap-start p-6 sm:min-w-[430px] lg:min-w-[390px]"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="text-xl font-extrabold leading-tight text-[#F5F7FA]">
                  {review.name}
                </h3>
                <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#36D9FF]">
                  {review.generation}
                </p>
              </div>
              <div
                className="flex shrink-0 gap-0.5 text-[#F5B642]"
                aria-label={`${review.rating}/5 experiencia general`}
              >
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="mt-7 text-base font-semibold leading-8 text-[#C8D0D8]">
              “{review.quote}”
            </blockquote>
          </article>
        ))}
      </div>
    </div>
  );
}
