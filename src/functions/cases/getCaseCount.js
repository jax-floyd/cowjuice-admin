const getCaseCount = async () => {
    try {
      const response = await fetch('https://api.gotcowjuice.com:2000/get-case');
      
      if (!response.ok) {
        throw new Error('Failed to fetch case count');
      }
  
      const data = await response.json();
      return data.casesLeft;
    } catch (error) {
      console.error("Error fetching case count:", error);
      return null; // Return null if there was an error
    }
};

export default getCaseCount;