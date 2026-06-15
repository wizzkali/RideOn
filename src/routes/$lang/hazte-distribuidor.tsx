import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Truck, Headphones, GraduationCap } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { hreflangLinks, ogUrlMeta, faqLd, jsonLdScript } from "@/lib/seo";

const META = {
  fr: {
    title: "Devenir revendeur 79Bike | Ride On Distribution",
    desc: "Devenez point de vente 79Bike en France et en Espagne : prix revendeur dégressifs, garantie 2 ans, pièces et SAV bilingue, formation incluse. Stock en Europe, livraison 48-72h. Demandez le catalogue.",
  },
  en: {
    title: "Become a 79Bike reseller | Ride On Distribution",
    desc: "Become a 79Bike point of sale in France and Spain: volume reseller pricing, 2-year warranty, parts and bilingual after-sales, training included. Stock in Europe, 48-72h delivery. Request the catalogue.",
  },
  es: {
    title: "Hazte distribuidor 79Bike | Ride On Distribution",
    desc: "Conviértete en punto de venta 79Bike en España y Francia: precios de distribuidor por volumen, garantía 2 años, recambios y SAT bilingüe, formación incluida. Stock en Europa, entrega 48-72h. Pide el catálogo.",
  },
} as const;

export const Route = createFileRoute("/$lang/hazte-distribuidor")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "fr";
    const m = META[l];
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.desc },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.desc },
        ...ogUrlMeta("/hazte-distribuidor", l),
      ],
      links: hreflangLinks("/hazte-distribuidor", l),
      scripts: [jsonLdScript(faqLd([...COPY[l].faq]))],
    };
  },
  component: HazteDistribuidorPage,
});

const COPY = {
  fr: {
    eyebrow: "Programme revendeur",
    title: "Devenez revendeur",
    titleAccent: "79Bike",
    subtitle:
      "Ajoutez la moto électrique 79Bike à votre activité. Distributeur exclusif en France & Espagne, prix revendeur dégressifs, garantie 2 ans, pièces et SAV bilingue, formation incluse. Stock en Europe, livraison 48-72h.",
    cards: [
      { Icon: Wallet, title: "Prix dégressifs", text: "De vraies conditions revendeur, rentables dès les premières unités. Tarifs selon volume." },
      { Icon: Truck, title: "Stock en Europe · 48-72h", text: "Pas d'attente d'import. Le stock est proche, vous êtes livré en 2-3 jours." },
      { Icon: Headphones, title: "Pièces & SAV bilingue", text: "Pièces d'origine et support après-vente en français et en espagnol. Vos clients couverts." },
      { Icon: GraduationCap, title: "Formation incluse", text: "Nous formons votre équipe au produit, à la réglementation et à l'entretien." },
    ],
    stepsTitle: "Comment ça marche",
    steps: [
      { title: "Demandez le catalogue", text: "Remplissez le formulaire et recevez le catalogue pro avec modèles et fiches." },
      { title: "Recevez tarifs & conditions", text: "On vous envoie les prix revendeur et les conditions adaptées à votre activité." },
      { title: "Lancez-vous", text: "Stock livré en 48-72h, avec formation et SAV bilingue à vos côtés." },
    ],
    stats: [
      { n: "Exclusif", label: "Distributeur 79Bike" },
      { n: "48-72h", label: "Livraison Europe" },
      { n: "2 ans", label: "Garantie usine" },
      { n: "ES · FR", label: "SAV bilingue" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Quelle est la commande minimum ?", a: "Des conditions flexibles, rentables dès les premières unités. Les conditions exactes vous sont envoyées avec le catalogue." },
      { q: "Les motos sont-elles homologuées ?", a: "Oui. La gamme 79Bike inclut des modèles homologués route (ex. Falcon Pro L1e-B) et des modèles tout-terrain, avec leur documentation pour la France et l'Espagne." },
      { q: "Sous combien de temps je reçois le stock ?", a: "Stock en Europe, livraisons habituelles en 48-72 heures. Sans attente d'import." },
      { q: "Proposez-vous pièces et SAV ?", a: "Oui, pièces d'origine et support en français et en espagnol, plus une formation technique pour votre équipe." },
      { q: "Quelles zones couvrez-vous ?", a: "Nous développons notre réseau de revendeurs en France et en Espagne, avec showrooms à Toulouse et Barcelone." },
    ],
    formTitle: "Demandez le catalogue et les tarifs revendeur",
    formSub: "Envoyez votre demande, on revient vers vous sous 24h.",
    formContext: "Revendeur",
    requestTypes: ["Devenir revendeur", "Flotte / entreprise", "Loueur / école", "Collectivité", "Autre"],
  },
  en: {
    eyebrow: "Reseller program",
    title: "Become a",
    titleAccent: "79Bike reseller",
    subtitle:
      "Add the 79Bike electric motorcycle to your business. Exclusive distributor in France & Spain, volume reseller pricing, 2-year warranty, parts and bilingual after-sales, training included. Stock in Europe, 48-72h delivery.",
    cards: [
      { Icon: Wallet, title: "Volume pricing", text: "Real reseller conditions, profitable from the very first units. Pricing by volume." },
      { Icon: Truck, title: "Stock in Europe · 48-72h", text: "No import waiting. Stock is close, delivered in 2-3 days." },
      { Icon: Headphones, title: "Parts & bilingual support", text: "OEM parts and after-sales support in French and Spanish. Your customers covered." },
      { Icon: GraduationCap, title: "Training included", text: "We train your team on the product, regulations and maintenance." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Request the catalogue", text: "Fill the form and get the pro catalogue with models and specs." },
      { title: "Receive pricing & terms", text: "We send reseller prices and conditions tailored to your business." },
      { title: "Get started", text: "Stock delivered in 48-72h, with training and bilingual support at your side." },
    ],
    stats: [
      { n: "Exclusive", label: "79Bike distributor" },
      { n: "48-72h", label: "Europe delivery" },
      { n: "2 years", label: "Factory warranty" },
      { n: "ES · FR", label: "Bilingual support" },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "What is the minimum order?", a: "Flexible conditions, profitable from the first units. Exact terms are sent with the catalogue." },
      { q: "Are the motorcycles road-legal?", a: "Yes. The 79Bike range includes road-homologated models (e.g. Falcon Pro L1e-B) and off-road models, with documentation for France and Spain." },
      { q: "How fast do I get stock?", a: "Stock in Europe, usually delivered within 48-72 hours. No import waiting." },
      { q: "Do you offer parts and after-sales?", a: "Yes, OEM parts and support in French and Spanish, plus technical training for your team." },
      { q: "Which areas do you cover?", a: "We are growing our reseller network in France and Spain, with showrooms in Toulouse and Barcelona." },
    ],
    formTitle: "Request the catalogue and reseller pricing",
    formSub: "Send your request, we reply within 24h.",
    formContext: "Reseller",
    requestTypes: ["Become a reseller", "Fleet / company", "Rental / school", "Public sector", "Other"],
  },
  es: {
    eyebrow: "Programa de distribución",
    title: "Hazte distribuidor",
    titleAccent: "79Bike",
    subtitle:
      "Suma la moto eléctrica 79Bike a tu negocio. Distribuidor exclusivo en España y Francia, precios de distribuidor por volumen, garantía 2 años, recambios y SAT bilingüe, formación incluida. Stock en Europa, entrega 48-72h.",
    cards: [
      { Icon: Wallet, title: "Precios por volumen", text: "Condiciones de distribuidor reales, rentables desde las primeras unidades. Tarifas según volumen." },
      { Icon: Truck, title: "Stock en Europa · 48-72h", text: "Nada de esperas de importación. El stock está cerca y lo recibes en 2-3 días." },
      { Icon: Headphones, title: "Recambios y SAT bilingüe", text: "Recambios originales y postventa en español y francés. Tus clientes, cubiertos." },
      { Icon: GraduationCap, title: "Formación incluida", text: "Formamos a tu equipo en producto, normativa y mantenimiento." },
    ],
    stepsTitle: "Cómo funciona",
    steps: [
      { title: "Solicita el catálogo", text: "Rellena el formulario y recibe el catálogo profesional con modelos y especificaciones." },
      { title: "Recibe tarifas y condiciones", text: "Te enviamos los precios de distribuidor y las condiciones adaptadas a tu negocio." },
      { title: "Empieza a vender", text: "Stock en 48-72h, con formación y SAT bilingüe a tu lado." },
    ],
    stats: [
      { n: "Exclusivo", label: "Distribuidor 79Bike" },
      { n: "48-72h", label: "Entrega Europa" },
      { n: "2 años", label: "Garantía de fábrica" },
      { n: "ES · FR", label: "SAT bilingüe" },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Cuál es el pedido mínimo?", a: "Condiciones flexibles, rentables desde las primeras unidades. Las condiciones exactas se envían con el catálogo." },
      { q: "¿Las motos están homologadas?", a: "Sí. La gama 79Bike incluye modelos homologados para carretera (ej. Falcon Pro L1e-B) y modelos off-road, con su documentación para España y Francia." },
      { q: "¿En cuánto tiempo recibo el stock?", a: "Stock en Europa, con entregas habituales en 48-72 horas. Sin esperas de importación." },
      { q: "¿Dais recambios y postventa?", a: "Sí, recambios originales y soporte en español y francés, además de formación técnica para tu equipo." },
      { q: "¿Qué zonas cubrís?", a: "Estamos ampliando nuestra red de distribuidores en España y Francia, con showrooms en Toulouse y Barcelona." },
    ],
    formTitle: "Solicita el catálogo y las tarifas de distribuidor",
    formSub: "Envía tu solicitud y te respondemos en 24h.",
    formContext: "Distribuidor",
    requestTypes: ["Hazte distribuidor", "Flota / empresa", "Alquiler / escuela", "Administración", "Otro"],
  },
};

function HazteDistribuidorPage() {
  const { locale } = useI18n();
  const c = COPY[locale];
  return (
    <SiteLayout>
      <PageHero
        eyebrow={c.eyebrow}
        title={<>{c.title} <span className="text-brand-cyan">{c.titleAccent}</span></>}
        subtitle={c.subtitle}
      />

      {/* Ventajas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.cards.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="group p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-md hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.35)]"
              >
                <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-brand-cyan/15 to-brand-cyan/0 ring-1 ring-brand-cyan/25 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
                  <Icon className="size-5 text-brand-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-medium text-[15px] tracking-tight mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {c.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl text-brand-cyan">{s.n}</div>
              <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-12">{c.stepsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.steps.map((s, i) => (
              <div key={s.title} className="p-7 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-brand-cyan/15 ring-1 ring-brand-cyan/30 text-brand-cyan font-display text-lg">
                  {i + 1}
                </div>
                <h3 className="text-white font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-10">{c.faqTitle}</h2>
          <div className="space-y-3">
            {c.faq.map((item) => (
              <details key={item.q} className="group rounded-xl border border-white/5 bg-zinc-900/50 px-5">
                <summary className="cursor-pointer list-none py-4 flex items-center justify-between gap-4 text-white font-medium">
                  {item.q}
                  <span className="text-brand-cyan text-xl leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactForm
        contextLabel={c.formContext}
        title={c.formTitle}
        subtitle={c.formSub}
        requestTypes={c.requestTypes}
        defaultRequestType={c.requestTypes[0]}
      />
    </SiteLayout>
  );
}
