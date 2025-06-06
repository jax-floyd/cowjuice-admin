const triggerPostToSearchOrders = async (email = null, confirmationNumber = null) => {
    try {
        const body = { email, confirmationNumber };

        const response = await fetch('https://api.gotcowjuice.com:2000/search-orders', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
            },
            body: JSON.stringify(body),
        });
  
        if (!response.ok) {
            throw new Error('Failed to search orders');
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching orders:', error);
        return null;
    }
};
  
export default triggerPostToSearchOrders;  