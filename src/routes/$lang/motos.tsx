import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { VideoHero } from "@/components/VideoHero";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import { useI18n } from "@/i18n/I18nProvider";
import { SHOPIFY_LANG, SHOPIFY_COUNTRY, isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
import yvoltData from "@/data/yvolt.json";
const motosVideo = { url: "/assets/placeholder.svg" };

export const Route = createFileRoute("/$lang/motos")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    return {
      meta: [
        { title: `${d.nav.motos} · Ride On Distribution` },
        { name: "description", content: "Toutes les motos électriques 79Bike disponibles à la vente : Falcon GT, Falcon Pro L1EB, Falcon Pro Off Road." },
        { property: "og:title", content: `${d.nav.motos} · Ride On Distribution` },
        ...ogUrlMeta("/motos", l),
      ],
      links: hreflangLinks("/motos", l),
    };
  },
  component: MotosPage,
});

function MotosPage() {
  const { locale, t } = useI18n();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "motos", locale],
    queryFn: () =>
      fetchProducts(50, "product_type:\"moto-electrique\" OR product_type:\"E-Bike\"", { language: SHOPIFY_LANG[locale], country: SHOPIFY_COUNTRY[locale] }),
  });

  // Falcon Pro L1EB en premier dans le catalogue 79Bike
  const isFalconL1eb = (p: typeof products[0]) =>
    /l1eb|homologu/i.test(p.node.title) || /l1eb|homologu/i.test(p.node.handle);
  const sortedProducts = [...products].sort((a, b) => {
    const aFeatured = isFalconL1eb(a) ? 1 : 0;
    const bFeatured = isFalconL1eb(b) ? 1 : 0;
    return bFeatured - aFeatured;
  });

  return (
    <SiteLayout>
      <VideoHero
        src={motosVideo.url}
        eyebrow={t.nav.motos}
        title={<>Toutes nos <span className="text-brand-cyan">motos électriques</span></>}
        subtitle="La gamme complète 79Bike disponible chez Ride On Distribution. Homologuées route ou off-road."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-medium text-white mb-3">Y‑VOLT</h2>
            <p className="text-zinc-400 max-w-xl">Nouvelle marque de motos électriques dirt et supermoto, disponible en pièces et en configuration complète.</p>
            <div className="h-1 w-20 bg-brand-cyan mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section className="py-16 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <p className="text-zinc-500 text-center py-24">No products found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}