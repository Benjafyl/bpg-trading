import { ArrowUpRight } from "lucide-react";

export function ApplicationOpeningBanner({
  generation,
  openingDateLabel,
}: {
  generation: string;
  openingDateLabel: string;
}) {
  return (
    <div
      id="tercera-generacion"
      className="premium-card mt-8 grid max-w-4xl scroll-mt-28 gap-5 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5"
    >
      <div>
        <p className="eyebrow mb-2">{generation}</p>
        <h2 className="font-display text-[clamp(1.35rem,2.8vw,2.2rem)] leading-tight text-[#F5F7FA]">
          Inscripciones abiertas desde{" "}
          <span className="text-[#36D9FF]">{openingDateLabel}</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#A0A6B0]">
          La próxima generación de Percentil1 abre postulaciones el{" "}
          {openingDateLabel}. Deja tus datos para recibir información de cupos,
          fechas y modalidad.
        </p>
      </div>

      <a
        href="#contacto"
        className="btn-primary min-w-44 !min-h-12 !px-5 !py-3 text-[0.72rem]"
      >
        Postular
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
