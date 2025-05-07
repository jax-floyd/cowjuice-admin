const triggerPostToDecrementCase = async () => {
    try {
      // Send POST request to the server to decrement the case count
      const response = await fetch('https://api.gotcowjuice.com:2000/decrement-case', {
        method: 'POST', // Method type should be POST
        headers: {
          'Content-Type': 'application/json', // Ensure proper content type
        },
      });
      
      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to decrement case');
      }
  
      // Parse the JSON response from the server
      const data = await response.json();
      return data.casesLeft; // Return the updated case count
    } catch (error) {
      // Log any errors and return null in case of failure
      console.error("Error decrementing case count:", error);
      return null;
    }
  };
  
  export default triggerPostToDecrementCase;  