"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(deadlineIso: string): CountdownParts {
  const diff = Math.max(0, new Date(deadlineIso).getTime() - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function ApplicationOpeningBanner({
  generation,
  deadlineIso,
  deadlineLabel,
}: {
  generation: string;
  deadlineIso: string;
  deadlineLabel: string;
}) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdown(deadlineIso),
  );

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown(deadlineIso));
    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [deadlineIso]);

  return (
    <div
      id="tercera-generacion"
      className="premium-card mt-8 grid max-w-4xl scroll-mt-28 gap-5 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5"
    >
      <div>
        <p className="eyebrow mb-2">{generation}</p>
        <h2 className="font-display text-[clamp(1.35rem,2.8vw,2.2rem)] leading-tight text-[#F5F7FA]">
          Inscripciones abiertas hasta el{" "}
          <span className="text-[#36D9FF]">{deadlineLabel}</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#A0A6B0]">
          La próxima generación de Percentil1 mantiene sus postulaciones
          abiertas hasta el {deadlineLabel}.
        </p>

        <div className="mt-4 grid grid-cols-4 gap-2 sm:max-w-xl">
          {[
            ["Días", countdown.days],
            ["Horas", countdown.hours],
            ["Min", countdown.minutes],
            ["Seg", countdown.seconds],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border border-[#36D9FF]/16 bg-[#36D9FF]/[0.035] px-2.5 py-2 text-center"
            >
              <p className="font-display text-xl leading-none text-[#F5F7FA]">
                {pad(value as number)}
              </p>
              <p className="mt-2 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] text-[#36D9FF]">
                {label}
              </p>
            </div>
          ))}
        </div>
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
