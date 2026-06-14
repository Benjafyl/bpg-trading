# Percentil1 Landing

Landing page de la Mentoría Percentil1 de Benjamín Page.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Producción

La aplicación corre como servidor Next.js standalone porque incluye la ruta API `/api/contact`.

Variables requeridas:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASSWORD=
CONTACT_TO_EMAIL=Benjapageg@gmail.com
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://percentil1.cl
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_MIN_SCORE=0.5
```

Build:

```bash
npm run build
```
