import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Cog, Battery, Zap, ShieldCheck, Gauge } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VideoHero } from "@/components/VideoHero";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
import heroVideo from "@/assets/atelier-hero.mov.asset.json";
import atelierHands from "@/assets/atelier-hands-v3.jpg.asset.json";

const META: Record<Locale, { title: string; desc: string }> = {
  fr: {
    title: "Atelier mécanique — Ride On Distribution",
    desc: "Notre atelier mécanique : entretien, réparation, préparation et tuning pour motos électriques 79Bike. Barcelonne et Saint-Gaudens.",
  },
  en: {
    title: "Workshop — Ride On Distribution",
    desc: "Our mechanical workshop: service, repair, prep and tuning for 79Bike electric motorcycles. Barcelonne and Saint-Gaudens.",
  },
  es: {
    title: "Taller mecánico — Ride On Distribution",
    desc: "Nuestro taller mecánico: mantenimiento, reparación, preparación y tuning para motos eléctricas 79Bike. Barcelona y Saint-Gaudens.",
  },
};

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  servicesHead: string;
  servicesHeadMuted: string;
  servicesTitle: string;
  services: { title: string; text: string }[];
  processTitle: string;
  process: { step: string; title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}> = {
  fr: {
    eyebrow: "Atelier officiel",
    title: "Atelier",
    titleAccent: "mécanique.",
    subtitle:
      "Entretien, réparation, préparation. Notre atelier à Barcelonne et Saint-Gaudens prend en charge votre moto électrique, du contrôle annuel au montage de pièces performance.",
    servicesHead: "L'expertise atelier,",
    servicesHeadMuted: "au service de votre machine.",
    servicesTitle: "Nos prestations",
    services: [
      { title: "Entretien complet", text: "Contrôle 360° : chaîne, freins, suspensions, électronique, mise à jour firmware." },
      { title: "Diagnostic moteur", text: "Banc de diagnostic 79Bike. Identification précise des défauts moteur et contrôleur." },
      { title: "Batterie & BMS", text: "Test capacité, équilibrage cellules, remplacement modules et reconditionnement." },
      { title: "Préparation cross", text: "Mappings spécifiques, suspensions, protections, équipement compétition." },
      { title: "Garantie 79Bike", text: "Atelier agréé : interventions sous garantie constructeur 2 ans." },
      { title: "Performance & tuning", text: "Optimisation puissance, autonomie et géométrie selon votre pratique." },
    ],
    processTitle: "Comment ça marche",
    process: [
      { step: "01", title: "Prise de RDV", text: "Contact par téléphone ou formulaire, créneau sous 48h." },
      { step: "02", title: "Diagnostic", text: "Inspection complète et devis détaillé avant intervention." },
      { step: "03", title: "Intervention", text: "Réparation par techniciens formés 79Bike, pièces d'origine." },
      { step: "04", title: "Restitution", text: "Essai de validation et remise en main avec rapport d'atelier." },
    ],
    ctaTitle: "Besoin d'un rendez-vous atelier ?",
    ctaText: "Décrivez votre demande, on revient vers vous sous 24h.",
    ctaButton: "Contacter l'atelier",
  },
  en: {
    eyebrow: "Official workshop",
    title: "Mechanical",
    titleAccent: "workshop.",
    subtitle:
      "Service, repair, prep. Our Barcelonne and Saint-Gaudens workshop handles your electric bike, from annual checkup to performance parts install.",
    servicesHead: "Workshop expertise,",
    servicesHeadMuted: "at the service of your machine.",
    servicesTitle: "Services",
    services: [
      { title: "Full service", text: "360° check: chain, brakes, suspension, electronics, firmware update." },
      { title: "Motor diagnostic", text: "79Bike diagnostic bench. Accurate motor and controller fault detection." },
      { title: "Battery & BMS", text: "Capacity test, cell balancing, module replacement and reconditioning." },
      { title: "Race prep", text: "Specific mappings, suspension, protections, race-spec gear." },
      { title: "79Bike warranty", text: "Approved workshop: interventions under 2-year manufacturer warranty." },
      { title: "Performance tuning", text: "Power, range and geometry optimised for your riding style." },
    ],
    processTitle: "How it works",
    process: [
      { step: "01", title: "Book", text: "Phone or form, slot within 48h." },
      { step: "02", title: "Diagnostic", text: "Full inspection and detailed quote before any work." },
      { step: "03", title: "Service", text: "Work by 79Bike-trained technicians, OEM parts." },
      { step: "04", title: "Handover", text: "Validation ride and handover with workshop report." },
    ],
    ctaTitle: "Need a workshop appointment?",
    ctaText: "Describe your request — we reply within 24h.",
    ctaButton: "Contact the workshop",
  },
  es: {
    eyebrow: "Taller oficial",
    title: "Taller",
    titleAccent: "mecánico.",
    subtitle:
      "Mantenimiento, reparación, preparación. Nuestro taller en Barcelona y Saint-Gaudens se ocupa de tu moto eléctrica, del control anual al montaje de piezas de alto rendimiento.",
    servicesHead: "La experiencia del taller,",
    servicesHeadMuted: "al servicio de tu máquina.",
    servicesTitle: "Nuestros servicios",
    services: [
      { title: "Mantenimiento completo", text: "Control 360°: cadena, frenos, suspensiones, electrónica, firmware." },
      { title: "Diagnóstico motor", text: "Banco de diagnóstico 79Bike. Detección precisa de fallos." },
      { title: "Batería & BMS", text: "Test de capacidad, balanceo de celdas, sustitución de módulos." },
      { title: "Preparación cross", text: "Mapeos específicos, suspensiones, protecciones, equipo competición." },
      { title: "Garantía 79Bike", text: "Taller homologado: intervenciones bajo garantía 2 años." },
      { title: "Performance & tuning", text: "Optimización de potencia, autonomía y geometría." },
    ],
    processTitle: "Cómo funciona",
    process: [
      { step: "01", title: "Cita", text: "Teléfono o formulario, hueco en 48h." },
      { step: "02", title: "Diagnóstico", text: "Inspección completa y presupuesto antes de intervenir." },
      { step: "03", title: "Intervención", text: "Reparación por técnicos formados por 79Bike, piezas originales." },
      { step: "04", title: "Entrega", text: "Prueba de validación y entrega con informe de taller." },
    ],
    ctaTitle: "¿Necesitas cita en el taller?",
    ctaText: "Cuéntanos tu solicitud, respondemos en 24h.",
    ctaButton: "Contactar el taller",
  },
};

export const Route = createFileRoute("/$lang/mecanique")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const m = META[l];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.desc },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.desc },
        ...ogUrlMeta("/mecanique", l),
      ],
      links: hreflangLinks("/mecanique", l),
    };
  },
  component: MecaniquePage,
});

function MecaniquePage() {
  const { locale } = useI18n();
  const c = CONTENT[locale];
  const ICONS = [Wrench, Cog, Battery, Zap, ShieldCheck, Gauge];
  return (
    <SiteLayout>
      <VideoHero
        src={heroVideo.url}
        eyebrow={c.eyebrow}
        title={<>{c.title} <span className="text-brand-cyan">{c.titleAccent}</span></>}
        subtitle={c.subtitle}
      />

      <div className="relative border-b border-zinc-900 overflow-hidden">
        <img
          src={atelierHands.url}
          alt="Mécanicien 79Bike au travail sur un vélo électrique"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

        <section className="relative z-20 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <div className="text-[11px] uppercase tracking-[0.3em] text-brand-cyan/80 mb-5">
                — {c.servicesTitle}
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
                {c.servicesHead} <span className="text-zinc-500">{c.servicesHeadMuted}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-white/[0.06] border border-white/[0.06] rounded-3xl overflow-hidden bg-zinc-950/40 backdrop-blur-2xl">
              {c.services.map((s, i) => {
                const Icon = ICONS[i] ?? Wrench;
                return (
                  <div
                    key={s.title}
                    className="group relative p-10 transition-colors duration-500 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 mx-4 bg-white/[0.06]" />
                      <Icon
                        className="size-5 text-zinc-400 group-hover:text-brand-cyan transition-colors duration-500"
                        strokeWidth={1.25}
                      />
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-white tracking-tight mb-3 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[15px] text-zinc-400 leading-relaxed">
                      {s.text}
                    </p>

                    <div
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px w-0 bg-brand-cyan/60 group-hover:w-full transition-all duration-700 ease-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative z-20 py-20 border-t border-zinc-900/60">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-10">{c.processTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.process.map((p) => (
                <div key={p.step} className="p-6 bg-zinc-900/45 backdrop-blur-[2px] rounded-2xl border border-zinc-800/70">
                  <div className="text-brand-cyan font-display text-2xl mb-3">{p.step}</div>
                  <h3 className="text-white font-medium mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-300">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ContactForm
        title={c.ctaTitle}
        subtitle={c.ctaText}
        contextLabel="Mécanique"
        requestTypes={c.services.map((s) => s.title)}
      />
    </SiteLayout>
  );
}

