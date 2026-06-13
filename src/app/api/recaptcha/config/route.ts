export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const siteKey =
    process.env.RECAPTCHA_SITE_KEY?.trim() ??
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ??
    "";

  return Response.json({ siteKey });
}
