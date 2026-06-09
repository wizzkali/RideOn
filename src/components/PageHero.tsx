import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  image,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  image?: string;
}) {
  if (image) {
    return (
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden border-b border-zinc-900">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950/95" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center justify-end pb-12">
          {eyebrow && (
            <div className="inline-flex w-fit items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-zinc-950/60 border border-brand-cyan/40 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-clip-text text-transparent">{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            {title}
          </h1>
          {subtitle && <p className="text-lg text-zinc-200 max-w-2xl text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] mx-auto">{subtitle}</p>}
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className="pt-20 pb-16 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {eyebrow && (
          <div className="inline-flex w-fit items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-zinc-950/60 border border-brand-cyan/40 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] mb-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-brand-cyan via-white to-brand-cyan bg-clip-text text-transparent">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6">
          {title}
        </h1>
        {subtitle && <p className="text-lg text-zinc-400 max-w-2xl text-pretty">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}