
import { Link, useLocation,  useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';


import Stripe from "react-stripe-checkout";

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

    // Check if the checkbox is checked
    if (!isChecked) {
        alert('Please confirm that the vehicle was returned to the specified drop-off location.');
        return; // Exit the function if the checkbox is not checked
    }
    alert('Vehicle drop off confirmed.')
    // Proceed with form submission if the checkbox is checked
    setIsForm1Submitted(true);
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
    if (reservation && reservation.deposit) {
        if (reservation.deposit === 'paid') {
            setRefund(false); // deposit not refunded
        } else if (reservation.deposit === 'refunded') {
            setRefund(true); // deposit refunded
        }
    }
}, [reservation]);

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
      <input type="checkbox" id="checkbox_option" name="checkbox_option" onChange={handleCheckboxChange}/>
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
        <h3><u>Generate Total Bill</u></h3>
        <button onClick={handleGenerateBill} disabled={!isForm1Submitted || !isForm2Submitted}>Generate Bill</button>
        <br></br>
        
        <h3><u>Deposit Refund</u></h3>
        {refund ? "Expect your refund in 4-5 business days" : <button onClick={handleRefundToken} disabled={refund}>Get deposit refund</button>}

    </div>
  );
}

export default Checkout;
