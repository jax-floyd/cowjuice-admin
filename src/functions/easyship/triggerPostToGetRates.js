const triggerPostToGetRates = async (body) => {
  console.log('triggered post to fetch rates');

  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/admin/get-rates', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipping rates');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rates:', error);
    return null;
  }
};

export default triggerPostToGetRates;