import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const FR = { phone: "33698329029", display: "+33 6 98 32 90 29", label: "France" };
const ES = { phone: "34698391214", display: "+34 698 39 12 14", label: "España" };

export function FloatingWhatsApp() {
  const [contact, setContact] = useState(FR);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = typeof window !== "undefined" ? window.localStorage.getItem("rod_geo_country") : null;
    if (cached === "ES") setContact(ES);
    fetch("https://ipapi.co/country/")
      .then((r) => (r.ok ? r.text() : ""))
      .then((c) => {
        if (cancelled) return;
        const code = (c || "").trim().toUpperCase();
        if (code) window.localStorage.setItem("rod_geo_country", code);
        setContact(code === "ES" ? ES : FR);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const href = `https://wa.me/${contact.phone}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)]">
      {open && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-4 shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <p className="text-[11px] uppercase tracking-widest text-brand-cyan mb-1">WhatsApp · {contact.label}</p>
          <p className="text-white font-semibold text-sm mb-3">{contact.display}</p>
          <div className="flex gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-cyan text-zinc-950 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg text-center hover:opacity-90"
            >
              Discuter
            </a>
            <button
              type="button"
              onClick={() => setContact(contact.phone === FR.phone ? ES : FR)}
              className="text-xs text-zinc-400 hover:text-brand-cyan px-2"
              aria-label="Changer de pays"
              title="Changer de pays"
            >
              {contact.phone === FR.phone ? "ES" : "FR"}
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`WhatsApp ${contact.label} ${contact.display}`}
        className="group inline-flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-3 sm:pr-4 py-3 min-h-11 min-w-11 rounded-full shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] hover:scale-105 transition-transform"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-widest">{contact.label}</span>
      </button>
    </div>
  );
}

