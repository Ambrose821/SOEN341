import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Stripe from "react-stripe-checkout";
import axios from 'axios';

function Billing() {
  const location = useLocation();
  const { reservation } = location.state;
  const { carCost: initialCarCost } = reservation;

  const [startDate, setStartDate] = useState("Not Set");
  const [endDate, setEndDate] = useState("Not Set");
  const [carCost, setCarCost] = useState(initialCarCost || 0);
  const [taxes, setTaxes] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [gpsCost, setGpsCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);

  const startDateString = new Date(reservation.startDate);
  const endDateString = new Date(reservation.endDate);
  const timeDifferenceInSeconds = endDateString - startDateString;
  const timeDifferenceInDays = timeDifferenceInSeconds / (1000 * 3600 * 24);
  
  useEffect(() => {
    if (reservation) {
      const startDateString = new Date(reservation.startDate).toLocaleDateString();
      const endDateString = new Date(reservation.endDate).toLocaleDateString();

      setStartDate(startDateString || "Not Set");
      setEndDate(endDateString || "Not Set");
      setCarCost(reservation.carCost || 0);
      setGpsCost(0);
      setInsuranceCost(0);
      setDeposit(0);

      if (reservation.gps) {
        setGpsCost(30*timeDifferenceInDays);
      } else {
        setGpsCost(0);
      }

      if (reservation.insurance) {
        setInsuranceCost(100*timeDifferenceInDays);
      } else {
        setInsuranceCost(0);
      }
      setTaxes((((reservation.carCost + gpsCost + insuranceCost) || 0)) * 0.15);
      setTotalCost((carCost + gpsCost + insuranceCost) * 1.15);

    }
  }, [reservation, carCost, gpsCost, insuranceCost, timeDifferenceInDays]);

  const handleToken = async (token) => {
    try {
      await axios.post(`http://localhost:9000/stripe-route/pay`, {
        token: token,
        amount: totalCost
      });
      
    } catch (error) {
      setCarCost(0);
      setTaxes(0);
      setDeposit(0);
      setTotalCost(0);
      setGpsCost(0);
      setInsuranceCost(0);

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
          <p>GPS Cost: {gpsCost}</p>
          <p>Insurance Cost: {insuranceCost}</p>
          <p>Taxes: {taxes}</p>
          {/* <p>Taxes: {(carCost + gpsCost + insuranceCost)*0.15}</p> */}
          <p>Deposit, if applicable: {deposit}</p>
          {/* <p>Total Cost: {totalCost}</p> */}
          <p> Total Cost: {(carCost + gpsCost + insuranceCost) * 1.15}</p>
        </div>
      </div>
      <div>
        <Stripe 
          stripeKey="pk_test_51OxClYRtB7HB3uoouoj90CHAzOKSboCFXA3j6SYsdDHW0N8In4m1ZfO9GZCG6jFOHedJNAMwF9DKZ8SEl0lbOqVv009DRKxgDw"
          currency="CAD"
          name="Vehicles"
          description="Reservation Payment"
          token={handleToken}
          amount={totalCost * 100} // Amount in cents
          onClose={() => console.log('Payment closed')}
        >
          <button>Pay Balance</button>
        </Stripe>
      </div>
    </div>
  );
}

export default Billing;
