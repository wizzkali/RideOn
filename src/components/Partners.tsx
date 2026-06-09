import yvolt from "@/assets/yvolt-logo-v2.png.asset.json";
import rideon from "@/assets/rideon-distribution-logo.png.asset.json";
import bike79 from "@/assets/79bike-logo-v2.png.asset.json";
import fastace from "@/assets/fastace-logo.png.asset.json";

const partners = [
  { name: "Y-VOLT", url: yvolt.url, className: "h-16 md:h-20" },
  { name: "79BIKE", url: bike79.url, className: "h-20 md:h-24" },
  { name: "FastAce Performance", url: fastace.url, className: "h-12 md:h-14 bg-white px-4 py-2 rounded-md" },
  { name: "RideOn Distribution", url: rideon.url, className: "h-20 md:h-24" },
];

export function Partners({ title = "Nos partenaires", subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-cyan mb-3">Partenaires officiels</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-white">{title}</h2>
          {subtitle && <p className="text-zinc-500 mt-3 text-sm max-w-xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex items-center justify-center h-36 md:h-40 w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-brand-cyan/40 hover:bg-zinc-900/80 transition-colors"
              title={p.name}
            >
              <img
                src={p.url}
                alt={p.name}
                className={`${p.className} object-contain max-w-[80%] transition-transform duration-500 group-hover:scale-105`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
