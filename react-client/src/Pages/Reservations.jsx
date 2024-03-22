import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';


function Reservations() {

  const [reservations, setReservations] = useState([]);

  const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin} = useAuth();

  useEffect(() => {
    if(currentUser){
      fetchReservations();
    }
    },[currentUser]);

  const fetchReservations = async () => {
    console.log("Fetcher ",currentUser)
    try {
      console.log("Fetcher ",currentUser)
      const response = await fetch(`http://localhost:9000/vehicles/getUserReservations`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentUser}),

      })
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const deleteReservation = async (reservationId) => {

  };

  console.log(reservations);


  // Placeholder for modify functionality
  const modifyReservation = (reservationId) => {
    console.log("Modify reservation:", reservationId);
    // Implement navigation to a modification form or directly allow editing fields here
  };


  return (
    <div>
      <h2>User Reservations</h2>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation._id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
            {reservation.vehicle && reservation.vehicle.photoURL && (
              <img src={reservation.vehicle.photoURL} alt="Vehicle" style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px 0' }} />
            )}
            <p>Start Date: {new Date(reservation.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(reservation.endDate).toLocaleDateString()}</p>
            <p>Car Cost: {reservation.carCost}</p>
            <button 
              onClick={() => deleteReservation(reservation._id)} 
              style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Delete
            </button>
            <button 
              onClick={() => modifyReservation(reservation._id)}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Modify
            </button>
          </div>
        ))
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
}

export default Reservations;
