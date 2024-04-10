import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
function Agreement() {
  const location = useLocation();
  const { info } = location.state || {};
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const printTest = (e) => {
    alert(JSON.stringify(info));
  };

  function getCurrentDate() {
    // we need to make a new date object because it is being processed as a date 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Append leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  }

  // This will handle the submit button when someone agress 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/vehicles/checkedIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservation: info[0] }),
      });
      // we need to await the json so that we use the async properties 
      const data = await response.json();
      if (data.success == true) {
        setCheckedIn(true);
      }
    } catch (err) {
      console.log("Agreement Handle Submit Error: " + err);
    }
  };
  return (
    <div className="Agreement">
      <h2>Car Rental Agreement</h2>
      <form onSubmit={handleSubmit}>
        {/* Rental Terms and Conditions */}
        <h3>Rental Agreement Number:</h3>
        <p>
          This Rental Agreement ("Agreement") is entered into between Vini's
          Vehicles Inc., located at 1455 Blvd. De Maisonneuve Ouest, Montreal,
          Quebec H3G 1M8, hereinafter referred to as the "Rental Company," and
          the individual or entity identified below, hereinafter referred to as
          the "Renter":
        </p>
        <ol>
          <li>
            <h3>Renter's Information:</h3>
            <br />
            Name: {" " +
              info[0].user.firstName +
              " " +
              info[0].user.last_name}{" "}
            <br />
            Address: {" " + info[1].homeAddress}
            <br />
            Contact Number:{" " + info[1].phone_number}
            <br />
            Email Address:{" " + info[0].user.email}
            <br />
            Driver's License Number:{" " + info[1].license_number}
            <br />
          </li>
          <br />
          <li>
            <h3>Vehicle Information:</h3>
            <br />
            Make:{" " + info[0].vehicle.brand}
            <br />
            Model:{" " + info[0].vehicle.model}
            <br />
            Year:{" " + info[0].vehicle.year}
            <br />
            License Plate Number:{" " + info[0].vehicle.plate}
            <br />
            Vehicle Identification Number (VIN):{" " + info[0].vehicle.VIN}
            <br />
            Color:
            <br />
          </li>
          <br />
          <li>
            <h3>Rental Details:</h3>
            <br />
            Rental Start Date:{" " + info[0].startDate} <br />
            Rental End Date:{" " + info[0].endDate}
            <br />
            Pick-up Location: {" " + info[0].pickUp}
            <br />
            Drop-off Location:{" " + info[0].dropOff}
            <br />
            Rental Period:{" " + info[0].startDate} to {info[0].endDate}
            <br />
            Mileage Limit (if applicable): N/A
            <br />
            Rental Rate:{" " + info[0].vehicle.pricePerDay}
            <br />
            Additional Services (if any):gps:
            {" " + info[0].gps.toString() + ", "} insurance:{" "}
            {info[0].insurance.toString()}
            <br />
          </li>
          <br />
          <li>
            <h3>Rental Terms and Conditions:</h3>
            <br />
            <ul>
              <li>
                The Renter acknowledges receiving the vehicle described above in
                good condition and agrees to return it to the Rental Company in
                the same condition, subject to normal wear and tear.
              </li>
              <li>
                The Renter agrees to use the vehicle solely for personal or
                business purposes and not for any illegal activities.
              </li>
              <li>
                The Renter agrees to pay the Rental Company the agreed-upon
                rental rate for the specified rental period. Additional charges
                may apply for exceeding the mileage limit, late returns, fuel
                refueling, or other damages.
              </li>
              <li>
                The Renter agrees to bear all costs associated with traffic
                violations, tolls, and parking fines incurred during the rental
                period.
              </li>
              <li>
                The Renter acknowledges that they are responsible for any loss
                or damage to the vehicle, including theft, vandalism, accidents,
                or negligence, and agrees to reimburse the Rental Company for
                all repair or replacement costs.
              </li>
              <li>
                The Renter agrees to return the vehicle to the designated
                drop-off location at the agreed-upon date and time. Failure to
                do so may result in additional charges.
              </li>
              <li>
                The Rental Company reserves the right to terminate this
                agreement and repossess the vehicle without prior notice if the
                Renter breaches any terms or conditions of this agreement.
              </li>
              <li>
                The Renter acknowledges receiving and reviewing a copy of the
                vehicle's insurance coverage and agrees to comply with all
                insurance requirements during the rental period.
              </li>
            </ul>
          </li>
          <li>
            <h3>Indemnification:</h3>
            The Renter agrees to indemnify and hold harmless the Rental Company,
            its employees, agents, and affiliates from any claims, liabilities,
            damages, or expenses arising out of or related to the Renter's use
            of the vehicle.
          </li>
          <li>
            <h3>Governing Law:</h3>
            This Agreement shall be governed by and construed in accordance with
            the laws of [Jurisdiction]. Any disputes arising under or related to
            this Agreement shall be resolved exclusively by the courts of
            [Jurisdiction].
          </li>
          <li>
            <h3>Entire Agreement:</h3>
            This Agreement constitutes the entire understanding between the
            parties concerning the subject matter hereof and supersedes all
            prior agreements and understandings, whether written or oral.
          </li>
          <li>
            <h3>Signatures:</h3>
            The parties hereto have executed this Agreement as of the date first
            written above.
            <div>
              <h4>
                <u>Rental Company:</u>
              </h4>
              Signature:{" "}
              <input
                type="text"
                id="rental_company_signature"
                name="rental_company_signature"
                required
                value="Vinisha Manek"
                readOnly
              />
              <br />
              Print Name:{" "}
              <input
                type="text"
                id="rental_company_name"
                name="rental_company_name"
                required
                value="Vinisha Manek"
                readOnly
              />
              <br />
              Date:{" "}
              <input
                type="date"
                id="rental_company_date"
                name="rental_company_date"
                required
                value={getCurrentDate()}
                readOnly
              />
            </div>
            <div>
              <h4>
                <u>Renter:</u>
              </h4>
              Signature:
              <input
                type="text"
                id="renter_signature"
                name="renter_signature"
                required
              />
              <br />
              Print Name:
              <input type="text" id="renter_name" name="renter_name" required />
              <br />
              Date:
              <input
                type="date"
                id="renter_date"
                name="renter_date"
                required
                min={getCurrentDate()}
              />
            </div>
          </li>
        </ol>
        <button type="submit">Submit</button>
      </form>
      {checkedIn && <p>Thank you for Checking In</p>}
    </div>
  );
}

export default Agreement;
