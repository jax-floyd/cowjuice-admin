const triggerGetBetaTesters = async () => {
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/get-beta-testers?', {
      method: 'GET',
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