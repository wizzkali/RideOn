import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Mail, Mountain, Flag, Store, Wrench, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { abs, hreflangLinks, ogUrlMeta, localBusinessLd, jsonLdScript, SITE_URL } from "@/lib/seo";
import { faqLd } from "@/lib/seo";
import { SHOWROOM_SEO } from "@/content/showroomSeo";
import { ShowroomLongContent } from "@/components/ShowroomLongContent";
const barcelonaHero = { url: "/assets/placeholder.svg" };
const barcelonaBg = { url: "/assets/placeholder.svg" };

export const Route = createFileRoute("/$lang/barcelone")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    const seo = SHOWROOM_SEO.barcelona[l];
    return {
      meta: [
        { title: d.meta.barcelone.title },
        { name: "description", content: d.meta.barcelone.desc },
        { property: "og:title", content: d.meta.barcelone.title },
        { property: "og:description", content: d.meta.barcelone.desc },
        { property: "og:image", content: abs(barcelonaHero.url) },
        ...ogUrlMeta("/barcelone", l),
      ],
      links: hreflangLinks("/barcelone", l),
      scripts: [
        jsonLdScript(
          localBusinessLd({
            id: `${SITE_URL}/#showroom-barcelona`,
            name: "Ride On Distribution — Showroom Barcelona",
            description:
              "Showroom et garage 79Bike à Barcelone. Vente, location et entretien de motos électriques Falcon GT, Pro et GT PRO homologuées route en Espagne.",
            url: abs(`/${l}/barcelone`),
            phone: "+34698391214",
            street: "Barcelona",
            city: "Barcelona",
            region: "Catalunya",
            postalCode: "08001",
            country: "ES",
            lat: 41.3851,
            lng: 2.1734,
            email: "barcelona@rideon-distribution.fr",
            image: abs(barcelonaHero.url),
            sameAs: ["https://www.instagram.com/rideondistribution.es"],
            openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-17:00"],
          }),
        ),
        jsonLdScript(faqLd(seo.faq)),
      ],
    };
  },
  component: BarcelonePage,
});

function BarcelonePage() {
  const { t, locale } = useI18n();
  const s = t.showroom.bcn;
  const ICONS = [Mountain, Flag, Store, Wrench];
  const routeFor = (to: string) =>
    to === "motos" ? "/$lang" : to === "location" ? "/$lang/location" : to === "sav" ? "/$lang/sav" : "/$lang/pieces";
  return (
    <SiteLayout>
      <PageHero
        eyebrow={s.eyebrow}
        title={<>{s.title} <span className="text-brand-cyan">{s.titleAccent}</span></>}
        subtitle={s.subtitle}
        image={barcelonaHero.url}
      />
      <div className="relative overflow-hidden">
        <img src={barcelonaBg.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-zinc-950/80" />
      <section className="relative pt-20 pb-16">
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
                  className="group relative overflow-hidden p-6 rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm hover:border-brand-cyan/60 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.35)] transition-all duration-300 flex flex-col"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[
            { Icon: MapPin, title: s.address, body: s.addressVal },
            { Icon: Clock, title: s.hours, body: s.hoursVal },
            { Icon: Mail, title: s.contact, body: "barcelona@rideon-distribution.fr" },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden p-8 rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm hover:border-brand-cyan/60 transition-all duration-300"
            >
              <div className="absolute -top-12 -right-12 size-32 rounded-full bg-brand-cyan/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center size-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 mb-5">
                  <Icon className="size-5 text-brand-cyan" />
                </div>
                <h3 className="font-display text-xl text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{body}</p>
              </div>
            </div>
          ))}
          <a
            href="https://wa.me/34698391214"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden p-8 rounded-2xl border border-brand-cyan/40 bg-gradient-to-b from-brand-cyan/10 to-zinc-950/90 backdrop-blur-sm hover:border-brand-cyan transition-all duration-300"
          >
            <div className="absolute -top-12 -right-12 size-32 rounded-full bg-brand-cyan/20 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center size-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 mb-5">
                <MessageCircle className="size-5 text-[#25D366]" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">WhatsApp España</h3>
              <p className="text-zinc-200 text-sm font-semibold">+34 698 39 12 14</p>
              <p className="text-zinc-500 text-xs mt-1">Pulsa para chatear</p>
            </div>
          </a>
        </div>
      </section>
      </div>
      <ShowroomLongContent data={SHOWROOM_SEO.barcelona[locale]} />
    </SiteLayout>
  );
}