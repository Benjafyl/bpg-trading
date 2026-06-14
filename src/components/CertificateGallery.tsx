"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Certificate = {
  title: string;
  label: string;
  image: string;
  format: string;
};

export function CertificateGallery({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeCertificate =
    activeIndex === null ? null : certificates[activeIndex] ?? null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? certificates.length - 1 : current - 1;
    });
  }, [certificates.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === certificates.length - 1 ? 0 : current + 1;
    });
  }, [certificates.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  return (
    <>
      <div className="mt-14 columns-1 gap-5 sm:columns-2 xl:columns-3">
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={certificate.title}
            certificate={certificate}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeCertificate ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado: ${activeCertificate.title}`}
          onMouseDown={closeLightbox}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col border border-[#36D9FF]/18 bg-[#050505] shadow-2xl shadow-black"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-5">
              <div className="min-w-0">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#36D9FF]">
                  {activeCertificate.label}
                </p>
                <h3 className="mt-1 truncate text-sm font-extrabold text-[#F5F7FA] md:text-base">
                  {activeCertificate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:border-[#36D9FF]/60 hover:bg-[#36D9FF]/10"
                aria-label="Cerrar certificado"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-[#08090a]">
              <Image
                src={activeCertificate.image}
                alt={activeCertificate.title}
                fill
                sizes="100vw"
                className="object-contain p-3 md:p-8"
                priority
              />
            </div>

            {certificates.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/70 text-white backdrop-blur transition hover:border-[#36D9FF]/60 hover:bg-[#36D9FF]/12 md:flex"
                  aria-label="Ver certificado anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/70 text-white backdrop-blur transition hover:border-[#36D9FF]/60 hover:bg-[#36D9FF]/12 md:flex"
                  aria-label="Ver certificado siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#A0A6B0] md:hidden">
                  <button type="button" onClick={showPrevious}>
                    Anterior
                  </button>
                  <span>
                    {(activeIndex ?? 0) + 1}/{certificates.length}
                  </span>
                  <button type="button" onClick={showNext}>
                    Siguiente
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  const isWide = certificate.format === "wide";

  return (
    <article className="premium-card reveal group mb-5 flex break-inside-avoid flex-col overflow-hidden transition duration-300 hover:-translate-y-2 hover:border-[#36D9FF]/45 hover:shadow-[0_26px_86px_rgba(54,217,255,0.12)]">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Abrir certificado ${certificate.title}`}
      >
        <div
          className={`relative bg-[#08090a] ${
            isWide ? "aspect-[1.52]" : "aspect-[0.78]"
          }`}
        >
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(54,217,255,0.18),transparent_36%)] opacity-0 transition group-hover:opacity-100" />
          <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <Expand className="h-4 w-4" />
          </div>
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition duration-300 group-hover:scale-[1.03] md:p-5"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#36D9FF]">
            {certificate.label}
          </p>
          <h3 className="mt-4 text-lg font-extrabold leading-snug text-[#F5F7FA]">
            {certificate.title}
          </h3>
        </div>
      </button>
    </article>
  );
}
