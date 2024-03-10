import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Reserve from './Reserve';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
               </Button>


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
 const [error, setError] = useState(null);


 useEffect(() => {
   const getVehicles = async () => {
     try {
       const response = await fetch('http://localhost:9000/vehicles/getCars');
       const data = await response.json();
       setVehicleData(data);
       console.log(data);
     } catch (error) {
       setError(error.toString());
     }
   };


   getVehicles();
 }, []);


 if (error) {
   return <div>Error fetching data: {error}</div>;
 }


 if (!vehicleData.length) {
   return <div>Loading...</div>;
 }


 const photoURLs = vehicleData.map(vehicle => vehicle.photoURL);
 const ids = vehicleData.map(vehicle => vehicle._id);


 return <DynamicGrid photoURLs={photoURLs} ids={ids} />; // Pass both photoURLs and ids as props
}


export default Home;