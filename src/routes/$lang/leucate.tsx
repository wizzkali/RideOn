import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Wind, Mountain, MessageCircle, Mail } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { abs, hreflangLinks, ogUrlMeta, localBusinessLd, jsonLdScript, SITE_URL } from "@/lib/seo";
import { faqLd } from "@/lib/seo";
import { SHOWROOM_SEO } from "@/content/showroomSeo";
import { ShowroomLongContent } from "@/components/ShowroomLongContent";
import leucateMap from "@/assets/rando-leucate-map.png.asset.json";

export const Route = createFileRoute("/$lang/leucate")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    const seo = SHOWROOM_SEO.leucate[l];
    return {
      meta: [
        { title: d.meta.leucate.title },
        { name: "description", content: d.meta.leucate.desc },
        { property: "og:title", content: d.meta.leucate.title },
        { property: "og:description", content: d.meta.leucate.desc },
        { property: "og:image", content: abs(leucateMap.url) },
        ...ogUrlMeta("/leucate", l),
      ],
      links: hreflangLinks("/leucate", l),
      scripts: [
        jsonLdScript(
          localBusinessLd({
            id: `${SITE_URL}/#spot-leucate`,
            name: "Ride On Distribution — Spot Leucate",
            description:
              "Spot moto électrique à Leucate, Aude. Randonnées guidées sur les falaises, le plateau venté et les sentiers côtiers de l'étang.",
            url: abs(`/${l}/leucate`),
            phone: "+33698329029",
            street: "Leucate",
            city: "Leucate",
            region: "Occitanie",
            postalCode: "11370",
            country: "FR",
            lat: 42.9186,
            lng: 3.0264,
            image: abs(leucateMap.url),
            sameAs: ["https://www.instagram.com/rideondistribution"],
            openingHours: ["Mo-Su 09:00-19:00"],
          }),
        ),
        jsonLdScript(faqLd(seo.faq)),
      ],
    };
  },
  component: LeucatePage,
});

const COPY = {
  fr: {
    eyebrow: "Spot · Occitanie",
    title: "Leucate",
    titleAccent: "vent & mer",
    subtitle: "Falaises méditerranéennes, plateau venté et sentiers côtiers de l'étang. Notre spot pour rouler en moto électrique entre mer et garrigue.",
    address: "Spot de départ",
    addressVal: "Leucate (11370)\nOccitanie · France",
    feature1: "Plateau venté",
    feature1Text: "Roulez face au vent marin sur les falaises et le plateau de Leucate.",
    feature2: "Sentiers côtiers",
    feature2Text: "La Franqui, étang de Salses et côte sauvage en accès direct.",
    feature3: "Sorties guidées",
    feature3Text: "Accompagnement par nos riders Ride On. Niveau débutant à confirmé.",
    wa: "WhatsApp France",
  },
  en: {
    eyebrow: "Spot · Occitanie",
    title: "Leucate",
    titleAccent: "wind & sea",
    subtitle: "Mediterranean cliffs, windy plateau and coastal trails around the lagoon. Our spot to ride electric between sea and garrigue.",
    address: "Meeting point",
    addressVal: "Leucate (11370)\nOccitanie · France",
    feature1: "Windy plateau",
    feature1Text: "Ride facing the sea wind on the cliffs and Leucate plateau.",
    feature2: "Coastal trails",
    feature2Text: "La Franqui, Salses lagoon and the wild coast within direct reach.",
    feature3: "Guided rides",
    feature3Text: "Led by our Ride On riders. Beginner to advanced welcome.",
    wa: "WhatsApp France",
  },
  es: {
    eyebrow: "Spot · Occitania",
    title: "Leucate",
    titleAccent: "viento y mar",
    subtitle: "Acantilados mediterráneos, meseta ventosa y senderos costeros del estanque. Nuestro spot para rodar en moto eléctrica entre mar y garriga.",
    address: "Punto de salida",
    addressVal: "Leucate (11370)\nOccitania · Francia",
    feature1: "Meseta ventosa",
    feature1Text: "Rueda frente al viento marino en los acantilados y la meseta.",
    feature2: "Senderos costeros",
    feature2Text: "La Franqui, estanque de Salses y costa salvaje a un paso.",
    feature3: "Rutas guiadas",
    feature3Text: "Acompañados por nuestros riders Ride On. De principiante a avanzado.",
    wa: "WhatsApp Francia",
  },
} as const;

function LeucatePage() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const features = [
    { Icon: Wind, title: c.feature1, text: c.feature1Text },
    { Icon: Mountain, title: c.feature2, text: c.feature2Text },
    { Icon: MapPin, title: c.feature3, text: c.feature3Text },
  ];
  return (
    <SiteLayout>
      <PageHero
        eyebrow={c.eyebrow}
        title={<>{c.title} <span className="text-brand-cyan">{c.titleAccent}</span></>}
        subtitle={c.subtitle}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <img src={leucateMap.url} alt="Carte du spot de Leucate" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="p-7 rounded-2xl border border-zinc-800 bg-zinc-900">
              <MapPin className="size-5 text-brand-cyan mb-3" />
              <h3 className="font-display text-xl text-white mb-1">{c.address}</h3>
              <p className="text-zinc-400 text-sm whitespace-pre-line">{c.addressVal}</p>
            </div>
            {features.map(({ Icon, title, text }) => (
              <div key={title} className="p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70">
                <Icon className="size-5 text-brand-cyan mb-3" />
                <h3 className="text-white font-medium text-[15px] mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://wa.me/33698329029"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-cyan text-zinc-950 px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                <MessageCircle className="size-4" /> {c.wa} · +33 6 98 32 90 29
              </a>
              <a
                href="mailto:contact@rideon-distribution.fr"
                className="inline-flex items-center gap-2 border border-zinc-700 text-white px-5 py-3 rounded-lg font-semibold hover:border-brand-cyan/50 transition"
              >
                <Mail className="size-4 text-brand-cyan" /> contact@rideon-distribution.fr
              </a>
            </div>
          </div>
        </div>
      </section>
      <ContactForm contextLabel="Leucate" />
      <ShowroomLongContent data={SHOWROOM_SEO.leucate[locale]} />
    </SiteLayout>
  );
}