/**
 * Centralized SEO helpers — Ride On Distribution
 * Single source of truth for site URL, hreflang, and JSON-LD builders.
 */

import { LOCALES, type Locale } from "@/i18n/config";

// Dominio canónico de producción del sitio .ES.
// Este repo (rideondistribution.es) funciona de forma INDEPENDIENTE de la .com
// (solo comparten diseño y logos), por lo que canonicaliza a su PROPIO dominio.
// Lo usan todos los canonical, og:url, hreflang y las URLs del sitemap.xml.
// NOTA: si el dominio se sirve con www, cambiar a "https://www.rideondistribution.es".
export const SITE_URL = "https://rideondistribution.es";

/** Build absolute URL from a path (must start with "/"). */
export const abs = (path: string) => `${SITE_URL}${path}`;

/** Default Open Graph share image (absolute URL, 1216x640). */
import ogImageAsset from "@/assets/og-image.jpg.asset.json";
export const DEFAULT_OG_IMAGE = `${SITE_URL}${ogImageAsset.url}`;

/** Build the full hreflang+canonical link set for a localized path. */
export function hreflangLinks(pathWithoutLang: string, locale: Locale) {
  const norm = pathWithoutLang.startsWith("/") || pathWithoutLang === ""
    ? pathWithoutLang
    : `/${pathWithoutLang}`;
  return [
    { rel: "canonical" as const, href: abs(`/${locale}${norm}`) },
    ...LOCALES.map((l) => ({
      rel: "alternate" as const,
      hrefLang: l,
      href: abs(`/${l}${norm}`),
    })),
    { rel: "alternate" as const, hrefLang: "x-default", href: abs(`/es${norm}`) },
  ];
}

/** og:url + og:locale tags for a localized path. */
export function ogUrlMeta(pathWithoutLang: string, locale: Locale) {
  const norm = pathWithoutLang.startsWith("/") || pathWithoutLang === ""
    ? pathWithoutLang
    : `/${pathWithoutLang}`;
  const ogLocale = { fr: "fr_FR", en: "en_GB", es: "es_ES" }[locale];
  return [
    { property: "og:url" as const, content: abs(`/${locale}${norm}`) },
    { property: "og:locale" as const, content: ogLocale },
  ];
}

// ============================================================================
// JSON-LD builders
// ============================================================================

const ORG_ID = `${SITE_URL}/#organization`;

/** Organization + WebSite schema — site-wide (root). */
export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Ride On Distribution",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description:
        "Distributeur exclusif 79Bike en France et en Espagne. Motos électriques Falcon GT, Pro et GT PRO homologuées route.",
      sameAs: [
        "https://www.instagram.com/rideondistribution",
        "https://www.instagram.com/rideondistribution.es",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+33-6-98-32-90-29",
          contactType: "customer service",
          areaServed: "FR",
          availableLanguage: ["French", "English"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+34-698-39-12-14",
          contactType: "customer service",
          areaServed: "ES",
          availableLanguage: ["Spanish", "English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ride On Distribution",
      publisher: { "@id": ORG_ID },
      inLanguage: ["fr-FR", "es-ES", "en-GB"],
    },
  ],
};

/** LocalBusiness schema for a physical showroom / garage. */
export function localBusinessLd(opts: {
  id: string;
  name: string;
  description: string;
  url: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: "FR" | "ES";
  lat: number;
  lng: number;
  email?: string;
  image?: string;
  sameAs?: string[];
  openingHours?: string[]; // e.g. ["Mo-Fr 09:00-18:00", "Sa 10:00-17:00"]
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "MotorcycleDealer"],
    "@id": opts.id,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    telephone: opts.phone,
    email: opts.email,
    image: opts.image,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: opts.street,
      addressLocality: opts.city,
      addressRegion: opts.region,
      postalCode: opts.postalCode,
      addressCountry: opts.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: opts.lat,
      longitude: opts.lng,
    },
    openingHoursSpecification: opts.openingHours,
    sameAs: opts.sameAs,
    parentOrganization: { "@id": ORG_ID },
  };
}

/** Product schema for a Shopify product page. */
export function productLd(opts: {
  url: string;
  name: string;
  description: string;
  image: string[];
  sku?: string;
  brand?: string;
  priceAmount: string;
  priceCurrency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image,
    sku: opts.sku,
    brand: opts.brand ? { "@type": "Brand", name: opts.brand } : undefined,
    offers: {
      "@type": "Offer",
      url: opts.url,
      priceCurrency: opts.priceCurrency,
      price: opts.priceAmount,
      availability: `https://schema.org/${opts.availability}`,
      seller: { "@id": ORG_ID },
    },
  };
}

/** BreadcrumbList schema. */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** FAQPage schema. */
export function faqLd(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Helper to inline JSON-LD as a head() script. */
export const jsonLdScript = (data: unknown) => ({
  type: "application/ld+json" as const,
  children: JSON.stringify(data),
});

