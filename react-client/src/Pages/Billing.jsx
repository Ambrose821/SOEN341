import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom';
import Stripe from "react-stripe-checkout";
import axios from 'axios';

function Billing() {
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("Not Set");
  const [endDate, setEndDate] = useState("Not Set");
  const [carCost, setCarCost] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [amountPaid, setAmountPaid] = useState(0);

  async function getReservations(currentUser) { 
    if (!currentUser) {
        return;
    } 

    try {
      const url = `http://localhost:9000/vehicles/getReservation?currentUser=${encodeURIComponent(currentUser)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.reservations && data.reservations.length > 0) {
        const reservation = data.reservations[0];
        setStartDate(reservation.start || "Not Set");
        setEndDate(reservation.end || "Not Set");
        
        const carCostData = reservation.carCost;
        const taxes = carCostData * 0.15;
        const deposit = 0;
        const totalCost = carCostData + deposit + taxes;

        setCarCost(carCostData || "0.00");
        setTaxes(taxes || "0.00");
        setDeposit(deposit || "0.00");
        setTotalCost(totalCost || "0.00");

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


  const handleToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:3000/api/routes/stripe-routes/pay", {
        token: token.id,
        amount: totalAmount
      });
    } catch (error) {
      console.log(error);
    }
  };



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
        <Stripe
          stripeKey="pk_test_51OxClYRtB7HB3uoouoj90CHAzOKSboCFXA3j6SYsdDHW0N8In4m1ZfO9GZCG6jFOHedJNAMwF9DKZ8SEl0lbOqVv009DRKxgDw"
          currency="CAD"
          name="Your Company Name"
          description="Reservation Payment"
          token={handleToken}
          onClose={() => console.log('Payment closed')}
        >
          <button>Pay  Balance</button>
        </Stripe>
        </div>
    </div>
  );
}

export default Billing;
