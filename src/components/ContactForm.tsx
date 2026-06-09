import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Channel = "email" | "whatsapp";

export interface ContactFormProps {
  /** Section title (h2). Optional — falls back to translated default. */
  title?: string;
  /** Section subtitle/paragraph under the title. */
  subtitle?: string;
  /** Choices for the "type de demande" select. Falls back to translated defaults. */
  requestTypes?: string[];
  /** Pre-selected request type. */
  defaultRequestType?: string;
  /** WhatsApp phone in international format, digits only (e.g. "33698329029"). */
  whatsappPhone?: string;
  /** Destination email used by the mailto channel. */
  mailtoEmail?: string;
  /** Prefix appended to the email subject / WhatsApp message (e.g. "Mécanique"). */
  contextLabel?: string;
  /** Visual padding. Defaults to "py-20". */
  className?: string;
}

const COPY = {
  fr: {
    title: "Une demande ? Écrivez-nous.",
    subtitle: "Remplissez le formulaire, choisissez votre canal de réponse et envoyez. On revient vers vous sous 24h.",
    name: "Nom complet",
    email: "Email",
    type: "Type de demande",
    message: "Votre message",
    channel: "Canal d'envoi",
    email_channel: "Par email",
    wa_channel: "Par WhatsApp",
    send: "Envoyer la demande",
    types: ["Entretien / Révision", "Réparation / Panne", "Diagnostic batterie", "Préparation cross / Tuning", "Garantie 79Bike", "Location", "Autre"],
    err_name: "Nom requis (2 caractères min).",
    err_email: "Email invalide.",
    err_message: "Message trop court (10 caractères min).",
    subjectPrefix: "Demande",
  },
  en: {
    title: "A question? Get in touch.",
    subtitle: "Fill the form, pick your reply channel and send. We reply within 24h.",
    name: "Full name",
    email: "Email",
    type: "Request type",
    message: "Your message",
    channel: "Send via",
    email_channel: "Email",
    wa_channel: "WhatsApp",
    send: "Send request",
    types: ["Service", "Repair / Breakdown", "Battery diagnostic", "Race prep / Tuning", "79Bike warranty", "Rental", "Other"],
    err_name: "Name required (min 2 characters).",
    err_email: "Invalid email.",
    err_message: "Message too short (min 10 characters).",
    subjectPrefix: "Request",
  },
  es: {
    title: "¿Una solicitud? Escríbenos.",
    subtitle: "Completa el formulario, elige tu canal y envía. Respondemos en 24h.",
    name: "Nombre completo",
    email: "Email",
    type: "Tipo de solicitud",
    message: "Tu mensaje",
    channel: "Canal de envío",
    email_channel: "Por email",
    wa_channel: "Por WhatsApp",
    send: "Enviar solicitud",
    types: ["Mantenimiento", "Reparación / Avería", "Diagnóstico batería", "Preparación cross / Tuning", "Garantía 79Bike", "Alquiler", "Otro"],
    err_name: "Nombre requerido (mín. 2 caracteres).",
    err_email: "Email inválido.",
    err_message: "Mensaje demasiado corto (mín. 10 caracteres).",
    subjectPrefix: "Solicitud",
  },
} as const;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  type: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(2000),
});

export function ContactForm({
  title,
  subtitle,
  requestTypes,
  defaultRequestType,
  whatsappPhone = "33698329029",
  mailtoEmail = "contact@rideondistribution.com",
  contextLabel,
  className = "py-20",
}: ContactFormProps) {
  const { locale } = useI18n();
  const c = COPY[locale];
  const types = requestTypes ?? c.types;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(defaultRequestType ?? types[0]);
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<Channel>("email");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ name, email, type, message });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const map: Record<string, string> = {
        name: c.err_name,
        email: c.err_email,
        message: c.err_message,
        type: c.err_name,
      };
      setError(map[String(issue.path[0])] ?? "Invalid input.");
      return;
    }
    const ctx = contextLabel ? ` ${contextLabel}` : "";
    const subject = `${c.subjectPrefix}${ctx} — ${parsed.data.type}`;
    const bodyLines = [
      `${c.name}: ${parsed.data.name}`,
      `${c.email}: ${parsed.data.email}`,
      `${c.type}: ${parsed.data.type}`,
      "",
      parsed.data.message,
    ];
    const body = bodyLines.join("\n");

    if (channel === "whatsapp") {
      const waText = `${subject}\n\n${body}`;
      const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waText)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const url = `mailto:${encodeURIComponent(mailtoEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    }
  };

  return (
    <section className={className}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-3">{title ?? c.title}</h2>
        {subtitle !== "" && (
          <p className="text-zinc-400 mb-8">{subtitle ?? c.subtitle}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              maxLength={120}
              placeholder={c.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
            />
            <input
              type="email"
              required
              maxLength={255}
              placeholder={c.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
            aria-label={c.type}
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <textarea
            rows={5}
            required
            maxLength={2000}
            placeholder={c.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
          />

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <legend className="sr-only">{c.channel}</legend>
            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${channel === "email" ? "border-brand-cyan bg-brand-cyan/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}>
              <input
                type="radio"
                name="channel"
                value="email"
                checked={channel === "email"}
                onChange={() => setChannel("email")}
                className="sr-only"
              />
              <Mail className="size-4 text-brand-cyan" />
              <span className="text-sm text-white">{c.email_channel}</span>
            </label>
            <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${channel === "whatsapp" ? "border-brand-cyan bg-brand-cyan/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"}`}>
              <input
                type="radio"
                name="channel"
                value="whatsapp"
                checked={channel === "whatsapp"}
                onChange={() => setChannel("whatsapp")}
                className="sr-only"
              />
              <MessageCircle className="size-4 text-brand-cyan" />
              <span className="text-sm text-white">{c.wa_channel}</span>
            </label>
          </fieldset>

          {error && (
            <p role="alert" className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="bg-brand-cyan text-zinc-950 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {c.send}
          </button>
        </form>
      </div>
    </section>
  );
}

