const triggerGetBetaTesters = async () => {
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/get-beta-testers?limit=500', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
      },
    });

    const data = await response.json();
    console.log('Fetched beta testers:', data);
    return Array.isArray(data.requests) ? data.requests : [];
  } catch (err) {
    console.error('Failed to fetch beta testers:', err);
    return [];
  }
};

export default triggerGetBetaTesters;