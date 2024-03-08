import React, { useEffect,useState } from 'react';

function Reservations() {

  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    getVehicles().then(data => setVehicleData(data));
  },[]);

  const getVehicles = async () => {
    // fetch not working currently!
      const response = await fetch('http://localhost:9000/vehicles/getCars');
      const data = await response.json();
      
      return data;
  }

  console.log(vehicleData);

  return (
    <div>
        <h2>My Reservations</h2>
    </div>
  )
}

export default Reservations;
