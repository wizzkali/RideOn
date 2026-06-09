import type { ReactNode } from "react";

export function VideoHero({
  src,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  src: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden border-b border-zinc-900">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/90" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
        {eyebrow && (
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 backdrop-blur-sm mb-6">
            <span className="size-2 rounded-full bg-brand-cyan" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-none text-balance mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          {title}
        </h1>
        {subtitle && <p className="text-lg text-zinc-200 max-w-2xl text-pretty drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}