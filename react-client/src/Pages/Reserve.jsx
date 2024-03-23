import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Reserve() {
    const { currentUser } = useAuth();
    const [photoUrl, setPhotoUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [gps, setGps] = useState(false); // State for GPS option
    const [insurance, setInsurance] = useState(false); // State for Insurance option

    const [modifyID,setModifyID] = useState(0);


    const location = useLocation();
    const vehicleId = location.state?.vehicleId;
    const navigate = useNavigate();

    const { modifyReservation } = location.state || {}; // Default to an empty object


    useEffect(() => {
        if (vehicleId) {
            getPhoto(vehicleId).then(setPhotoUrl).catch(console.error);
        }
        else{
            setModifyID(modifyReservation._id);
            setPhotoUrl(modifyReservation.vehicle.photoURL);
        }
    }, [vehicleId,modifyReservation]);

    async function getPhoto(vehicleId) {
        if (!vehicleId) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:9000/vehicles/getCarPhoto?id=${encodeURIComponent(vehicleId)}`);
            const data = await response.json();
            return data.photoURL;
        } catch (error) {
            console.log("Error in Fetch:", error);
        }
    } 

    async function getIdFromPhoto(photoUrlToChange) {
        if (!photoUrlToChange) {
            return null;
        }
        try {
            const response = await fetch(`http://localhost:9000/vehicles/getCarIdFromPhoto?photoUrl=${encodeURIComponent(photoUrlToChange)}`);
            const data = await response.json();
            if (response.ok) {
                return data.id;
            } else {
                throw new Error(data.message || 'Failed to fetch vehicle ID.');
            }
        } catch (error) {
            console.log("Error in fetching vehicle ID:", error);
            return null;
        }
    };

    async function submitReservation() {
        console.log("Attempting to submit reservation...");

        try {
            const response = await fetch('http://localhost:9000/vehicles/reserve', {
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
        
        try{
            const response = await fetch('http://localhost:9000/vehicles/modifyReservations',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    modifyID,
                    startDate,
                    endDate,
                    currentUser,
                    gps,
                    insurance,
                }),
            })
            alert('Reservation successfully modified!');
        }
        catch(error){

        }
    }

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
            <div>
                <input 
                    type="checkbox" 
                    checked={gps} 
                    onChange={() => setGps(!gps)} 
                /> GPS
                <input 
                    type="checkbox" 
                    checked={insurance} 
                    onChange={() => setInsurance(!insurance)} 
                /> Insurance
            </div>
            {modifyReservation ? (
            <button onClick={modifyReservations} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Modify Reservation</button>
        ) : (
            <button onClick={submitReservation} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Reservation</button>
        )}
            <br/>
            <img 
                src={photoUrl} 
                alt="Vehicle" 
                style={{ maxWidth: '400px', maxHeight: '400px' }} 
            />
        </div>
    );
}

export default Reserve;
