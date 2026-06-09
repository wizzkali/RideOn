import { MapPin, Wrench, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ShowroomSEO } from "@/content/showroomSeo";

/**
 * Long-form SEO content block rendered below the hero on each showroom page.
 * Pure presentational — semantic HTML (h2/h3, section, dl) for crawlers.
 */
export function ShowroomLongContent({ data }: { data: ShowroomSEO }) {
  return (
    <div className="bg-zinc-950">
      {/* Intro */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
            <Sparkles className="size-3.5" /> À propos
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
            {data.introTitle}
          </h2>
          <div className="space-y-5 text-zinc-300 text-[15px] leading-relaxed">
            {data.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
              <Wrench className="size-3.5" /> Services
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{data.servicesTitle}</h2>
            <p className="text-zinc-400">{data.servicesIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.services.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-brand-cyan/40 transition-colors"
              >
                <h3 className="font-display text-lg text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage zones */}
      <section className="py-20 border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-zinc-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
              <MapPin className="size-3.5" /> Zones desservies
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{data.coverageTitle}</h2>
            <p className="text-zinc-400">{data.coverageIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.coverageZones.map((z) => (
              <div
                key={z.name}
                className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60"
              >
                <h3 className="font-display text-base text-brand-cyan mb-2">{z.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{z.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
            <Sparkles className="size-3.5" /> Pourquoi nous
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{data.whyTitle}</h2>
          <div className="space-y-5 text-zinc-300 text-[15px] leading-relaxed">
            {data.whyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Technical / homologation */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
            <ShieldCheck className="size-3.5" /> Homologation
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{data.technicalTitle}</h2>
          <div className="space-y-4 text-zinc-300 text-[15px] leading-relaxed">
            {data.technicalParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4">
              <HelpCircle className="size-3.5" /> FAQ
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{data.faqTitle}</h2>
            <p className="text-zinc-400">{data.faqIntro}</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {data.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-zinc-800"
              >
                <AccordionTrigger className="text-white text-left text-base hover:text-brand-cyan hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-[15px] leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

