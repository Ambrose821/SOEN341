import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Reservations() {
  const [reservations, setReservations] = useState([]);

  const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchReservations();
    }
  }, [currentUser]);

  const testVar= "HelloWorld";

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:9000/vehicles/getUserReservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentUser }),
      });
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const deleteReservation = async (index) => {
    try {
      await fetch("http://localhost:9000/vehicles/deleteReservations", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationID: reservations[index] }),
      });
      fetchReservations(); // Fetch reservations again after deletion
    } catch (error) {
      console.log("error occurred in delete reservation");
      console.log(error);
    }
  };

  console.log(reservations);


  // Placeholder for modify functionality
  const modifyReservation = (index) => {

    const reservation = reservations[index];
    console.log(reservation);
    navigate("/Reserve", {state : {modifyReservation : reservation}});
  };

  const viewBilling = (index) => {
    const reservation = reservations[index];
    navigate("/Billing", { state: { reservation } });
  };

  return (
    <div>
      <h2>User Reservations</h2>
      {reservations.length > 0 ? (
        reservations.map((reservation,index) => (
          <div key={reservation._id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
            {reservation.vehicle && reservation.vehicle.photoURL && (
              <img src={reservation.vehicle.photoURL} alt="Vehicle" style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px 0' }} />
            )}
            <p> <strong>Start Date:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
            <p> <strong>End Date:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
            <p> <strong>Car Cost:</strong> {reservation.carCost}</p>
            <p> <strong> Pick Up Location: </strong> {reservation.pickUp}</p>
            <p> <strong>Drop Off Location:</strong> {reservation.dropOff}</p>
            <Link to={`/checkin?variable=${testVar}`}>
              <button style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', margin:'5px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                Check In
              </button>
              </Link>
            <button 
              onClick={() => viewBilling(index)}
              style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', margin:'5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              View Billing
            </button>
            <button 
              onClick={() => modifyReservation(index)}
              style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', margin:'5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Modify
            </button>
            <button 
              onClick={() => deleteReservation(index)} 
              style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', margin:'5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Delete
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
