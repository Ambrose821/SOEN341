import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkin() {
  const [isChecked, setIsChecked] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

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

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!isChecked && description.trim() === '' && images.length === 0) {
    alert('Please select the checkbox or provide a description with photo uploads.');
  } else if (!isChecked && description.trim() === '') {
    alert('Please provide a description with photo uploads.');
  } else if(description.trim() !==''  && images.length === 0){
    alert('Please provide photo uploads.');
  }else{
    console.log('Form submitted successfully!');
    // Additional submission logic if needed
  }
};

  return (
    <div className="Checkin">
       <form onSubmit={handleSubmit} className="form">
            <label htmlFor="reservation_number">Reservation Number:</label>
            <input type="text" id="reservation_number" name="reservation_number" required/>

            <label htmlFor="credit_card_number">Credit Card Number:</label>
            <input type="text" id="credit_card_number" name="credit_card_number" required/>

            <label htmlFor="photo_upload">Upload Photo:</label>
            <input type="file" id="photo_upload" name="photo_upload" accept="image/*" required/><br/>

            <label htmlFor="Rental_agreement">Sign Rental agreement:</label><br/>
            <Link to="/agreement"><button>Electronically</button></Link>
            <button>Physically</button>
            <br/><br/>
            <input type="submit" value="Submit"/>
            <input type="reset" value="Reset"/>
        </form>
        <br/><br/><br/><br/>
        <form onSubmit={handleSubmit} className="form">
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
        </form>
    </div>
  );
}

export default Checkin;
