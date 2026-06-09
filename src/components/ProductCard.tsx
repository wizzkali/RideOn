import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { useI18n } from "@/i18n/I18nProvider";

export function ProductCard({ product, featured = false }: { product: ShopifyProduct; featured?: boolean }) {
  const { locale, t, formatPrice } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  return (
    <Link
      to="/$lang/product/$handle"
      params={{ lang: locale, handle: product.node.handle }}
      className={`group bg-zinc-900 rounded-2xl border overflow-hidden transition-colors flex flex-col ${
        featured ? "border-brand-cyan/30 shadow-2xl shadow-brand-cyan/5" : "border-zinc-800 hover:border-brand-cyan/50"
      }`}
    >
      <div className="w-full aspect-square bg-zinc-800/50 outline-1 -outline-offset-1 outline-black/5 grid place-items-center overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-600">{product.node.title}</span>
        )}
      </div>
      <div className="p-5 sm:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-end mb-4 gap-3">
          <div className="flex flex-col">
            {featured && (
              <span className="text-[10px] text-brand-cyan font-bold uppercase tracking-tighter mb-1">{t.home.flagship}</span>
            )}
            <h3 className="font-display text-xl sm:text-2xl font-medium text-white leading-tight">{product.node.title}</h3>
          </div>
          <span className="text-brand-cyan font-display text-lg sm:text-xl whitespace-nowrap">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
        </div>
        <p className="text-sm text-zinc-500 mb-6 sm:mb-8 text-pretty line-clamp-3 flex-1">
          {product.node.description || t.product.fallbackDesc}
        </p>
        <button
          onClick={handleAdd}
          disabled={isLoading || !variant}
          className={`w-full mt-auto py-3.5 min-h-11 text-xs font-bold rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2 ${
            featured
              ? "bg-brand-cyan text-zinc-950 ring-1 ring-brand-cyan"
              : "bg-zinc-800 hover:bg-zinc-700 text-white"
          } disabled:opacity-60`}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : featured ? t.cta.buy : t.cta.addToCart}
        </button>
      </div>
    </Link>
  );
}