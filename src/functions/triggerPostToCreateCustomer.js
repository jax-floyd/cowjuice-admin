const triggerPostToCreateCustomer = async (contact) => {
  console.log('triggered post to create customer')
  try {
    // Construct the body object, including the shipping details
    const body = {
      cowjuiceId: contact.cowjuiceId,
      email: contact.email,
      name: {
        first: contact.firstName,
        last: contact.lastName,
      },
      shipping: {
        address1: contact.shipping.address1,
        address2: contact.shipping.address2 || '', // Optional
        city: contact.shipping.city,
        state: contact.shipping.state,
        postalCode: contact.shipping.postalCode,
        country: contact.shipping.country, // Country should be ISO 3166-1 alpha-2 format
        phone: contact.shipping.phone || '', // Optional phone number
      }
    };

    // Send POST request to the create customer endpoint
    const response = await fetch('https://api.gotcowjuice.com:2000/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });



    // Check if the response is ok
    if (!response.status === 500) {
      console.log('response was not ok from which it follows we throw error.')
      throw new Error('Failed to create customer');
    }

    // Parse the JSON response from the server
    const data = await response.json();
    console.log(data)
    return data; // Return the response data from the server

  } catch (error) {
    // Log any errors and return null in case of failure
    console.error("Error creating customer:", error);
    return null;
  }
};

export default triggerPostToCreateCustomer;