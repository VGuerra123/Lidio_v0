const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

function isShopifyConfigured() {
  return domain &&
         storefrontAccessToken &&
         domain !== 'tu-tienda.myshopify.com' &&
         storefrontAccessToken !== 'tu-access-token-aqui';
}

async function ShopifyData(query: string) {
  if (!isShopifyConfigured()) {
    return { data: null, errors: [{ message: 'Shopify not configured' }] };
  }

  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      return { data: null, errors: [{ message: 'Failed to fetch from Shopify' }] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    return { data: null, errors: [{ message: 'Error fetching Shopify data' }] };
  }
}

export async function getProducts() {
  const query = `
    {
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
    }
  `;

  const response = await ShopifyData(query);

  if (!response.data || !response.data.products) {
    return [];
  }

  const products = response.data.products.edges || [];
  return products;
}

export async function getProduct(handle: string) {
  const query = `
    {
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
    }
  `;

  const response = await ShopifyData(query);

  if (!response.data || !response.data.product) {
    return null;
  }

  return response.data.product;
}

export async function getCollections() {
  const query = `
    {
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
    }
  `;

  const response = await ShopifyData(query);

  if (!response.data || !response.data.collections) {
    return [];
  }

  return response.data.collections.edges || [];
}

export async function getCollection(handle: string) {
  const query = `
    {
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
    }
  `;

  const response = await ShopifyData(query);

  if (!response.data || !response.data.collection) {
    return null;
  }

  return response.data.collection;
}

export async function createCheckout(variantId: string, quantity: number) {
  const query = `
    mutation {
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
    }
  `;

  const response = await ShopifyData(query);

  if (!response.data || !response.data.checkoutCreate) {
    return null;
  }

  return response.data.checkoutCreate.checkout;
}
