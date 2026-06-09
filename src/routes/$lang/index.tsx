import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Partners } from "@/components/Partners";
import { fetchProducts } from "@/lib/shopify";
import { useI18n } from "@/i18n/I18nProvider";
import { SHOPIFY_LANG, SHOPIFY_COUNTRY, isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
import yvoltData from "@/data/yvolt.json";
const heroVideo = { url: "/assets/placeholder.svg" };
import falconL1ebCutout from "@/assets/falcon-pro-l1eb-cutout.png";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.home.title },
        { name: "description", content: d.meta.home.desc },
        { property: "og:title", content: d.meta.home.title },
        { property: "og:description", content: d.meta.home.desc },
        ...ogUrlMeta("", l),
      ],
      links: hreflangLinks("", l),
    };
  },
  component: HomePage,
});

function HomePage() {
  const { locale, t } = useI18n();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "home", locale],
    queryFn: () =>
      fetchProducts(12, undefined, { language: SHOPIFY_LANG[locale], country: SHOPIFY_COUNTRY[locale] }),
  });

  // Mettre en avant la Falcon Pro L1EB si présente dans le catalogue
  const findFalconL1eb = (list: typeof products) =>
    list.find((p) => /l1eb|homologu/i.test(p.node.title) || /l1eb|homologu/i.test(p.node.handle));
  const featured = findFalconL1eb(products);

  return (
    <SiteLayout>
      {/* HERO — Falcon Pro L1EB en vedette, vidéo logo + nous en fond plein écran */}
      <section className="relative min-h-[640px] md:min-h-[88vh] w-full overflow-hidden -mt-20 pt-20 flex items-end">
        {/* Vidéo de fond pleine largeur */}
        <video
          src={heroVideo.url}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay pour lisibilité du texte */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-zinc-950/10 md:to-transparent" />

        {/* Moto L1EB en transparent par-dessus la vidéo — masquée sur mobile pour éviter le chevauchement du titre */}
        <img
          src={falconL1ebCutout}
          alt="79BIKE Falcon Pro L1EB"
          className="pointer-events-none hidden md:block absolute right-0 bottom-0 w-[58vw] max-w-[900px] md:min-w-[420px] object-contain drop-shadow-[0_25px_60px_rgba(0,191,223,0.25)] select-none"
        />

        {/* Contenu */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pb-12 sm:pb-16 md:pb-20 pt-24 md:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 mb-6 backdrop-blur">
              <span className="size-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">
                Nouveau · Édition L1EB
              </span>
            </div>
            <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-7xl font-semibold text-white leading-[0.95] text-balance mb-5 sm:mb-6 drop-shadow-2xl">
              Falcon Pro<br />
              <span className="text-brand-cyan">L1EB</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-200 max-w-[44ch] text-pretty mb-7 sm:mb-8 drop-shadow">
              10 000 W · 410 Nm · 90 km d'autonomie. Notre moto électrique phare,
              homologuée route L1e‑B, prête à rouler.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              {featured ? (
                <Link
                  to="/$lang/product/$handle"
                  params={{ lang: locale, handle: featured.node.handle }}
                  className="bg-brand-cyan text-zinc-950 text-sm font-semibold py-3.5 px-8 rounded-xl text-center min-h-11 inline-flex items-center justify-center hover:bg-brand-cyan/90 transition-colors"
                >
                  Découvrir la Falcon Pro L1EB
                </Link>
              ) : (
                <Link
                  to="/$lang/motos"
                  params={{ lang: locale }}
                  className="bg-brand-cyan text-zinc-950 text-sm font-semibold py-3.5 px-8 rounded-xl text-center min-h-11 inline-flex items-center justify-center hover:bg-brand-cyan/90 transition-colors"
                >
                  {t.cta.seeRange}
                </Link>
              )}
              <Link
                to="/$lang/motos"
                params={{ lang: locale }}
                className="bg-zinc-950/60 backdrop-blur text-white text-sm font-medium py-3.5 px-8 rounded-xl text-center min-h-11 inline-flex items-center justify-center border border-white/20 hover:border-white/40 transition-colors"
              >
                Voir toutes les motos
              </Link>
            </div>
            <div className="bg-zinc-950/70 backdrop-blur border border-white/10 p-4 sm:p-5 rounded-2xl grid grid-cols-3 gap-3 sm:gap-6 divide-x divide-white/10 max-w-md">
              <div className="pl-0">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-medium text-brand-cyan whitespace-nowrap">90 km/h</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400">{t.home.stats.speed}</div>
              </div>
              <div className="pl-3 sm:pl-6">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-medium text-brand-cyan whitespace-nowrap">90 km</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400">{t.home.stats.range}</div>
              </div>
              <div className="pl-3 sm:pl-6">
                <div className="text-lg sm:text-xl md:text-2xl font-display font-medium text-brand-cyan whitespace-nowrap">59 kg</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-400">Poids</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-zinc-900 py-4 border-y border-zinc-800/50 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...t.home.usps, ...t.home.usps, ...t.home.usps].map((u, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 mx-8"
            >
              <span className="size-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> {u}
            </span>
          ))}
        </div>
      </div>

      <section id="gamme" className="py-20 md:py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-white mb-4">{t.home.rangeTitle}</h2>
            <div className="h-1 w-20 bg-brand-cyan" />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-zinc-500">{t.home.empty}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {products.slice(0, 3).map((p, i) => (
                <ProductCard key={p.node.id} product={p} featured={i === products.slice(0, 3).length - 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-white mb-4">Y‑VOLT</h2>
            <p className="text-zinc-400 max-w-xl">Nouvelle marque de motos électriques dirt et supermoto, disponible en pièces et en configuration complète.</p>
            <div className="h-1 w-20 bg-brand-cyan mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {yvoltData.filter((p: any) => p.type === "Electric Bike").map((p: any) => (
              <Link
                key={p.handle}
                to="/$lang/product/$handle"
                params={{ lang: locale, handle: p.handle }}
                className="group bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-brand-cyan/50 overflow-hidden flex flex-col transition-colors"
              >
                <div className="w-full aspect-square bg-zinc-800/50 grid place-items-center overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">Y‑VOLT</span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-base font-medium text-white leading-tight mb-2 line-clamp-2">
                    {p.title.replace(/^Y-VOLT\s*/i, "")}
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-4">{p.vendor}</p>
                  <div className="mt-auto flex items-end justify-between gap-3">
                    <span className="text-brand-cyan font-display text-lg whitespace-nowrap">
                      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(p.priceEur)}
                    </span>
                    {!p.available && (
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">Indisponible</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 outline-1 -outline-offset-1 outline-black/5 rounded-3xl grid place-items-center overflow-hidden">
                <svg viewBox="0 0 400 500" className="w-full h-full opacity-40">
                  <defs>
                    <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00BFDF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00BFDF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,500 100,200 180,300 250,150 320,280 400,180 400,500" fill="url(#mtn)" stroke="#00BFDF" strokeOpacity="0.4" />
                  <polygon points="0,500 80,350 160,400 240,300 320,380 400,330 400,500" fill="#00BFDF" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="absolute top-12 -right-6 lg:-right-12 bg-brand-cyan p-8 rounded-2xl rotate-3 shadow-2xl hidden md:block">
                <p className="text-zinc-950 font-display text-2xl font-semibold leading-tight">
                  {t.home.pyrBadge[0]}<br />{t.home.pyrBadge[1]}
                </p>
              </div>
            </div>
            <div className="max-w-md">
              <h2 className="font-display text-4xl font-medium text-white mb-6 leading-tight">{t.home.pyrTitle}</h2>
              <p className="text-zinc-400 text-lg mb-8 text-pretty">{t.home.pyrText}</p>
              <ul className="space-y-4 mb-10">
                {t.home.pyrBullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="size-1.5 bg-brand-cyan rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/$lang/location"
                params={{ lang: locale }}
                className="inline-flex items-center gap-2 bg-zinc-800 text-white text-sm font-medium py-3 px-8 rounded-[min(1vw,12px)] border border-zinc-700 hover:bg-zinc-700 transition-colors"
              >
                {t.cta.reserveDate} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Partners title="Nos partenaires" subtitle="Marques officielles distribuées et partenaires techniques de RIDE ON." />

      <section className="py-20 md:py-32 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <Link
              to="/$lang/toulouse"
              params={{ lang: locale }}
              className="p-8 md:p-12 bg-zinc-950 rounded-3xl border border-zinc-800 hover:border-brand-cyan/50 transition-colors group"
            >
              <h3 className="font-display text-2xl text-white mb-2">Toulouse</h3>
              <p className="text-zinc-500 text-sm mb-6">{t.home.showroomTls}</p>
              <span className="text-brand-cyan text-sm font-semibold flex items-center gap-2">
                {t.cta.discover} <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/$lang/barcelone"
              params={{ lang: locale }}
              className="p-8 md:p-12 bg-zinc-950 rounded-3xl border border-zinc-800 hover:border-brand-cyan/50 transition-colors group"
            >
              <h3 className="font-display text-2xl text-white mb-2">Barcelona</h3>
              <p className="text-zinc-500 text-sm mb-6">{t.home.showroomBcn}</p>
              <span className="text-brand-cyan text-sm font-semibold flex items-center gap-2">
                {t.cta.discover} <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}