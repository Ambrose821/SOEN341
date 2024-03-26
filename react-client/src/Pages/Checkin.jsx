
import { Link, useLocation,  useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';


import Stripe from "react-stripe-checkout";

function Checkin() {
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const [isForm2Submitted, setIsForm2Submitted] = useState(false);
  const [deposit, setDeposit] = useState(500);
  const [depositPaid, setDepositPaid] = useState(false);
  var form1Info = null;
  const [agreementVariable, setAgreementVariable] = useState('')
  const location = useLocation();
  const { reservation } = location.state || {};
  const navigate = useNavigate();

  const printTest = (e) => {
    alert(JSON.stringify(reservation));
}

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
  const reservationNumber = e.target.elements.reservation_number.value;
    const creditCardNumber = e.target.elements.credit_card_number.value;
    const homeAddress = e.target.elements.address.value;
    const license_number = e.target.elements.license_number.value;
    const phone_number = e.target.elements.phone_number.value
    form1Info =({ reservationNumber: reservationNumber, creditCardNumber: creditCardNumber, homeAddress: homeAddress, license_number: license_number, phone_number:phone_number  })
    console.log(form1Info)
    setAgreementVariable( [reservation,form1Info])
    //alert(agreementVariable)
  if (reservationNumber.trim() === '') {
    alert('Please enter a non-empty reservation number.');
    return; // Exit the function if validation fails
  }

  // Check if the credit card number has 16 digits
  if (!(/^\d{16}$/.test(creditCardNumber))) {
    alert('Please enter a 16-digit credit card number.');
    return; // Exit the function if validation fails
  }

  // If both validations pass, set the form submission flag to true
  setIsForm1Submitted(true);
  alert("User successfully checked-in!")
  };
  
  const sendToAgreement = () => {
    navigate('/agreement',{state :{info : agreementVariable}})
  }
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
      if (reservation.deposit === 'due') {
        setDepositPaid(false); // deposit not paid
        setDeposit(500);
      } else if (reservation.deposit === 'paid') {
        setDepositPaid(true); // deposit paid
        setDeposit(0);
      }
  }, [reservation]);

  const handleDepositToken = async (token) => {
    try {
      const response = await fetch(`http://localhost:9000/vehicles/update-deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
        reservationId: reservation, 
        depositStatus: 'paid'
      })
    });

    console.log("Deposit Update Response:", response);

    const data = await response.json(); 

    console.log("Deposit Update Data:", data);

    console.log(reservation);

    if (data.success) {
      setDepositPaid(true); 
      alert('Deposit payment successful!');
    } else {
      alert('Failed to update deposit status.');
    }
  } catch (error) {
    alert('Error processing deposit payment.');
    console.error(error);
  }
  };
  
  return (
    <div className="Checkin">
      <h3><u>User Check-in</u></h3>
      <form onSubmit={handleForm1Submit} className="form">
        
      <label htmlFor="phone_number">Phone Number:</label>
        <input type="text" id="phone_number" name="phone_number" required />

            <label htmlFor="license_number">Drivers License Number:</label>
        <input type="text" id="license_number" name="license_number" required />
        
        <label htmlFor="address">Home Address:</label>
           <input type="text" id="address" name="address" required />
        
            <label htmlFor="reservation_number">Reservation Number:</label>
            <input type="text" id="reservation_number" name="reservation_number" required/>

            <label htmlFor="credit_card_number">Credit Card Number:</label>
            <input type="text" id="credit_card_number" name="credit_card_number" required/>

            <label htmlFor="photo_upload">Upload Photo:</label>
            <input type="file" id="photo_upload" name="photo_upload" accept="image/*" required/><br/>
            <input type="submit" value="Submit"/>
            <input type="reset" value="Reset"/>
        </form>
        <br/><br/>
        <h3><u>Vehicle Inspection</u></h3>
        <form onSubmit={handleForm2Submit} className="form">
            <input type="checkbox" id="checkbox_option" name="checkbox_option" onChange={handleCheckboxChange}/>
            <label htmlFor="checkbox_option">Vehicle is Undamaged (Required if text box is empty)</label><br/><br/>

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
        <div>
      <h3><u>Deposit payment:</u></h3>
      {depositPaid ? "Deposit Paid" : `Deposit: ${deposit}` }
      {!depositPaid && (
        <Stripe
          stripeKey="pk_test_51OxClYRtB7HB3uoouoj90CHAzOKSboCFXA3j6SYsdDHW0N8In4m1ZfO9GZCG6jFOHedJNAMwF9DKZ8SEl0lbOqVv009DRKxgDw"
          currency="CAD"
          name="Vehicles"
          description="Deposit Payment"
          token={handleDepositToken}
          amount={deposit * 100} 
          onClose={() => console.log('Deposit Payment closed')}
        >
          <br></br>
          <button>Make a Payment</button>
        </Stripe>
      )}
        </div>
        <h3><u>Sign Rental agreement:</u></h3>
        <button onClick={sendToAgreement} disabled={!isForm1Submitted || !isForm2Submitted||!depositPaid}>Electronically</button>
        <Link to="/agreementp"><button disabled={!isForm1Submitted || !isForm2Submitted||!depositPaid}>Physically</button></Link>
        

    </div>
  );
}

export default Checkin;
