import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../apiServices/AuthContext';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import { faSleigh } from '@fortawesome/free-solid-svg-icons';


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
  const [branchName, setBranch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [noCars, setNoCars] = useState("")
  

  

 


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
  
  const toggleFilters = () => {
    setShowFilters(!showFilters)
    console.log(showFilters)
  }

let filteredVehicles = [...originalVehicleData];
const constantVehicleData = originalVehicleData

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
  if (branchName) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.brand === branchName);
  }
  if (filters.year) {
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.year === filters.year);
  }
  if (filters.transmission) {
  
    const transmissionValue = filters.transmission === 'true'; // Convert the string to a boolean
    console.log(transmissionValue + typeof transmissionValue)
    filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.transmission === transmissionValue);
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
   handleSeeAll()
   setVehicleData(originalVehicleData);
   setOriginalVehicleData(originalVehicleData)
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
   console.log("No Vehicles")
  // setNoCars("No cars based on requested filters") this is causing serious issues

 }

  const handlePostalCode = async(event) => {
    const postalCode = event.target.value;
    event.target.value = ""

     
    try { 
    
      setVehicleData(originalVehicleData)
      const response = await fetch(`http://localhost:9000/vehicles/nearest?postalCode=${postalCode}`)
      const data = await response.json()
      console.log("from postal code:" + JSON.stringify(data))
      setBranch(data.branch.BranchName)

      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.branch.BranchName === data.branch.BranchName);
    
       
    setVehicleData(filteredVehicles)
      
      
    } catch (err) {
      console.error('React Postal Code Req error: ' +err)
    }
 
  }

  const handleAirport = async (event) => {
    const selectedBranch = event.target.value;
    setBranch(selectedBranch); // Update the branch name for display purposes.

    // Filter the vehicles based on the selected branch directly.
    // This avoids issues with asynchronous state updates.
    const filteredVehicles = originalVehicleData.filter((vehicle) => 
        vehicle.branch.BranchName === selectedBranch
    );
    
    // Update the vehicle data to reflect the vehicles from the selected branch.
    setVehicleData(filteredVehicles);
  }

const photoURLs = vehicleData.map(vehicle => vehicle.photoURL);
const ids = vehicleData.map(vehicle => vehicle._id);
const idsFiltered = filteredVehicles.map((vehicle) => vehicle._id);

const handleSeeAll = async() =>{
   setVehicleData(originalVehicleData)
   setBranch('')
}

  return (
   
    <div>
      <div> <h5>Find Nearest branch</h5>
        <input type="text" id = "postalCode" placeholder='Enter Your Postal Code' onKeyPress={event => {
    if (event.key === 'Enter') {
      handlePostalCode(event);
    }
  }} /> 
        <p>or</p>
        <select value="Select Destination Airport" onChange={handleAirport} style={{ position:'relative',
    
          
    backgroundColor: '#4CAF50',
    color: 'white',
    zIndex: 1000}}>
          <option value="">Select Destination Airport</option>
          <option value = "Montreal">Montréal-Pierre Elliott Trudeau International Airport</option>
          <option value="Ottawa">Ottawa International Airport</option>
          <option value="Toronto">Toronto Pearson International Airport</option>
          <option value="NYC">John F. Kennedy International Airport</option>
          <option value="Washington">Dulles International Airport</option>
          
        </select>
      
        <input type="button" value={!showFilters ? "Adjust Filters" : "Hide Filters"} onClick={toggleFilters} style={{ position: 'absolute',
    marginLeft:'100px',
    transform: 'translateX(-50%)',
          
    backgroundColor: '#4CAF50',
    color: 'white',
    zIndex: 1000}}
/><br></br><br></br>
        {branchName && <h5>Current/Nearest Branch is {branchName}</h5>}
        {!branchName && <h5>Showing Vehicles from all branches</h5>}
      
     { branchName && <button onClick={handleSeeAll} style={{   position: 'relative',      
    backgroundColor: '#4CAF50',
    color: 'white',
    zIndex: 1000}}> See Cars from All Branches</button>}
       
        
      </div>

      {showFilters && <div><select name="color" value={filters.color} onChange={handleFilterChange}
    style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Color</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.color}>
              {vehicle.color}
            </option>
          ))}
        </select>
        <br></br>
        <select name="style" value={filters.style} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Style</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.style}>
              {vehicle.style}
            </option>
          ))}
        </select>
        <br></br>
        <select name="model" value={filters.model} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Model</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.model}>
              {vehicle.model}
            </option>
          ))}
        </select>
        <br></br>
        <select name="pricePerDay" value={filters.pricePerDay} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Price</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.pricePerDay}>
              {vehicle.pricePerDay}
            </option>
          ))}
        </select>
       <br></br> 
        {/* <select name="branch" value={filters.branch} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Branch</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.branch}>
              {vehicle.branch &&<p> {vehicle.branch.BranchName}</p> }
            </option>
          ))}
        </select>
        <br></br> */}
        <select name="brand" value={filters.brand} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Brand</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.brand}>
              {vehicle.brand}
            </option>
          ))}
        </select>
        <br></br>
        <select name="year" value={filters.year} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Year</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.year}>
              {vehicle.year}
            </option>
          ))}
        </select>
        <br></br>
        <select name="transmission" value={filters.transmission} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Transmission</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.transmission}>
              {vehicle.transmission == true? "Automatic": "Manual" }
            </option>
          ))}
        </select>
        <br></br>
        <select name="numberOfSeats" value={filters.numberOfSeats} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Number Of Seats</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.numberOfSeats}>
              {vehicle.numberOfSeats}
            </option>
          ))}
        </select>
        <br></br>
        <select name="numberOfDoors" value={filters.numberOfDoors} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Number Of Doors</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.numberOfDoors}>
              {vehicle.numberOfDoors}
            </option>
          ))}
        </select>
        <br></br>
        <select name="lister" value={filters.lister} onChange={handleFilterChange}
        style={{ width: '200px', padding: '8px', fontSize: '16px' }}>
          <option value="">Filter by Lister</option>
          {originalVehicleData.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.lister}>
              {vehicle.lister}
            </option>
          ))}
        </select>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      <Button onClick={handleClearFilters}>Clear Filters</Button> </div>}
    
        
  <DynamicGrid photoURLs={photoURLs} ids={ids} />
 </div>

 )
}


export default Home;