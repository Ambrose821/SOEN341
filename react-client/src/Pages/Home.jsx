import React, { useEffect } from 'react';

function Home() {

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    // fetch not working currently!
      const response = await fetch('http://localhost:9000/vehicles/getCars');
  }

  return (
    <div>
        Home
    </div>
  )
}

export default Home;
