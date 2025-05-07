const triggerPostToListCharges = async (startingAfter = null) => {
  try {
    const body = {
      limit: 100,
      ...(startingAfter && { starting_after: startingAfter }),
    };

    const response = await fetch('https://api.gotcowjuice.com:2000/list-charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to list charges');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error listing charges:", error);
    return null;
  }
};

export default triggerPostToListCharges;