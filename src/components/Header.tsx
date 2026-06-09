import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import rideonLogo from "@/assets/rideon-logo.png.asset.json";

export function Header() {
  const [open, setOpen] = useState(false);
  const { locale, t } = useI18n();
  const nav = [
    { to: "/$lang/motos", label: t.nav.motos, exact: false },
    { to: "/$lang/pieces", label: t.nav.pieces, exact: false },
    { to: "/$lang/location", label: t.nav.rando, exact: false },
    { to: "/$lang/mecanique", label: t.nav.mecanique, exact: false },
    { to: "/$lang/sav", label: t.nav.sav, exact: false },
    { to: "/$lang/videos", label: t.nav.videos, exact: false },
    { to: "/$lang/b2b", label: t.nav.b2b, exact: false },
    { to: "/$lang/a-propos", label: t.nav.about, exact: false },
  ] as const;
  const showrooms = [
    { to: "/$lang/barcelone", label: t.nav.barcelona, flag: "🇪🇸" },
    { to: "/$lang/leucate", label: t.nav.leucate, flag: "🇫🇷" },
    { to: "/$lang/toulouse", label: t.nav.toulouse, flag: "🇫🇷" },
  ] as const;
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto pl-4 pr-6 lg:pl-6 h-16 flex items-center justify-between gap-6">
        <Link to="/$lang" params={{ lang: locale }} className="flex items-center gap-3 group shrink-0">
          <img src={rideonLogo.url} alt="Ride On Distribution" className="h-9 w-9 object-contain transition-transform group-hover:scale-105" />
          <span className="font-display font-medium text-base tracking-[0.02em] text-white hidden sm:inline leading-none">
            Ride <span className="text-brand-cyan font-semibold">On</span> Distribution
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 mr-auto">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              params={{ lang: locale }}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
              activeProps={{ className: "text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-cyan whitespace-nowrap" }}
              activeOptions={{ exact: n.exact }}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-2 mr-2">
            {showrooms.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                params={{ lang: locale }}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-brand-cyan/60 transition-colors whitespace-nowrap"
              >
                {s.label}
                <span className="ml-1.5 text-[10px] leading-none align-middle">{s.flag}</span>
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] h-[2px] w-5 rounded-full bg-brand-cyan/80" />
              </Link>
            ))}
          </div>
          <div className="hidden md:block"><LanguageSwitcher /></div>
          <CartDrawer />
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-6 py-4 flex flex-col gap-3">
          {[...nav, ...showrooms].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              params={{ lang: locale }}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-brand-cyan"
            >
              {n.label}
              {"flag" in n && <span className="ml-1.5">{n.flag}</span>}
            </Link>
          ))}
          <div className="pt-2"><LanguageSwitcher /></div>
        </div>
      )}
    </nav>
  );
}