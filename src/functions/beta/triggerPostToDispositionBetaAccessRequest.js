const triggerPostToDispositionBetaAccessRequest = async (id, newStatus) => {
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/disposition-beta-access-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (err) {
    console.error(`Failed to ${newStatus} beta access request:`, err);
    return false;
  }
};

export default triggerPostToDispositionBetaAccessRequest;
