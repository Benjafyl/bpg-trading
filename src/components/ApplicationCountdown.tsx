"use client";

import { useEffect, useMemo, useState } from "react";

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

export function ApplicationCountdown({
  deadlineIso,
  deadlineLabel,
}: {
  deadlineIso: string;
  deadlineLabel: string;
}) {
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCountdown(getCountdown(deadlineIso));
    }, 0);
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(deadlineIso));
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [deadlineIso]);

  const items = useMemo(
    () => [
      ["Días", countdown?.days],
      ["Horas", countdown?.hours],
      ["Min", countdown?.minutes],
      ["Seg", countdown?.seconds],
    ],
    [countdown],
  );

  return (
    <div
      id="segunda-generacion"
      className="premium-card mt-8 grid max-w-4xl scroll-mt-28 gap-5 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5"
    >
      <div>
        <p className="eyebrow mb-2">Segunda generación</p>
        <h2 className="font-display text-[clamp(1.25rem,2.6vw,2rem)] leading-tight text-[#F5F7FA]">
          Postulaciones hasta{" "}
          <span className="text-[#36D9FF]">{deadlineLabel}</span>
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#A0A6B0]">
          Postula antes del cierre y recibe la información de cupos, fechas y
          modalidad de la mentoría.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[auto_auto] sm:items-center md:grid-cols-1 lg:grid-cols-[auto_auto]">
        <div className="grid grid-cols-4 gap-2">
          {items.map(([label, value]) => (
            <div
              key={label}
              className="min-w-14 border border-[#36D9FF]/16 bg-[#36D9FF]/[0.035] px-2.5 py-2.5 text-center"
            >
              <p className="font-display text-xl leading-none text-[#F5F7FA]">
                {typeof value === "number" ? pad(value) : "--"}
              </p>
              <p className="mt-2 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] text-[#36D9FF]">
                {label}
              </p>
            </div>
          ))}
        </div>
        <a href="#contacto" className="btn-primary min-w-44 !min-h-12 !px-5 !py-3 text-[0.72rem]">
          Postular ahora
        </a>
      </div>
    </div>
  );
}
