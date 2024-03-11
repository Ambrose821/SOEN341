import React, { useState, useEffect } from 'react';

function ViewUserReservations() {
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const response = await fetch('http://localhost:9000/vehicles/getReservation?currentUser=v2%40m.com');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setAllReservations(data.reservations || []); // Make sure data.reservations is an array
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>All Reservations</h2>
      <div>
        {allReservations.map((reservation, index) => (
          <div key={index}>
            <p>User: {reservation.user}</p>
            <p>Start Date: {reservation.start}</p>
            <p>End Date: {reservation.end}</p>
            {/* Add other reservation details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewUserReservations;
