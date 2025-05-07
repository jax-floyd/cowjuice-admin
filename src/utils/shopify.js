/* ---------- Shopify wrapper ---------- */
const shopify = async (query, variables = {}) => {
    const res = await fetch(
      `https://${process.env.REACT_APP_SHOPIFY_DOMAIN}/api/2025-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      },
    );
    const { data, errors } = await res.json();
    if (errors) throw new Error(JSON.stringify(errors, null, 2));
    return data;
};

export default shopify;