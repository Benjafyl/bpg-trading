import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  experience?: unknown;
  budget?: unknown;
  message?: unknown;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[()\d\s-]{7,20}$/;

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  const data = {
    name: getString(payload.name),
    phone: getString(payload.phone),
    email: getString(payload.email),
    experience: getString(payload.experience),
    budget: getString(payload.budget),
    message: getString(payload.message) || "Sin mensaje adicional",
  };

  if (
    !data.name ||
    !data.phone ||
    !data.email ||
    !data.experience ||
    !data.budget
  ) {
    return { data, error: "Faltan campos obligatorios." };
  }

  if (!emailRegex.test(data.email)) {
    return { data, error: "El formato del correo no es válido." };
  }

  if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, "").length < 7) {
    return { data, error: "El formato del teléfono no es válido." };
  }

  return { data, error: null };
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }

  return value;
}

function createTransporter() {
  const port = Number(getRequiredEnv("SMTP_PORT"));

  if (!Number.isInteger(port)) {
    throw new Error("SMTP_PORT debe ser un número.");
  }

  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port,
    secure: getRequiredEnv("SMTP_SECURE") === "true",
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASSWORD"),
    },
  });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "El cuerpo de la solicitud no es válido." }, { status: 400 });
  }

  const { data, error } = validatePayload(payload);

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  const subject = "Nueva postulación Mentoría Percentil1";
  const body = [
    "Nueva postulación Mentoría Percentil1",
    "",
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    `Experiencia en trading: ${data.experience}`,
    `Presupuesto: ${data.budget}`,
    `Mensaje: ${data.message}`,
  ].join("\n");

  try {
    const transporter = createTransporter();
    const fromEmail = getRequiredEnv("CONTACT_FROM_EMAIL");
    const toEmail = getRequiredEnv("CONTACT_TO_EMAIL");

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text: body,
    });

    return Response.json({ ok: true });
  } catch (sendError) {
    console.error("Contact form email error:", sendError);

    return Response.json(
      { error: "No se pudo enviar la postulación." },
      { status: 500 },
    );
  }
}
