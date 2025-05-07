import shopify from '../../utils/shopify';

const createCartFromBag = async (bag) => {
  // Deduplicate by variant (merchandiseId)
  const lineMap = new Map();

  for (const item of bag) {
    const variantId = item.default_price.id;
    const existing = lineMap.get(variantId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      lineMap.set(variantId, {
        quantity: item.quantity,
        merchandiseId: variantId,
      });
    }
  }

  const lines = Array.from(lineMap.values());

  const data = await shopify(`
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `, { lines });

  const { cartCreate } = data;

  if (!cartCreate?.cart?.checkoutUrl) {
    throw new Error(`Failed to create cart: ${JSON.stringify(cartCreate.userErrors)}`);
  }

  return cartCreate.cart.checkoutUrl;
};

export default createCartFromBag;