import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { useI18n } from "@/i18n/I18nProvider";

export function CartDrawer() {
  const { t, formatPrice } = useI18n();
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "EUR";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative bg-brand-cyan text-zinc-950 text-sm font-medium py-2 pr-3 pl-2 flex items-center gap-2 rounded-[min(1vw,12px)] ring-1 ring-brand-cyan shadow-lg shadow-brand-cyan/10"
          aria-label={t.cart.open}
        >
          <ShoppingCart className="size-4 shrink-0" />
          <span className="hidden sm:inline">{t.cart.label}</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 size-5 rounded-full bg-zinc-950 text-brand-cyan text-[10px] font-bold flex items-center justify-center ring-1 ring-brand-cyan">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-zinc-950 text-zinc-200 border-l border-zinc-900">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl text-white">{t.cart.title}</SheetTitle>
          <SheetDescription className="text-zinc-500">
            {totalItems === 0 ? t.cart.noItems : t.cart.items(totalItems)}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0 px-6 pb-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="size-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500">{t.cart.empty}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <div className="w-20 h-20 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {item.selectedOptions.map((o) => o.value).join(" • ")}
                          </p>
                        )}
                        <p className="text-brand-cyan font-display mt-1">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button onClick={() => removeItem(item.variantId)} className="text-zinc-500 hover:text-white">
                          <Trash2 className="size-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="size-6 rounded border border-zinc-700 hover:border-brand-cyan flex items-center justify-center"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="size-6 rounded border border-zinc-700 hover:border-brand-cyan flex items-center justify-center"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{t.cart.total}</span>
                  <span className="font-display text-2xl text-white">{formatPrice(total, currency)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full py-3 bg-brand-cyan text-zinc-950 font-semibold rounded-[min(1vw,12px)] ring-1 ring-brand-cyan disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="size-4" />
                      {t.cta.checkout}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}