const triggerPostToFetchOrders = async () => {
    try {

        const response = await fetch('https://api.gotcowjuice.com:2000/admin/fetch-orders', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
            },
            // body: JSON.stringify(body),
        });
  
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
};
  
export default triggerPostToFetchOrders;  