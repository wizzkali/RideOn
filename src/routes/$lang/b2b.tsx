import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Store, Truck, Users, BadgeCheck, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";

export const Route = createFileRoute("/$lang/b2b")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.b2b.title },
        { name: "description", content: d.meta.b2b.desc },
        { property: "og:title", content: d.meta.b2b.title },
        { property: "og:description", content: d.meta.b2b.desc },
        ...ogUrlMeta("/b2b", l),
      ],
      links: hreflangLinks("/b2b", l),
    };
  },
  component: B2BPage,
});

const COPY = {
  fr: {
    eyebrow: "Professionnels",
    title: "B2B &",
    titleAccent: "revendeurs",
    subtitle: "Distributeur exclusif 79Bike en France & Espagne. Nous accompagnons revendeurs, loueurs, écoles de pilotage, flottes d'entreprise et collectivités.",
    cards: [
      { Icon: Store, title: "Revendeurs agréés", text: "Devenez point de vente officiel 79Bike avec tarifs pro, formation et support technique." },
      { Icon: Truck, title: "Flottes & entreprises", text: "Solutions clé en main pour livraison urbaine, sécurité, agents municipaux et flottes." },
      { Icon: Users, title: "Loueurs & écoles", text: "Tarifs volume, maintenance prioritaire et pièces stockées en France et en Espagne." },
      { Icon: BadgeCheck, title: "Garantie 2 ans", text: "Garantie constructeur, pièces d'origine, atelier certifié et SAV bilingue." },
    ],
    ctaTitle: "Parlons de votre projet",
    ctaSub: "Envoyez-nous votre besoin, on revient vers vous sous 24h avec une grille tarifaire pro.",
    wa: "WhatsApp pro",
  },
  en: {
    eyebrow: "For professionals",
    title: "B2B &",
    titleAccent: "resellers",
    subtitle: "Exclusive 79Bike distributor for France & Spain. We support resellers, rental fleets, riding schools, corporate fleets and municipalities.",
    cards: [
      { Icon: Store, title: "Authorised resellers", text: "Become an official 79Bike point of sale with pro pricing, training and technical support." },
      { Icon: Truck, title: "Fleets & companies", text: "Turn-key solutions for urban delivery, security teams, municipal agents and fleets." },
      { Icon: Users, title: "Rentals & schools", text: "Volume pricing, priority service and parts stocked in France and Spain." },
      { Icon: BadgeCheck, title: "2-year warranty", text: "Manufacturer warranty, OEM parts, certified workshop and bilingual support." },
    ],
    ctaTitle: "Let's talk about your project",
    ctaSub: "Send us your needs, we reply within 24h with a pro pricing grid.",
    wa: "Business WhatsApp",
  },
  es: {
    eyebrow: "Profesionales",
    title: "B2B y",
    titleAccent: "distribuidores",
    subtitle: "Distribuidor exclusivo 79Bike en Francia y España. Acompañamos a distribuidores, empresas de alquiler, escuelas, flotas corporativas y administraciones.",
    cards: [
      { Icon: Store, title: "Distribuidores oficiales", text: "Conviértete en punto de venta oficial 79Bike con precios pro, formación y soporte técnico." },
      { Icon: Truck, title: "Flotas y empresas", text: "Soluciones llave en mano para reparto urbano, seguridad, agentes municipales y flotas." },
      { Icon: Users, title: "Alquiler y escuelas", text: "Precios por volumen, mantenimiento prioritario y recambios en Francia y España." },
      { Icon: BadgeCheck, title: "Garantía 2 años", text: "Garantía de fábrica, recambios originales, taller certificado y SAT bilingüe." },
    ],
    ctaTitle: "Hablemos de tu proyecto",
    ctaSub: "Cuéntanos tu necesidad y te respondemos en 24h con un tarifario pro.",
    wa: "WhatsApp pro",
  },
} as const;

function B2BPage() {
  const { locale } = useI18n();
  const c = COPY[locale];
  return (
    <SiteLayout>
      <PageHero
        eyebrow={c.eyebrow}
        title={<>{c.title} <span className="text-brand-cyan">{c.titleAccent}</span></>}
        subtitle={c.subtitle}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {c.cards.map(({ Icon, title, text }) => (
              <div key={title} className="group p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)]">
                <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                  <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-medium text-[15px] tracking-tight mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/10 via-zinc-950 to-zinc-950 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center size-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 shrink-0">
                <Briefcase className="size-5 text-brand-cyan" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-white mb-1">{c.ctaTitle}</h3>
                <p className="text-zinc-400 text-sm max-w-xl">{c.ctaSub}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/33698329029"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-cyan text-zinc-950 px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                <MessageCircle className="size-4" /> {c.wa} FR
              </a>
              <a
                href="https://wa.me/34698391214"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brand-cyan/40 text-white px-5 py-3 rounded-lg font-semibold hover:bg-brand-cyan/10 transition"
              >
                <MessageCircle className="size-4 text-brand-cyan" /> {c.wa} ES
              </a>
            </div>
          </div>
        </div>
      </section>
      <ContactForm contextLabel="B2B" />
    </SiteLayout>
  );
}