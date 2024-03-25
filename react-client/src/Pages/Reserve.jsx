import React, { useState, useEffect } from 'react';
import { useAuth } from '../apiServices/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS

function Reserve() {
    const { currentUser } = useAuth();
    const [photoUrl, setPhotoUrl] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [gps, setGps] = useState(false); // State for GPS option
    const [insurance, setInsurance] = useState(false); // State for Insurance option
    const [dates, setDates] = useState([]); // State for Insurance option
    const [excludedDatesUse,setExcludedDates] = useState([]);

    const [modifyID,setModifyID] = useState({});

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

            console.log("INSIDE ELSE:" +modifyID);
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
        
        const idToUse = modifyReservation ? modifyID : vehicleId;

        console.log(startDate);

        navigate("/InfoReserve",{state: {
            startDate :startDate,
            endDate : endDate,
            gps:gps,
            insurance:insurance,
            vehicleId:idToUse,
            currentUser:currentUser,
            imageUrl: photoUrl,
            fromModify:false,
        }
    })
    };

    async function modifyReservations(){

        const idToUse = modifyReservation ? modifyID : vehicleId;

        console.log("FROM MODIFY FUNCTION"+idToUse);
        
        navigate("/InfoReserve",{state: {
            startDate :startDate,
            endDate : endDate,
            gps:gps,
            insurance:insurance,
            vehicleId:idToUse,
            currentUser:currentUser,
            imageUrl: photoUrl,
            fromModify:true,
        }
    })
    }

    useEffect(() => {
        async function getReservationDates() {
          try {
            const idToUse = modifyReservation ? modifyID : vehicleId;
            const response = await fetch('http://localhost:9000/vehicles/getReservationDates', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                idToUse
              }),
            });
      
            const data = await response.json();
            console.log(data.dates);
      
            // Update `dates` and then immediately create excluded dates
            const newDates = data.dates.map(dateStr => new Date(dateStr));
            setDates(newDates);
            
            // Now create and set excluded dates based on the newly fetched dates
            setExcludedDates(newDates);
            console.log("Excluded Dates: ", newDates);
          } catch (error) {
            console.log(error);
          }
        }
      
        getReservationDates();
      }, [modifyReservation, modifyID, vehicleId]); // Ensures the e

    async function createExcludedDates(){
        const excludedDates = [];

        for(let i=0;i<dates.length;i++){
            excludedDates.push(new Date(dates[i]));
        }
        setExcludedDates(excludedDates);
        console.log("YESSIR"+excludedDatesUse);
    }

    return (
        <div>
            <h2>Create a Reservation</h2>
            <p> Start Date </p>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date.toString())}
                dateFormat="yyyy-MM-dd" 
                excludeDates={excludedDatesUse}
                minDate={new Date()} 
            />

            <p> End Date </p>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date.toString())}
                dateFormat="yyyy-MM-dd"
                excludeDates={excludedDatesUse}
                minDate={startDate || new Date()} 
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
