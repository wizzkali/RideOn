import { createFileRoute } from "@tanstack/react-router";
import { Youtube, PlayCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/translations";
import { hreflangLinks, ogUrlMeta } from "@/lib/seo";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@rideondistribution";

// Add YouTube video IDs here (the part after `v=` in the URL).
// Example: "dQw4w9WgXcQ"
const VIDEOS: { id: string; title: string }[] = [];

export const Route = createFileRoute("/$lang/videos")({
  head: ({ params }) => {
    const l = isLocale(params.lang) ? (params.lang as Locale) : "es";
    const d = getDict(l);
    return {
      meta: [
        { title: d.meta.videos.title },
        { name: "description", content: d.meta.videos.desc },
        { property: "og:title", content: d.meta.videos.title },
        { property: "og:description", content: d.meta.videos.desc },
        ...ogUrlMeta("/videos", l),
      ],
      links: hreflangLinks("/videos", l),
    };
  },
  component: VideosPage,
});

function VideosPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.videos.eyebrow}
        title={<>{t.videos.title} <span className="text-brand-cyan">{t.videos.titleAccent}</span></>}
        subtitle={t.videos.subtitle}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-14">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-cyan text-zinc-950 px-6 py-3 rounded-lg font-semibold hover:bg-brand-cyan/90 transition-colors"
            >
              <Youtube className="size-5" />
              {t.videos.cta}
            </a>
          </div>

          {VIDEOS.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center p-12 rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/70 to-zinc-950/70">
              <PlayCircle className="size-12 text-brand-cyan mx-auto mb-6" strokeWidth={1.5} />
              <p className="text-zinc-400">{t.videos.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEOS.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/70 hover:border-brand-cyan/30 transition-colors"
                >
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-medium text-[15px] tracking-tight">{v.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

