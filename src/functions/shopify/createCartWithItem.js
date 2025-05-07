import shopify from '../../utils/shopify';

const createCartWithItem = async (variantId, quantity = 1) => {
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
  `, {
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  });

  const { cartCreate } = data;

  if (!cartCreate?.cart?.checkoutUrl) {
    throw new Error(`Failed to create cart: ${JSON.stringify(cartCreate.userErrors)}`);
  }

  return cartCreate.cart.checkoutUrl;
};

export default createCartWithItem;