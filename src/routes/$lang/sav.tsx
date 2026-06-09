import { createFileRoute } from "@tanstack/react-router";
import { Wrench, Shield, Truck, Headphones } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";

export const Route = createFileRoute("/$lang/sav")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.sav.title },
        { name: "description", content: d.meta.sav.desc },
        { property: "og:title", content: d.meta.sav.title },
        { property: "og:description", content: d.meta.sav.desc },
        ...ogUrlMeta("/sav", l),
      ],
      links: hreflangLinks("/sav", l),
    };
  },
  component: SavPage,
});

function SavPage() {
  const { t } = useI18n();
  const ICONS = [Shield, Wrench, Truck, Headphones];
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.sav.eyebrow}
        title={<>{t.sav.title} <span className="text-brand-cyan">{t.sav.titleAccent}</span></>}
        subtitle={t.sav.subtitle}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {t.sav.cards.map((b, i) => {
            const Icon = ICONS[i] ?? Shield;
            return (
              <div key={b.title} className="group p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)]">
                <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                  <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-medium text-[15px] tracking-tight mb-2">{b.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{b.text}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl text-white mb-8">{t.sav.contact}</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={t.sav.form.name} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan" />
              <input type="email" placeholder={t.sav.form.email} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan" />
            </div>
            <input type="text" placeholder={t.sav.form.serial} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan" />
            <textarea rows={5} placeholder={t.sav.form.message} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan" />
            <button className="bg-brand-cyan text-zinc-950 px-8 py-3 rounded-lg font-semibold">{t.cta.send}</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}