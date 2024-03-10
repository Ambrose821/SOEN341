import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import {useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
function Reserve() {

    const { currentUser } = useAuth(); // Assuming useAuth() provides the current user details correctly.
    const [photoUrl, setPhotoUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const location = useLocation();
    const vehicleId = location.state?.vehicleId;

    const {photo : photoUrlToChange} = location.state || {};



    const vehicleModifyId = getIdFromPhoto(photoUrlToChange);
    console.log(vehicleModifyId);

    

    console.log("PHOTO URL FROM CHANGE IS: " +photoUrlToChange);
    const navigate = useNavigate();
    console.log(vehicleId);
    
    useEffect(()=>{
        if(vehicleId){
            getPhoto(vehicleId).then(setPhotoUrl).catch(console.error);
        }
    },[vehicleId]);

    let url = getPhoto(vehicleId);


    async function getPhoto(vehicleId){
        if(!vehicleId){
            return;
        }
        try{
            console.log("1");
            const response = await fetch(`http://localhost:9000/vehicles/getCarPhoto?id=${encodeURIComponent(vehicleId)}`);
            console.log("2");
            const data = await response.json();
            console.log("3");
            console.log(data.photoURL);
            console.log("4");
            return data.photoURL;
        }
        catch(error){
            console.log("error in Fetch");
        }
    } 

    async function getIdFromPhoto(photoUrlToChange){
        if(!photoUrlToChange){
            return null;
        }
        try {
            const response = await fetch(`http://localhost:9000/vehicles/getCarIdFromPhoto?photoUrl=${encodeURIComponent(photoUrlToChange)}`);
            const data = await response.json();
            if(response.ok) {
                return data.id; // Assuming your API returns the ID in the 'id' field
            } else {
                throw new Error(data.message || 'Failed to fetch vehicle ID.');
            }
        }
        catch(error){
            console.log("Error in fetching vehicle ID:", error);
            return null; // Return null or appropriate fallback
        }
    };


    async function submitReservation() {
        // Ensure all fields are filled
        console.log("Attempting to submit reservation...");
    
        try {
            const vehicleModifyId = await getIdFromPhoto(photoUrlToChange); // Wait for the ID to be fetched
            console.log("Vehicle Modify ID:", vehicleModifyId);
    
            const response = await fetch('http://localhost:9000/vehicles/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicleId, // Use vehicleModifyId if available, else fallback to vehicleId
                    startDate,
                    endDate,
                    currentUser,
                    vehicleModifyId
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Could not create reservation.');
            }
            alert('Reservation successfully created!');
            // Clear the form or redirect as needed
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    
    return (
        <div>
            <h2>Create a Reservation</h2>
            <input 
                type="date" 
                value={startDate} 
                onChange={e => setStartDate(e.target.value)} 
                placeholder="Start Date"
            />
            <input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                placeholder="End Date"
            />
            <button onClick={submitReservation}>Submit Reservation</button>
            <br/>
            <img src={photoUrl}/>
        </div>
    );
}

export default Reserve;
