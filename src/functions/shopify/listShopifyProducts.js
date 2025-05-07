import shopify from '../../utils/shopify';

const listShopifyProducts = async () => {
  const data = await shopify(/* GraphQL */ `
    {
      products(first: 10) {
        nodes {
          id
          title
          variants(first: 1) {
            nodes {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  `);

  return data.products.nodes.map((product) => {
    const variant = product.variants.nodes[0];
    const amount = parseFloat(variant.price.amount);
    const amountInCents = Math.round(amount * 100);

    return {
      id: product.id,
      object: "product",
      active: true,
      name: product.title,
      description: "The world's first can of milk. 2% Reduced Fat, Lactose-Free Cow Juice. Pasteurized under the thermal intensity of ultra-retortation for optimal caramelization and extended shelf-life.",

      images: [product.featuredImage?.url ?? null].filter(Boolean),

      default_price: {
        id: variant.id,
        object: "price",
        unit_amount: amountInCents,
        unit_amount_decimal: (amount * 100).toFixed(0),
        currency: variant.price.currencyCode.toLowerCase(),
        type: "one_time",
      },
    };
  });
};

export default listShopifyProducts;