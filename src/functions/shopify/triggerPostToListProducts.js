const triggerPostToListProducts = async (email = null, confirmationNumber = null) => {
    console.log('triggered post to list products');
    try {

        const response = await fetch('https://api.gotcowjuice.com:2000/list-products', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'cow-juice-api-key': process.env.REACT_APP_COWJUICE_API_KEY, // Include the API key for authentication
            },
            // body: JSON.stringify(body),
        });
  
        if (!response.ok) {
            throw new Error('Failed to list products');
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error listing products:', error);
        return null;
    }
};
  
export default triggerPostToListProducts;  