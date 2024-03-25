import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Stripe from "react-stripe-checkout";

function Checkin() {
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const [isForm2Submitted, setIsForm2Submitted] = useState(false);
  const [deposit, setDeposit] = useState(500);
  const [depositPaid, setDepositPaid] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testVar = searchParams.get('variable');

  const printTest = (e) => {
    alert(testVar);
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

  const handleDepositToken = async (token) => {
    try {
      alert('Deposit payment successful!');
      setDeposit(0);
      setDepositPaid(true); 
    } catch (error) {
      alert('Error processing deposit payment.');
      console.error(error);
    }
  };

  return (
    <div className="Checkin">
      <button onClick={printTest}>Test Variable</button>
      <h3><u>User Check-in</u></h3>
       <form onSubmit={handleForm1Submit} className="form">
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
        <h3><u>Sign Rental agreement:</u></h3>
        <Link to="/agreement"><button disabled={!isForm1Submitted || !isForm2Submitted}>Electronically</button></Link>
        <Link to="/agreementp"><button disabled={!isForm1Submitted || !isForm2Submitted}>Physically</button></Link>
        <div>
        <h3><u>Deposit payment:</u></h3>
        {depositPaid ? "Deposit Paid" : `Deposit: $${deposit}`}
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

    </div>
  );
}

export default Checkin;
