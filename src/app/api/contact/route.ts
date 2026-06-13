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
  recaptchaToken?: unknown;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[()\d\s-]{7,20}$/;
const recaptchaAction = "contact_form";
const defaultRecaptchaMinScore = 0.5;

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

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

function getOptionalEnv(name: string) {
  return process.env[name]?.trim() ?? "";
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

function getRecaptchaMinScore() {
  const value = getOptionalEnv("RECAPTCHA_MIN_SCORE");

  if (!value) {
    return defaultRecaptchaMinScore;
  }

  const score = Number(value);

  if (!Number.isFinite(score) || score < 0 || score > 1) {
    return defaultRecaptchaMinScore;
  }

  return score;
}

async function verifyRecaptcha(token: string, request: Request) {
  const secret = getRequiredEnv("RECAPTCHA_SECRET_KEY");
  const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as RecaptchaVerifyResponse;
  const minScore = getRecaptchaMinScore();

  return (
    result.success === true &&
    result.action === recaptchaAction &&
    typeof result.score === "number" &&
    result.score >= minScore
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildTextEmail(data: {
  name: string;
  phone: string;
  email: string;
  experience: string;
  budget: string;
  message: string;
}) {
  return [
    "Nueva postulación Mentoría Percentil1",
    "",
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    `Experiencia en trading: ${data.experience}`,
    `Presupuesto: ${data.budget}`,
    `Mensaje: ${data.message}`,
  ].join("\n");
}

function buildHtmlEmail(data: {
  name: string;
  phone: string;
  email: string;
  experience: string;
  budget: string;
  message: string;
}) {
  const safeData = {
    name: escapeHtml(data.name),
    phone: escapeHtml(data.phone),
    email: escapeHtml(data.email),
    experience: escapeHtml(data.experience),
    budget: escapeHtml(data.budget),
    message: escapeHtml(data.message).replace(/\n/g, "<br />"),
  };
  const telHref = data.phone.replace(/[^\d+]/g, "");
  const mailHref = encodeURIComponent(data.email);

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nueva postulación Mentoría Percentil1</title>
  </head>
  <body style="margin:0;background:#050505;padding:0;font-family:Arial,Helvetica,sans-serif;color:#f5f7fa;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Nueva postulación recibida desde la landing de Percentil1.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050505;margin:0;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#0d0d0f;border:1px solid rgba(54,217,255,0.24);border-radius:18px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,0.45);">
            <tr>
              <td style="padding:34px 34px 28px;background:linear-gradient(135deg,#050505 0%,#0d0d0f 54%,#061b22 100%);border-bottom:1px solid rgba(54,217,255,0.18);">
                <p style="margin:0 0 14px;color:#36d9ff;font-size:12px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                  PERCENTIL<span style="color:#f5f7fa;">1</span> / POSTULACIÓN
                </p>
                <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.05;font-weight:900;letter-spacing:-0.5px;">
                  Nueva postulación<br />
                  <span style="color:#a0a6b0;">Mentoría Percentil</span><span style="color:#36d9ff;">1</span>
                </h1>
                <p style="margin:18px 0 0;color:#b8b8b8;font-size:15px;line-height:1.7;">
                  Un nuevo interesado completó el formulario de contacto de la landing.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 34px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:0 0 16px;">
                      <div style="border:1px solid rgba(54,217,255,0.18);background:#121316;border-radius:14px;padding:20px;">
                        <p style="margin:0 0 8px;color:#36d9ff;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Nombre</p>
                        <p style="margin:0;color:#ffffff;font-size:22px;line-height:1.35;font-weight:800;">${safeData.name}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="50%" style="padding:0 8px 16px 0;vertical-align:top;">
                      <div style="height:100%;border:1px solid rgba(255,255,255,0.09);background:#101113;border-radius:14px;padding:18px;">
                        <p style="margin:0 0 8px;color:#f5b642;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Teléfono</p>
                        <a href="tel:${telHref}" style="color:#ffffff;font-size:17px;line-height:1.45;font-weight:800;text-decoration:none;">${safeData.phone}</a>
                      </div>
                    </td>
                    <td width="50%" style="padding:0 0 16px 8px;vertical-align:top;">
                      <div style="height:100%;border:1px solid rgba(255,255,255,0.09);background:#101113;border-radius:14px;padding:18px;">
                        <p style="margin:0 0 8px;color:#f5b642;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Correo</p>
                        <a href="mailto:${mailHref}" style="color:#36d9ff;font-size:17px;line-height:1.45;font-weight:800;text-decoration:none;">${safeData.email}</a>
                      </div>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="50%" style="padding:0 8px 16px 0;vertical-align:top;">
                      <div style="height:100%;border:1px solid rgba(255,255,255,0.09);background:#101113;border-radius:14px;padding:18px;">
                        <p style="margin:0 0 8px;color:#36d9ff;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Experiencia</p>
                        <p style="margin:0;color:#ffffff;font-size:17px;line-height:1.45;font-weight:800;">${safeData.experience}</p>
                      </div>
                    </td>
                    <td width="50%" style="padding:0 0 16px 8px;vertical-align:top;">
                      <div style="height:100%;border:1px solid rgba(255,255,255,0.09);background:#101113;border-radius:14px;padding:18px;">
                        <p style="margin:0 0 8px;color:#36d9ff;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Presupuesto</p>
                        <p style="margin:0;color:#ffffff;font-size:17px;line-height:1.45;font-weight:800;">${safeData.budget}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                <div style="border:1px solid rgba(245,182,66,0.25);background:#15120b;border-radius:14px;padding:20px;margin-bottom:22px;">
                  <p style="margin:0 0 10px;color:#f5b642;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Mensaje</p>
                  <p style="margin:0;color:#f5f7fa;font-size:16px;line-height:1.75;">${safeData.message}</p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:0 34px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:18px 0 0;border-top:1px solid rgba(255,255,255,0.08);">
                      <p style="margin:0;color:#7d858f;font-size:12px;line-height:1.7;">
                        Correo generado automáticamente desde el formulario de postulación de Percentil1.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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

  const recaptchaToken = getString(payload.recaptchaToken);

  if (!recaptchaToken) {
    return Response.json(
      { error: "No se pudo validar reCAPTCHA." },
      { status: 400 },
    );
  }

  try {
    const recaptchaIsValid = await verifyRecaptcha(recaptchaToken, request);

    if (!recaptchaIsValid) {
      return Response.json(
        { error: "No se pudo validar reCAPTCHA." },
        { status: 400 },
      );
    }
  } catch (recaptchaError) {
    console.error("reCAPTCHA verification error:", recaptchaError);

    return Response.json(
      { error: "No se pudo validar reCAPTCHA." },
      { status: 500 },
    );
  }

  const subject = "Nueva postulación Mentoría Percentil1";
  const body = buildTextEmail(data);
  const html = buildHtmlEmail(data);

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
      html,
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
