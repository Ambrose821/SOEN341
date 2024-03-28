import { Link, useLocation,  useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Stripe from "react-stripe-checkout";
import axios from 'axios';
// We need to send the car ID to the CarCheckout page so that we can get the car Id's 
function Checkout() {
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const [isForm2Submitted, setIsForm2Submitted] = useState(false);
  const [deposit, setDeposit] = useState(500);
  const [refund, setRefund] = useState(false);
  var form1Info = null;
  const [agreementVariable, setAgreementVariable] = useState('')
  const location = useLocation();
  const { reservation } = location.state || {};
  const navigate = useNavigate();
  const { carCost: initialCarCost } = reservation;
  const [startDate, setStartDate] = useState("Not Set");
  const [endDate, setEndDate] = useState("Not Set");
  const [carCost, setCarCost] = useState(initialCarCost || 0);
  const [taxes, setTaxes] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [gpsCost, setGpsCost] = useState(0);
  const [insuranceCost, setInsuranceCost] = useState(0);
  const [balancePaid, setBalancePaid] = useState(false);
  const startDateString = new Date(reservation.startDate);
  const endDateString = new Date(reservation.endDate);
  const timeDifferenceInSeconds = endDateString - startDateString;
  const timeDifferenceInDays = timeDifferenceInSeconds / (1000 * 3600 * 24);


  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleReset = () => {
    setDescription('');
  };

  const handleForm1Submit = (e) => {
    e.preventDefault();

    alert('Vehicle drop off confirmed.')
    // Proceed with form submission if the checkbox is checked
    setIsForm1Submitted(true);
};
  

  const handleForm2Submit = (e) => {
    e.preventDefault();
    if (!isChecked && description.trim() === '' && images.length === 0) {
      alert('Please select the checkbox or provide a description with photo uploads.');
    } else if (!isChecked && description.trim() === '') {
      alert('Please provide a description with photo uploads.');
    } else if(description.trim() !==''  && images.length === 0){
      alert('Please provide photo uploads.');
    }else{
      alert("Vehicle Inspection successfully completed!");
      setIsForm2Submitted(true);
    }
    
  };


  useEffect(() => {
    if (reservation && reservation.deposit) {
        if (reservation.deposit === 'paid') {
            setRefund(false); // deposit not refunded
        } else if (reservation.deposit === 'refunded') {
            setRefund(true); // deposit refunded
        }
    }
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
      setTotalCost(((carCost + gpsCost + insuranceCost) * 1.15));

  } 
}, [reservation]);

const payBalance = () => {
   
    setBalancePaid(true);
    console.log(balancePaid);
  };

const deleteReservation = async () => {
    try {

        if(!isForm1Submitted || !isForm2Submitted||!balancePaid)
        {
            if(!isForm1Submitted)
            {
                alert("Please complete Vehicle Checkout");
                return;
            }else if(!isForm2Submitted)
            {
                alert("Please complete Vehicle Drop-Off Inspection");
                return;
            }else if(!balancePaid)
            {
                alert("Please pay total Balance");
                return;
            }
        }
      await fetch("http://localhost:9000/vehicles/deleteReservations", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationID:reservation._id }),
      });
      navigate('/Reservations')

    } catch (error) {
      console.log("error occurred in delete reservation");
      console.log(error);
    }
    const id = reservation.vehicle._id;
    console.log(id);
    navigate('CarReviews', { state: { vehicleId: id } });
  };

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

  const handleRefundToken = async (token) => {
    try {
      const response = await fetch(`http://localhost:9000/vehicles/update-deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
        reservationId: reservation, 
        depositStatus: 'refunded'
      })
    });

    console.log("Deposit Update Response:", response);

    const data = await response.json(); 

    console.log("Deposit Update Data:", data);

    console.log(reservation);

    if (data.success) {
      setRefund(true); 
      alert('Refund successful!');
    } else {
      alert('Failed to update refund status.');
    }
  } catch (error) {
    alert('Error processing refund payment.');
    console.error(error);
  }
  };
  
  const handleGenerateBill = () => {
    navigate('/Billing');
  };

  return (
    <div className="Checkout">
      <h3><u>Vehicle Check-out</u></h3>
      <form onSubmit={handleForm1Submit} className="form">
      <input type="checkbox" id="checkbox_option" name="checkbox_option" required/>
            <label htmlFor="checkbox_option">Vehicle was returned to the speccified drop-off location </label><br/>
            <input type="submit" value="Submit"/>
            <input type="reset" value="Reset"/>
        </form>
        <br/><br/>
        <h3><u>Vehicle Drop-Off Inspection</u></h3>
        <form onSubmit={handleForm2Submit} className="form">
            <input type="checkbox" id="checkbox_option" name="checkbox_option" onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox_option">Vehicle was returned Undamaged (Required if text box is empty)</label><br/><br/>

            <label htmlFor="textbox_option">Description of damages (Required if Checkbox is not selected)</label><br/>
            <textarea id="textbox_option" name="textbox_option" rows="4" cols="50" 
                      value={description} onChange={handleDescriptionChange} disabled={isChecked}/>
            <br/><br/>

            <label htmlFor="image_uploads">Upload Images of damages</label><br/>
            <input type="file" id="image_uploads" name="image_uploads[]" accept="image/*" multiple 
                   onChange={handleImageChange} disabled={isChecked}/><br/>

            <input type="submit" value="Submit"/>
            <input type="reset" value="Reset"onClick={handleReset}/>
        </form><br/><br/>
        <h3><u>Total Bill</u></h3>
        <div>
          <p>Reservation Start Date: {startDate}</p>
          <p>Reservation End Date: {endDate}</p>
          <p>Car Cost: {carCost}$</p>
          <p>GPS Cost: {gpsCost}$</p>
          <p>Insurance Cost: {insuranceCost}$</p>
          {/* <p>Taxes: {taxes}$</p> */}
          <p>Taxes: {(carCost + gpsCost + insuranceCost)*0.15}$</p>
          {/* <p>Total Cost: {totalCost}</p> */}
          <p> Total Cost: {((carCost + gpsCost + insuranceCost) * 1.15).toFixed(2)}$</p>
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
            <button disabled={!isForm1Submitted || !isForm2Submitted} onClick={payBalance}>Pay Balance</button>
          </Stripe>
        </div>
        <br></br>
        
        <h3><u>Deposit Refund</u></h3>
        {refund ? "Expect your refund in 4-5 business days on the credit card used to pay the deposit." : <button onClick={handleRefundToken} disabled={!isForm1Submitted || !isForm2Submitted}>Get deposit refund</button>}
        <h3><u>Finalize Checkout</u></h3>
        <button 
              onClick={() => deleteReservation()} 
              style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', margin:'5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Finalize Checkout
        </button>
    </div>
  );
}

export default Checkout;
