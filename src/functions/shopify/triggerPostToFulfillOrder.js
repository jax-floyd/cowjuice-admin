const triggerPostToFulfillOrder = async ({ orderId, trackingNumber, trackingCompany, lineItems }) => {
  console.log('Triggering POST to fulfill Shopify order...');
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/admin/fulfill-order', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
      },
      body: JSON.stringify({
        orderId,
        trackingNumber,
        trackingCompany,
        lineItems,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Failed to fulfill order');
    }

    return data;
  } catch (error) {
    console.error('Error fulfilling order:', error);
    throw error;
  }
};

export default triggerPostToFulfillOrder;