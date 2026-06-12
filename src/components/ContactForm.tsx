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
  whatsapp: string;
  level: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  level: "Desde cero",
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
      `Nombre: ${form.name}`,
      `Correo: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Nivel: ${form.level}`,
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
          Nombre
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="field-control"
            placeholder="Tu nombre"
          />
        </label>
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
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          WhatsApp
          <input
            required
            value={form.whatsapp}
            onChange={(event) => updateField("whatsapp", event.target.value)}
            className="field-control"
            placeholder="+56 9..."
          />
        </label>
        <label className="field-label">
          Nivel de experiencia
          <select
            value={form.level}
            onChange={(event) => updateField("level", event.target.value)}
            className="field-control"
          >
            <option>Desde cero</option>
            <option>Básico</option>
            <option>Intermedio</option>
          </select>
        </label>
      </div>
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
