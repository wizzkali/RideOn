import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { organizationLd, jsonLdScript, DEFAULT_OG_IMAGE } from "@/lib/seo";
import rideonLogo from "@/assets/rideon-logo.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <img src={rideonLogo.url} alt="Ride On Distribution" className="mx-auto mb-8 h-16 w-16 object-contain" />
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Esta página no existe o se ha movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no se ha cargado
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo ha fallado por nuestra parte. Prueba a recargar la página o vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ride On Distribution | Tienda 79Bike & Y-Volt" },
      { name: "description", content: "Tienda Ride On Distribution: motos eléctricas 79Bike y Y-Volt, recambios, envío España/Francia, garantía de 2 años, pago seguro." },
      { name: "author", content: "Ride On Distribution" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:site_name", content: "Ride On Distribution" },
      { property: "og:title", content: "Ride On Distribution | Tienda 79Bike & Y-Volt" },
      { property: "og:description", content: "Tienda oficial: motos eléctricas 79Bike y Y-Volt, recambios, envío España/Francia, garantía de 2 años." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: rideonLogo.url },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "Logo Ride On Distribution — Tienda oficial 79Bike & Y-Volt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@rideon_distrib" },
      { name: "twitter:image", content: rideonLogo.url },
      { name: "twitter:title", content: "Ride On Distribution | Tienda 79Bike & Y-Volt" },
      { name: "twitter:description", content: "Tienda oficial: motos eléctricas 79Bike y Y-Volt, recambios, envío España/Francia, garantía de 2 años." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: rideonLogo.url },
      { rel: "shortcut icon", type: "image/png", href: rideonLogo.url },
      { rel: "apple-touch-icon", href: rideonLogo.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [jsonLdScript(organizationLd)],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
