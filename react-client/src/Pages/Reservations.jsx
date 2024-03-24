import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchReservations();
    }
  }, [currentUser]);

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

  const deleteReservation = async (id) => {
    try {
      await fetch("http://localhost:9000/vehicles/deleteReservations", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationID: id }),
      });
      fetchReservations(); // Fetch reservations again after deletion
    } catch (error) {
      console.log("error occurred in delete reservation");
      console.log(error);
    }
  };

  const modifyReservation = (reservation) => {
    navigate("/Reserve", { state: { modifyReservation: reservation } });
  };

  return (
    <div>
      <h2>User Reservations</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
  {reservations.length > 0 ? (
    reservations.map((reservation, index) => (
      <div key={reservation._id} style={{ flexBasis: '30%', maxWidth: 'calc(30% - 40px)', margin: '20px', padding: '10px', border: '1px solid #ccc', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
        {reservation.vehicle && reservation.vehicle.photoURL && (
          <img src={reservation.vehicle.photoURL} alt="Vehicle" style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px 0', borderRadius: '10px' }} />
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
          onClick={() => modifyReservation(reservation)}
          style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Modify
        </button>
      </div>
    ))
  ) : (
    <p>No reservations found.</p>
  )}
</div>

    </div>
  );
}

export default Reservations;
