export const siteConfig = {
  name: "Percentil1",
  title: "Mentoría Percentil1 | Benjamín Page Trading",
  description:
    "Mentoría de trading para aprender desde lo más básico hasta preparar una operativa enfocada en cuentas de fondeo, gestión de riesgo, psicología y acción del precio.",
  shortDescription:
    "Programa guiado por Benjamín Page para aprender trading con estructura, riesgo, psicología y acción del precio.",
  locale: "es_CL",
  language: "es-CL",
  instagram: "https://www.instagram.com/bpgtrading/?hl=es-la",
};

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = configuredUrl || "http://localhost:3000";

  return new URL(url.endsWith("/") ? url : `${url}/`);
}
