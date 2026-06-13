export const WHATSAPP_NUMBER = "56978771813"; // Cambia este número por el WhatsApp real, sin + ni espacios.
export const CONTACT_EMAIL = "Benjapageg@gmail.com"; // Correo público usado para mailto alternativo.
export const GOOGLE_REVIEW_FORM_URL = "https://forms.gle/bFtPFNKkpiYpZXLG6"; // Reemplaza esta URL si cambia el Google Form.

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function hasValidWhatsAppNumber() {
  return !WHATSAPP_NUMBER.includes("X");
}
