import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Assuming you have an image URL for the Ferrari F20
const imageUrl =
  "https://t3.ftcdn.net/jpg/02/98/35/82/360_F_298358259_bwYxOvtrqJn7m8dfeYkkoNkusBSYNhep.jpg";

function InfoCarPage() {
  const location = useLocation();
  const [currentVehicle, setCar] = useState("");
  const vehicleId = location.state?.carId;

  const handleYesClick = () => {
    console.log("Yes clicked");
    // Add your logic here for what happens when YES is clicked
  };

  const handleNoClick = () => {
    console.log("No clicked");
    // Add your logic here for what happens when NO is clicked
  };

  async function getVehicleById(vehicleId) {
    try {
      const response = await fetch(
        `http://localhost:9000/vehicles/getVehicleByID?vehicleID=${vehicleId}`
      );
      const data = await response.json();
      console.log("Vehicle Data:", data);
      setCar(data.vehicle); // Set the entire response data to currentVehicle
      return data; // Return the fetched data
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      return null; // Return null or handle the error as needed
    }
  }

  useEffect(() => {
    if (vehicleId) {
      getVehicleById(vehicleId);
    }
  }, [vehicleId]); // Add vehicleId as a dependency

  if (currentVehicle.transmission === true) {
    var transmission = "Manuel";
  } else {
    var transmission = "Automatic";
  }
  console.log(currentVehicle.brand);

  const brand = currentVehicle.brand;
  const model = currentVehicle.model;
  const pricePerDay = currentVehicle.pricePerDay;

  const numberOfDoors = currentVehicle.numberOfDoors;
  const numberOfSeats = currentVehicle.numberOfSeats;
  const year = currentVehicle.year;
  const imageUrl = currentVehicle.photoURL;

  console.log(imageUrl);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Information Display</h2>
        {/* Image right under the header */}
        <img
          src={imageUrl}
          alt="Car Image"
          style={{ maxWidth: "25%", height: "auto" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Brand:</label>
            <span>{brand}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Model:</label>
            <span>{model}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Year:</label>
            <span>{year}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Price Per Day:</label>
            <span>{pricePerDay}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Transmission Type:</label>
            <span>{transmission}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Numer of Seats:</label>
            <span>{numberOfSeats}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label>Numer of Doors:</label>
            <span>{numberOfDoors}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCarPage;
