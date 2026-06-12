import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mentoría Percentil1 | Benjamín Page Trading",
  description:
    "Mentoría de trading para aprender desde lo más básico hasta preparar una operativa enfocada en cuentas de fondeo, gestión de riesgo, psicología y acción del precio.",
  openGraph: {
    title: "Mentoría Percentil1 | Benjamín Page Trading",
    description:
      "Programa guiado por Benjamín Page para aprender trading con estructura, riesgo, psicología y acción del precio.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${sora.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
