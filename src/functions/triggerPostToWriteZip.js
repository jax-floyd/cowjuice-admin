const triggerPostToWriteZip = async (zip) => {
  try {
    // Send POST request to the server to write the ZIP code
    const response = await fetch('https://api.gotcowjuice.com:2000/write-zip', {
      method: 'POST', // Method type should be POST
      headers: {
        'Content-Type': 'application/json', // Ensure proper content type
      },
      body: JSON.stringify({ zip }), // Convert the body to a JSON string
    });
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to write zip');
    }

    // Parse the JSON response from the server
    const data = await response.json();
    return data;
  } catch (error) {
    // Log any errors and return null in case of failure
    console.error("Error writing zip:", error);
    return null;
  }
};

export default triggerPostToWriteZip;