import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DEFAULT_LOCALE, detectBrowserLocale, getStoredLocale, isLocale } from "@/i18n/config";

export const Route = createFileRoute("/")({
  component: LangRedirect,
});

function LangRedirect() {
  useEffect(() => {
    const stored = getStoredLocale();
    const detected = stored ?? detectBrowserLocale();
    const target = isLocale(detected) ? detected : DEFAULT_LOCALE;
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      window.location.replace("/" + target);
    }
  }, []);
  return (
    <div className="min-h-screen grid place-items-center bg-zinc-950">
      <Loader2 className="size-6 animate-spin text-brand-cyan" />
    </div>
  );
}
