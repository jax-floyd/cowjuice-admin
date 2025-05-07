const triggerPostToListCustomers = async () => {
    try {
      // Send POST request to the list charges in Stripe
      const response = await fetch('https://api.gotcowjuice.com:2000/list-customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
          
      // Check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to list customers');
      }
  
      // Parse the JSON response from the server
      const data = await response.json();
      return data; 

    } catch (error) {
      // Log any errors and return null in case of failure
      console.error("Error listing customers:", error);
      return null;
    }
  };
  
  export default triggerPostToListCustomers;  