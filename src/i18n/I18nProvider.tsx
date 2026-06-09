import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Locale } from "./config";
import { storeLocale, LOCALE_FORMAT } from "./config";
import { getDict, type Dict } from "./translations";

interface I18nContextValue {
  locale: Locale;
  t: Dict;
  formatPrice: (amount: string | number, currency?: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    storeLocale(locale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value: I18nContextValue = {
    locale,
    t: getDict(locale),
    formatPrice: (amount, currency = "EUR") => {
      const n = typeof amount === "string" ? parseFloat(amount) : amount;
      return new Intl.NumberFormat(LOCALE_FORMAT[locale], {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(n);
    },
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

