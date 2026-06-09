import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { SHOPIFY_CHECKOUT_DOMAIN } from "@/lib/shopify";

export const Route = createFileRoute("/cart/$")({
  component: ShopifyCartRedirect,
});

function ShopifyCartRedirect() {
  useEffect(() => {
    const target = new URL(window.location.pathname + window.location.search, `https://${SHOPIFY_CHECKOUT_DOMAIN}`);
    target.searchParams.set("channel", "online_store");
    window.location.replace(target.toString());
  }, []);

  return (
    <main className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <Loader2 className="mx-auto mb-4 size-6 animate-spin text-primary" />
        <h1 className="text-xl font-semibold text-foreground">Redirection vers le paiement sécurisé</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ouverture du checkout Ride On Distribution…</p>
      </div>
    </main>
  );
}

