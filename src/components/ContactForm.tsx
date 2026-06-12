"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import {
  buildWhatsAppUrl,
  CONTACT_EMAIL,
  hasValidWhatsAppNumber,
} from "@/lib/contact";

type FormState = {
  name: string;
  email: string;
  phone: string;
  tradingExperience: string;
  investmentBudget: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  tradingExperience: "Básico",
  investmentBudget: "Sí, cuento con 150-300 USD",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Hola, quiero postular a la Mentoría Percentil1.",
      "",
      `Nombres: ${form.name}`,
      `Correo: ${form.email}`,
      `Número de teléfono: ${form.phone}`,
      `Experiencia en trading: ${form.tradingExperience}`,
      `Cuenta con 150 a 300 USD para educación y primera cuenta de fondeo: ${form.investmentBudget}`,
      `Mensaje: ${form.message || "Sin mensaje adicional"}`,
    ].join("\n");

    if (hasValidWhatsAppNumber()) {
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Postulación Mentoría Percentil1",
    )}&body=${encodeURIComponent(message)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Nombres
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field-control"
            placeholder="Tu nombre"
          />
        </label>
        <label className="field-label">
          Número de teléfono
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="field-control"
            placeholder="+56 9..."
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Correo
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="field-control"
            placeholder="tu@email.com"
          />
        </label>
        <label className="field-label">
          Experiencia en trading
          <select
            value={form.tradingExperience}
            onChange={(event) =>
              updateField("tradingExperience", event.target.value)
            }
            className="field-control"
          >
            <option>Básico</option>
            <option>Medio</option>
            <option>Avanzado</option>
          </select>
        </label>
      </div>
      <label className="field-label">
        Presupuesto
        <span className="max-w-2xl text-xs font-semibold normal-case leading-6 tracking-normal text-[#A0A6B0]">
          ¿Tienes entre 150 y 300 dólares para invertir en tu educación y
          primera cuenta de fondeo?
        </span>
        <select
          required
          value={form.investmentBudget}
          onChange={(event) => updateField("investmentBudget", event.target.value)}
          className="field-control"
        >
          <option>Sí, cuento con 150-300 USD</option>
          <option>No por ahora</option>
          <option>Necesito más información</option>
        </select>
      </label>
      <label className="field-label">
        Mensaje
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="field-control min-h-32 resize-y"
          placeholder="Cuéntanos qué buscas aprender o qué experiencia tienes."
        />
      </label>
      <div className="flex flex-col gap-4 pt-2 sm:flex-row">
        <button type="submit" className="btn-primary group sm:min-w-60">
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          Enviar postulación
        </button>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn-secondary sm:min-w-44">
          <Mail className="h-4 w-4" />
          Usar correo
        </a>
      </div>
    </form>
  );
}
