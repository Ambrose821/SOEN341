import React, { useState } from 'react';

function AdminDashboard() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [VIN, setVIN] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [transmission, setTransmission] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [numberOfDoors, setNumberOfDoors] = useState('');
  const [style, setStyle] = useState('');
  const [reservation, setReservation] = useState('');
  const [lister, setLister] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [reqMessage, setReqMessage] = useState('')
  const [reqSuccess, setReqSuccess] = useState(false)
  const [deleteVIN, setDeleteVIN] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form submitted with:', { 
        brand, 
        model, 
        VIN, 
        photoURL, 
        plate,
        year, 
        color,
        transmission,
        pricePerDay,
        numberOfSeats, 
        numberOfDoors,  
        style, 
        reservation, 
        lister, 
        kilometers
      });
    
    try {
        const response = await fetch('http://localhost:9000/vehicles/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            brand, 
            model, 
            VIN, 
            photoURL, 
            plate,
            year, 
            color,
            transmission,
            pricePerDay,
            numberOfSeats, 
            numberOfDoors,  
            style, 
            reservation, 
            lister, 
            kilometers
         } ),
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.log(data)
          throw new Error('Car addition fail');
        }
        console.log('Car successful:', data);
  
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  async function handleDelete(event) {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:9000/vehicles/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deleteVIN })
        });
        const data = await response.json();
        setReqMessage(data.message)
        setReqSuccess(data.success)
    } catch (err) {
        console.error(err);
    }
}

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="VIN">VIN:</label>
        <input
          type="text"
          id="VIN"
          value={VIN}
          onChange={(event) => setVIN(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="photoURL">PhotoURL:</label>
        <input
          type="text"
          id="photoURL"
          value={photoURL}
          onChange={(event) => setPhotoURL(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="plate">Plate:</label>
        <input
          type="text"
          id="plate"
          value={plate}
          onChange={(event) => setPlate(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="transmission">Transmission:</label>
        <input
          type="text"
          id="transmission"
          value={transmission}
          onChange={(event) => setTransmission(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="pricePerDay">Price per day:</label>
        <input
          type="text"
          id="pricePerDay"
          value={pricePerDay}
          onChange={(event) => setPricePerDay(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfSeats">Number of seats:</label>
        <input
          type="text"
          id="numberOfSeats"
          value={numberOfSeats}
          onChange={(event) => setNumberOfSeats(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="numberOfDoors">Number of doors:</label>
        <input
          type="text"
          id="numberOfDoors"
          value={numberOfDoors}
          onChange={(event) => setNumberOfDoors(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="style">Style:</label>
        <input
          type="text"
          id="style"
          value={style}
          onChange={(event) => setStyle(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reservation">Reservation:</label>
        <input
          type="text"
          id="reservation"
          value={reservation}
          onChange={(event) => setReservation(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lister">Admin email:</label>
        <input
          type="text"
          id="lister"
          value={lister}
          onChange={(event) => setLister(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="kilometers">Kilometers:</label>
        <input
          type="text"
          id="kilometers"
          value={kilometers}
          onChange={(event) => setKilometers(event.target.value)}
          required
        />
      </div>
      <button type="submit">Add Car</button>
    </form>

    <form onSubmit={handleDelete}>
    <div>
        <label htmlFor="deleteVIN">VIN of car to delete:</label>
        <input
          type="text"
          id="deleteVIN"
          value={deleteVIN}
          onChange={(event) => setDeleteVIN(event.target.value)}
          required
        />
      <button type="submit">Delete Car</button>
      </div>
       <p>{reqMessage}</p>
       

    </form>
    </div>


  );
}

export default AdminDashboard;
    // setBrand('');
    // setModel('');
    // setVIN('');
    // setPhotoURL('');
    // setPlate('');
    // setYear('');
    // setColor('');
    // setTransmission('');
    // setPricePerDay('');
    // setNumberOfSeats('');
    // setNumberOfDoors('');
    // setStyle('');
    // setReservation('');
    // setLister('');
    // setKilometers('');