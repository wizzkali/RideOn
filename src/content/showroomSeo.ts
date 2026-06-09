/**
 * Long-form SEO content for the three showroom/spot pages.
 * One object per locale × location. Rendered by <ShowroomLongContent />
 * and serialized to FAQPage JSON-LD in each route's head().
 *
 * SEO targets:
 *  - Barcelona  → "moto eléctrica Barcelona", "moto eléctrica homologada DGT",
 *                 "etiqueta CERO emisiones moto", "ZBE Barcelona moto eléctrica"
 *  - Le Cuing   → "moto électrique Saint-Gaudens", "garage moto électrique Toulouse",
 *                 "concessionnaire 79Bike Occitanie", "moto électrique Haute-Garonne"
 *  - Leucate    → "moto électrique Leucate", "rando moto électrique Aude",
 *                 "moto électrique Narbonne Perpignan"
 */

import type { Locale } from "@/i18n/config";

export type FAQItem = { q: string; a: string };

export type ShowroomSEO = {
  introTitle: string;
  introParagraphs: string[];
  servicesTitle: string;
  servicesIntro: string;
  services: { title: string; text: string }[];
  coverageTitle: string;
  coverageIntro: string;
  coverageZones: { name: string; text: string }[];
  whyTitle: string;
  whyParagraphs: string[];
  technicalTitle: string;
  technicalParagraphs: string[];
  faqTitle: string;
  faqIntro: string;
  faq: FAQItem[];
};

export type ShowroomKey = "barcelona" | "lecuing" | "leucate";

/* ============================================================================
 * BARCELONA — priorité absolue : ouverture prochaine, ZBE, etiqueta CERO, DGT
 * ==========================================================================*/
const barcelonaFR: ShowroomSEO = {
  introTitle: "Showroom 79Bike Barcelona — moto électrique homologuée DGT",
  introParagraphs: [
    "Ride On Distribution ouvre son showroom et garage 79Bike à Barcelone, capitale catalane et l'une des villes les plus engagées d'Europe dans la mobilité zéro émission. Nous y présentons toute la gamme Falcon : Falcon GT, Falcon Pro et Falcon GT PRO, des motos électriques homologuées route en Espagne, livrées avec carte grise, plaque définitive et étiquette environnementale CERO emisiones de la DGT.",
    "Notre showroom est conçu comme un point unique : essais sur route, vente neuf, location courte et longue durée, financement 3x/4x/10x, mécanique spécialisée moto électrique et SAV officiel 79Bike. Que vous soyez résident à Eixample, Gràcia, Sant Martí, Sarrià ou que vous veniez de l'Aire métropolitaine (L'Hospitalet, Badalona, Sant Cugat), nous vous accueillons en français, en castillan et en catalan.",
    "Pourquoi Barcelone ? Parce que la ville cumule 300 jours de soleil par an, une Zone à Faibles Émissions (ZBE Rondes de Barcelona) parmi les plus strictes d'Europe, et un réseau de bornes de recharge dense — un terrain idéal pour passer à l'électrique sans compromis sur le plaisir de rouler.",
  ],
  servicesTitle: "Services proposés au showroom Barcelona",
  servicesIntro: "Tout 79Bike sous le même toit, avec une équipe bilingue FR/ES/CAT et un atelier équipé pour la mécanique batterie haute tension.",
  services: [
    { title: "Vente moto neuve homologuée", text: "Falcon GT, Pro et GT PRO en stock, livrées avec carte grise espagnole (permiso de circulación), plaque et etiqueta CERO. Permis A1, A2, A ou B accepté selon le modèle." },
    { title: "Essai gratuit sur rendez-vous", text: "Réservez 30 min d'essai dynamique en conditions réelles autour de Barcelone. Casque, gants et assurance fournis." },
    { title: "Location courte et longue durée", text: "À la journée, à la semaine ou au mois. Idéal pour les expatriés, digital nomads et entreprises qui veulent tester avant d'acheter." },
    { title: "Financement 3x, 4x, 10x et 12x", text: "Paiement échelonné sans frais jusqu'à 3 000 € (Alma / Klarna), et financement long jusqu'à 36 mois pour les modèles GT PRO." },
    { title: "Atelier mécanique 79Bike", text: "Diagnostic électronique, entretien batterie, contrôle freinage, pneumatiques, mise à jour firmware. Pièces d'origine en stock." },
    { title: "SAV officiel et garantie 2 ans", text: "Prise en charge garantie constructeur, intervention sous 48h, prêt de moto possible pendant l'immobilisation." },
    { title: "Flotte entreprise B2B", text: "Solutions de mobilité pour livreurs, hôtels, conciergeries et flottes professionnelles. Devis sur mesure, leasing LOA/LLD disponible." },
    { title: "Reprise et occasion certifiée", text: "Nous reprenons votre ancienne moto thermique ou électrique. Occasions Falcon révisées et garanties 6 mois." },
  ],
  coverageTitle: "Zones desservies depuis Barcelone",
  coverageIntro: "Nous livrons, intervenons et organisons des essais dans toute la province de Barcelone et au-delà, en Catalogne.",
  coverageZones: [
    { name: "Barcelone centre", text: "Eixample, Gràcia, Sant Antoni, El Born, Barceloneta, Sant Martí, Poble-sec, Sants — livraison sous 24-48h." },
    { name: "Aire métropolitaine", text: "L'Hospitalet de Llobregat, Badalona, Santa Coloma, Sant Adrià, Cornellà, Esplugues, Sant Just Desvern." },
    { name: "Vallès Occidental & Oriental", text: "Sabadell, Terrassa, Sant Cugat del Vallès, Cerdanyola, Granollers, Mollet del Vallès." },
    { name: "Maresme & Garraf", text: "Mataró, Premià, Sitges, Vilanova i la Geltrú, Castelldefels, Gavà." },
    { name: "Costa Brava & Girona", text: "Blanes, Lloret de Mar, Tossa, Palamós, Begur, Cadaqués, Figueres, Girona ville — livraison sur devis." },
    { name: "Reste de la Catalogne", text: "Tarragona, Reus, Lleida et Andorre sur demande. Pour la France (Perpignan, Toulouse), voir notre garage de Le Cuing." },
  ],
  whyTitle: "Pourquoi rouler en moto électrique à Barcelone",
  whyParagraphs: [
    "La ZBE Rondes de Barcelona (Zona de Baixes Emissions) interdit en semaine la circulation des motos sans étiquette environnementale. Avec une Falcon 79Bike, vous obtenez l'etiqueta CERO emisiones — la plus permissive — qui vous autorise à circuler partout, à stationner gratuitement dans la zone bleue municipale (selon arrondissement) et à accéder au centre historique sans restriction.",
    "Coût d'usage imbattable : une charge complète revient à environ 0,80 € pour 100 km parcourus, soit 8 à 10 fois moins qu'un scooter thermique équivalent. Pas de vidange, pas d'embrayage, pas de courroie : l'entretien annuel se résume à un contrôle freinage, pneus et firmware.",
    "Bonus écologique espagnol : selon les modèles et la communauté autonome, l'achat d'une moto électrique peut ouvrir droit au Plan MOVES III (jusqu'à 1 100 € de subvention). Notre équipe vous accompagne dans le montage du dossier.",
    "Confort urbain : couple instantané pour les démarrages au feu, silence absolu dans les ruelles du Born, autonomie suffisante pour les allers-retours vers Sitges, Castelldefels ou la Costa Brava le week-end.",
  ],
  technicalTitle: "Homologation, permis et démarches DGT",
  technicalParagraphs: [
    "Falcon GT (L1e-B) : équivalent 50 cm³, vitesse limitée à 45 km/h, accessible dès 15 ans avec le permis AM, ou avec le permis B (voiture) sans formation supplémentaire en Espagne pour les résidents.",
    "Falcon Pro (L3e-A1) : équivalent 125 cm³, vitesse jusqu'à 95 km/h, accessible avec le permis A1 (16 ans) ou le permis B après 3 ans + formation 9h en France ; en Espagne le permis A1 est requis.",
    "Falcon GT PRO (L3e-A2 / A) : équivalent 11 kW, jusqu'à 110 km/h, accessible avec le permis A2.",
    "Toutes nos motos sont livrées prêtes à rouler : matriculación DGT, permiso de circulación, ficha técnica, etiqueta ambiental CERO, plaque définitive et assurance temporaire de mise en route. Nous gérons l'intégralité des démarches pour les clients résidents en Espagne, et pour les expatriés français nous proposons un accompagnement bilingue pour le NIE, le padrón et l'empadronamiento.",
  ],
  faqTitle: "Questions fréquentes — Showroom Barcelona",
  faqIntro: "Tout ce qu'il faut savoir avant d'acheter ou de louer une moto électrique 79Bike à Barcelone.",
  faq: [
    {
      q: "Où se trouve exactement le showroom 79Bike à Barcelone ?",
      a: "Notre showroom ouvre prochainement à Barcelone. En attendant l'inauguration, nous recevons sur rendez-vous et organisons des essais à domicile dans toute l'aire métropolitaine. Contactez-nous au +34 698 39 12 14 (WhatsApp) ou à barcelona@rideon-distribution.fr pour fixer une démonstration.",
    },
    {
      q: "Les motos 79Bike sont-elles homologuées en Espagne (DGT) ?",
      a: "Oui, à 100 %. Toutes les Falcon (GT, Pro, GT PRO) sont homologuées CE et matriculables auprès de la DGT espagnole. Elles sont livrées avec permiso de circulación, ficha técnica, plaque définitive et etiqueta ambiental CERO emisiones — la plus avantageuse pour circuler dans la ZBE de Barcelone.",
    },
    {
      q: "Puis-je circuler dans la Zona de Baixes Emissions (ZBE) avec une 79Bike ?",
      a: "Oui, sans aucune restriction. L'etiqueta CERO emisiones donne accès permanent à la ZBE Rondes de Barcelona, 24h/24 et 7j/7, y compris pendant les épisodes de pollution où les véhicules thermiques sans étiquette sont interdits.",
    },
    {
      q: "Quel permis faut-il pour conduire une Falcon en Espagne ?",
      a: "Falcon GT : permis AM (15 ans) ou B (résidents espagnols). Falcon Pro : permis A1 (16 ans). Falcon GT PRO : permis A2 (18 ans). Nous vous orientons vers les auto-écoles partenaires si besoin.",
    },
    {
      q: "Quelle est l'autonomie réelle d'une Falcon en ville et sur route ?",
      a: "En usage urbain barcelonais (vitesse moyenne 25-35 km/h, démarrages fréquents), comptez 90 à 130 km par charge selon le modèle. Sur route à vitesse stabilisée 80 km/h, l'autonomie réelle tourne autour de 70-100 km. La batterie est amovible et se recharge sur une simple prise 220V en 4 à 6 heures.",
    },
    {
      q: "Proposez-vous un paiement en plusieurs fois ?",
      a: "Oui : paiement en 3x ou 4x sans frais jusqu'à 3 000 € via Alma et Klarna, et financement long (10x, 12x, 24x, 36x) via nos partenaires bancaires pour les modèles plus chers. Demandez votre simulation en showroom ou en ligne.",
    },
    {
      q: "Puis-je bénéficier du Plan MOVES III pour l'achat ?",
      a: "Oui, sous conditions de résidence en Espagne et selon la communauté autonome. Le Plan MOVES III peut couvrir jusqu'à 1 100 € pour une moto électrique L3e neuve. Notre équipe monte le dossier pour vous : devis MOVES, justificatifs et dépôt auprès de la Generalitat de Catalunya.",
    },
    {
      q: "Quelle garantie est incluse avec la moto ?",
      a: "Garantie constructeur 79Bike de 2 ans sur la moto et 2 ans / 30 000 km sur la batterie. Pendant toute la durée de la garantie, le SAV est assuré directement à Barcelone, sans renvoi à l'étranger.",
    },
    {
      q: "Faites-vous la reprise de mon ancien scooter ?",
      a: "Oui, nous reprenons votre scooter ou moto (thermique ou électrique) sous 48h après inspection. La valeur de reprise est déduite immédiatement du prix de votre Falcon neuve.",
    },
    {
      q: "Peut-on louer une 79Bike pour quelques jours à Barcelone ?",
      a: "Oui. Nous proposons la location à la journée (à partir de 39 €/jour), à la semaine (tarif dégressif) et au mois pour les digital nomads et expatriés. Réservation sur barcelona@rideon-distribution.fr ou WhatsApp +34 698 39 12 14.",
    },
  ],
};

const barcelonaES: ShowroomSEO = {
  introTitle: "Showroom 79Bike Barcelona — moto eléctrica homologada DGT",
  introParagraphs: [
    "Ride On Distribution abre próximamente su showroom y taller 79Bike en Barcelona, una de las ciudades europeas más comprometidas con la movilidad cero emisiones. Presentamos toda la gama Falcon: Falcon GT, Falcon Pro y Falcon GT PRO, motos eléctricas homologadas para circular en carretera en España, entregadas con permiso de circulación, matrícula definitiva y etiqueta ambiental CERO emisiones de la DGT.",
    "Nuestro showroom es un punto único: pruebas en carretera, venta nueva, alquiler corto y largo plazo, financiación en 3x, 4x, 10x y hasta 36 meses, taller mecánico especializado en moto eléctrica y SAT oficial 79Bike. Tanto si vives en Eixample, Gràcia, Sant Martí o Sarrià, como si vienes del Área Metropolitana (L'Hospitalet, Badalona, Sant Cugat), te atendemos en castellano, catalán y francés.",
    "¿Por qué Barcelona? Porque la ciudad combina 300 días de sol al año, una Zona de Baixes Emissions (ZBE Rondes de Barcelona) entre las más estrictas de Europa, y una red de puntos de recarga densa — el terreno ideal para pasar a la eléctrica sin renunciar al placer de conducir.",
  ],
  servicesTitle: "Servicios del showroom Barcelona",
  servicesIntro: "Todo 79Bike bajo el mismo techo, con un equipo trilingüe ES/CAT/FR y un taller equipado para mecánica de batería de alta tensión.",
  services: [
    { title: "Venta de moto eléctrica nueva", text: "Falcon GT, Pro y GT PRO en stock, entregadas con permiso de circulación, matrícula y etiqueta CERO. Carnet AM, A1, A2, A o B según el modelo." },
    { title: "Prueba gratuita con cita previa", text: "Reserva 30 min de prueba dinámica en condiciones reales por Barcelona. Casco, guantes y seguro incluidos." },
    { title: "Alquiler corto y largo plazo", text: "Por día, semana o mes. Ideal para expatriados, nómadas digitales y empresas que quieren probar antes de comprar." },
    { title: "Financiación 3x, 4x, 10x y 12x", text: "Pago aplazado sin intereses hasta 3 000 € (Alma / Klarna), y financiación larga hasta 36 meses para los modelos GT PRO." },
    { title: "Taller mecánico 79Bike", text: "Diagnóstico electrónico, mantenimiento de batería, control de frenos, neumáticos, actualización de firmware. Repuestos originales en stock." },
    { title: "SAT oficial y garantía 2 años", text: "Gestión de la garantía de fábrica, intervención en 48h, posibilidad de moto de cortesía durante la reparación." },
    { title: "Flota empresarial B2B", text: "Soluciones de movilidad para repartidores, hoteles, conserjerías y flotas profesionales. Presupuesto a medida, renting disponible." },
    { title: "Recompra y ocasión certificada", text: "Recompramos tu moto antigua térmica o eléctrica. Ocasiones Falcon revisadas y garantizadas 6 meses." },
  ],
  coverageTitle: "Zonas atendidas desde Barcelona",
  coverageIntro: "Entregamos, intervenimos y organizamos pruebas en toda la provincia de Barcelona y más allá, en Cataluña.",
  coverageZones: [
    { name: "Barcelona centro", text: "Eixample, Gràcia, Sant Antoni, El Born, Barceloneta, Sant Martí, Poble-sec, Sants — entrega en 24-48h." },
    { name: "Área Metropolitana", text: "L'Hospitalet de Llobregat, Badalona, Santa Coloma, Sant Adrià, Cornellà, Esplugues, Sant Just Desvern." },
    { name: "Vallès Occidental y Oriental", text: "Sabadell, Terrassa, Sant Cugat del Vallès, Cerdanyola, Granollers, Mollet del Vallès." },
    { name: "Maresme y Garraf", text: "Mataró, Premià, Sitges, Vilanova i la Geltrú, Castelldefels, Gavà." },
    { name: "Costa Brava y Girona", text: "Blanes, Lloret de Mar, Tossa, Palamós, Begur, Cadaqués, Figueres, ciudad de Girona — entrega bajo presupuesto." },
    { name: "Resto de Cataluña", text: "Tarragona, Reus, Lleida y Andorra bajo petición. Para Francia (Perpiñán, Toulouse), consulta nuestro taller de Le Cuing." },
  ],
  whyTitle: "Por qué circular en moto eléctrica en Barcelona",
  whyParagraphs: [
    "La ZBE Rondes de Barcelona prohíbe entre semana la circulación de motos sin etiqueta ambiental. Con una Falcon 79Bike obtienes la etiqueta CERO emisiones — la más permisiva — que te permite circular en cualquier parte, aparcar gratis en la zona azul municipal (según distrito) y acceder al centro histórico sin restricción.",
    "Coste imbatible: una carga completa cuesta alrededor de 0,80 € por 100 km, entre 8 y 10 veces menos que un scooter de gasolina equivalente. Sin cambio de aceite, sin embrague, sin correa: el mantenimiento anual se reduce a un control de frenos, neumáticos y firmware.",
    "Ayudas Plan MOVES III: según comunidad autónoma, la compra de una moto eléctrica puede dar derecho a una subvención de hasta 1 100 €. Nuestro equipo te acompaña en el trámite ante la Generalitat de Catalunya.",
    "Confort urbano: par instantáneo en los semáforos, silencio absoluto por las calles del Born, autonomía suficiente para escapadas a Sitges, Castelldefels o la Costa Brava el fin de semana.",
  ],
  technicalTitle: "Homologación, carnet y trámites DGT",
  technicalParagraphs: [
    "Falcon GT (L1e-B): equivalente a 50 cc, limitada a 45 km/h, accesible desde 15 años con carnet AM, o con carnet B (turismo) para residentes en España.",
    "Falcon Pro (L3e-A1): equivalente a 125 cc, hasta 95 km/h, accesible con carnet A1 (16 años) o con carnet B tras 3 años + curso de 9h en Francia; en España se exige A1.",
    "Falcon GT PRO (L3e-A2 / A): equivalente a 11 kW, hasta 110 km/h, accesible con carnet A2.",
    "Todas nuestras motos se entregan listas para circular: matriculación DGT, permiso de circulación, ficha técnica, etiqueta ambiental CERO, matrícula definitiva y seguro temporal de puesta en marcha. Gestionamos todos los trámites para residentes en España, y para expatriados franceses ofrecemos acompañamiento bilingüe para NIE, padrón y empadronamiento.",
  ],
  faqTitle: "Preguntas frecuentes — Showroom Barcelona",
  faqIntro: "Todo lo que necesitas saber antes de comprar o alquilar una moto eléctrica 79Bike en Barcelona.",
  faq: [
    { q: "¿Dónde se encuentra el showroom 79Bike en Barcelona?", a: "Nuestro showroom abre próximamente en Barcelona. Mientras tanto, atendemos con cita previa y organizamos pruebas a domicilio en toda el área metropolitana. Contáctanos al +34 698 39 12 14 (WhatsApp) o en barcelona@rideon-distribution.fr." },
    { q: "¿Están las motos 79Bike homologadas en España (DGT)?", a: "Sí, al 100 %. Todas las Falcon están homologadas CE y matriculables ante la DGT española. Se entregan con permiso de circulación, ficha técnica, matrícula definitiva y etiqueta ambiental CERO emisiones." },
    { q: "¿Puedo circular por la ZBE de Barcelona con una 79Bike?", a: "Sí, sin ninguna restricción. La etiqueta CERO emisiones da acceso permanente a la ZBE Rondes de Barcelona, 24/7, incluso durante episodios de contaminación." },
    { q: "¿Qué carnet necesito para conducir una Falcon en España?", a: "Falcon GT: carnet AM (15 años) o B (residentes). Falcon Pro: carnet A1 (16 años). Falcon GT PRO: carnet A2 (18 años). Te orientamos hacia autoescuelas asociadas si lo necesitas." },
    { q: "¿Cuál es la autonomía real de una Falcon en ciudad y carretera?", a: "En uso urbano barcelonés: 90-130 km por carga según modelo. En carretera a 80 km/h estables: 70-100 km reales. La batería es extraíble y se recarga en un enchufe 220V en 4-6 horas." },
    { q: "¿Ofrecéis pago a plazos?", a: "Sí: pago en 3x o 4x sin intereses hasta 3 000 € vía Alma y Klarna, y financiación larga (10x, 12x, 24x, 36x) vía partners bancarios para modelos más caros." },
    { q: "¿Puedo beneficiarme del Plan MOVES III?", a: "Sí, bajo condiciones de residencia en España y según comunidad autónoma. El Plan MOVES III puede cubrir hasta 1 100 € para una moto eléctrica L3e nueva. Tramitamos el expediente por ti." },
    { q: "¿Qué garantía incluye la moto?", a: "Garantía de fábrica 79Bike de 2 años sobre la moto y 2 años / 30 000 km sobre la batería. El SAT se realiza directamente en Barcelona, sin envíos al extranjero." },
    { q: "¿Aceptáis la recompra de mi scooter actual?", a: "Sí, recompramos tu scooter o moto (térmica o eléctrica) en 48h tras inspección. El valor se descuenta directamente del precio de tu Falcon nueva." },
    { q: "¿Se puede alquilar una 79Bike unos días en Barcelona?", a: "Sí. Alquiler por día (desde 39 €/día), semana (tarifa decreciente) y mes para nómadas digitales y expatriados. Reserva en barcelona@rideon-distribution.fr o WhatsApp +34 698 39 12 14." },
  ],
};

const barcelonaEN: ShowroomSEO = {
  introTitle: "79Bike Barcelona showroom — DGT-homologated electric motorcycles",
  introParagraphs: [
    "Ride On Distribution is opening its 79Bike showroom and workshop in Barcelona — one of Europe's most committed cities to zero-emission mobility. We present the full Falcon range: Falcon GT, Falcon Pro and Falcon GT PRO, road-legal electric motorcycles in Spain, delivered with DGT registration, plate and CERO emissions environmental sticker.",
    "One-stop shop: test rides, new sales, short and long-term rental, 3x/4x/10x financing, dedicated EV workshop and official 79Bike service. Whether you live in Eixample, Gràcia, Sant Martí or come from the metropolitan area (L'Hospitalet, Badalona, Sant Cugat), we serve you in English, Spanish, Catalan and French.",
    "Why Barcelona? 300 sunny days a year, one of Europe's strictest Low Emission Zones (ZBE Rondes), and a dense charging network — the ideal ground to switch to electric without compromise.",
  ],
  servicesTitle: "Services at the Barcelona showroom",
  servicesIntro: "All 79Bike services under one roof with a multilingual team and a workshop equipped for high-voltage EV mechanics.",
  services: [
    { title: "New EV motorcycle sales", text: "Falcon GT, Pro and GT PRO in stock, delivered with Spanish registration, plate and CERO sticker." },
    { title: "Free test ride by appointment", text: "Book a 30-minute live test ride around Barcelona. Helmet, gloves and insurance provided." },
    { title: "Short & long-term rental", text: "Daily, weekly or monthly — ideal for expats, digital nomads and businesses." },
    { title: "Installment payment 3x/4x/10x", text: "Interest-free up to €3,000 (Alma / Klarna), and long-term financing up to 36 months." },
    { title: "79Bike workshop", text: "Electronic diagnostic, battery service, brakes, tyres, firmware updates. OEM parts in stock." },
    { title: "Official aftersales & 2-year warranty", text: "Manufacturer warranty handled locally, 48h intervention, courtesy bike available." },
    { title: "B2B fleet solutions", text: "Mobility solutions for delivery riders, hotels, concierges and corporate fleets. Custom quotes and leasing." },
    { title: "Buy-back & certified used", text: "We buy back your old motorcycle. Certified used Falcons revised and warrantied for 6 months." },
  ],
  coverageTitle: "Service area from Barcelona",
  coverageIntro: "We deliver, service and organise test rides across Barcelona province and beyond, in Catalonia.",
  coverageZones: [
    { name: "Barcelona city", text: "Eixample, Gràcia, Sant Antoni, El Born, Barceloneta, Sant Martí, Poble-sec, Sants — delivery in 24-48h." },
    { name: "Metropolitan area", text: "L'Hospitalet, Badalona, Santa Coloma, Sant Adrià, Cornellà, Esplugues, Sant Just Desvern." },
    { name: "Vallès region", text: "Sabadell, Terrassa, Sant Cugat, Cerdanyola, Granollers, Mollet del Vallès." },
    { name: "Maresme & Garraf", text: "Mataró, Premià, Sitges, Vilanova, Castelldefels, Gavà." },
    { name: "Costa Brava & Girona", text: "Blanes, Lloret, Tossa, Palamós, Begur, Cadaqués, Figueres, Girona city — delivery on quote." },
    { name: "Rest of Catalonia", text: "Tarragona, Reus, Lleida and Andorra on request." },
  ],
  whyTitle: "Why ride electric in Barcelona",
  whyParagraphs: [
    "The ZBE Rondes de Barcelona bans non-eco motorcycles on weekdays. With a 79Bike Falcon you get the CERO emissions sticker — the most permissive — granting 24/7 access including pollution alerts.",
    "Running cost: a full charge costs around €0.80 per 100 km — 8 to 10 times cheaper than petrol. No oil change, no clutch, no belt: annual servicing is just brakes, tyres and firmware.",
    "Spanish Plan MOVES III subsidy: up to €1,100 for a new electric motorcycle, depending on autonomous community. We handle the paperwork.",
    "Urban comfort: instant torque at every light, silent through the Born alleys, enough range for weekend trips to Sitges, Castelldefels or the Costa Brava.",
  ],
  technicalTitle: "Homologation, licence and DGT paperwork",
  technicalParagraphs: [
    "Falcon GT (L1e-B): 50cc equivalent, 45 km/h limit, from 15 years old with AM licence, or B licence for Spanish residents.",
    "Falcon Pro (L3e-A1): 125cc equivalent, up to 95 km/h, A1 licence (16+).",
    "Falcon GT PRO (L3e-A2/A): 11 kW equivalent, up to 110 km/h, A2 licence (18+).",
    "All bikes delivered ready to ride: DGT registration, plate, CERO sticker, temporary insurance. We handle the full paperwork for Spanish residents; bilingual support for French expats with NIE, padrón and empadronamiento.",
  ],
  faqTitle: "Frequently asked questions — Barcelona",
  faqIntro: "Everything you need to know before buying or renting a 79Bike electric motorcycle in Barcelona.",
  faq: [
    { q: "Where is the 79Bike Barcelona showroom?", a: "Our showroom is opening soon. In the meantime we welcome you by appointment and run home test rides across the metropolitan area. Contact +34 698 39 12 14 (WhatsApp) or barcelona@rideon-distribution.fr." },
    { q: "Are 79Bike motorcycles homologated in Spain (DGT)?", a: "Yes, 100%. The entire Falcon range is CE-homologated and DGT-registrable, delivered with registration, plate and CERO emissions sticker." },
    { q: "Can I ride in the Barcelona Low Emission Zone (ZBE)?", a: "Yes, with no restrictions. The CERO sticker grants 24/7 access to the ZBE Rondes de Barcelona, including during pollution alerts." },
    { q: "What licence do I need in Spain?", a: "Falcon GT: AM (15+) or B for Spanish residents. Falcon Pro: A1 (16+). Falcon GT PRO: A2 (18+)." },
    { q: "What is the real-world range?", a: "Urban Barcelona: 90-130 km per charge. Highway at 80 km/h: 70-100 km. Removable battery, recharges on a standard 220V plug in 4-6 hours." },
    { q: "Do you offer installments?", a: "Yes: 3x or 4x interest-free up to €3,000 via Alma & Klarna; long-term financing up to 36 months via banking partners." },
    { q: "Am I eligible for Plan MOVES III?", a: "Yes, subject to Spanish residency and autonomous community rules. Up to €1,100 for a new L3e electric motorcycle. We handle the application." },
    { q: "What warranty is included?", a: "2-year manufacturer warranty on the bike, 2 years / 30,000 km on the battery. Service is handled locally in Barcelona — no shipping abroad." },
    { q: "Do you accept trade-ins?", a: "Yes, we buy back your old motorcycle within 48h after inspection. The value is deducted directly from your new Falcon." },
    { q: "Can I rent a 79Bike for a few days?", a: "Yes. Daily (from €39/day), weekly (degressive rate) or monthly for digital nomads and expats. Book at barcelona@rideon-distribution.fr or WhatsApp +34 698 39 12 14." },
  ],
};

/* ============================================================================
 * LE CUING / SAINT-GAUDENS / TOULOUSE SUD — garage historique
 * ==========================================================================*/
const lecuingFR: ShowroomSEO = {
  introTitle: "Garage 79Bike Le Cuing — Saint-Gaudens, Comminges, Toulouse Sud",
  introParagraphs: [
    "Notre garage historique est implanté à Le Cuing (31230), au cœur du Comminges, à 10 minutes de Saint-Gaudens et à 1 heure de Toulouse. C'est ici que tout a commencé : un atelier mécanique spécialisé, une équipe passionnée et la première représentation 79Bike en France.",
    "Vous y trouvez toute la gamme Falcon en stock permanent, un showroom avec essais sur route ouverte (départementales, premiers contreforts pyrénéens), un atelier complet pour la mécanique électrique haute tension, un service de location courte et longue durée et notre service après-vente officiel.",
    "Idéal si vous habitez Haute-Garonne (31), Hautes-Pyrénées (65), Gers (32), Ariège (09), Aude (11) ou si vous descendez de Toulouse pour la journée. Notre équipe vous reçoit du lundi au vendredi et le samedi matin sur rendez-vous.",
  ],
  servicesTitle: "Services au garage Le Cuing",
  servicesIntro: "Vente, mécanique, location, SAV : un seul interlocuteur pour toute la vie de votre moto électrique 79Bike.",
  services: [
    { title: "Vente neuf 79Bike", text: "Falcon GT, Pro et GT PRO disponibles immédiatement, livrées immatriculées avec carte grise française." },
    { title: "Essai sur route ouverte", text: "Boucle d'essai de 15 km autour de Le Cuing incluant ville, route et premières montées pyrénéennes." },
    { title: "Mécanique spécialisée EV", text: "Diagnostic OBD, mise à jour firmware, entretien batterie, freinage, train avant/arrière, pneumatiques, suspensions." },
    { title: "Location semaine et mois", text: "Découverte longue durée avec option d'achat. Idéal avant un gros investissement." },
    { title: "Paiement 3x, 4x, 10x", text: "Financement Alma/Klarna jusqu'à 3 000 € sans frais, et offres bancaires sur les modèles haut de gamme." },
    { title: "SAV France métropolitaine", text: "Centre de référence SAV 79Bike pour toute la zone Sud-Ouest. Pièces détachées en stock." },
    { title: "Reprise et occasions garanties", text: "Reprise de votre 2-roues thermique ou électrique. Occasions Falcon contrôlées 50 points." },
    { title: "Conseils permis et homologation", text: "Accompagnement administratif : immatriculation, carte grise, équivalence permis B → A1." },
  ],
  coverageTitle: "Zones desservies depuis Le Cuing",
  coverageIntro: "Garage central pour tout le Sud-Ouest, à 1h de Toulouse et 1h30 de la frontière espagnole.",
  coverageZones: [
    { name: "Haute-Garonne (31)", text: "Saint-Gaudens, Toulouse, Muret, Cazères, Boussens, Salies-du-Salat, Aspet, Bagnères-de-Luchon." },
    { name: "Hautes-Pyrénées (65)", text: "Tarbes, Lourdes, Lannemezan, Bagnères-de-Bigorre — livraison sous 48h." },
    { name: "Gers (32)", text: "Auch, L'Isle-Jourdain, Mirande, Condom." },
    { name: "Ariège (09)", text: "Foix, Pamiers, Saint-Girons, Lavelanet." },
    { name: "Aude (11) & PO (66)", text: "Carcassonne, Narbonne, Perpignan, Limoux — voir aussi notre spot Leucate." },
    { name: "Reste France", text: "Livraison transporteur agréé sur toute la France métropolitaine. Devis sous 24h." },
  ],
  whyTitle: "Pourquoi choisir Le Cuing pour votre 79Bike",
  whyParagraphs: [
    "C'est le berceau de Ride On Distribution. Nos mécaniciens connaissent chaque vis et chaque câble des Falcon. Si vous voulez une moto suivie à long terme par les gens qui les ont vues naître en France, c'est ici.",
    "Environnement d'essai idéal : départementales sinueuses, premières montées pyrénéennes, traversée de villages — vous testez la moto dans toutes les conditions en moins de 20 minutes.",
    "Tarifs garage atelier (et non grande surface auto) : conseil personnalisé, devis transparent, prêt de moto pendant l'immobilisation, intervention rapide sans rendez-vous bloqué 3 semaines.",
  ],
  technicalTitle: "Homologation et permis en France",
  technicalParagraphs: [
    "Falcon GT (L1e-B / cyclomoteur équivalent 50 cm³) : permis AM dès 14 ans, ou permis B sans formation complémentaire.",
    "Falcon Pro (L3e-A1 / moto équivalent 125 cm³) : permis A1 dès 16 ans, ou permis B + formation de 7h pour les conducteurs titulaires depuis 2 ans ou plus.",
    "Falcon GT PRO (L3e-A2) : permis A2 dès 18 ans.",
    "Carte grise française fournie sur place, plaque définitive posée, attestation d'assurance temporaire pour rouler en sortant du garage. Bonus écologique CEE / prime à la conversion étudiés au cas par cas.",
  ],
  faqTitle: "Questions fréquentes — Garage Le Cuing",
  faqIntro: "Toutes les réponses pour acheter, louer ou faire entretenir votre moto électrique en Occitanie.",
  faq: [
    { q: "Où se trouve exactement le garage Ride On Distribution Le Cuing ?", a: "Le garage se trouve à Le Cuing (31230), Haute-Garonne, à 10 min de Saint-Gaudens (sortie 17 A64) et à 1h de Toulouse par l'autoroute A64. Coordonnées GPS : 43.1311, 0.7493." },
    { q: "Quels sont les horaires d'ouverture ?", a: "Du lundi au vendredi de 9h à 18h, le samedi de 9h à 12h sur rendez-vous. Fermé dimanches et jours fériés. Téléphone : +33 6 98 32 90 29 (WhatsApp accepté)." },
    { q: "Peut-on essayer une 79Bike sans engagement ?", a: "Oui, l'essai est gratuit sur rendez-vous. Nous avons une boucle de 15 km autour du garage incluant ville, route et premières montées pyrénéennes." },
    { q: "Faites-vous l'immatriculation et la carte grise ?", a: "Oui, intégralement. Votre moto repart immatriculée, plaque posée, avec carte grise française définitive et attestation d'assurance temporaire." },
    { q: "Quel permis pour rouler en 79Bike en France ?", a: "Falcon GT : permis AM (14 ans) ou B. Falcon Pro : permis A1, ou B + formation 7h après 2 ans. Falcon GT PRO : permis A2 (18 ans)." },
    { q: "Proposez-vous le paiement en 3 ou 4 fois ?", a: "Oui, sans frais jusqu'à 3 000 € via Alma et Klarna. Au-delà, financement bancaire en 10x à 36x avec nos partenaires." },
    { q: "Faites-vous le SAV des Falcon vendues ailleurs ?", a: "Oui, nous prenons en charge l'entretien et la garantie de toutes les Falcon, où qu'elles aient été achetées en Europe." },
    { q: "Combien coûte l'entretien annuel d'une moto électrique ?", a: "Comptez 80 à 150 € par an : contrôle freinage, pneus, plaquettes, firmware. Pas de vidange, pas de courroie, pas d'embrayage à changer." },
    { q: "Puis-je louer une Falcon avant de l'acheter ?", a: "Oui : location à la semaine ou au mois avec déduction d'une partie du loyer du prix d'achat si vous achetez ensuite." },
    { q: "Livrez-vous en dehors de l'Occitanie ?", a: "Oui, partout en France métropolitaine via transporteur agréé. Devis livraison sous 24h." },
  ],
};

const lecuingEN: ShowroomSEO = {
  introTitle: "79Bike Le Cuing garage — Saint-Gaudens, Toulouse South",
  introParagraphs: [
    "Our historic workshop sits in Le Cuing (31230), in the heart of Comminges, 10 minutes from Saint-Gaudens and 1 hour from Toulouse. This is where Ride On Distribution started — a specialised EV workshop and France's first 79Bike representation.",
    "Full Falcon range permanently in stock, showroom with open-road test rides (rural roads, Pyrenees foothills), full high-voltage EV workshop, rental and official aftersales.",
  ],
  servicesTitle: "Services at Le Cuing",
  servicesIntro: "Sales, mechanics, rental, aftersales — one partner for your motorcycle's entire life.",
  services: [
    { title: "New 79Bike sales", text: "Falcon GT, Pro and GT PRO available, delivered with French registration." },
    { title: "Open-road test ride", text: "15 km test loop around Le Cuing covering city, country roads and first Pyrenees climbs." },
    { title: "Specialised EV mechanics", text: "OBD diagnostic, firmware updates, battery service, brakes, tyres." },
    { title: "Weekly and monthly rental", text: "Long-term discovery with buy-option." },
    { title: "3x, 4x, 10x payment", text: "Alma/Klarna interest-free up to €3,000, banking offers for premium models." },
    { title: "France aftersales hub", text: "Reference service centre for the Southwest." },
    { title: "Trade-in and certified used", text: "We buy back your bike; 50-point checked Falcons." },
    { title: "Licence guidance", text: "Registration, French Carte Grise, B → A1 equivalence." },
  ],
  coverageTitle: "Service area from Le Cuing",
  coverageIntro: "Central garage for the Southwest, 1h from Toulouse and 1h30 from the Spanish border.",
  coverageZones: [
    { name: "Haute-Garonne (31)", text: "Saint-Gaudens, Toulouse, Muret, Cazères, Bagnères-de-Luchon." },
    { name: "Hautes-Pyrénées (65)", text: "Tarbes, Lourdes, Lannemezan." },
    { name: "Gers (32)", text: "Auch, L'Isle-Jourdain, Mirande." },
    { name: "Ariège (09)", text: "Foix, Pamiers, Saint-Girons." },
    { name: "Aude & PO", text: "Carcassonne, Narbonne, Perpignan." },
    { name: "Rest of France", text: "Approved carrier delivery nationwide." },
  ],
  whyTitle: "Why choose Le Cuing",
  whyParagraphs: [
    "Birthplace of Ride On Distribution. Our mechanics know every bolt of the Falcon range.",
    "Ideal test environment: winding D-roads, first Pyrenees climbs, villages — every condition in 20 minutes.",
    "True workshop service: personal advice, transparent quotes, courtesy bike, quick turnaround.",
  ],
  technicalTitle: "Homologation & licence (France)",
  technicalParagraphs: [
    "Falcon GT (L1e-B): AM licence from 14, or B licence.",
    "Falcon Pro (L3e-A1): A1 from 16, or B + 7h training after 2 years.",
    "Falcon GT PRO (L3e-A2): A2 from 18.",
    "French Carte Grise included, plate fitted, temporary insurance to leave the workshop.",
  ],
  faqTitle: "FAQ — Le Cuing garage",
  faqIntro: "Everything to buy, rent or service your bike in Occitanie.",
  faq: [
    { q: "Where is the Le Cuing garage?", a: "Le Cuing (31230), Haute-Garonne — 10 min from Saint-Gaudens (A64 exit 17), 1h from Toulouse. GPS 43.1311, 0.7493." },
    { q: "Opening hours?", a: "Mon-Fri 9am-6pm, Sat 9am-12pm by appointment. Phone +33 6 98 32 90 29 (WhatsApp)." },
    { q: "Can I test ride for free?", a: "Yes, by appointment. 15 km loop covering city, road and Pyrenees climbs." },
    { q: "Do you handle registration?", a: "Yes, full French Carte Grise included." },
    { q: "What licence is required?", a: "GT: AM or B. Pro: A1 or B + 7h training. GT PRO: A2." },
    { q: "Installment payment?", a: "Yes, interest-free up to €3,000 via Alma & Klarna; up to 36 months otherwise." },
    { q: "Do you service Falcons bought elsewhere?", a: "Yes, throughout Europe under warranty." },
    { q: "Annual maintenance cost?", a: "Around €80-150/year: brakes, tyres, firmware. No oil, no belt, no clutch." },
    { q: "Rent before buying?", a: "Yes — part of rental credited against purchase." },
    { q: "Delivery outside Occitanie?", a: "Yes, nationwide via approved carrier. Quote in 24h." },
  ],
};

const lecuingES: ShowroomSEO = {
  introTitle: "Taller 79Bike Le Cuing — Saint-Gaudens, Toulouse Sur",
  introParagraphs: [
    "Nuestro taller histórico está en Le Cuing (31230), en el corazón del Comminges francés, a 10 minutos de Saint-Gaudens y 1 hora de Toulouse. Aquí empezó Ride On Distribution: un taller especializado en moto eléctrica y la primera representación 79Bike en Francia.",
    "Toda la gama Falcon en stock permanente, pruebas en carretera abierta (carreteras rurales, primeras subidas pirenaicas), taller completo de mecánica eléctrica de alto voltaje, alquiler y SAT oficial.",
  ],
  servicesTitle: "Servicios en Le Cuing",
  servicesIntro: "Venta, mecánica, alquiler, SAT — un único interlocutor para toda la vida de tu moto.",
  services: [
    { title: "Venta nueva 79Bike", text: "Falcon GT, Pro y GT PRO disponibles, entregadas con matrícula francesa." },
    { title: "Prueba en carretera abierta", text: "Recorrido de 15 km alrededor de Le Cuing." },
    { title: "Mecánica EV especializada", text: "Diagnóstico OBD, firmware, batería, frenos, neumáticos." },
    { title: "Alquiler semana / mes", text: "Descubrimiento largo plazo con opción de compra." },
    { title: "Pago 3x, 4x, 10x", text: "Alma/Klarna sin intereses hasta 3 000 €, financiación bancaria para modelos premium." },
    { title: "SAT Francia", text: "Centro de referencia SAT 79Bike para todo el Suroeste." },
    { title: "Recompra y ocasiones garantizadas", text: "Recompramos tu 2 ruedas; Falcons revisadas 50 puntos." },
    { title: "Asesoría carnet", text: "Acompañamiento administrativo en matriculación." },
  ],
  coverageTitle: "Zonas atendidas desde Le Cuing",
  coverageIntro: "Taller central para el Suroeste de Francia, a 1h30 de la frontera española.",
  coverageZones: [
    { name: "Haute-Garonne (31)", text: "Saint-Gaudens, Toulouse, Muret, Cazères, Luchon." },
    { name: "Hautes-Pyrénées (65)", text: "Tarbes, Lourdes, Lannemezan." },
    { name: "Gers (32)", text: "Auch, L'Isle-Jourdain." },
    { name: "Ariège (09)", text: "Foix, Pamiers, Saint-Girons." },
    { name: "Aude y PO", text: "Carcassonne, Narbonne, Perpiñán." },
    { name: "Resto de Francia", text: "Entrega nacional vía transportista." },
  ],
  whyTitle: "Por qué elegir Le Cuing",
  whyParagraphs: [
    "Cuna de Ride On Distribution. Nuestros mecánicos conocen cada tornillo de las Falcon.",
    "Entorno de prueba ideal: carreteras sinuosas, subidas pirenaicas, en 20 min lo pruebas todo.",
    "Servicio de taller real: asesoramiento personal, presupuesto transparente, moto de cortesía.",
  ],
  technicalTitle: "Homologación y carnet (Francia)",
  technicalParagraphs: [
    "Falcon GT (L1e-B): carnet AM desde 14, o B.",
    "Falcon Pro (L3e-A1): A1 desde 16, o B + formación 7h tras 2 años.",
    "Falcon GT PRO (L3e-A2): A2 desde 18.",
    "Matrícula francesa incluida, seguro temporal de salida.",
  ],
  faqTitle: "FAQ — Taller Le Cuing",
  faqIntro: "Todo para comprar, alquilar o mantener tu moto en Occitania.",
  faq: [
    { q: "¿Dónde está el taller Le Cuing?", a: "Le Cuing (31230), Haute-Garonne — 10 min de Saint-Gaudens (salida 17 A64), 1h de Toulouse. GPS 43.1311, 0.7493." },
    { q: "¿Horarios?", a: "Lun-Vie 9-18h, Sáb 9-12h con cita. Tel +33 6 98 32 90 29 (WhatsApp)." },
    { q: "¿Prueba gratuita?", a: "Sí, con cita previa. Recorrido de 15 km variado." },
    { q: "¿Os encargáis de la matriculación?", a: "Sí, Carte Grise francesa completa incluida." },
    { q: "¿Qué carnet hace falta?", a: "GT: AM o B. Pro: A1 o B+7h tras 2 años. GT PRO: A2." },
    { q: "¿Pago a plazos?", a: "Sí, sin intereses hasta 3 000 € (Alma/Klarna); hasta 36 meses con bancos." },
    { q: "¿SAT de Falcons compradas en otro lado?", a: "Sí, en toda Europa bajo garantía." },
    { q: "¿Coste de mantenimiento anual?", a: "Entre 80 y 150 €/año: frenos, neumáticos, firmware. Sin aceite, sin correa." },
    { q: "¿Alquilar antes de comprar?", a: "Sí — parte del alquiler se descuenta de la compra." },
    { q: "¿Entrega fuera de Occitania?", a: "Sí, en toda Francia vía transportista." },
  ],
};

/* ============================================================================
 * LEUCATE — spot rando + sortie guidée
 * ==========================================================================*/
const leucateFR: ShowroomSEO = {
  introTitle: "Spot Leucate — moto électrique entre Aude, Méditerranée et Pyrénées",
  introParagraphs: [
    "Leucate (11370), entre Narbonne et Perpignan, est notre spot de référence pour rouler en moto électrique 79Bike face à la mer. Falaises calcaires, plateau venté, sentiers côtiers de l'étang de Salses-Leucate, plage sauvage de La Franqui : un terrain de jeu unique en Occitanie.",
    "Ride On Distribution y organise des sorties guidées en petit groupe, des essais sur réservation et des locations à la journée. Toutes les motos sont homologuées route, livrées avec casque, gants et briefing sécurité.",
    "Spot accessible toute l'année. Le climat méditerranéen et l'autonomie des Falcon en font l'endroit idéal pour découvrir la moto électrique en bord de mer.",
  ],
  servicesTitle: "Services sur le spot de Leucate",
  servicesIntro: "Du test rapide à la journée complète encadrée, choisissez votre formule.",
  services: [
    { title: "Essai 30 min sur falaise", text: "Boucle découverte avec vue sur la Méditerranée. Gratuit sur RDV." },
    { title: "Sortie guidée demi-journée", text: "3h encadrées par un rider Ride On : falaises, plateau, sentiers côtiers." },
    { title: "Location à la journée", text: "Falcon GT ou Pro, casque et gants fournis, briefing inclus." },
    { title: "Itinéraires sur mesure", text: "Pour groupes, séminaires d'entreprise, EVJF/EVG ou anniversaires." },
  ],
  coverageTitle: "Spots et zones accessibles depuis Leucate",
  coverageIntro: "Idéal pour les habitants et vacanciers de l'Aude, des Pyrénées-Orientales et de l'Hérault.",
  coverageZones: [
    { name: "Aude (11)", text: "Leucate, Port-Leucate, La Franqui, Sigean, Narbonne, Gruissan, Carcassonne." },
    { name: "Pyrénées-Orientales (66)", text: "Perpignan, Rivesaltes, Salses-le-Château, Saint-Cyprien, Canet-en-Roussillon." },
    { name: "Hérault (34)", text: "Béziers, Agde, Sète, Cap d'Agde — sortie organisable à la journée." },
  ],
  whyTitle: "Pourquoi rouler en moto électrique à Leucate",
  whyParagraphs: [
    "Le silence des Falcon respecte la quiétude des falaises et des sentiers côtiers — zones où les motos thermiques sont mal vues ou interdites.",
    "Le climat méditerranéen sec préserve la batterie et garantit une autonomie maximale toute l'année.",
    "Réseau de bornes de recharge dense entre Narbonne, Perpignan et le littoral.",
  ],
  technicalTitle: "Homologation et conditions de sortie",
  technicalParagraphs: [
    "Les motos utilisées sur le spot sont des Falcon homologuées route. Permis obligatoire selon le modèle choisi (AM, A1, A2 ou B selon le cas).",
    "Équipement fourni : casque homologué CE, gants. Vêtements longs et chaussures fermées requis.",
    "Les itinéraires empruntent uniquement les voies ouvertes à la circulation. Aucune incursion en espace protégé.",
  ],
  faqTitle: "Questions fréquentes — Leucate",
  faqIntro: "Tout savoir avant de venir essayer ou louer une 79Bike à Leucate.",
  faq: [
    { q: "Où exactement se trouve le point de départ à Leucate ?", a: "Le point de rendez-vous est communiqué par WhatsApp ou email à la confirmation de réservation, en fonction du type de sortie (falaise, plateau ou plage)." },
    { q: "Faut-il le permis pour participer ?", a: "Oui, le permis correspondant au modèle de Falcon utilisé est obligatoire. La plupart des sorties se font sur Falcon GT, accessible avec le permis AM ou B." },
    { q: "Quelle est la meilleure saison pour rouler ici ?", a: "Toute l'année. Le printemps et l'automne sont les plus agréables, l'été reste idéal le matin et en fin de journée." },
    { q: "Y a-t-il un âge minimum ?", a: "Oui : 14 ans avec permis AM pour la Falcon GT, 16 ans pour la Falcon Pro, 18 ans pour la GT PRO." },
    { q: "Peut-on venir en groupe ?", a: "Oui. Nous organisons des sorties séminaire, EVJF/EVG, anniversaires et incentives jusqu'à 8 motos en simultané." },
    { q: "Comment réserver ?", a: "Par WhatsApp au +33 6 98 32 90 29, par email à contact@rideon-distribution.fr ou via le formulaire de cette page." },
    { q: "Que se passe-t-il s'il pleut ?", a: "Si la météo rend la sortie dangereuse, nous la reportons gratuitement à une date convenue ensemble." },
    { q: "L'assurance est-elle incluse ?", a: "Oui, toutes nos motos sont couvertes pendant l'essai ou la location. Une franchise peut s'appliquer en cas de chute." },
  ],
};

const leucateEN: ShowroomSEO = {
  introTitle: "Leucate spot — electric motorcycle between Aude, sea and Pyrenees",
  introParagraphs: [
    "Leucate (11370), between Narbonne and Perpignan, is our reference spot to ride 79Bike electric motorcycles facing the sea. Limestone cliffs, windy plateau, lagoon trails, wild La Franqui beach — a unique playground in Occitanie.",
    "Guided small-group rides, test rides by appointment, daily rental. All bikes road-legal, helmet and gloves provided.",
  ],
  servicesTitle: "Services at Leucate",
  servicesIntro: "From a quick test to a full guided day.",
  services: [
    { title: "30-min cliff test", text: "Discovery loop with sea view. Free by appointment." },
    { title: "Half-day guided ride", text: "3h with a Ride On rider: cliffs, plateau, coastal trails." },
    { title: "Daily rental", text: "Falcon GT or Pro, gear and briefing included." },
    { title: "Custom itineraries", text: "Groups, corporate events, stag/hen, birthdays." },
  ],
  coverageTitle: "Areas reachable from Leucate",
  coverageIntro: "Ideal for residents and visitors of Aude, Pyrénées-Orientales and Hérault.",
  coverageZones: [
    { name: "Aude (11)", text: "Leucate, Port-Leucate, La Franqui, Sigean, Narbonne, Gruissan, Carcassonne." },
    { name: "Pyrénées-Orientales (66)", text: "Perpignan, Rivesaltes, Salses, Saint-Cyprien, Canet-en-Roussillon." },
    { name: "Hérault (34)", text: "Béziers, Agde, Sète, Cap d'Agde." },
  ],
  whyTitle: "Why ride electric in Leucate",
  whyParagraphs: [
    "Falcon silence respects cliffs and coastal trails where petrol bikes are often unwelcome.",
    "Dry Mediterranean climate preserves battery and ensures full range year-round.",
    "Dense charging network between Narbonne, Perpignan and the coast.",
  ],
  technicalTitle: "Homologation & ride conditions",
  technicalParagraphs: [
    "Bikes used here are road-legal Falcons. Licence required per chosen model (AM, A1, A2 or B).",
    "Provided: CE helmet, gloves. Long sleeves and closed shoes required.",
    "Routes use public roads only.",
  ],
  faqTitle: "FAQ — Leucate",
  faqIntro: "Everything to know before riding with us in Leucate.",
  faq: [
    { q: "Where is the meeting point?", a: "Shared by WhatsApp or email after booking confirmation, depending on ride type." },
    { q: "Do I need a licence?", a: "Yes, matching the Falcon used. Most rides are on Falcon GT (AM or B licence)." },
    { q: "Best season?", a: "Year-round. Spring and autumn are most pleasant; summer ideal early/late." },
    { q: "Minimum age?", a: "14 with AM (Falcon GT), 16 (Pro), 18 (GT PRO)." },
    { q: "Group rides?", a: "Yes, up to 8 bikes simultaneously." },
    { q: "How to book?", a: "WhatsApp +33 6 98 32 90 29, email contact@rideon-distribution.fr or this page's form." },
    { q: "What if it rains?", a: "We reschedule free of charge." },
    { q: "Is insurance included?", a: "Yes. A deductible may apply if you drop the bike." },
  ],
};

const leucateES: ShowroomSEO = {
  introTitle: "Spot Leucate — moto eléctrica entre Aude, Mediterráneo y Pirineos",
  introParagraphs: [
    "Leucate (11370), entre Narbonne y Perpiñán, es nuestro spot de referencia para rodar en moto eléctrica 79Bike frente al mar. Acantilados calizos, meseta ventosa, senderos costeros del estanque de Salses-Leucate, playa salvaje de La Franqui — un campo de juego único en Occitania.",
    "Ride On Distribution organiza salidas guiadas en grupo reducido, pruebas con reserva y alquiler diario. Motos homologadas, casco y guantes incluidos.",
  ],
  servicesTitle: "Servicios en Leucate",
  servicesIntro: "Desde una prueba rápida a una jornada completa guiada.",
  services: [
    { title: "Prueba 30 min en acantilado", text: "Recorrido descubrimiento con vistas al Mediterráneo. Gratis con reserva." },
    { title: "Salida guiada medio día", text: "3h con un rider Ride On: acantilados, meseta, costa." },
    { title: "Alquiler por día", text: "Falcon GT o Pro, equipamiento y briefing incluidos." },
    { title: "Itinerarios a medida", text: "Grupos, eventos corporativos, despedidas, cumpleaños." },
  ],
  coverageTitle: "Zonas accesibles desde Leucate",
  coverageIntro: "Ideal para residentes y visitantes de Aude, Pyrénées-Orientales y Hérault.",
  coverageZones: [
    { name: "Aude (11)", text: "Leucate, Port-Leucate, La Franqui, Sigean, Narbonne, Gruissan, Carcassonne." },
    { name: "Pyrénées-Orientales (66)", text: "Perpiñán, Rivesaltes, Salses, Saint-Cyprien, Canet-en-Roussillon." },
    { name: "Hérault (34)", text: "Béziers, Agde, Sète, Cap d'Agde." },
  ],
  whyTitle: "Por qué rodar en moto eléctrica en Leucate",
  whyParagraphs: [
    "El silencio de las Falcon respeta acantilados y senderos.",
    "Clima mediterráneo seco que preserva la batería todo el año.",
    "Red densa de puntos de recarga entre Narbonne, Perpiñán y la costa.",
  ],
  technicalTitle: "Homologación y condiciones de salida",
  technicalParagraphs: [
    "Las motos usadas son Falcons homologadas. Carnet obligatorio según modelo (AM, A1, A2 o B).",
    "Equipo incluido: casco CE, guantes. Manga larga y calzado cerrado obligatorios.",
    "Itinerarios solo por vías públicas.",
  ],
  faqTitle: "FAQ — Leucate",
  faqIntro: "Todo lo que hay que saber antes de venir a rodar a Leucate.",
  faq: [
    { q: "¿Dónde está el punto de salida?", a: "Se comunica por WhatsApp o email tras la confirmación, según el tipo de salida." },
    { q: "¿Necesito carnet?", a: "Sí, correspondiente al modelo elegido. La mayoría de salidas con Falcon GT (AM o B)." },
    { q: "¿Mejor temporada?", a: "Todo el año. Primavera y otoño son las más agradables." },
    { q: "¿Edad mínima?", a: "14 con AM (Falcon GT), 16 (Pro), 18 (GT PRO)." },
    { q: "¿Salidas en grupo?", a: "Sí, hasta 8 motos simultáneamente." },
    { q: "¿Cómo reservar?", a: "WhatsApp +33 6 98 32 90 29, email contact@rideon-distribution.fr o formulario." },
    { q: "¿Y si llueve?", a: "Aplazamos sin coste." },
    { q: "¿Seguro incluido?", a: "Sí. Puede aplicarse franquicia en caso de caída." },
  ],
};

/* ============================================================================
 * Export map
 * ==========================================================================*/
export const SHOWROOM_SEO: Record<ShowroomKey, Record<Locale, ShowroomSEO>> = {
  barcelona: { fr: barcelonaFR, en: barcelonaEN, es: barcelonaES },
  lecuing:   { fr: lecuingFR,   en: lecuingEN,   es: lecuingES },
  leucate:   { fr: leucateFR,   en: leucateEN,   es: leucateES },
};

