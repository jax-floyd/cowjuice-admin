const triggerPostToFetchOrders = async () => {
    console.log('triggered post to fetch orders');
    try {

        const response = await fetch('https://api.gotcowjuice.com:2000/admin/fetch-orders', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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