import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
function Reserve() {

    const { currentUser } = useAuth(); // Assuming useAuth() provides the current user details correctly.
    const [photoUrl, setPhotoUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const location = useLocation();
    const vehicleId = location.state?.vehicleId;

    const navigate = useNavigate();
    console.log(vehicleId);
    
    useEffect(()=>{
        if(vehicleId){
            getPhoto(vehicleId).then(setPhotoUrl).catch(console.error);
        }
    },[vehicleId]);
    let url = getPhoto(vehicleId);

    async function submitReservation() {
      // Ensure all fields are filled
      console.log("0");
    

      try {
        console.log("1");
          const response = await fetch('http://localhost:9000/vehicles/reserve', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  vehicleId,
                  startDate,
                  endDate,
                  currentUser 
              }),
          });

          console.log("2");
          const data = await response.json();
          console.log("3");
          if (!response.ok) {
              throw new Error(data.message || 'Could not create reservation.');
          }
          alert('Reservation successfully created!');
          // Clear the form or redirect as needed
          setPhotoUrl(data.photoUrl);
          setStartDate("");
          setEndDate("");

          navigate('/');
      } catch (error) {
          console.error('Error:', error);
          alert(error.message);
      }
  }

    async function getPhoto(vehicleId){
        try{
            console.log("1");
            const response = await fetch(`http://localhost:9000/vehicles/getCarPhoto?id=${encodeURIComponent(vehicleId)}`);
            console.log("2");
            const data = await response.json();
            console.log("3");
            console.log(data.photoURL);
            console.log("4");
            return data.photoURL;
        }
        catch(error){
            console.log("error in Fetch");
        }
    } 
    return (
        <div>
            <h2>Create a Reservation</h2>
            <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                placeholder="Start Date"
            />
            <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                placeholder="End Date"
            />
            <button onClick={submitReservation}>Submit Reservation</button>
            <br/>
            <img src={photoUrl}/>
        </div>
    );
}

export default Reserve;
