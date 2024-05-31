import React, { useEffect, useState } from 'react';

const PlanetDetails = () => {
  const [planetDetails, setPlanetDetails] = useState( {});
  function setWithExpiry(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}
function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        if (getWithExpiry("data")){
            setPlanetDetails(getWithExpiry("data"))
        } else {
            const res = await fetch("https://swapi.dev/api/planets/1/");
        const data = await res.json();
        setPlanetDetails(data);
        
        console.log(data);
        setWithExpiry("data", data, 5000)
        }
        
      } catch (error) {
        console.error("Error fetching planet details:", error);
      }
    };

    fetchPlanetDetails();
    
  }, []);
//   localStorage.setItem("data", planetDetails)
  return (
    <div>
      <h1 className=' text-2xl font-extrabold mb-8'>Planet Details</h1>
      {planetDetails.name ? (
        <div>
          <p><span className=' text-lg font-medium'>Name:</span> {planetDetails.name}</p>
          <p><span className=' text-lg font-medium'>Climate:</span> {planetDetails.climate}</p>
          <p><span className=' text-lg font-medium'>Terrain:</span> {planetDetails.terrain}</p>
          <p><span className=' text-lg font-medium'>Population:</span> {planetDetails.population}</p>
          <p><span className=' text-lg font-medium'>Orbital Period :</span> {planetDetails.orbital_period}</p>
          <p><span className=' text-lg font-medium'>Surface water :</span> {planetDetails.surface_water}</p>
          <p><span className=' text-lg font-medium'>Gravity :</span> {planetDetails.gravity}</p>
          <p><span className=' text-lg font-medium'>Climate :</span> {planetDetails.climate}</p>
          <p><span className=' text-lg font-medium'>Rotation Period :</span> {planetDetails.rotation_period}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlanetDetails;
