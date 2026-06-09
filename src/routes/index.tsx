import { redirect, createFileRoute } from "@tanstack/react-router";
import { DEFAULT_LOCALE } from "@/i18n/config";

export const Route = createFileRoute("/")({
  loader: () => {
    throw redirect({ to: "/$lang", params: { lang: DEFAULT_LOCALE } });
  },
});
