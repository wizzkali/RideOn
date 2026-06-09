import { createFileRoute } from "@tanstack/react-router";
import { Plane, Wrench, Mountain, Users, Factory, Heart } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
const teamPhoto = { url: "/assets/placeholder.svg" };
const portraitPhoto = { url: "/assets/placeholder.svg" };
const chinaBg = { url: "/assets/placeholder.svg" };

const META: Record<Locale, { title: string; desc: string }> = {
  fr: {
    title: "À propos — Valentin & Miguel · Ride On Distribution",
    desc: "Découvrez Valentin et Miguel, fondateurs de Ride On Distribution. Du moto-cross aux visites d'usines en Chine, notre histoire.",
  },
  en: {
    title: "About — Valentin & Miguel · Ride On Distribution",
    desc: "Meet Valentin and Miguel, founders of Ride On Distribution. From motocross to factory visits in China — our story.",
  },
  es: {
    title: "Quiénes somos — Valentin & Miguel · Ride On Distribution",
    desc: "Conoce a Valentin y Miguel, fundadores de Ride On Distribution. Del motocross a las visitas de fábricas en China.",
  },
};

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  introTitle: string;
  introBody: string[];
  chinaTitle: string;
  chinaBody: string[];
  valuesTitle: string;
  cards: { title: string; text: string }[];
  photosTitle: string;
  photosSubtitle: string;
}> = {
  fr: {
    eyebrow: "Qui sommes-nous",
    title: "Valentin & Miguel,",
    titleAccent: "deux passionnés.",
    subtitle:
      "Ride On Distribution, c'est avant tout l'histoire de deux amis tombés dans le moto-cross dès l'enfance, qui ont décidé de tout miser sur la moto électrique.",
    introTitle: "Notre parcours",
    introBody: [
      "Valentin et Miguel se sont rencontrés sur les circuits de moto-cross. Pendant des années, c'est notre terrain de jeu : entraînements, compétitions, mécanique le soir au garage. La moto, c'est notre langue commune.",
      "Avec l'arrivée de l'électrique, on a vite vu le potentiel : couple instantané, silence total, accès à des zones interdites aux thermiques. On a voulu apporter ça en France et en Espagne — sérieusement, avec un vrai SAV et de vrais essais.",
    ],
    chinaTitle: "Notre voyage en Chine",
    chinaBody: [
      "Pour être sûrs de distribuer la meilleure machine, on est partis directement à la source. Direction la Chine, plusieurs semaines à visiter les usines, rencontrer les ingénieurs, tester les prototypes sur place.",
      "On a sélectionné 79Bike après avoir comparé les ateliers, les chaînes d'assemblage, les contrôles qualité. On a touché les batteries, démonté les moteurs, roulé sur les pistes d'essai du constructeur. C'est cette confiance terrain qui nous permet aujourd'hui de garantir chaque moto qu'on livre.",
    ],
    valuesTitle: "Ce qui nous anime",
    cards: [
      { title: "Moto-cross d'origine", text: "Notre ADN. On connaît la mécanique, le pilotage et ce qu'une moto doit encaisser." },
      { title: "Sélection terrain", text: "Voyages en Chine, visites d'usines, tests prolongés. On ne distribue que ce qu'on roulerait nous-mêmes." },
      { title: "Service de proximité", text: "Atelier mécanique, randonnées guidées, conseil personnalisé. Pas un site web : une équipe." },
      { title: "Passion avant tout", text: "On vit la moto au quotidien. Chaque client devient un rider qu'on accompagne." },
    ],
    photosTitle: "En images",
    photosSubtitle: "Photos du voyage en Chine et des coulisses ",
  },
  en: {
    eyebrow: "Who we are",
    title: "Valentin & Miguel,",
    titleAccent: "two riders.",
    subtitle:
      "Ride On Distribution is first and foremost the story of two friends who grew up on motocross tracks and decided to go all-in on electric.",
    introTitle: "Our background",
    introBody: [
      "Valentin and Miguel met on motocross tracks. For years, that was our playground: training, racing, late-night garage sessions. Bikes are our common language.",
      "When electric arrived, we saw the potential right away — instant torque, total silence, access to areas combustion bikes can't reach. We wanted to bring that to France and Spain, properly, with real service and real test rides.",
    ],
    chinaTitle: "Our trip to China",
    chinaBody: [
      "To make sure we'd distribute the best machine, we went straight to the source. We spent several weeks in China visiting factories, meeting engineers, testing prototypes on site.",
      "We picked 79Bike after comparing workshops, assembly lines and quality controls. We handled the batteries, stripped down the motors, rode the manufacturer's test tracks. That hands-on confidence is what backs every bike we deliver today.",
    ],
    valuesTitle: "What drives us",
    cards: [
      { title: "Motocross roots", text: "Our DNA. We know the mechanics, the riding and what a bike has to take." },
      { title: "Hand-picked", text: "Trips to China, factory visits, extended testing. We only distribute what we'd ride ourselves." },
      { title: "Local service", text: "Workshop, guided tours, personal advice. Not a website: a team." },
      { title: "Passion first", text: "We live bikes every day. Every customer becomes a rider we ride with." },
    ],
    photosTitle: "In pictures",
    photosSubtitle: "Photos from the China trip and behind the scenes — coming soon.",
  },
  es: {
    eyebrow: "Quiénes somos",
    title: "Valentin y Miguel,",
    titleAccent: "dos apasionados.",
    subtitle:
      "Ride On Distribution es ante todo la historia de dos amigos que crecieron en el motocross y decidieron apostarlo todo por la moto eléctrica.",
    introTitle: "Nuestra trayectoria",
    introBody: [
      "Valentin y Miguel se conocieron en los circuitos de motocross. Durante años, ese fue nuestro terreno de juego: entrenos, competiciones, mecánica de noche en el garaje. La moto es nuestro idioma común.",
      "Con la llegada de la eléctrica, vimos enseguida el potencial: par instantáneo, silencio total, acceso a zonas prohibidas a las térmicas. Quisimos traer eso a Francia y España, en serio, con un SAT real y pruebas reales.",
    ],
    chinaTitle: "Nuestro viaje a China",
    chinaBody: [
      "Para asegurarnos de distribuir la mejor máquina, fuimos directos a la fuente. Varias semanas en China visitando fábricas, conociendo a los ingenieros y probando prototipos sobre el terreno.",
      "Elegimos 79Bike tras comparar talleres, cadenas de montaje y controles de calidad. Tocamos las baterías, desmontamos los motores, rodamos en las pistas del fabricante. Esa confianza de campo es lo que respalda cada moto que entregamos.",
    ],
    valuesTitle: "Lo que nos mueve",
    cards: [
      { title: "Raíces motocross", text: "Nuestro ADN. Conocemos la mecánica, el pilotaje y lo que una moto debe aguantar." },
      { title: "Selección de campo", text: "Viajes a China, visitas de fábricas, pruebas prolongadas. Solo distribuimos lo que rodaríamos nosotros." },
      { title: "Servicio cercano", text: "Taller, rutas guiadas, asesoramiento personal. No una web: un equipo." },
      { title: "Pasión primero", text: "Vivimos la moto a diario. Cada cliente se convierte en un rider al que acompañamos." },
    ],
    photosTitle: "En imágenes",
    photosSubtitle: "Fotos del viaje a China y del detrás de escena — próximamente.",
  },
};

export const Route = createFileRoute("/$lang/a-propos")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const m = META[l];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.desc },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.desc },
        ...ogUrlMeta("/a-propos", l),
      ],
      links: hreflangLinks("/a-propos", l),
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { locale } = useI18n();
  const c = CONTENT[locale];
  const ICONS = [Mountain, Factory, Wrench, Heart];
  return (
    <SiteLayout>
      <section className="relative w-full overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0">
          <img src={portraitPhoto.url} alt="" aria-hidden className="w-full h-full object-cover scale-110 blur-2xl opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/60 to-zinc-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            {c.eyebrow && (
              <div className="inline-flex w-fit items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-zinc-950/60 border border-brand-cyan/40 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] mb-6">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-60 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-clip-text text-transparent">{c.eyebrow}</span>
              </div>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              {c.title} <span className="text-brand-cyan">{c.titleAccent}</span>
            </h1>
            <p className="text-lg text-zinc-200 max-w-xl text-pretty mx-auto md:mx-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{c.subtitle}</p>
          </div>
          <div className="order-1 md:order-2 mx-auto w-full max-w-md">
            <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <img src={portraitPhoto.url} alt="Valentin & Miguel" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={chinaBg.url}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-[25%_85%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black/70 to-zinc-950" />
        </div>
        <div className="relative">
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="size-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center backdrop-blur">
              <Users className="size-6 text-brand-cyan" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{c.introTitle}</h2>
              {c.introBody.map((p) => (
                <p key={p} className="text-zinc-300 leading-relaxed mb-4 text-pretty">{p}</p>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-4 pb-24 grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden border border-zinc-800">
              <img src={teamPhoto.url} alt="Valentin & Miguel à l'usine 79Bike en Chine" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="size-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-6">
                <Plane className="size-6 text-brand-cyan" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{c.chinaTitle}</h2>
              {c.chinaBody.map((p) => (
                <p key={p} className="text-zinc-300 leading-relaxed mb-4 text-pretty">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-10">{c.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.cards.map((card, i) => {
              const Icon = ICONS[i] ?? Mountain;
              return (
                <div key={card.title} className="group p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)]">
                  <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                    <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-white font-medium text-[15px] tracking-tight mb-2">{card.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{c.photosTitle}</h2>
          <p className="text-zinc-400 mb-10 max-w-2xl">{c.photosSubtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-zinc-600">Photo {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactForm contextLabel="À propos" />
    </SiteLayout>
  );
}