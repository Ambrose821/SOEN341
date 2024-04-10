import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';



function InfoReservationPage() {
  const handleYesClick = () => {
    console.log('Yes clicked');
    
  };

  const handleNoClick = () => {
    navigate('/');
  };


  const location = useLocation();
  const navigate = useNavigate();

  const { startDate, endDate, gps, insurance, vehicleId, currentUser, imageUrl,fromModify,pickUp,dropOff } = location.state || {};


  async function submitReservation() {
    console.log("Attempting to submit reservation...");
  
    try {
      // This will fetch a request to the API using an HTTP request 
        const response = await fetch('http://localhost:9000/vehicles/reserve', {
            // We are using a POST which needs a body and it more secure than a GET also needs header 
            method: 'POST',
            // this is the header 
            headers: {
                'Content-Type': 'application/json',
          },
            // This is the body of the request which will be found in the back end paramaters 
            body: JSON.stringify({
                vehicleId,
                startDate,
                endDate,
                currentUser,
                gps,
                insurance,
                imageUrl,
                pickUp,
                dropOff,
            }),
        });
        const data = await response.json();
  
        if (!response.ok) {
            throw new Error(data.message || 'Could not create reservation.');
        }
        alert('Reservation successfully created!');
        navigate('/');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
  };

  async function modifyReservations(){
    console.log("Trying to modify");
    console.log("DATES" +startDate + " "+ endDate);
    try{
        const response = await fetch('http://localhost:9000/vehicles/modifyReservations',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vehicleId,
                startDate,
                endDate,
                currentUser,
                gps,
                insurance,
                pickUp,
                dropOff
            }),
        })
        alert('Reservation successfully modified!');
        navigate('/');
    }
    catch(error){

    }
}

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Reservation Confirmation</h2>
      <img src={imageUrl} alt="Vehicle" style={{ maxWidth: '100%', height: '100px', objectFit: 'contain' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
        {/* Information Display */}
        <div><strong>Start Date:</strong> {startDate}</div>
        <div><strong>End Date:</strong> {endDate}</div>
        <div><strong>GPS:</strong> {gps ? 'Yes' : 'No'}</div>
        <div><strong>Insurance:</strong> {insurance ? 'Yes' : 'No'}</div>
        <div><strong>Vehicle ID:</strong> {vehicleId}</div>
        <div><strong>User Email:</strong> {currentUser}</div>

      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Confirm</h3>
        <button 
         onClick={fromModify ? modifyReservations : submitReservation}
          style={{ 
            marginRight: '10px', 
            backgroundColor: fromModify ? 'blue' : 'green', 
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '16px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}>
          {fromModify ? 'Modify' : 'YES'}
        </button>
        <Link to="/"><button  style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          NO
        </button></Link>
      </div>
    </div>
  </div>
);

}

export default InfoReservationPage;
