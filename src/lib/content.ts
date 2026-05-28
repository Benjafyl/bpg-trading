import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Brain,
  CandlestickChart,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Layers3,
  LineChart,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export const instagramUrl = "https://www.instagram.com/bpgtrading/?hl=es-la";

export const heroStats = [
  "4 semanas",
  "8 clases",
  "2 clases por semana",
  "Desde lo mas basico",
  "Enfoque en cuentas de fondeo",
];

export const audienceCards: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Desde cero",
    text: "Para personas que quieren aprender trading con una ruta clara antes de operar capital real.",
    icon: Layers3,
  },
  {
    title: "Base sin estructura",
    text: "Para traders que ya conocen conceptos, pero necesitan ordenar criterio, riesgo y ejecucion.",
    icon: ClipboardList,
  },
  {
    title: "Cuentas de fondeo",
    text: "Para quienes buscan preparar una operativa seria antes de enfrentar evaluaciones de fondeo.",
    icon: Trophy,
  },
  {
    title: "Riesgo y psicologia",
    text: "Para mejorar disciplina, gestion de perdida y toma de decisiones bajo presion.",
    icon: Brain,
  },
];

export const learningTopics: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Introduccion al trading",
    text: "Conceptos base, lenguaje del mercado y funcionamiento general.",
    icon: LineChart,
  },
  {
    title: "Brokers y plataformas",
    text: "Entorno operativo, herramientas y preparacion tecnica.",
    icon: Gauge,
  },
  {
    title: "Gestion de riesgo",
    text: "Reglas de exposicion, perdida maxima y control del capital.",
    icon: ShieldCheck,
  },
  {
    title: "Psicologia",
    text: "Disciplina, paciencia, sesgos y control emocional.",
    icon: Brain,
  },
  {
    title: "Estrategia",
    text: "Criterios para construir una operativa replicable.",
    icon: Target,
  },
  {
    title: "Accion del precio",
    text: "Lectura del grafico, estructura y zonas de decision.",
    icon: CandlestickChart,
  },
  {
    title: "Preparacion para fondeo",
    text: "Practica guiada y enfoque para reglas de evaluacion.",
    icon: CheckCircle2,
  },
];

export const programWeeks = [
  {
    week: "Semana 01",
    title: "Fundamentos",
    text: "Trading desde la base, conceptos principales, plataformas y preparacion del entorno de trabajo.",
  },
  {
    week: "Semana 02",
    title: "Lectura tecnica",
    text: "Accion del precio, estructura de mercado y lectura practica del grafico.",
  },
  {
    week: "Semana 03",
    title: "Riesgo y plan",
    text: "Gestion de riesgo, psicologia y construccion de un plan operativo propio.",
  },
  {
    week: "Semana 04",
    title: "Practica y fondeo",
    text: "Estrategia, revision guiada y preparacion responsable para cuentas de fondeo.",
  },
];

export const certificates = [
  {
    title: "Uprofit Program Completado",
    label: "Evaluacion completada",
    image: "/assets/certificate-uprofit-program.jpeg",
    format: "portrait",
  },
  {
    title: "My Funded Futures Challenge Completion",
    label: "Challenge completion",
    image: "/assets/certificate-my-funded-futures-upright.jpeg",
    format: "wide",
  },
  {
    title: "Apex Trader Funding 50K Rithmic Account",
    label: "Cuenta fondeada",
    image: "/assets/certificate-apex-rithmic.jpeg",
    format: "portrait",
  },
  {
    title: "Apex Trader Funding WealthCharts",
    label: "Cuenta fondeada",
    image: "/assets/certificate-apex-wealthcharts.jpeg",
    format: "portrait",
  },
  {
    title: "Alpha Futures Achievement",
    label: "Achievement",
    image: "/assets/certificate-alpha-futures.jpeg",
    format: "wide",
  },
  {
    title: "NEOMAAA Funded Trader",
    label: "Funded trader",
    image: "/assets/certificate-neomaaa-funded.jpeg",
    format: "wide",
  },
  {
    title: "NEOMAAA Phase Two Passed",
    label: "Phase two passed",
    image: "/assets/certificate-neomaaa-phase-two.jpeg",
    format: "wide",
  },
  {
    title: "Apex Trader Funding Payment",
    label: "Certificate of payment",
    image: "/assets/certificate-apex-payment.jpeg",
    format: "wide",
  },
  {
    title: "Uprofit Certificado de Retiro",
    label: "Retiro certificado",
    image: "/assets/certificate-uprofit-withdrawal.jpeg",
    format: "wide",
  },
  {
    title: "Santander Open Academy",
    label: "Curso terminado",
    image: "/assets/certificate-santander-academy-upright.jpeg",
    format: "wide",
  },
];

export const communityPlaceholders = [
  {
    title: "Alumno en proceso",
    text: "Espacio reservado para avances reales de alumnos, con autorizacion previa.",
    icon: Users,
  },
  {
    title: "Proximamente testimonios",
    text: "La seccion se completara cuando existan testimonios verificables.",
    icon: BarChart3,
  },
  {
    title: "Resultados autorizados",
    text: "Los resultados y avances se incorporaran sin promesas ni datos inventados.",
    icon: CheckCircle2,
  },
];
