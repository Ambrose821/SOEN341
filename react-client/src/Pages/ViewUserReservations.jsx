import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewUserReservations() {
  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/vehicles/getAllUserReservations"
      );
      const data = await response.json();
      setAllUsers(data.reservations || []);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const inputStyle = {
    width: "25%",
    padding: "10px",
    margin: "10px 0",
  };

  const OnModifyClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/vehicles/AdminModifyReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            startDate,
            endDate,
          }),
        }
      );

      if (response.ok) {
        navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/vehicles/AdminDeleteReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deleteEmail,
          }),
        }
      );

      if (response.ok) {
        navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Reservation Admin Dashboard</h1>
      <h2>User Reservations:</h2>
      <div>
        {allUsers.map((user, userIndex) => (
          <div key={userIndex}>
            <h3>User: {user.email}</h3>
            {user.reservations.map((reservation, reservationIndex) => (
              <div key={`${userIndex}-${reservationIndex}`}>
                <p>Start Date: {reservation.start}</p>
                <p>End Date: {reservation.end}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Inputs for modifying a reservation */}
      <div>
        <h2>Admin Commands:</h2>
        <h3>Modify Reservation</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={OnModifyClick}
          style={{
            padding: "10px 15px 10px 10px",
            cursor: "pointer",
            backgroundColor: "lightblue",
          }}
        >
          Modify
        </button>

        <h3>Delete Reservation</h3>
        <input
          type="text"
          placeholder="Email to delete"
          value={deleteEmail}
          onChange={(e) => setDeleteEmail(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ViewUserReservations;
