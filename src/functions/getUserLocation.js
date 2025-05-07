const getUserLocation = async () => {
    let location = {
        latitude: null,
        longitude: null,
    };
    navigator.geolocation.getCurrentPosition(
        (position) => {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
        },
        (error) => {
          console.log("Error retrieving location:", error);
        }
    );
    return location;
};

export default getUserLocation;