import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mountain, Calendar, Users, Shield, MapPin, Sparkles, Building2, PartyPopper, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
import leCuingMap from "@/assets/rando-le-cuing-map.png.asset.json";
import barceloneMap from "@/assets/rando-barcelone-map.png.asset.json";
import baqueiraMap from "@/assets/rando-baqueira-map.png.asset.json";
import circuitPrive from "@/assets/circuit-prive.jpeg.asset.json";
import leucateMap from "@/assets/rando-leucate-map.png.asset.json";
import randonneesBanner from "@/assets/randonnees-banner.jpg.asset.json";

export const Route = createFileRoute("/$lang/location")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "es";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.location.title },
        { name: "description", content: d.meta.location.desc },
        { property: "og:title", content: d.meta.location.title },
        { property: "og:description", content: d.meta.location.desc },
        ...ogUrlMeta("/location", l),
      ],
      links: hreflangLinks("/location", l),
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { t } = useI18n();
  const ICONS = [Calendar, Users, Shield];
  const zoneImages = [leCuingMap.url, barceloneMap.url, baqueiraMap.url, leucateMap.url, circuitPrive.url];
  const [reserveTour, setReserveTour] = useState<null | { title: string; duration: string; level: string; price: string }>(null);
  const [mapZone, setMapZone] = useState<null | { name: string; region: string; text: string; rides: readonly string[] }>(null);
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-zinc-950">
        <img
          src={randonneesBanner.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-zinc-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center justify-end pb-12">
          <div className="inline-flex w-fit items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-zinc-950/60 border border-brand-cyan/40 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] mb-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-clip-text text-transparent">{t.location.eyebrow}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {t.location.title} <span className="text-brand-cyan">{t.location.titleAccent}</span><span className="text-white">{t.location.titleAccentWhite}</span>
          </h1>
          <p className="text-lg text-zinc-200 max-w-2xl text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mx-auto whitespace-pre-line">{t.location.subtitle}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{t.location.zonesTitle}</h2>
              <p className="text-zinc-400 max-w-2xl">{t.location.zonesSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {t.location.zones.map((z, i) => (
                <button
                  key={z.name}
                  type="button"
                  onClick={() => setMapZone({ name: z.name, region: z.region, text: z.text, rides: z.rides ?? [] })}
                  className="group text-left overflow-hidden bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-brand-cyan/50 transition-colors focus:outline-none focus:border-brand-cyan"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                    <img
                      src={zoneImages[i]}
                      alt={`Mapa de la zona ${z.name}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <Mountain className="size-4 text-brand-cyan" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">{z.region}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-white mb-2">{z.name}</h3>
                    <p className="text-sm text-zinc-400">{z.text}</p>
                    {z.rides && z.rides.length > 0 && (
                      <p className="mt-3 text-[11px] uppercase tracking-widest text-zinc-500">
                        {z.rides.length} {z.rides.length > 1 ? "rutas" : "ruta"}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-brand-cyan">
                      <MapPin className="size-3.5" /> Ver en el mapa
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {t.location.tours.map((tour) => (
              <div key={tour.title} className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-brand-cyan/50 transition-colors">
                <Mountain className="size-6 text-brand-cyan mb-4" />
                <h3 className="font-display text-2xl text-white mb-2">{tour.title}</h3>
                <div className="flex items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest mb-6">
                  <span>{tour.duration}</span><span>•</span><span>{tour.level}</span>
                </div>
                <p className="text-brand-cyan font-display text-xl mb-6">{tour.price}</p>
                <button
                  type="button"
                  onClick={() => setReserveTour(tour)}
                  className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-[min(1vw,12px)] uppercase tracking-widest"
                >
                  {t.cta.reserve}
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.location.bullets.map((b, i) => {
              const Icon = ICONS[i] ?? Calendar;
              return (
                <div key={b.title} className="group p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)]">
                  <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                    <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-white font-medium text-[15px] tracking-tight mb-2">{b.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 flex items-center gap-3">
            <Sparkles className="size-5 text-brand-cyan" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-cyan">{t.location.custom.eyebrow}</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            {t.location.custom.title} <span className="text-brand-cyan">{t.location.custom.titleAccent}</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mb-10">{t.location.custom.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {t.location.custom.items.map((it, i) => {
              const Icon = [Building2, PartyPopper, Sparkles][i] ?? Sparkles;
              return (
                <div key={it.title} className="p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 hover:border-brand-cyan/30 transition-colors">
                  <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25">
                    <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-white font-medium text-[15px] mb-2">{it.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{it.text}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/33698329029"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-cyan text-zinc-950 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              <MessageCircle className="size-4" /> {t.location.custom.ctaFr} · +33 6 98 32 90 29
            </a>
            <a
              href="https://wa.me/34698391214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-cyan/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-cyan/10 transition"
            >
              <MessageCircle className="size-4 text-brand-cyan" /> {t.location.custom.ctaEs} · +34 698 39 12 14
            </a>
          </div>
        </div>
      </section>
      <ContactForm contextLabel="Alquiler" />

      <Dialog open={!!reserveTour} onOpenChange={(o) => !o && setReserveTour(null)}>
        <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {t.cta.reserve} — {reserveTour?.title}
            </DialogTitle>
          </DialogHeader>
          {reserveTour && (
            <ContactForm
              className="py-2"
              contextLabel={`Ruta — ${reserveTour.title} (${reserveTour.duration}, ${reserveTour.level}, ${reserveTour.price})`}
              defaultRequestType={reserveTour.title}
              requestTypes={t.location.tours.map((tt) => tt.title)}
              title=" "
              subtitle=""
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!mapZone} onOpenChange={(o) => !o && setMapZone(null)}>
        <DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <MapPin className="size-5 text-brand-cyan" />
              {mapZone?.name}
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-normal ml-2">{mapZone?.region}</span>
            </DialogTitle>
          </DialogHeader>
          {mapZone && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              <div className="md:col-span-3 aspect-video md:aspect-auto md:min-h-[420px]">
                <iframe
                  title={`Mapa ${mapZone.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${mapZone.name}, ${mapZone.region}`)}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="md:col-span-2 p-6 border-t md:border-t-0 md:border-l border-zinc-800">
                <p className="text-sm text-zinc-400 mb-5">{mapZone.text}</p>
                {mapZone.rides.length > 0 ? (
                  <>
                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-brand-cyan mb-3">
                      {t.location.ridesLabel}
                    </h4>
                    <ul className="space-y-2">
                      {mapZone.rides.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-white">
                          <Mountain className="size-4 text-brand-cyan mt-0.5 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

