import React, { useState, useEffect } from "react";
import { useAuth } from "../apiServices/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

function Reserve() {
  const { currentUser } = useAuth();
  const [photoUrl, setPhotoUrl] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [gps, setGps] = useState(false); // State for GPS option
  const [insurance, setInsurance] = useState(false); // State for Insurance option
  const [dates, setDates] = useState([]); // State for Insurance option
  const [excludedDatesUse, setExcludedDates] = useState([]);

  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const isFormValid =
    startDate !== null &&
    endDate !== null &&
    pickUpLocation !== "" &&
    dropOffLocation !== "";

  useEffect(() => {
    setLocations(["Montreal", "Toronto", "Ontario"]);
  }, []);

  const [modifyID, setModifyID] = useState({});

  const location = useLocation();
  const vehicleId = location.state?.vehicleId;
  const navigate = useNavigate();

  const { modifyReservation } = location.state || {}; // Default to an empty object

  useEffect(() => {
    if (vehicleId) {
      getPhoto(vehicleId).then(setPhotoUrl).catch(console.error);
    } else {
      setModifyID(modifyReservation._id);
      setPhotoUrl(modifyReservation.vehicle.photoURL);

      console.log("INSIDE ELSE:" + modifyID);
    }
  }, [vehicleId, modifyReservation]);

  async function getPhoto(vehicleId) {
    if (!vehicleId) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:9000/vehicles/getCarPhoto?id=${encodeURIComponent(
          vehicleId
        )}`
      );
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
      const response = await fetch(
        `http://localhost:9000/vehicles/getCarIdFromPhoto?photoUrl=${encodeURIComponent(
          photoUrlToChange
        )}`
      );
      const data = await response.json();
      if (response.ok) {
        return data.id;
      } else {
        throw new Error(data.message || "Failed to fetch vehicle ID.");
      }
    } catch (error) {
      console.log("Error in fetching vehicle ID:", error);
      return null;
    }
  }

  async function submitReservation() {
    const idToUse = modifyReservation ? modifyID : vehicleId;

    navigate("/InfoReserve", {
      state: {
        startDate: startDate,
        endDate: endDate,
        gps: gps,
        insurance: insurance,
        vehicleId: idToUse,
        currentUser: currentUser,
        imageUrl: photoUrl,
        fromModify: false,
        pickUp: pickUpLocation,
        dropOff: dropOffLocation,
      },
    });
  }

  async function modifyReservations() {
    const idToUse = modifyReservation ? modifyID : vehicleId;

    navigate("/InfoReserve", {
      state: {
        startDate: startDate,
        endDate: endDate,
        gps: gps,
        insurance: insurance,
        vehicleId: idToUse,
        currentUser: currentUser,
        imageUrl: photoUrl,
        fromModify: true,
        pickUp: pickUpLocation,
        dropOff: dropOffLocation,
      },
    });
  }

  useEffect(() => {
    async function getReservationDates() {
      try {
        const idToUse = modifyReservation ? modifyID : vehicleId;

        let isVehicle = false;

        if (vehicleId) {
          isVehicle = true;
        }

        console.log("MODIFY LOLOL " + idToUse);

        const response = await fetch(
          "http://localhost:9000/vehicles/getReservationDates",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToUse,
              isVehicle,
            }),
          }
        );

        const data = await response.json();
        console.log("From Server: ", data.dates);

        const newDates = data.dates.map((dateStr) => {
          const [year, month, day] = dateStr
            .split("-")
            .map((num) => parseInt(num, 10));
          const date = new Date(year, month - 1, day);
          date.setHours(0, 0, 0, 0); // Ensure the time is set to midnight
          return date;
        });

        setExcludedDates(newDates);
        console.log("Excluded Dates: ", newDates);
      } catch (error) {
        console.log(error);
      }
    }

    getReservationDates();
  }, [modifyReservation, modifyID, vehicleId]);

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
        required
      />

      <p> End Date </p>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date.toString())}
        dateFormat="yyyy-MM-dd"
        excludeDates={excludedDatesUse}
        minDate={startDate || new Date()}
        required
      />
      <div>
        <input type="checkbox" checked={gps} onChange={() => setGps(!gps)} />{" "}
        GPS
        <input
          type="checkbox"
          checked={insurance}
          onChange={() => setInsurance(!insurance)}
        />{" "}
        Insurance
      </div>
      <div>
        <label htmlFor="pickUpLocation">Pick Up Location:</label>
        <select
          id="pickUpLocation"
          value={pickUpLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          style={{ margin: "10px" }}
          required
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <label htmlFor="dropOffLocation">Drop Off Location:</label>
        <select
          id="dropOffLocation"
          value={dropOffLocation}
          onChange={(e) => setDropOffLocation(e.target.value)}
          style={{ margin: "10px" }}
          required
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      {modifyReservation ? (
        <button
          onClick={modifyReservations}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={!isFormValid}
        >
          Modify Reservation
        </button>
      ) : (
        <button
          onClick={submitReservation}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={!isFormValid}
        >
          Submit Reservation
        </button>
      )}
      <br />
      <img
        src={photoUrl}
        alt="Vehicle"
        style={{ maxWidth: "400px", maxHeight: "400px" }}
      />
    </div>
  );
}

export default Reserve;
