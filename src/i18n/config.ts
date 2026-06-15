export const LOCALES = ["fr", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of langs) {
    const code = raw.toLowerCase().split("-")[0];
    if (isLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

const STORAGE_KEY = "rod-locale";

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(v ?? undefined) ? (v as Locale) : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

// ISO codes used by Shopify @inContext.
export const SHOPIFY_LANG: Record<Locale, "FR" | "EN" | "ES"> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

export const SHOPIFY_COUNTRY: Record<Locale, "FR" | "GB" | "ES"> = {
  fr: "FR",
  en: "GB",
  es: "ES",
};

export const LOCALE_FORMAT: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
};

