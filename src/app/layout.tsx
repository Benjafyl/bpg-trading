import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mentoria Percentil1 | Benjamin Page Trading",
  description:
    "Mentoria de trading para aprender desde lo mas basico hasta preparar una operativa enfocada en cuentas de fondeo, gestion de riesgo, psicologia y accion del precio.",
  openGraph: {
    title: "Mentoria Percentil1 | Benjamin Page Trading",
    description:
      "Programa guiado por Benjamin Page para aprender trading con estructura, riesgo, psicologia y accion del precio.",
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
      className={`${inter.variable} ${anton.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
