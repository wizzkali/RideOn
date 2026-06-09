import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/I18nProvider";
import { isLocale, type Locale } from "@/i18n/config";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  return (
    <I18nProvider locale={lang as Locale}>
      <Outlet />
    </I18nProvider>
  );
}

