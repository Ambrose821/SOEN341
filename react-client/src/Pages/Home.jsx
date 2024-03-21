import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate


const Item = styled(Paper)(({ theme }) => ({
 backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
 ...theme.typography.body2,
 padding: theme.spacing(1),
 textAlign: 'center',
 color: theme.palette.text.secondary,
}));


const DynamicGrid = ({ photoURLs, ids }) => { // Ensure ids are received as props
 const { isLoggedIn } = useAuth();
 const navigate = useNavigate(); // Use useNavigate inside the component
 const columns = 3;


 const handleReserveClick = (id) => {
   navigate('/reserve', { state: { vehicleId: id } }); // Use navigate with state correctly
 };


 return (
   <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={2}>
       {photoURLs.map((url, index) => (
         <Grid key={index} item xs={12 / columns}>
           <Item>
             <div style={{ position: 'relative', paddingBottom: '75%', maxWidth: '100%' }}>
               <img
                 src={url}
                 alt={`Car ${index + 1}`}
                 style={{
                   position: 'absolute',
                   top: '0',
                   left: '0',
                   width: '100%',
                   height: '100%',
                 }}
               />

              {isLoggedIn && (
               <Button
                 variant="contained"
                 style={{
                   position: 'absolute',
                   bottom: '5%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   width: '30%',
                   backgroundColor: '#4CAF50',
                   color: 'white',
                 }}
                 onClick={() => handleReserveClick(ids[index])} // Correct onClick event
               >
                 Reserve
               </Button>)}

               {!isLoggedIn && (
                <Link to="/login">
               <Button
                 variant="contained"
                 style={{
                   position: 'absolute',
                   bottom: '5%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   width: '30%',
                   backgroundColor: '#4CAF50',
                   color: 'white',
                 }}
                  // Correct onClick event
               >
                 Reserve
               </Button></Link>)}

             </div>
           </Item>
         </Grid>
       ))}
     </Grid>
   </Box>
 );
};


function Home() {
 const [vehicleData, setVehicleData] = useState([]);
 const [originalVehicleData, setOriginalVehicleData] = useState([]); 
 const [error, setError] = useState(null);
 const [filters, setFilters] = useState({    
  brand: '',
  year: '',
  transmission: '',
  numberOfSeats: '',
  numberOfDoors: '',
  lister: '',
  color: '',
  style: '',
  model: '',
  pricePerDay: '',
  model: '',
  branch: '',
 });

 


 useEffect(() => {
   const getVehicles = async () => {
     try {
       const response = await fetch('http://localhost:9000/vehicles/getCars');
       const data = await response.json();
       setVehicleData(data);
       setOriginalVehicleData(data); 
       console.log(data);
     } catch (error) {
       setError(error.toString());
     }
   };


   getVehicles();
 }, []);

let filteredVehicles = [...vehicleData];

const handleApplyFilters = () => {

  if (filters.color) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.color === filters.color);
  }
  if (filters.style) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.style === filters.style);
  }
  if (filters.model) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.model === filters.model);
  }
  if (filters.price) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.price === filters.price);
  }
  if (filters.branch) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.branch === filters.branch);
  }
  if (filters.brand) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.brand === filters.brand);
  }
  if (filters.year) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.year === filters.year);
  }
  if (filters.transmission) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.transmission === filters.transmission);
  }
  if (filters.numberOfSeats) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.numberOfSeats === filters.numberOfSeats);
  }
  if (filters.numberOfDoors) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.numberOfDoors === filters.numberOfDoors);
  }
  if (filters.lister) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.lister === filters.lister);
  }

  setVehicleData(filteredVehicles);

};

 const handleClearFilters = () => {
  setFilters({    
    brand: '',
    year: '',
    transmission: '',
    numberOfSeats: '',
    numberOfDoors: '',
    lister: '',
    color: '',
    style: '',
    model: '',
    pricePerDay: '',
    model: '',
    branch: '',
   });

   setVehicleData(originalVehicleData);
};


 const handleFilterChange = (event) => {
  const { name, value } = event.target;
  setFilters((prevFilters) => ({
    ...prevFilters,
    [name]: value,
  }));
};


 if (error) {
   return <div>Error fetching data: {error}</div>;
 }


 if (!vehicleData.length) {
   return <div>Loading...</div>;
 }


const photoURLs = vehicleData.map(vehicle => vehicle.photoURL);
const ids = vehicleData.map(vehicle => vehicle._id);
const idsFiltered = filteredVehicles.map((vehicle) => vehicle._id);


 return (
  <div>
    <select name="color" value={filters.color} onChange={handleFilterChange}
    style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Color</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.color}>
              {vehicle.color}
            </option>
          ))}
        </select>
        <br></br>
        <select name="style" value={filters.style} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Style</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.style}>
              {vehicle.style}
            </option>
          ))}
        </select>
        <br></br>
        <select name="model" value={filters.model} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Model</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.model}>
              {vehicle.model}
            </option>
          ))}
        </select>
        <br></br>
        <select name="pricePerDay" value={filters.pricePerDay} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Price</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.pricePerDay}>
              {vehicle.pricePerDay}
            </option>
          ))}
        </select>
        <br></br>
        <select name="branch" value={filters.branch} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Branch</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.branch}>
              {vehicle.branch &&<p> {vehicle.branch.BranchName}</p> }
            </option>
          ))}
        </select>
        <br></br>
        <select name="brand" value={filters.brand} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Brand</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.brand}>
              {vehicle.brand}
            </option>
          ))}
        </select>
        <br></br>
        <select name="year" value={filters.year} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Year</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.year}>
              {vehicle.year}
            </option>
          ))}
        </select>
        <br></br>
        <select name="transmission" value={filters.transmission} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Transmission</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.transmission}>
              {vehicle.transmission}
            </option>
          ))}
        </select>
        <br></br>
        <select name="numberOfSeats" value={filters.numberOfSeats} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Number Of Seats</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.numberOfSeats}>
              {vehicle.numberOfSeats}
            </option>
          ))}
        </select>
        <br></br>
        <select name="numberOfDoors" value={filters.numberOfDoors} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Number Of Doors</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.numberOfDoors}>
              {vehicle.numberOfDoors}
            </option>
          ))}
        </select>
        <br></br>
        <select name="lister" value={filters.lister} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Lister</option>
          {vehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.lister}>
              {vehicle.lister}
            </option>
          ))}
        </select>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button onClick={handleClearFilters}>Clear Filters</Button>

  <DynamicGrid photoURLs={photoURLs} ids={ids} />; 
 </div>

 )
}


export default Home;