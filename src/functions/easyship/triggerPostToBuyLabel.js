// functions/easyship/triggerPostToBuyLabel.js

const triggerPostToBuyLabel = async ({ shipmentId, rateId }) => {
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/admin/buy-label', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
      },
      body: JSON.stringify({ shipmentId, rateId }),
    });

    const data = await response.json(); // parse once here
    console.log('Label purchase response:', data);

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    console.error('Error fetching label:', err);
    return { ok: false, status: 500, data: { error: 'Failed to buy label' } };
  }
};

export default triggerPostToBuyLabel;
