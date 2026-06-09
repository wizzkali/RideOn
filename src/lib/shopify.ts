export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "dxq1hq-eh.myshopify.com";
export const SHOPIFY_CHECKOUT_DOMAIN = "checkout.rideondistribution.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "03dc3626bc18a3944ab3c15cffe4a638";

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export async function storefrontApiRequest<T = any>(query: string, variables: any = {}): Promise<{ data?: T } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    console.error("Shopify: Payment required — upgrade plan at https://admin.shopify.com");
    return;
  }
  if (!response.ok) throw new Error(`Shopify HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify: ${data.errors.map((e: any) => e.message).join(", ")}`);
  return data;
}

const PRODUCT_FRAGMENT = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String, $country: CountryCode!, $language: LanguageCode!)
  @inContext(country: $country, language: $language) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FRAGMENT} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!, $country: CountryCode!, $language: LanguageCode!)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) { ${PRODUCT_FRAGMENT} }
  }
`;

export interface LocaleContext {
  language: "FR" | "EN" | "ES";
  country: "FR" | "GB" | "ES";
}

const DEFAULT_CTX: LocaleContext = { language: "FR", country: "FR" };

export async function fetchProducts(first = 20, query?: string, ctx: LocaleContext = DEFAULT_CTX): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(PRODUCTS_QUERY, {
    first,
    query,
    language: ctx.language,
    country: ctx.country,
  });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string, ctx: LocaleContext = DEFAULT_CTX): Promise<ShopifyProductNode | null> {
  const data = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(PRODUCT_BY_HANDLE_QUERY, {
    handle,
    language: ctx.language,
    country: ctx.country,
  });
  return data?.data?.product ?? null;
}

export function formatPrice(amount: string | number, currency = "EUR", locale = "fr-FR"): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}