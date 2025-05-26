// ─── New: address validator ─────────────────────
const validateAddress = async ({ address1, address2, city, state, postalCode, country }) => {
    
    const endpoint = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    console.log(endpoint);

    const body = {
      address: {
        regionCode: country,
        locality: city,
        administrativeArea: state,
        postalCode,
        addressLines: [address1, address2].filter(Boolean)
      },
    };

    console.log(body);

    const res  = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    console.log(res);

    if (!res.ok) throw new Error('Address validation failed');
    return res.json();
};

export default validateAddress;