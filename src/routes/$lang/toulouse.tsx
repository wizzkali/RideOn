import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Mountain, Flag, Store, Wrench, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { abs, hreflangLinks, ogUrlMeta, localBusinessLd, jsonLdScript, SITE_URL } from "@/lib/seo";
import { faqLd } from "@/lib/seo";
import { SHOWROOM_SEO } from "@/content/showroomSeo";
import { ShowroomLongContent } from "@/components/ShowroomLongContent";

export const Route = createFileRoute("/$lang/toulouse")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "es";
    const d = getDict(l);
    const seo = SHOWROOM_SEO.lecuing[l];
    return {
      meta: [
        { title: d.meta.toulouse.title },
        { name: "description", content: d.meta.toulouse.desc },
        { property: "og:title", content: d.meta.toulouse.title },
        { property: "og:description", content: d.meta.toulouse.desc },
        ...ogUrlMeta("/toulouse", l),
      ],
      links: hreflangLinks("/toulouse", l),
      scripts: [
        jsonLdScript(
          localBusinessLd({
            id: `${SITE_URL}/#garage-le-cuing`,
            name: "Ride On Distribution — Garage Le Cuing (Saint-Gaudens / Toulouse Sud)",
            description:
              "Garage et showroom 79Bike à Le Cuing, près de Saint-Gaudens (Haute-Garonne). Vente, location, mécanique et SAV motos électriques en Occitanie.",
            url: abs(`/${l}/toulouse`),
            phone: "+33698329029",
            street: "Le Cuing",
            city: "Le Cuing",
            region: "Occitanie",
            postalCode: "31230",
            country: "FR",
            lat: 43.1311,
            lng: 0.7493,
            sameAs: ["https://www.instagram.com/rideondistribution"],
            openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-12:00"],
          }),
        ),
        jsonLdScript(faqLd(seo.faq)),
      ],
    };
  },
  component: ToulousePage,
});

function ToulousePage() {
  const { t, locale } = useI18n();
  const s = t.showroom.tls;
  const ICONS = [Mountain, Flag, Store, Wrench];
  const routeFor = (to: string) =>
    to === "motos" ? "/$lang" : to === "location" ? "/$lang/location" : to === "sav" ? "/$lang/sav" : "/$lang/pieces";
  return (
    <SiteLayout>
      <PageHero
        eyebrow={s.eyebrow}
        title={<>{s.title} <span className="text-brand-cyan">{s.titleAccent}</span></>}
        subtitle={s.subtitle}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
            <MapPin className="size-6 text-brand-cyan mb-4" />
            <h3 className="font-display text-xl text-white mb-2">{s.address}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{s.addressVal}</p>
          </div>
          <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
            <Clock className="size-6 text-brand-cyan mb-4" />
            <h3 className="font-display text-xl text-white mb-2">{s.hours}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{s.hoursVal}</p>
          </div>
          <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
            <Phone className="size-6 text-brand-cyan mb-4" />
            <h3 className="font-display text-xl text-white mb-2">{s.contact}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">contacto@rideondistribution.com</p>
          </div>
          <a
            href="https://wa.me/33698329029"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl border border-brand-cyan/40 bg-gradient-to-b from-brand-cyan/10 to-zinc-950 hover:border-brand-cyan transition-colors block"
          >
            <div className="inline-flex items-center justify-center size-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 mb-4">
              <MessageCircle className="size-5 text-[#25D366]" />
            </div>
            <h3 className="font-display text-xl text-white mb-2">WhatsApp France</h3>
            <p className="text-zinc-200 text-sm font-semibold">+33 6 98 32 90 29</p>
            <p className="text-zinc-500 text-xs mt-1">Haz clic para hablar</p>
          </a>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{s.sectorTitle}</h2>
            <p className="text-zinc-400 max-w-2xl">{s.sectorSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {s.sector.map((c, i) => {
              const Icon = ICONS[i] ?? Mountain;
              return (
                <Link
                  key={c.title}
                  to={routeFor(c.to)}
                  params={{ lang: locale }}
                  className="group relative overflow-hidden p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)] flex flex-col"
                >
                  <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                    <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-zinc-400 flex-1">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-cyan">
                    {c.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <ShowroomLongContent data={SHOWROOM_SEO.lecuing[locale]} />
    </SiteLayout>
  );
}

