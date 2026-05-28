import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Menu,
  MessageCircle,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { buildWhatsAppUrl } from "@/lib/contact";
import {
  audienceCards,
  certificates,
  communityPlaceholders,
  heroStats,
  instagramUrl,
  learningTopics,
  programWeeks,
} from "@/lib/content";

const whatsappIntro =
  "Hola, quiero recibir informacion sobre la Mentoria Percentil1.";
const profileImage = "/assets/benjamin-page-profile.png"; // Cambia esta ruta si reemplazas la foto oficial.

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#F2EFE3]">
      <Header />
      <Hero />
      <AudienceSection />
      <LearningSection />
      <ProgramSection />
      <AboutSection />
      <CertificatesSection />
      <CommunitySection />
      <FinalCta />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/86 backdrop-blur-xl">
      <div className="container-shell flex min-h-[72px] items-center justify-between gap-4 py-3">
        <a href="#inicio" className="font-display shrink-0 text-2xl text-white">
          PERCENTIL1
        </a>
        <nav className="hidden items-center gap-7 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-white/64 lg:flex">
          <a className="px-1 py-2 transition hover:text-white" href="#inicio">
            Inicio
          </a>
          <a className="px-1 py-2 transition hover:text-white" href="#mentoria">
            Mentoria
          </a>
          <a className="px-1 py-2 transition hover:text-white" href="#certificaciones">
            Certificaciones
          </a>
          <a className="px-1 py-2 transition hover:text-white" href="#contacto">
            Contacto
          </a>
        </nav>
        <a href="#contacto" className="btn-primary header-cta min-h-11 min-w-44 px-5 py-2 text-[0.7rem]">
          Quiero postular
        </a>
        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-white/15 bg-white/[0.04] text-white transition hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 mt-3 w-64 border border-white/12 bg-[#090909] p-3 shadow-2xl shadow-black/60">
            {[
              ["Inicio", "#inicio"],
              ["Mentoria", "#mentoria"],
              ["Certificaciones", "#certificaciones"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block border-b border-white/8 px-3 py-4 text-sm font-black uppercase tracking-[0.12em] text-white/78 last:border-b-0 hover:text-white"
              >
                {label}
              </a>
            ))}
            <a href="#contacto" className="btn-primary mt-3 min-h-12 w-full text-[0.72rem]">
              Quiero postular
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate pt-28 md:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_16%,rgba(0,159,227,0.24),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(245,182,66,0.16),transparent_26%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container-shell grid min-h-[calc(100vh-9rem)] items-center gap-14 pb-24 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12">
        <div className="reveal max-w-3xl">
          <p className="eyebrow mb-6">Mentoria de trading / Benjamin Page</p>
          <h1 className="font-display text-[clamp(3.85rem,12.5vw,9.6rem)] leading-[0.96] text-white md:leading-[0.9]">
            MENTORIA
            <span className="block text-[#F2EFE3]">PERCENTIL1</span>
          </h1>
          <div className="mt-10 max-w-2xl border-l-2 border-[#F5B642] pl-5 md:pl-7">
            <p className="text-balance text-[1.65rem] font-semibold leading-[1.16] text-white md:text-4xl md:leading-[1.12]">
              Aprende trading desde cero hasta preparar tu operativa para
              cuentas de fondeo.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#B8B8B8] md:text-lg md:leading-9">
              Un programa guiado por Benjamin Page para personas que quieren
              aprender estructura, gestion de riesgo, psicologia y accion del
              precio de forma practica.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            {heroStats.map((stat) => (
              <span
                key={stat}
                className="border border-white/14 bg-white/[0.04] px-3.5 py-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white/82"
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="btn-primary">
              Postular a la mentoria
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#programa" className="btn-secondary">
              Ver programa
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>

        <MarketVisual />
      </div>
    </section>
  );
}

function MarketVisual() {
  return (
    <div className="reveal relative mx-auto w-full max-w-[760px] lg:-ml-2 xl:-ml-8">
      <div className="premium-card relative aspect-[1.78] overflow-hidden">
        <Image
          src="/assets/hero-trading-lab.png"
          alt="Visual de trading Percentile Trading Lab"
          fill
          priority
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 54vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <section id="mentoria" className="section-pad border-y border-white/10">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Para quien es"
          title="Una ruta para aprender con estructura, no con ruido."
          text="La mentoria esta pensada para construir criterio operativo desde fundamentos y avanzar hacia una preparacion responsable para evaluaciones de fondeo."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="premium-card reveal p-7">
              <Icon className="h-6 w-6 text-[#F5B642]" />
              <h3 className="mt-9 text-xl font-black leading-tight text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#B8B8B8]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningSection() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Que aprenderas"
          title="De los fundamentos a una operativa con reglas."
          text="El contenido cubre las bases tecnicas y mentales necesarias para tomar decisiones con mayor claridad. No se prometen resultados ni rentabilidad."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map(({ title, text, icon: Icon }, index) => (
            <article
              key={title}
              className={`premium-card reveal min-h-56 p-7 transition hover:border-[#009FE3]/45 ${
                index === learningTopics.length - 1
                  ? "sm:col-span-2 lg:col-span-3"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <Icon className="h-6 w-6 text-[#009FE3]" />
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="mt-9 text-xl font-black leading-tight text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#B8B8B8]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section id="programa" className="section-pad cream-panel">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Programa"
          title="4 semanas para ordenar tu proceso."
          text="Cada semana combina teoria, practica y criterios de revision para avanzar sin saltarse la base."
          dark
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {programWeeks.map((week) => (
            <article
              key={week.week}
              className="reveal border border-black/12 bg-[#050505] p-7 text-[#F2EFE3] shadow-2xl shadow-black/10"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F5B642]">
                {week.week}
              </p>
              <h3 className="font-display mt-9 text-[2.7rem] leading-[0.95] text-white">
                {week.title}
              </h3>
              <p className="mt-6 text-sm leading-7 text-[#B8B8B8]">
                {week.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre-benjamin" className="section-pad">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal">
          {profileImage ? (
            <div className="relative aspect-[4/5] overflow-hidden border border-white/12 bg-[#111111] shadow-2xl shadow-black/40">
              <Image
                src={profileImage}
                alt="Benjamin Page"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-[50%_28%]"
                priority={false}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-5 left-5 border border-white/12 bg-black/55 px-4 py-3 backdrop-blur">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#F5B642]">
                  BPG Trading
                </p>
                <p className="mt-1 text-sm font-black text-white">
                  Benjamin Page
                </p>
              </div>
            </div>
          ) : (
            <div className="premium-card relative aspect-[4/5] overflow-hidden p-8">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,182,66,0.16),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(0,159,227,0.26),transparent_28%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <p className="eyebrow">Benjamin Page</p>
                <div>
                  <p className="font-display text-[10rem] leading-[0.78] text-white">
                    BP
                  </p>
                  <p className="mt-5 max-w-xs text-sm leading-7 text-[#B8B8B8]">
                    Espacio preparado para insertar la foto oficial del mentor
                    cuando este disponible en assets.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="reveal">
          <p className="eyebrow mb-5">Sobre Benjamin Page</p>
          <h2 className="font-display text-[clamp(3.1rem,8vw,6.2rem)] leading-[1] text-white md:leading-[0.92]">
            FORMACION CON BASE SOLIDA
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#B8B8B8]">
            Benjamin Page es trader y mentor enfocado en formar alumnos desde
            una base solida, combinando gestion de riesgo, psicologia y lectura
            tecnica del mercado. Despues de anos de estudio y practica, logro
            consolidar una operativa rentable y hoy busca entregar una ruta
            clara para quienes quieren aprender trading de forma estructurada.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <Camera className="h-4 w-4" />
              Ver Instagram
            </a>
            <a href="#certificaciones" className="btn-secondary">
              Ver evidencia
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  return (
    <section
      id="certificaciones"
      className="section-pad border-y border-white/10 bg-[radial-gradient(circle_at_78%_18%,rgba(0,159,227,0.11),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(245,182,66,0.10),transparent_24%)]"
    >
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <SectionIntro
            eyebrow="Certificaciones y evidencia"
            title="Galeria de procesos completados."
            text="Certificaciones, desafios y procesos de fondeo completados por Benjamin Page. Evidencia visual presentada sin promesas de rentabilidad."
          />
          <div className="premium-card reveal p-5 md:p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["10", "Evidencias"],
                ["Fondeo", "Enfoque"],
                ["Riesgo", "Base"],
              ].map(([value, label]) => (
                <div key={label} className="border border-white/10 p-4">
                  <p className="font-display text-4xl leading-none text-white">
                    {value}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#F5B642]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#B8B8B8]">
              Las imagenes se muestran como respaldo editable de formacion,
              evaluaciones y experiencia. El trading implica riesgo y no
              garantiza resultados.
            </p>
          </div>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.title} {...certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({
  title,
  label,
  image,
  format,
}: {
  title: string;
  label: string;
  image: string;
  format: string;
}) {
  const isWide = format === "wide";

  return (
    <article
      className="premium-card reveal group mb-5 flex break-inside-avoid flex-col overflow-hidden transition duration-300 hover:-translate-y-2 hover:border-[#F5B642]/45"
    >
      <div
        className={`relative bg-[#0f0f0f] ${
          isWide ? "aspect-[1.52]" : "aspect-[0.78]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,159,227,0.18),transparent_36%)] opacity-0 transition group-hover:opacity-100" />
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-[1.03] md:p-5"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#F5B642]">
          {label}
        </p>
        <h3 className="mt-4 text-lg font-black leading-snug text-white">
          {title}
        </h3>
      </div>
    </article>
  );
}

function CommunitySection() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Casos de exito / Comunidad"
          title="Seccion editable para avances reales."
          text="Este bloque queda preparado para incorporar testimonios cuando existan autorizaciones y evidencia verificable."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {communityPlaceholders.map(({ title, text, icon: Icon }) => (
            <article key={title} className="premium-card reveal p-7">
              <Icon className="h-6 w-6 text-[#009FE3]" />
              <h3 className="mt-9 text-xl font-black leading-tight text-white">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#B8B8B8]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cream-panel py-20">
      <div className="container-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow !text-[#050505]/70">Postulacion</p>
          <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.8rem,7vw,5.8rem)] leading-[1] lg:leading-[0.92]">
            QUIERES APRENDER TRADING CON ESTRUCTURA?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-black/68">
            Postula a la mentoria y recibe informacion sobre cupos, fechas y
            modalidad.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a href={buildWhatsAppUrl(whatsappIntro)} className="btn-primary !min-w-56 !border-black !bg-black !px-8 !text-white hover:!bg-[#111111]">
            <MessageCircle className="h-4 w-4" />
            Hablar por WhatsApp
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-secondary !min-w-56 !border-black/20 !bg-transparent !px-8 !text-black hover:!bg-black/5">
            <Camera className="h-4 w-4" />
            Contactar por Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="section-pad">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
        <SectionIntro
          eyebrow="Contacto"
          title="Postula a la Mentoria Percentil1."
          text="Completa tus datos y se generara un mensaje prellenado para WhatsApp. Si el numero aun no esta configurado, el formulario usara correo como alternativa."
        />
        <div className="premium-card reveal p-5 md:p-8 lg:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-shell grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-display text-4xl text-white">PERCENTIL1</p>
          <div className="mt-5 flex gap-4 text-sm font-bold text-white/62">
            <a className="hover:text-white" href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="hover:text-white" href="#contacto">
              Contacto
            </a>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-[#B8B8B8]">
          El trading implica riesgo y no garantiza resultados. La mentoria
          tiene fines educativos y no constituye asesoria financiera
          personalizada. Los resultados dependen de la experiencia, disciplina y
          gestion de riesgo de cada persona.
        </p>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  dark,
}: {
  eyebrow: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal max-w-3xl">
      <p className={`eyebrow mb-5 ${dark ? "!text-black/64" : ""}`}>{eyebrow}</p>
      <h2
        className={`font-display text-[clamp(2.85rem,7vw,5.9rem)] leading-[1] md:leading-[0.92] ${
          dark ? "text-[#050505]" : "text-white"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-7 max-w-2xl text-base leading-8 md:text-lg md:leading-9 ${
          dark ? "text-black/66" : "text-[#B8B8B8]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
