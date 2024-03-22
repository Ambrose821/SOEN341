import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom';

function Reservations() {
  const { currentUser } = useAuth(); 

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("Not Set");
  const [endDate, setEndDate] = useState("Not Set");
  const [carCost, setCarCost] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  async function getReservations(currentUser) {
    if (!currentUser) return; // Early return if currentUser is not defined
    
    try {
      const url = `http://localhost:9000/vehicles/getReservation?currentUser=${encodeURIComponent(currentUser)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.reservations && data.reservations.length > 0) {
        const reservation = data.reservations[0];
        setStartDate(reservation.start || "Not Set");
        setEndDate(reservation.end || "Not Set");
        
        const carCostResponse = await fetch(`http://localhost:9000/vehicles/getCarCost`);
        const carCostData = await carCostResponse.json()
        const taxes = carCostData * 0.15;
        const deposit = 0;
        const totalCost = carCostData + deposit + taxes;

        setCarCost(carCostData.carCost || "error");
        setTaxes(taxes || "error");
        setDeposit(deposit || "error");
        setTotalCost(totalCost || "error");

      } else {
        console.log('No reservations found or data structure is unexpected', data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }
  

  useEffect(() => {
    getReservations(currentUser);
  }, [currentUser]); 

  return (
    <div>
      <h2>Billing Information</h2>
      <div>
        <div>
          <p>Reservation Start Date: {startDate}</p>
          <p>Reservation End Date: {endDate}</p>
          <p>Car Cost: {carCost}</p>
          <p>Taxes: {taxes}</p>
          <p>Deposit, if applicable: {deposit}</p>
          <p>Total Cost: {totalCost}</p>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default Reservations;
