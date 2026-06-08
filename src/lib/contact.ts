export const WHATSAPP_NUMBER = "569XXXXXXXX"; // Cambia este numero por el WhatsApp real, sin + ni espacios.
export const CONTACT_EMAIL = "contacto@percentil1.cl"; // Cambia este correo si corresponde.
export const GOOGLE_REVIEW_FORM_URL = "https://forms.gle/REEMPLAZAR_AQUI"; // Reemplaza esta URL cuando el Google Form este creado.

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function hasValidWhatsAppNumber() {
  return !WHATSAPP_NUMBER.includes("X");
}
