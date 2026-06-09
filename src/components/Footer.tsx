import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
const rideonLogo = { url: "/assets/rideon-logo.svg" };

// TikTok n'est pas dans lucide — petit SVG inline
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V6.94a4.85 4.85 0 0 1-1.84-.25Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram France", href: "https://www.instagram.com/rideondistribution?igsh=NTV5ZjYzamZlamho&utm_source=qr", Icon: Instagram },
  { label: "Instagram España", href: "https://www.instagram.com/rideondistribution.es?igsh=a2EzZ2ZzMmI5ZG4z", Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@rideondistribution", Icon: TikTokIcon },
  { label: "Facebook", href: "https://www.facebook.com/rideondistribution", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@rideondistribution", Icon: Youtube },
  { label: "WhatsApp France", href: "https://wa.me/33698329029", Icon: MessageCircle },
  { label: "WhatsApp España", href: "https://wa.me/34698391214", Icon: MessageCircle },
];

export function Footer() {
  const { locale, t } = useI18n();
  const f = t.footer;
  return (
    <footer className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src={rideonLogo.url} alt="Ride On Distribution" className="h-10 w-10 object-contain" />
            <span className="font-display font-medium text-lg tracking-[0.02em] text-white leading-none">
              Ride On<span className="text-brand-cyan font-semibold"> Distribution</span>
            </span>
          </div>
          <p className="mt-6 text-sm text-zinc-500 leading-relaxed">{f.tagline}</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">{f.products}</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><Link to="/$lang" params={{ lang: locale }} className="hover:text-brand-cyan">{f.productsLinks.motos}</Link></li>
            <li><Link to="/$lang/pieces" params={{ lang: locale }} className="hover:text-brand-cyan">{f.productsLinks.pieces}</Link></li>
            <li><Link to="/$lang/location" params={{ lang: locale }} className="hover:text-brand-cyan">{f.productsLinks.rando}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">{f.support}</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><Link to="/$lang/sav" params={{ lang: locale }} className="hover:text-brand-cyan">{f.supportLinks.sav}</Link></li>
            <li><Link to="/$lang/toulouse" params={{ lang: locale }} className="hover:text-brand-cyan">{f.supportLinks.tls}</Link></li>
            <li><Link to="/$lang/barcelone" params={{ lang: locale }} className="hover:text-brand-cyan">{f.supportLinks.bcn}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-6">{f.newsletter}</h4>
          <p className="text-xs text-zinc-500 mb-4">{f.newsletterText}</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={f.newsletterPlaceholder}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-cyan text-white"
            />
            <button className="bg-brand-cyan text-zinc-950 px-4 py-2 rounded-lg text-sm font-semibold">OK</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex items-center justify-center size-9 rounded-full border border-white/10 text-zinc-400 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{f.copyright}</p>
        <div className="flex gap-6">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{f.legal}</span>
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{f.payment}</span>
        </div>
      </div>
    </footer>
  );
}