import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Loader2, ChevronRight, ArrowLeft, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useI18n } from "@/i18n/I18nProvider";
import { SHOPIFY_LANG, SHOPIFY_COUNTRY, isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { abs, hreflangLinks, ogUrlMeta, productLd, breadcrumbLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/$lang/product/$handle")({
  loader: async ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "es";
    try {
      const product = await fetchProductByHandle(params.handle, {
        language: SHOPIFY_LANG[l],
        country: SHOPIFY_COUNTRY[l],
      });
      return { product };
    } catch {
      return { product: null };
    }
  },
  head: ({ params, loaderData }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "es";
    const p = loaderData?.product ?? null;
    const title = p
      ? `${p.title} — Ride On Distribution`
      : `${params.handle} — Ride On Distribution`;
    const description = p
      ? (p.description || `${p.title} disponible chez Ride On Distribution. Livraison 48h, garantie 2 ans, financement disponible.`).slice(0, 160)
      : "Moto électrique 79Bike disponible chez Ride On Distribution.";
    const firstImage = p?.images.edges[0]?.node.url;
    const scripts: { type: "application/ld+json"; children: string }[] = [];
    if (p) {
      const price = p.priceRange.minVariantPrice;
      const inStock = p.variants.edges.some((v) => v.node.availableForSale);
      scripts.push(
        jsonLdScript(
          productLd({
            url: abs(`/${l}/product/${params.handle}`),
            name: p.title,
            description: p.description || p.title,
            image: p.images.edges.map((e) => e.node.url),
            sku: p.handle,
            brand: "79Bike",
            priceAmount: price.amount,
            priceCurrency: price.currencyCode,
            availability: inStock ? "InStock" : "OutOfStock",
          }),
        ),
        jsonLdScript(
          breadcrumbLd([
            { name: "Accueil", url: abs(`/${l}`) },
            { name: "Motos", url: abs(`/${l}/motos`) },
            { name: p.title, url: abs(`/${l}/product/${params.handle}`) },
          ]),
        ),
      );
    }
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        ...(firstImage ? [{ property: "og:image", content: firstImage }] : []),
        ...ogUrlMeta(`/product/${params.handle}`, l),
      ],
      links: hreflangLinks(`/product/${params.handle}`, l),
      scripts,
    };
  },
  component: ProductPage,
  notFoundComponent: () => {
    const { lang } = Route.useParams();
    const d = getDict(isLocale(lang) ? (lang as Locale) : "es");
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-4xl text-white mb-4">{d.product.notFound}</h1>
          <Link to="/$lang" params={{ lang }} className="text-brand-cyan">{d.product.home}</Link>
        </div>
      </SiteLayout>
    );
  },
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl text-white mb-4">Error</h1>
        <p className="text-zinc-500">{error.message}</p>
      </div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { locale, t, formatPrice } = useI18n();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle, locale],
    queryFn: async () => {
      const p = await fetchProductByHandle(handle, {
        language: SHOPIFY_LANG[locale],
        country: SHOPIFY_COUNTRY[locale],
      });
      if (!p) throw notFound();
      return p;
    },
  });

  const variants = product?.variants.edges.map((e) => e.node) ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId],
  );
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  if (isLoading || !product) {
    return (
      <SiteLayout>
        <div className="max-w-7xl mx-auto px-6 py-32 grid place-items-center">
          <Loader2 className="size-8 animate-spin text-brand-cyan" />
        </div>
      </SiteLayout>
    );
  }

  const images = product.images.edges;
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
  };

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex items-center gap-2 text-xs text-zinc-500">
        <Link to="/$lang" params={{ lang: locale }} className="hover:text-brand-cyan flex items-center gap-1">
          <ArrowLeft className="size-3" /> {t.product.breadcrumb}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-zinc-400">{product.title}</span>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 mb-4">
              {images[activeImage]?.node && (
                <img
                  src={images[activeImage].node.url}
                  alt={images[activeImage].node.altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.node.url}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                      i === activeImage ? "border-brand-cyan" : "border-zinc-800"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">{product.title}</h1>
            <p className="text-brand-cyan font-display text-3xl mb-8">
              {formatPrice(price.amount, price.currencyCode)}
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8 whitespace-pre-line">{product.description}</p>

            {product.options.map((option) => {
              if (option.values.length <= 1) return null;
              return (
                <div key={option.name} className="mb-6">
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">{option.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const value = v.selectedOptions.find((o) => o.name === option.name)?.value;
                      if (!value) return null;
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantId(v.id)}
                          disabled={!v.availableForSale}
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                            isSelected
                              ? "border-brand-cyan text-brand-cyan bg-brand-cyan/10"
                              : "border-zinc-800 text-zinc-300 hover:border-zinc-600"
                          } disabled:opacity-40`}
                        >
                          {v.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleAdd}
              disabled={!selectedVariant?.availableForSale || isCartLoading}
              className="w-full py-4 bg-brand-cyan text-zinc-950 text-sm font-bold rounded-[min(1vw,12px)] uppercase tracking-widest ring-1 ring-brand-cyan disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {isCartLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : selectedVariant?.availableForSale ? (
                t.cta.addToCart
              ) : (
                t.cta.unavailable
              )}
            </button>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {t.product.perks.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2.5 p-3 rounded-lg border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70"
                >
                  <span className="inline-flex items-center justify-center size-6 rounded-md bg-brand-cyan/10 ring-1 ring-brand-cyan/25 shrink-0">
                    <Check className="size-3.5 text-brand-cyan" strokeWidth={2.5} />
                  </span>
                  <span className="text-xs text-zinc-300">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

