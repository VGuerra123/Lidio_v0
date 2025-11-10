// Shopify API client for Lidio (Next.js app)
// This version adds runtime checks for required environment variables and clearer errors.

// Import the shared types from '@/lib/types' to ensure a single source of truth. If these types
// change, update them in 'lib/types.ts' only.
import type {
  ShopifyImage,
  ShopifyVariant,
  ShopifyProduct,
  ShopifyCollection,
} from '@/lib/types';

// Read environment variables. In Vercel, set these under Settings → Environment Variables.
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
  // Throw early to surface mis‑configuration during the build or API invocation.
  throw new Error(
    'Missing Shopify environment variables. Please add \"NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN\" and \"NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN\" in your Vercel project settings.'
  );
}

// Shopify API version. Update this when Shopify releases a new stable version.
const API_VERSION = '2024-01';
const API_URL = `https://${domain}/api/${API_VERSION}/graphql.json`;

// =====================
// Types for Shopify responses
// =====================
// Import the shared types from '@/lib/types' to ensure a single source of truth. If these types
// =====================
// Internal fetch helper
// =====================
async function shopifyFetch<T>(query: string): Promise<T> {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    cache: 'no-store', // disable caching for SSR/ISR
  };

  const res = await fetch(API_URL, options);
  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

// =====================
// Public API functions
// =====================
/**
 * Fetch the latest products from the Shopify storefront API.
 * Returns an array of edges where each edge contains a `ShopifyProduct` node.
 */
export async function getProducts(): Promise<{ node: ShopifyProduct }[]> {
  const query = `{
    products(first: 50, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          productType
          tags
          availableForSale
        }
      }
    }
  }`;

  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(query);
  return data.products.edges || [];
}

/**
 * Fetch a single product by its handle. This is used on the product detail page.
 */
export async function getProduct(handle: string): Promise<ShopifyProduct> {
  const query = `{
    product(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
      productType
      tags
      availableForSale
    }
  }`;

  const data = await shopifyFetch<{ product: ShopifyProduct }>(query);
  return data.product;
}

/**
 * Fetch the first 10 collections. Collections can be shown on the categories page or homepage.
 */
export async function getCollections(): Promise<{ node: ShopifyCollection }[]> {
  const query = `{
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(query);
  return data.collections.edges || [];
}

/**
 * Fetch a collection and its products by handle.
 */
export async function getCollection(handle: string): Promise<ShopifyCollection> {
  const query = `{
    collection(handle: "${handle}") {
      id
      title
      handle
      description
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            productType
            tags
            availableForSale
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch<{ collection: ShopifyCollection }>(query);
  return data.collection;
}

/**
 * Create a new checkout with a single line item. Returns the checkout object
 * containing the webUrl which the user can be redirected to for payment.
 */
export async function createCheckout(variantId: string, quantity: number) {
  const query = `mutation {
    checkoutCreate(input: {
      lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }]
    }) {
      checkout {
        id
        webUrl
        lineItems(first: 5) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const data = await shopifyFetch<{ checkoutCreate: { checkout: any } }>(query);
  return data.checkoutCreate.checkout;
}
