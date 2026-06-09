import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";
import partsData from "@/data/parts.json";
import fastaceData from "@/data/fastace.json";
import yvoltData from "@/data/yvolt.json";
import piecesBanner from "@/assets/piece-banner.jpg.asset.json";
import piecesVideo from "@/assets/piece-banner.mp4.asset.json";
import yvoltLogo from "@/assets/yvolt-logo-v2.png.asset.json";
import bike79Logo from "@/assets/79bike-logo-v2.png.asset.json";
import fastaceLogo from "@/assets/fastace-logo.png.asset.json";

interface Part {
  handle: string;
  title: string;
  vendor: string;
  type: string;
  priceEur: number;
  priceUsd: number;
  image: string | null;
  images: string[];
  description: string;
  available: boolean;
  sourceUrl: string;
}

const PARTS: Part[] = [
  ...(partsData as Part[]),
  ...(fastaceData as Part[]),
  ...((yvoltData as Part[]).filter((p) => p.type !== "Electric Bike")),
];

const BRANDS = ["all", "79BIKE", "FASTACE", "Y-VOLT"] as const;
type Brand = (typeof BRANDS)[number];

type Sector =
  | "all"
  | "battery"
  | "charger"
  | "motor"
  | "controller"
  | "brakes"
  | "suspension"
  | "wheels"
  | "frame"
  | "electronics"
  | "body"
  | "apparel"
  | "accessories";

const SECTORS: { id: Sector; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "battery", label: "Batterie" },
  { id: "charger", label: "Chargeur" },
  { id: "motor", label: "Moteur" },
  { id: "controller", label: "Contrôleur" },
  { id: "brakes", label: "Freins" },
  { id: "suspension", label: "Suspension" },
  { id: "wheels", label: "Roues / Pneus" },
  { id: "frame", label: "Partie cycle" },
  { id: "electronics", label: "Électronique" },
  { id: "body", label: "Carrosserie" },
  { id: "apparel", label: "Équipement pilote" },
  { id: "accessories", label: "Accessoires" },
];

function classifySector(p: Part): Sector {
  const s = `${p.title} ${p.type}`.toLowerCase();

  // Rider gear / apparel — check first so "helmet", "goggles", etc. don't fall into body/frame.
  if (/(helmet|casque|goggle|lunette|jersey|apparel|v[eê]tement|riding\s*(set|kit|apparel)|\bhat\b|cap\b(?!\s*(screw|nut))|necklace|collier|glove|gant|jacket|veste|pant\b)/.test(s)) {
    return "apparel";
  }

  // Phone / GPS / rack accessories before generic "mount" / "bracket" rules.
  if (/(phone\s*mount|gps\s*mount|rear\s*rack|porte[- ]?bagage|stickers?\b|autocollant)/.test(s)) {
    return "accessories";
  }

  if (/(\bcharger\b|chargeur)/.test(s)) return "charger";

  if (/(\bbattery\b|batterie|\d+\s*v\s*\d+\s*ah)/.test(s)) return "battery";

  if (/(\bmotor\b|moteur|\bbelt\b|courroie)/.test(s)) return "motor";

  if (/(controller|contr[oô]leur|converter|convertisseur|voltage\s*converter)/.test(s)) return "controller";

  // Suspension before brakes (some fork kits mention "disc brake hole").
  if (/(\bfork\b|fourche|shock|amortisseur|suspension|triple\s*clamp|seatpost|dropper|mudguard)/.test(s)) {
    return "suspension";
  }

  if (/(\bbrake\b|frein|brake\s*pad|brake\s*hose|brake\s*lever|brake\s*disc|brake\s*pump|caliper|[eé]trier|plaquette|disque\s*de\s*frein)/.test(s)) {
    return "brakes";
  }

  if (/(\btire\b|tyre|\btube\b|\bwheel\b|\brim\b|pneu|roue|jante|sprocket|pignon|\bchain\b|cha[iî]ne|axle)/.test(s)) {
    return "wheels";
  }

  // Electronics (display, lights, switches, harness) before body so "headlight cover" → body wins via specific cover rule below.
  if (/(display|instrument\s*panel|tableau\s*de\s*bord|wiring|harness|faisceau|\bswitch\b|switch\s*button|combination\s*switch|interrupteur|\bbutton\b|throttle|accelerator|acc[eé]l[eé]rateur|\bhorn\b|klaxon|headlight|rearlight|ambient\s*light|\blight\b|phare|feu\b|sensor|capteur|\bkey\b|\block\b\s*(?!nut)|cl[eé]\b)/.test(s) && !/cover|trim/.test(s)) {
    return "electronics";
  }

  if (/(fender|garde[- ]?boue|\bcover\b|latch|guard|fairing|car[eé]nage|plastic|plastique|armor|protection|trim\s*cover|end\s*cap|underseat|sous[- ]?selle|coque)/.test(s)) {
    return "body";
  }

  if (/(frame|cadre|subframe|swingarm|bras\s*oscillant|kickstand|b[eé]quille|\bpeg\b|repose[- ]?pied|bracket|support|headset|jeu\s*de\s*direction|handlebar|guidon|\bgrip\b|poign[eé]e|\bseat\b|\bsaddle\b|selle|bottom\s*bracket|p[eé]dalier|\bmount\b|triangle)/.test(s)) {
    return "frame";
  }

  return "accessories";
}

export const Route = createFileRoute("/$lang/pieces")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.pieces.title },
        { name: "description", content: d.meta.pieces.desc },
        { property: "og:title", content: d.meta.pieces.title },
        { property: "og:description", content: d.meta.pieces.desc },
        ...ogUrlMeta("/pieces", l),
      ],
      links: hreflangLinks("/pieces", l),
    };
  },
  component: PiecesPage,
});

function PiecesPage() {
  const { locale, t, formatPrice } = useI18n();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<Brand>("all");
  const [sector, setSector] = useState<Sector>("all");

  const PARTS_WITH_SECTOR = useMemo(
    () => PARTS.map((p) => ({ ...p, sector: classifySector(p) })),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTS_WITH_SECTOR.filter((p) => {
      if (brand !== "all" && p.vendor.toUpperCase() !== brand) return false;
      if (sector !== "all" && p.sector !== sector) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    });
  }, [query, brand, sector, PARTS_WITH_SECTOR]);

  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PARTS_WITH_SECTOR) {
      if (brand !== "all" && p.vendor.toUpperCase() !== brand) continue;
      counts[p.sector] = (counts[p.sector] ?? 0) + 1;
    }
    return counts;
  }, [brand, PARTS_WITH_SECTOR]);

  return (
    <SiteLayout>
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden border-b border-zinc-900">
        <video
          src={piecesVideo.url}
          poster={piecesBanner.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/90" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 backdrop-blur-sm mb-6">
            <span className="size-2 rounded-full bg-brand-cyan" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">{t.pieces.eyebrow}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {t.pieces.title} <span className="text-brand-cyan">{t.pieces.titleAccent}</span>
          </h1>
          <p className="text-lg text-zinc-200 max-w-2xl text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{t.pieces.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <img src={bike79Logo.url} alt="79BIKE" className="h-8 md:h-10 object-contain" />
            <img src={yvoltLogo.url} alt="Y-VOLT" className="h-8 md:h-10 object-contain" />
            <img src={fastaceLogo.url} alt="FastAce Performance" className="h-7 md:h-8 object-contain bg-white px-3 py-1.5 rounded-md" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-widest rounded-lg border transition-colors ${
                    brand === b
                      ? "border-brand-cyan text-brand-cyan bg-brand-cyan/10"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {b === "all" ? `${t.nav.pieces} · ${PARTS.length}` : b}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full sm:w-72 bg-zinc-900 border border-zinc-800 focus:border-brand-cyan focus:outline-none rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mr-2">Secteur</span>
            {SECTORS.map((s) => {
              const count = s.id === "all"
                ? Object.values(sectorCounts).reduce((a, b) => a + b, 0)
                : sectorCounts[s.id] ?? 0;
              if (s.id !== "all" && count === 0) return null;
              return (
                <button
                  key={s.id}
                  onClick={() => setSector(s.id)}
                  className={`px-3 py-1.5 text-[11px] uppercase tracking-widest rounded-full border transition-colors ${
                    sector === s.id
                      ? "border-brand-cyan text-brand-cyan bg-brand-cyan/10"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {s.label} <span className="text-zinc-600 ml-1">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.handle}
                to="/$lang/product/$handle"
                params={{ lang: locale, handle: p.handle }}
                className="group bg-zinc-900 rounded-2xl border border-zinc-700/80 ring-1 ring-white/5 hover:border-brand-cyan/70 hover:ring-brand-cyan/20 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)] hover:-translate-y-0.5 overflow-hidden flex flex-col transition-all duration-300"
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
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">79BIKE</span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-base font-medium text-white leading-tight mb-2 line-clamp-2">
                    {p.title.replace(/^(79Bike|FASTACE|Y-VOLT)\s*/i, "")}
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-4">{p.vendor}</p>
                  <div className="mt-auto flex items-end justify-between gap-3">
                    <span className="text-brand-cyan font-display text-lg whitespace-nowrap">
                      {formatPrice(p.priceEur, "EUR")}
                    </span>
                    {!p.available && (
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.cta.unavailable}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-zinc-400 text-lg mb-2">{t.pieces.empty}</p>
              <p className="text-zinc-600 text-sm">{t.pieces.emptyHint}</p>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

