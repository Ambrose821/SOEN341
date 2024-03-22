import React from 'react';

const brand = "Ferrari";
const model = "F20";
const price = "20";
const transmission = "Manual"; // Fixed typo
const email = "christopher@gmail.com";
// Assuming you have an image URL for the Ferrari F20
const imageUrl = "https://t3.ftcdn.net/jpg/02/98/35/82/360_F_298358259_bwYxOvtrqJn7m8dfeYkkoNkusBSYNhep.jpg";

function InfoReservationPage() {
  const handleYesClick = () => {
    console.log('Yes clicked');
    // Add your logic here for what happens when YES is clicked
  };

  const handleNoClick = () => {
    console.log('No clicked');
    // Add your logic here for what happens when NO is clicked
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Information Display</h2>
        {/* Image right under the header */}
        <img src={imageUrl} alt="Car Image" style={{ maxWidth: '100%', height: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>Brand:</label>
            <span>{brand}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>Model:</label>
            <span>{model}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>Price Per Day:</label>
            <span>{price}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>Transmission Type:</label>
            <span>{transmission}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label>Email:</label>
            <span>{email}</span>
          </div>
        </div>
        
        {/* Confirm section */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '24px' }}>Confirm</h3>
          <button onClick={handleYesClick} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            YES
          </button>
          <button onClick={handleNoClick} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoReservationPage;
