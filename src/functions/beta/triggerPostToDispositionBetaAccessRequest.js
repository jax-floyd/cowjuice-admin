const triggerPostToDispositionBetaAccessRequest = async (id, newStatus) => {
  try {
    const response = await fetch('https://api.gotcowjuice.com:2000/disposition-beta-access-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
