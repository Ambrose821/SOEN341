import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const { currentUser } = useAuth(); // Assuming useAuth() provides the current user details correctly.

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("Not Set");
  const [endDate, setEndDate] = useState("Not Set");
  const [photoUrl, setPhotoUrl] = useState("https://via.placeholder.com/200");

  // Function to fetch reservations
  async function getReservations(currentUser) {
    if (!currentUser) return; // Early return if currentUser is not defined
    
    try {
      const url = `http://localhost:9000/vehicles/getReservation?currentUser=${encodeURIComponent(currentUser)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data) {
        // Ensures there is at least one reservation and prevents accessing properties of undefined
        setStartDate(data.reservations[0].start || "Not Set");
        setEndDate(data.reservations[0].end || "Not Set");
        setPhotoUrl(data.reservations[0].photo || "https://via.placeholder.com/200");
      } else {
        // Handle case where no reservations are found or data is not structured as expected
        console.log('No reservations found or data structure is unexpected', data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }

  async function changeReservation(photoUrl){
    try{
      const response = await fetch('http://localhost:9000/vehicles/changeReservation',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoUrl
        })
      });

    }
    catch(error){
      console.log(error)
    }
  };

  async function deleteReservation(currentUser){
    try{
      const url = `http://localhost:9000/vehicles/deleteReservation?currentUser=${encodeURIComponent(currentUser)}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      navigate('/');
      
    }
    catch(error){
      console.log(error);
    }

  }

  const navigateToReservation = () => {
    navigate('/reserve', { state: { photo: photoUrl } }); // Correct usage of navigate
  };
  
  useEffect(() => {
    getReservations(currentUser);
  }, [currentUser]); // Depend on currentUser

  const imageStyle = {
    width: '200px',
    height: '200px',
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '20px',
  };

  const buttonStyle = {
    margin: '10px',
    borderRadius: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'red',
    color: 'white',
  };

  const modifyButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'blue',
    color: 'white',
  };

  return (
    <div className="Reservations" style={{ textAlign: 'center' }}>
      <h2>My Reservations</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img src={photoUrl} alt="Reservation" style={imageStyle} />
        <div>
          <p>Pick Up Date: {startDate}</p>
          <p>Drop Off Date: {endDate}</p>
        </div>
      </div>
      <div>
        <button style={deleteButtonStyle} onClick = {()=> deleteReservation(currentUser)}>Delete Rez</button>
        <button style={modifyButtonStyle} onClick={() => navigateToReservation()}>Modify Rez</button>

      </div>
    </div>
  );
}

export default Reservations;
