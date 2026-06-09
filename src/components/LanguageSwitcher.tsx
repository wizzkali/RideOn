import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { LOCALES, type Locale, storeLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

const LABEL: Record<Locale, string> = { fr: "FR", en: "EN", es: "ES" };

export function LanguageSwitcher() {
  const { locale } = useI18n();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function switchTo(next: Locale) {
    if (next === locale) return;
    storeLocale(next);
    const segs = pathname.split("/").filter(Boolean);
    if (segs[0] && (LOCALES as readonly string[]).includes(segs[0])) segs[0] = next;
    else segs.unshift(next);
    navigate({ to: "/" + segs.join("/") });
  }

  return (
    <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
      <Globe className="size-3.5 mr-1" aria-hidden />
      {LOCALES.map((l, i) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            l === locale ? "text-brand-cyan" : "hover:text-white"
          }`}
          aria-current={l === locale ? "true" : undefined}
        >
          {LABEL[l]}
          {i < LOCALES.length - 1 && <span className="ml-1 text-zinc-700">·</span>}
        </button>
      ))}
    </div>
  );
}