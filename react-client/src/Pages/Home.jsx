import React, { useEffect,useState } from 'react';
import  { useAuth } from '../apiServices/AuthContext';






function Home() {
 
  const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin} = useAuth()
  const [update, setUpdate] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    getVehicles().then(data => setVehicleData(data));
  },[0]);

  const getVehicles = async () => {
    // fetch not working currently!
      const response = await fetch('http://localhost:9000/vehicles/getCars');
      const data = await response.json();

      return data;
  }
    if(vehicleData != null){
      console.log(vehicleData)
    }

  return (
    <div>
        
    </div>
  )
}

export default Home;
